

// export const processLeads = async (rawLeads, category, country, city, area, depth = 'basic') => {
//   const processed = [];
//   const savedLeads = [];   // ← New: store full saved documents

//   for (const raw of rawLeads) {
//     let leadData = {
//       businessName: raw.businessName || "Unknown Business",
//       category,
//       country,
//       city,
//       area: area || raw.area,
//       address: raw.address,
//       phone: raw.phone,
//       website: raw.website,
//       source: raw.source || "Google Places",
//       scrapedAt: new Date()
//     };

//     // ... (your existing WhatsApp + advanced scraping logic stays the same)

//     if (depth === 'advanced' && raw.website) {
//       const scraped = await scrapeWebsite(raw.website);
//       leadData.email = scraped.emails?.[0] || null;
//       leadData.socialLinks = scraped.social || [];
      
//       if (scraped.whatsapp?.length > 0) {
//         leadData.whatsappNumber = scraped.whatsapp[0];
//         leadData.whatsappLink = generateWhatsAppLink(scraped.whatsapp[0]);
//       } else if (raw.phone && isLikelyWhatsApp(raw.phone)) {
//         const norm = normalizePhone(raw.phone);
//         leadData.whatsappNumber = norm.e164;
//         leadData.whatsappLink = generateWhatsAppLink(norm.e164);
//       }
//     } else if (raw.phone && isLikelyWhatsApp(raw.phone)) {
//       const norm = normalizePhone(raw.phone);
//       leadData.whatsappNumber = norm.e164;
//       leadData.whatsappLink = generateWhatsAppLink(norm.e164);
//     }

//     // Quality classification (unchanged)
//     if (leadData.whatsappNumber && leadData.email) {
//       leadData.leadQuality = 'HIGH';
//     } else if (leadData.whatsappNumber) {
//       leadData.leadQuality = 'MEDIUM';
//     } else if (leadData.phone) {
//       leadData.leadQuality = 'LOW';
//     } else {
//       leadData.leadQuality = 'INCOMPLETE';
//     }

//     // Deduplication + Save
//     const existing = await Lead.findOne({ 
//       businessName: leadData.businessName, 
//       phone: leadData.phone || { $exists: false }
//     });

//     if (!existing) {
//       const savedLead = await Lead.create(leadData);
//       const leadToReturn = savedLead.toObject(); // or savedLead._doc
//       savedLeads.push(leadToReturn);
//       processed.push(leadToReturn);
//     }
//   }

//   return { processedLeads: savedLeads, totalProcessed: savedLeads.length };
// };




import Lead from '../models/Lead.js';
import { scrapeWebsite } from './websiteScrapper.js';
import { normalizePhone,generateWhatsAppLink, isLikelyWhatsApp } from '../utils/phoneUtils.js';


/**
 * Process raw leads from Google Places and enrich them with website scraping
 */
export const processLeads = async (rawLeads, category, country, city, area, depth = 'basic') => {
  const savedLeads = [];        // Final leads to return
  const processedCount = 0;     // For logging

  console.log(`🔄 Processing ${rawLeads.length} raw leads | Depth: ${depth}`);

  for (const raw of rawLeads) {
    try {
      // Base lead data
      let leadData = {
        businessName: raw.businessName?.trim() || "Unknown Business",
        category: category?.trim(),
        country: country || 'Cameroon',
        city: city?.trim(),
        area: area?.trim() || raw.area,
        address: raw.address?.trim(),
        phone: raw.phone?.trim(),
        website: raw.website?.trim(),
        source: raw.source || "Google Places",
        scrapedAt: new Date()
      };

      // ==================== ADVANCED SCRAPING ====================
      if (depth === 'advanced' && leadData.website) {
        console.log(`🌐 Scraping website for: ${leadData.businessName}`);

        const scraped = await scrapeWebsite(leadData.website);

        // Add scraped data
        leadData.email = scraped.emails?.[0] || null;
        leadData.facebook = scraped.facebook?.[0] || null;
        leadData.linkedin = scraped.linkedin?.[0] || null;
        leadData.socialLinks = scraped.social || [];

        // WhatsApp priority (from website first)
        if (scraped.whatsapp?.length > 0) {
          leadData.whatsappNumber = scraped.whatsapp[0];
          leadData.whatsappLink = generateWhatsAppLink(scraped.whatsapp[0]);
        } 
        else if (leadData.phone && isLikelyWhatsApp(leadData.phone)) {
          const norm = normalizePhone(leadData.phone);
          if (norm.isValid) {
            leadData.whatsappNumber = norm.e164;
            leadData.whatsappLink = generateWhatsAppLink(norm.e164);
          }
        }
      } 
      // ==================== BASIC MODE (Only Google Data) ====================
      else if (leadData.phone && isLikelyWhatsApp(leadData.phone)) {
        const norm = normalizePhone(leadData.phone);
        if (norm.isValid) {
          leadData.whatsappNumber = norm.e164;
          leadData.whatsappLink = generateWhatsAppLink(norm.e164);
        }
      }

      // ==================== LEAD QUALITY CLASSIFICATION ====================
      if (leadData.whatsappNumber && leadData.email) {
        leadData.leadQuality = 'HIGH';
      } else if (leadData.whatsappNumber) {
        leadData.leadQuality = 'MEDIUM';
      } else if (leadData.phone) {
        leadData.leadQuality = 'LOW';
      } else {
        leadData.leadQuality = 'INCOMPLETE';
      }

      // ==================== DEDUPLICATION & SAVE ====================
      const existing = await Lead.findOne({
        businessName: leadData.businessName,
        $or: [
          { phone: leadData.phone },
          { whatsappNumber: leadData.whatsappNumber }
        ]
      });

      if (!existing) {
        const savedLead = await Lead.create(leadData);
        const leadToReturn = savedLead.toObject();

        savedLeads.push(leadToReturn);
        console.log(`✅ Saved: ${leadData.businessName} → ${leadData.leadQuality}`);
      } else {
        console.log(`⏭️ Skipped duplicate: ${leadData.businessName}`);
      }

    } catch (err) {
      console.error(`❌ Error processing lead "${raw.businessName}":`, err.message);
      // Continue with next lead instead of crashing entire process
    }
  }

  console.log(`🎉 Processing completed. ${savedLeads.length} new leads saved.`);

  return {
    processedLeads: savedLeads,
    totalProcessed: savedLeads.length,
    totalFound: rawLeads.length
  };
};