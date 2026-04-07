import { chromium } from 'playwright';
import { normalizePhone, generateWhatsAppLink } from '../utils/phoneUtils.js';

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
const whatsappRegex = /wa\.me\/(\d+)|api\.whatsapp\.com\/send\?phone=(\d+)/gi;

export const scrapeWebsite = async (url) => {
  if (!url) return { emails: [], phones: [], whatsapp: [], social: [] };

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

    const content = await page.content();
    const text = await page.evaluate(() => document.body.innerText);

    // Extract emails
    const emails = [...new Set(content.match(emailRegex) || [])];

    // Extract phones (rough + libphonenumber later)
    const phoneMatches = text.match(/[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,}[-\s\.]?[0-9]{3,}/g) || [];

    // WhatsApp links
    const waMatches = [...content.matchAll(whatsappRegex)];
    const whatsappNumbers = waMatches.map(m => m[1] || m[2]).filter(Boolean);

    // Social links (basic)
    const social = await page.$$eval('a[href]', links =>
      links.map(a => a.href).filter(h => 
        /facebook|instagram|twitter|linkedin|tiktok/.test(h.toLowerCase())
      )
    );

    await browser.close();

    return {
      emails: [...new Set(emails)],
      phones: [...new Set(phoneMatches)],
      whatsapp: [...new Set(whatsappNumbers)],
      social: [...new Set(social)]
    };

  } catch (error) {
    console.error(`Scraping failed for ${url}:`, error.message);
    await browser.close();
    return { emails: [], phones: [], whatsapp: [], social: [] };
  }
};