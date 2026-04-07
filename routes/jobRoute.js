import express from 'express';
import { searchGooglePlaces } from '../services/placesServices.js';
import { processLeads } from '../services/dataProcessor.js';
import Lead from '../models/lead.js';

const router = express.Router();

// router.post('/scrape', async (req, res) => {
//   const { country, city, area, category, depth = 'basic' } = req.body;

//   try {
//     console.log(`🚀 Starting scrape: ${category} in ${city}, ${country}`);

//     const rawLeads = await searchGooglePlaces(category, city, area, country);

//     const processedLeads = await processLeads(rawLeads, category, country, city, area, depth);

//     res.json({
//       success: true,
//       totalFound: rawLeads.length,
//       totalProcessed: processedLeads.length,
//       leads: processedLeads
//     });
//   } catch (error) {
//     console.log('Error in /scrape route:', error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });



router.post('/scrape', async (req, res) => {
  const { country, city, area, category, depth = 'basic' } = req.body;

  try {
    console.log(`🚀 Starting scrape: ${category} in ${city}, ${country}`);

    const rawLeads = await searchGooglePlaces(category, city, area, country);

    const { processedLeads, totalProcessed } = await processLeads(
      rawLeads, 
      category, 
      country, 
      city, 
      area, 
      depth
    );

    res.json({
      success: true,
      totalFound: rawLeads.length,
      totalProcessed,
     leads: processedLeads || [],
      message: `${totalProcessed} new leads saved to database`
    });
  } catch (error) {
    console.error('Error in /scrape route:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});


// e.g. in your leads router
router.get('/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ scrapedAt: -1 }).limit(500); // adjust limit as needed
    res.json({
      success: true,
      count: leads.length,
      leads
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: error.message });
  }
});


export default router;