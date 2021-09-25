import React, { useEffect, useState, useContext } from 'react';

import { SafeArea } from '../../../components/utility/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import { CartIconContainer, CartIcon  } from '../components/checkout.styles';
import { colors } from '../../../infrastructure/theme/colors';

export const CheckoutScreenError = ({ route }) => {
  console.log('route', route)
  const { error } = route.params;
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon='check-bold' bg={colors.ui.error}/>
        <Text variant='label'>{error}</Text>
      </CartIconContainer>
    </SafeArea>
  )
}