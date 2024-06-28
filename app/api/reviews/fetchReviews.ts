 'use server'
export async function fetchGooglePlaceDetails() {
    const response = await fetch(
      'https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJXYZEAf83jgcRHMY4h6xq8A4&fields=name,rating,formatted_phone_number,reviews&key=AIzaSyDwKx524gZrGxIsGj9DQl9ZAiDx7rxFvtg'
    );

  

     const data = await response.json();
      
    return data.result;
  }
  