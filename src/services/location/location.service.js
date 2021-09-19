import camelize from 'camelize';

import { locations } from './location.mock';
import { host, isMock } from '../../utils/env';

// use mock=true to get mock data.
export const locationRequest =  (searchTerm) => {
  return fetch(`${host}geocode?city=${searchTerm}&mock=${isMock}`).then(res => {
    return res.json();
  })
}

export const locationTransform= (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return {
    lat,
    lng,
    viewport: geometry.viewport,
  }
}