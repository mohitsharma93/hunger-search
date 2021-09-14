import { mocks, mockImages } from './mock';
import camelize from 'camelize';

export const restaurantTransform = ({ results = [] }) => {
  const newResult = results.map((restaurant, i) => {
    restaurant.photos = restaurant.photos.map(photo => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))]
    });

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
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject('Not Found');
    }
    resolve(mock);
  })
}