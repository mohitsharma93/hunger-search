import { mocks, mockImages } from './mock';
import camelize from 'camelize';

import { host, isMock } from '../../utils/env';

export const restaurantTransform = ({ results = [] }) => {
  const newResult = results.map((restaurant, i) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isCloseTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    }
  })
  return camelize(newResult);
}


export const restaurantsRequest = (location) => {
  console.log('location in restaurant request', location)
  return fetch(`${host}placeNearby?location=${location}&mock=${isMock}`).then(res => {
    return res.json(res);
  })
}