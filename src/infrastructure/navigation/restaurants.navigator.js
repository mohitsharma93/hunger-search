import React  from "react";
import {View, Text } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { RestaurantsScreen } from '../../features/restaurants/screen/restaurants-screen';
import { RestaurantDetailScreen } from '../../features/restaurants/screen/restaurant-detail.screen';

const RestaurantStack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  ...TransitionPresets.ModalPresentationIOS
}

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={screenOptions}
    >
      <RestaurantStack.Screen
        name="Restaurant"
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  )
}