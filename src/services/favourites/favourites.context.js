import React, { useEffect, useState, createContext, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthenticationContext } from '../../services/authentication/authentication.context'

export const FavouritesContext = createContext();

export const  FavouritesContextProvider = ({ children }) => {

  const { user, uid } = useContext(AuthenticationContext)
  const [favourites, setFavourites] = useState([]);
  const [storeAsyncError, setStoreAsyncError] = useState(null);
  const [loadAsyncError, setLoadAsyncError] = useState(null);

  const add = (restaurant) => {
    setFavourites([...favourites, restaurant]);
  }

  const remove = (restaurant) => {
    const newFavourites = favourites.filter(x => x.placeId !== restaurant.placeId);
    setFavourites(newFavourites);
  }

  const saveFavourites = async (value) => {
    try{
      await AsyncStorage.setItem(`@favourites-${uid}`, JSON.stringify(value));
    } catch (e) {
      setStoreAsyncError(e);
    }
  }

  const loadFavourites = async () => {
    try{
      const getFavourites = await AsyncStorage.getItem(`@favourites-${uid}`);
      if (getFavourites !== null) {
        setFavourites(JSON.parse(getFavourites));
      }
    } catch (e) {
      setLoadAsyncError(e);
    }
  }

  useEffect(() => {
    if (user) {
      loadFavourites();
    }
  }, [user])

  useEffect(() => {
    if (user) {
      saveFavourites(favourites);
    }
  }, [favourites, user])

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeToFavourites: remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  )
}