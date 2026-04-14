// // services/websiteScraper.js  (Improved version)
// import { chromium } from 'playwright';

// const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;

// // Better phone regex for Cameroon (+237)
// const phoneRegex = /(?:(?:\+237|00237|237)?[\s.-]?6[0-9]{2}[\s.-]?[0-9]{2}[\s.-]?[0-9]{2}[\s.-]?[0-9]{2})/gi;

// const whatsappRegex = /(?:wa\.me\/|api\.whatsapp\.com\/send\?phone=)([0-9]+)/gi;

// export const scrapeWebsite = async (url) => {
//   if (!url || url.length < 10) return { emails: [], phones: [], whatsapp: [], social: [] };

//   const browser = await chromium.launch({ headless: true });
//   const page = await browser.newPage();

//   try {
//     console.log(`Scraping website: ${url}`);
//     await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });

//     const content = await page.content();
//     const text = await page.evaluate(() => document.body.innerText.toLowerCase());

//     // Emails
//     const emails = [...new Set(content.match(emailRegex) || [])];

//     // Phones
//     let phones = content.match(phoneRegex) || [];
//     phones = [...new Set(phones)];

//     // WhatsApp links
//     const waMatches = [...content.matchAll(whatsappRegex)];
//     const whatsapp = waMatches.map(m => m[1]).filter(Boolean);

//     // Also check for "whatsapp" text + nearby numbers
//     if (text.includes('whatsapp') || text.includes('wa.me')) {
//       const extraPhones = text.match(phoneRegex) || [];
//       whatsapp.push(...extraPhones);
//     }

//     // Social
//     const social = await page.$$eval('a[href]', links =>
//       links.map(a => a.href).filter(h => 
//         /facebook|instagram|twitter|linkedin|tiktok|wa\.me/.test(h.toLowerCase())
//       )
//     );

//     await browser.close();

//     return {
//       emails: emails.slice(0, 5),
//       phones: phones.slice(0, 10),
//       whatsapp: [...new Set(whatsapp)].slice(0, 5),
//       social: [...new Set(social)]
//     };

//   } catch (error) {
//     console.error(`Website scrape failed ${url}:`, error.message);
//     await browser.close();
//     return { emails: [], phones: [], whatsapp: [], social: [] };
//   }
// };



import { chromium } from 'playwright';

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;

// Better regex for social media

const facebookRegex = /https?:\/\/(?:www\.)?(?:facebook|fb)\.com\/(?:[^\/\s]+\/?)(?!.*(?:share|photo|posts))/gi;
const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|company|pub)\/[\w\-\.]+\/?/gi;

export const scrapeWebsite = async (url) => {
  if (!url) return { emails: [], phones: [], whatsapp: [], facebook: [], linkedin: [], social: [] };

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log(`Scraping for contacts: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 });

    const content = await page.content();
    const text = await page.evaluate(() => document.body.innerText);

    // Emails
    const emails = [...new Set(content.match(emailRegex) || [])];

    // Phones (keep your existing phone regex)
    const phoneRegex = /(?:(?:\+237|00237|237)?[\s.-]?6[0-9]{2}[\s.-]?[0-9]{2}[\s.-]?[0-9]{2}[\s.-]?[0-9]{2})/gi;
    const phones = [...new Set(content.match(phoneRegex) || [])];

    // WhatsApp
    const whatsappRegex = /(?:wa\.me\/|api\.whatsapp\.com\/send\?phone=)([0-9]+)/gi;
    const waMatches = [...content.matchAll(whatsappRegex)];
    const whatsapp = waMatches.map(m => m[1]).filter(Boolean);

    // Facebook & LinkedIn
    const facebook = [...new Set(content.match(facebookRegex) || [])];
    const linkedin = [...new Set(content.match(linkedinRegex) || [])];

    // General social links (backup)
    const social = await page.$$eval('a[href]', links =>
      links.map(a => a.href).filter(h => 
        /facebook|instagram|linkedin|tiktok|twitter/.test(h.toLowerCase())
      )
    );

    const cleanFacebook = scraped.social
  .filter(link => link.includes('facebook.com') || link.includes('fb.com'))
  .map(link => {
    // Clean and make sure it's a proper page link
    return link.split('?')[0].split(';')[0];   // remove query params
  });

    await browser.close();

    return {
      emails: emails.slice(0, 3),
      phones: phones.slice(0, 8),
      whatsapp: [...new Set(whatsapp)].slice(0, 3),
      facebook: facebook.slice(0, 2),
      linkedin: linkedin.slice(0, 2),
      social: [...new Set(social)]
    };

  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error.message);
    await browser.close();
    return { emails: [], phones: [], whatsapp: [], facebook: [], linkedin: [], social: [] };
  }
};