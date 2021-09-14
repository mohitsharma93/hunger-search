import React, { useEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { SettingsScreen } from '../../features/settings/screens/settings.screen';
import { FavouritesScreen } from '../../features/settings/screens/Favourites.screen';
import { CameraScreen } from '../../features/settings/screens/Camera.screen';

const SettingsStack = createStackNavigator();

const screenOptions = {
  cardStyleInterpolators: CardStyleInterpolators.forHorizontalIOS
}

export const SettingsNavigator = ({ route, navigation}) => {
  return (
    <SettingsStack.Navigator
      screenOptions={screenOptions}
    >
      <SettingsStack.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          header: () => null
        }}
      />
      <SettingsStack.Screen  
        name='Favourites'
        component={FavouritesScreen}
      />
      <SettingsStack.Screen  
        name='Camera'
        component={CameraScreen}
      />
    </SettingsStack.Navigator>
  )
}
