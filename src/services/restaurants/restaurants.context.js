import React, { useState, useContext, createContext, useEffect, useMemo } from 'react';

// import { restaurantsRequest, restaurantTransform } from './restaurants.service';
import { LocationContext } from '../location/location.context';
import { restaurantsRequest, restaurantTransform } from './restaurants.service';

export const RestaurantsContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { location } = useContext(LocationContext);

  const retrievRestaurants = (loc) => {
    setIsLoading(true);
    restaurantsRequest(loc).then(restaurantTransform).then(restaurants => {
      setError(null);
      setRestaurants(restaurants)
      setIsLoading(false);
    }).catch(error => {
      setError(error);
      setIsLoading(false);
      console.log('error restaurant context', error)
    });
  }
  useEffect(() => {console.log('location',location);
    if (location) {
      const locationString = `${location.lat},${location.lng}`
      retrievRestaurants(locationString)
    }
  }, [location])

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
}