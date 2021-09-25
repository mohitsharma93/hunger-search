import React, { useEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';


import { CheckoutScreen } from '../../features/checkout/screen/checkout.screen';
import { CheckoutScreenSuccess } from '../../features/checkout/screen/checkout-success.screen';
import { CheckoutScreenError } from '../../features/checkout/screen/checkout-error.screen';

const CheckoutStack = createStackNavigator();

export const CheckoutNavigator = () => {
  return (
    <CheckoutStack.Navigator screenOptions={{headerShown: false}}>
      <CheckoutStack.Screen name='Checkout' component={CheckoutScreen}/>
      <CheckoutStack.Screen name='CheckoutSuccess' component={CheckoutScreenSuccess}/>
      <CheckoutStack.Screen name='CheckoutError' component={CheckoutScreenError}/>
    </CheckoutStack.Navigator>
  )
}