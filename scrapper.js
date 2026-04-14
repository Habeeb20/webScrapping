// import axios from 'axios';
// import { load } from 'cheerio';

// async function scrapeBooks() {
//   try {
//     const { data } = await axios.get('https://books.toscrape.com/');
//     const $ = load(data);  // Load HTML into Cheerio

//     const books = [];

//     $('.product_pod').each((i, el) => {
//       const title = $(el).find('h3 a').attr('title');
//       const price = $(el).find('.price_color').text();
//       const rating = $(el).find('.star-rating').attr('class').split(' ')[1];
//       const link = 'https://books.toscrape.com/' + $(el).find('h3 a').attr('href');

//       books.push({ title, price, rating, link });
//     });

//     console.log(books);
//     // Save to file: import fs from 'fs'; fs.writeFileSync('books.json', JSON.stringify(books, null, 2));
//   } catch (error) {
//     console.error('Scraping failed:', error.message);
//   }
// }

// scrapeBooks();



import { PlaywrightCrawler, Dataset } from 'crawlee';

const crawler = new PlaywrightCrawler({
  // Max concurrent requests (adjust based on your machine/proxies)
  maxRequestsPerCrawl: 50,        // limit for testing
  headless: true,                 // set false for debugging

  // This runs for every page
  async requestHandler({ page, request, enqueueLinks }) {
    console.log(`Scraping: ${request.url}`);

    // Optional: Wait for dynamic content
    await page.waitForSelector('body', { timeout: 10000 });

    // Extract basic general data (title, headings, paragraphs, links)
    const title = await page.title();
    const headings = await page.$$eval('h1, h2, h3', els => els.map(el => el.textContent.trim()));
    const paragraphs = await page.$$eval('p', els => els.map(el => el.textContent.trim()).filter(Boolean));
    const allLinks = await page.$$eval('a[href]', els => els.map(el => ({
      text: el.textContent.trim(),
      href: el.href
    })));

    // Save data
    await Dataset.pushData({
      url: request.url,
      title,
      headings,
      paragraphs: paragraphs.slice(0, 500), // limit to avoid huge data
      links: allLinks.slice(0, 50),
      scrapedAt: new Date().toISOString()
    });

    // Automatically find and enqueue more links (makes it a real crawler)
    await enqueueLinks({
      // Optional: only follow same domain or specific patterns
      // strategy: 'same-domain' 
    });
  },

  // Handle failed requests
  failedRequestHandler({ request }) {
    console.log(`Failed: ${request.url}`);
  }
});

// Start with one or more seed URLs
await crawler.run([
  'https://books.toscrape.com',     // test static site
  'https://quotes.toscrape.com',    // another test
  // Add more starting URLs here
]);

console.log('Crawling finished!');