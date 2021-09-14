import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RestaurantsNavigator } from './restaurants.navigator';
import { MapScreen } from '../../features/map/screens/map.screen';
import { SettingsNavigator } from './settings.navigator'
import { RestaurantContextProvider } from '../../services/restaurants/restaurants.context'
import { LocationContextProvider } from '../../services/location/location.context'
import { FavouritesContextProvider } from '../../services/favourites/favourites.context'

const TAB_ICON = {
  Restaurants: 'md-restaurant',
  Map: 'md-map',
  Setting: 'md-settings'
}



const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name]
  return {
    tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    headerShown: false
  }
}

const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantContextProvider>
      <Tab.Navigator
        screenOptions={screenOptions}
      >
        <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Setting" component={SettingsNavigator} />
      </Tab.Navigator>
      </RestaurantContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
)