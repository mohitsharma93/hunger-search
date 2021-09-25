const { mocks, addMockImage } = require('./mock');
const url = require('url');
const { Client } = require("@googlemaps/google-maps-services-js");
const functions = require('firebase-functions');

const client = new Client({});

module.exports.placesRequest = (request, response) => {

  const { location, mock } = url.parse(request.url, true).query;
  if (mock === 'true') {
    const data = mocks[location];
    if (data) {
      data.request = data.results.map(addMockImage);
    }
    return response.send(data);
  }
  
  client.placesNearby({
    params:{
      location: location,
      radius: 1500,
      type: 'restaurant',
      key: functions.config().google.key
    },
    timeout: 1000,
  }).then(res => {
    // The return data from google has object photos which not return photo url, which returns
    // detail to get photos, so we put mock photos.
    // res.data.results = res.data.results.map(addMockImage)
    res.data.results = res.data.results.map(addGoogleImage)
    return response.json('res.data', res.data);
  }).catch(err => {
    response.status(400);
    return response.json(err.response.data.error_message);
  })
}

const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos[0]?.photo_reference;
  if (!ref) {
    return addMockImage(restaurant);
  }
  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key${functions.config().google.key}`
  ]
  return restaurant;
}