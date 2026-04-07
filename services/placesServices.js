// services/placesService.js
import axios from 'axios';

export const searchGooglePlaces = async (category, city, area = '', country = 'Nigeria') => {
  const query = `${category} in ${area} ${city} ${country}`.trim();

  try {
    // Step 1: Text Search to get place_ids
    const searchRes = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query,
        key: process.env.GOOGLE_PLACES_API_KEY,
      }
    });

    const results = searchRes.data.results || [];
    const leads = [];

    // Step 2: Get full details for each place (this is where phone & website usually appear)
    for (const place of results) {
      try {
        const detailRes = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
          params: {
            place_id: place.place_id,
            fields: 'name,formatted_address,formatted_phone_number,website,geometry,rating',
            key: process.env.GOOGLE_PLACES_API_KEY,
          }
        });

        const details = detailRes.data.result || {};

        leads.push({
          businessName: details.name || place.name,
          address: details.formatted_address || place.formatted_address,
          phone: details.formatted_phone_number,        // ← This is the key field
          website: details.website,                     // ← Very important
          source: 'Google Places'
        });
      } catch (detailErr) {
        console.log(`Detail fetch failed for ${place.name}`);
      }
    }

    console.log(`Found ${leads.length} businesses from Google`);
    return leads;

  } catch (error) {
    console.error('Google Places error:', error.response?.data || error.message);
    return [];
  }
};