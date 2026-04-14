// // services/placesService.js
// import axios from 'axios';

// export const searchGooglePlaces = async (category, city, area = '', country = 'Nigeria') => {
//   const query = `${category} in ${area} ${city} ${country}`.trim();

//   try {
//     // Step 1: Text Search to get place_ids
//     const searchRes = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
//       params: {
//         query,
//         key: process.env.GOOGLE_PLACES_API_KEY,
//       }
//     });

//     const results = searchRes.data.results || [];
//     const leads = [];

//     // Step 2: Get full details for each place (this is where phone & website usually appear)
//     for (const place of results) {
//       try {
//         const detailRes = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
//           params: {
//             place_id: place.place_id,
//             fields: 'name,formatted_address,formatted_phone_number,website,geometry,rating',
//             key: process.env.GOOGLE_PLACES_API_KEY,
//           }
//         });

//         const details = detailRes.data.result || {};

//         leads.push({
//           businessName: details.name || place.name,
//           address: details.formatted_address || place.formatted_address,
//           phone: details.formatted_phone_number,        // ← This is the key field
//           website: details.website,                     // ← Very important
//           source: 'Google Places'
//         });
//       } catch (detailErr) {
//         console.log(`Detail fetch failed for ${place.name}`);
//       }
//     }

//     console.log(`Found ${leads.length} businesses from Google`);
//     return leads;

//   } catch (error) {
//     console.error('Google Places error:', error.response?.data || error.message);
//     return [];
//   }
// };


// services/placesService.js

import axios from 'axios';

export const searchGooglePlaces = async (category, city, area = '', country = 'Cameroon') => {
  const query = `${category} in ${area} ${city} ${country}`.trim();
  let allLeads = [];
  let nextPageToken = null;
  let page = 1;

  try {
    do {
      const params = {
        query,
        key: process.env.GOOGLE_PLACES_API_KEY,
      };

      // If we have a nextPageToken, use only that (Google requirement)
      if (nextPageToken) {
        params.pagtoken = nextPageToken;   // Important: use "pagtoken" for legacy, or "page_token" in new API
      }

      const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params
      });

      const results = response.data.results || [];
      
      console.log(`📄 Page ${page}: Found ${results.length} businesses`);

      // Get full details (phone + website) for each place
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

          allLeads.push({
            businessName: details.name || place.name,
            address: details.formatted_address || place.formatted_address,
            phone: details.formatted_phone_number,
            website: details.website,
            source: 'Google Places'
          });
        } catch (detailErr) {
          console.log(`⚠️ Detail fetch failed for ${place.name}`);
        }
      }

      nextPageToken = response.data.next_page_token;
      page++;

      // Google requires a short delay before using next_page_token
      if (nextPageToken) {
        console.log(`⏳ Waiting 2 seconds before fetching next page...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

    } while (nextPageToken && page <= 3);   // Max 3 pages = 60 results

    console.log(`✅ Total businesses collected: ${allLeads.length}`);
    return allLeads;

  } catch (error) {
    console.error('Google Places error:', error.response?.data || error.message);
    return allLeads;   // Return whatever we got so far
  }
};