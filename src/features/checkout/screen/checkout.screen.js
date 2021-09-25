import React, { useEffect, useState, useContext } from 'react';
import { ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';

import { SafeArea } from '../../../components/utility/safe-area.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { CreditCardInput } from '../components/credit-card.component';
import { CartContext } from '../../../services/cart/cart.context';
import { CartIconContainer, CartIcon, NameInput, PayButton, ClearButton, PaymentProcessing } from '../components/checkout.styles';
import { RestaurantInfoCard } from '../../restaurants/components/restaurant-info-card';
import { payRequest } from '../../../services/checkout/checkout.service';

export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, sum , clearCart} = useContext(CartContext);
  const [name, setName] = useState(null);
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPay = () => {
    setIsLoading(true)
    if (!card || !card.id) {
      setIsLoading(false);
      navigation.navigate('CheckoutError', {error: 'Please fill in a valid credit card'});
      return;
    }
    payRequest(
      card.id,
      sum,
      name
    ).then((res) => {
      setIsLoading(false);
      clearCart();
      navigation.navigate('CheckoutSuccess')
      setName(null);
    }).catch(err => {
      setIsLoading(false)
      navigation.navigate('CheckoutError', {error: err})
    });
  }
  return (
    <SafeArea>
      {
        (!cart || !restaurant) ? (
          <CartIconContainer>
            <CartIcon 
              icon='cart-off'
              bg='red'
            />
            <Text>Your cart is empty.</Text>
          </CartIconContainer>
        ) : (
          <>
            <RestaurantInfoCard restaurant={restaurant}/>
            {isLoading && <PaymentProcessing />}
            <ScrollView>
              <Spacer position='left' size='medium'>
                <Spacer position='top' size='large'> 
                  <Text> Your Order</Text>
                </Spacer>
                  <List.Section>
                    {
                      cart.map(({item, price}, index) => {
                        return (
                          <List.Item
                            title={`${item} - ${price / 100}`}
                            key={`item-${index}`}
                          />
                        )
                      })
                    }
                  </List.Section>
                  <Text>Sum : {sum / 100}</Text>
                  <Spacer position='top' size='large' /> 
                  <Divider />
              </Spacer>
              <NameInput
                label='name'
                value={name}
                onChangeText={(t) => {
                  if (t.length)
                    setName(t);
                  else 
                    setName(null);
                }}
              />
              <Spacer position='top' size='medium'>
                { 
                  name &&
                    <CreditCardInput
                      name={name}
                      onSuccess={setCard}
                      onError={() => {
                        navigation.navigate('CheckoutError', {
                          error: 'Something went wrong processing to card'
                        });
                      }}
                    />
                }
              </Spacer>
              <Spacer position='top' size='xxl'/> 
              <PayButton 
                icon='cash-usd'
                mode='contained'
                onPress={onPay}
                disabled={isLoading}
              >
                Pay
              </PayButton>

              <Spacer position='top' size='large'>
                <ClearButton 
                  icon='cart-off'
                  mode='contained'
                  onPress={clearCart}
                  disabled={isLoading}
                >
                  Clear Cart
                </ClearButton>
              </Spacer>

            </ScrollView>
          </>
        )
      }

    </SafeArea>
  )
}