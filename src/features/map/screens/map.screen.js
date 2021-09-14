import React , { useEffect, useState, useContext } from 'react'
import {View, Text} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import styled from 'styled-components/native';

import { MapSearch } from '../components/map-search.component';
import { MapCallout } from '../components/map-callout.component';
import { LocationContext } from '../../../services/location/location.context';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0); 
  const { lat = 0, lng = 0, viewport } = location;

  useEffect(() => {
    // to get zoom level on map 
    const northEastLat = viewport.northeast.lat;
    const southWestLat = viewport.southwest.lat;

    const latDelta = northEastLat - southWestLat;
    setLatDelta(latDelta);
  }, [location, viewport])

  return (
    <>
      <MapSearch />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {
          restaurants.map((restaurant) => {
            return (
              <Marker
                key={restaurant.name}
                title={restaurant.name}
                coordinate={{
                  latitude: restaurant.geometry.location.lat,
                  longitude: restaurant.geometry.location.lng,
                }}
              >
                <Callout
                  onPress={() => navigation.navigate('RestaurantDetail', {restaurant})}
                >
                  <MapCallout restaurant={restaurant} />
                </Callout>
              </Marker>
            )
          })
        }
      </Map>
    </>
  )
}
