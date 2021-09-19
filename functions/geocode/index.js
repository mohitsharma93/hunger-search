const { locations: locationsMock } = require('./geocode.mock')
const url = require('url');
const { Client } = require("@googlemaps/google-maps-services-js");
const functions = require('firebase-functions');

const client = new Client({});

module.exports.geocodeRequest = (request, response) => {
  const { city, mock } = url.parse(request.url, true).query;
  
  if (mock === 'true') {
    const locationMock = locationsMock[city.toLowerCase()];
    return response.json(locationMock);
  }

  client
    .geocode({
      params: {
        address: city,
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      return response.json(res.data)
    })
    .catch((err) => {
      response.status(400)
      return response.send('error: ' + err.response.data.error_message)
    })
}