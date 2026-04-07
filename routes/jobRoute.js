import express from 'express';
import { searchGooglePlaces } from '../services/placesServices.js';
import { processLeads } from '../services/dataProcessor.js';


const router = express.Router();

router.post('/scrape', async (req, res) => {
  const { country, city, area, category, depth = 'basic' } = req.body;

  try {
    console.log(`🚀 Starting scrape: ${category} in ${city}, ${country}`);

    const rawLeads = await searchGooglePlaces(category, city, area, country);

    const processedLeads = await processLeads(rawLeads, category, country, city, area, depth);

    res.json({
      success: true,
      totalFound: rawLeads.length,
      totalProcessed: processedLeads.length,
      leads: processedLeads
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;