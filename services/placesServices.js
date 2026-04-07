import axios from 'axios';

export const searchGooglePlaces = async (category, city, area = '', country = 'Cameroon') => {
  const query = `${category} in ${area} ${city} ${country}`.trim();
  
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query,
        key: process.env.GOOGLE_PLACES_API_KEY,
        type: 'establishment'   // or specific types like 'beauty_salon'
      }
    });

    const results = response.data.results || [];

    return results.map(place => ({
      businessName: place.name,
      address: place.formatted_address,
      location: place.geometry?.location,
      placeId: place.place_id,
      website: place.website,           // sometimes available
      phone: place.formatted_phone_number,
      source: 'Google Places'
    }));
  } catch (error) {
    console.error('Google Places error:', error.response?.data || error.message);
    return [];
  }
};

// Foursquare (optional fallback)
export const searchFoursquare = async (category, city) => {
  // Implement similarly using https://api.foursquare.com/v3/places/search
  // Requires Foursquare API key
  return [];
};