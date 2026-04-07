
import Lead from "../models/lead.js"
import { scrapeWebsite } from "./websiteScrapper.js";

import { normalizePhone, generateWhatsAppLink, isLikelyWhatsApp } from './../utils/phoneUtils.js';

export const processLeads = async (rawLeads, category, country, city, area, depth = 'basic') => {
  const processed = [];

  for (const raw of rawLeads) {
    let leadData = {
      businessName: raw.businessName,
      category,
      country,
      city,
      area,
      address: raw.address,
      phone: raw.phone,
      website: raw.website,
      source: raw.source,
      scrapedAt: new Date()
    };

    // Advanced depth → scrape website
    if (depth === 'advanced' && raw.website) {
      const scraped = await scrapeWebsite(raw.website);

      leadData.email = scraped.emails[0] || null;
      leadData.socialLinks = scraped.social;

      // WhatsApp priority
      if (scraped.whatsapp.length > 0) {
        leadData.whatsappNumber = scraped.whatsapp[0];
        leadData.whatsappLink = generateWhatsAppLink(scraped.whatsapp[0]);
      } else if (raw.phone && isLikelyWhatsApp(raw.phone)) {
        const norm = normalizePhone(raw.phone);
        leadData.whatsappNumber = norm.e164;
        leadData.whatsappLink = generateWhatsAppLink(norm.e164);
      }
    } else if (raw.phone && isLikelyWhatsApp(raw.phone)) {
      const norm = normalizePhone(raw.phone);
      leadData.whatsappNumber = norm.e164;
      leadData.whatsappLink = generateWhatsAppLink(norm.e164);
    }

    // Classify quality
    if (leadData.whatsappNumber && leadData.email) {
      leadData.leadQuality = 'HIGH';
    } else if (leadData.whatsappNumber) {
      leadData.leadQuality = 'MEDIUM';
    } else if (leadData.phone) {
      leadData.leadQuality = 'LOW';
    } else {
      leadData.leadQuality = 'INCOMPLETE';
    }

    // Save to DB (deduplicate by name + phone)
    const existing = await Lead.findOne({ 
      businessName: leadData.businessName, 
      phone: leadData.phone 
    });

    if (!existing) {
      await Lead.create(leadData);
      processed.push(leadData);
    }
  }

  return processed;
};