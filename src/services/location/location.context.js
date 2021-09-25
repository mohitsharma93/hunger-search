import React, { useEffect, useState, createContext } from 'react';

import { locationRequest, locationTransform } from './location.service';

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('san francisco');
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  }

  useEffect(() => {
    if (!keyword.length) return;
    locationRequest(keyword.toLowerCase()).then(locationTransform).then(res => {
      setError(null);
      setIsLoading(false);
      setLocation(res);
    }).catch(error => {
      setLocation(null);
      setIsLoading(false);
      setError(error);
    })
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}