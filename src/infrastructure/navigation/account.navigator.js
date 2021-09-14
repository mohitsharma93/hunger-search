import React from 'react'
import { Text } from 'react-native';

import { createStackNavigator }  from '@react-navigation/stack';
import { AccountScreen } from '../../features/account/screens/account.screen'
import { LoginScreen } from '../../features/account/screens/login.screen'
import { RegisterScreen } from '../../features/account/screens/register.screen'

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false
}
export const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
    >
      <Stack.Screen  
        name='Main'
        component={AccountScreen}
      />
      <Stack.Screen  
        name='Login'
        component={LoginScreen}
      />
      <Stack.Screen  
        name='Register'
        component={RegisterScreen}
      />
    </Stack.Navigator>
  )
}
