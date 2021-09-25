import React, {useState, useContext } from 'react';
import {ScrollView} from 'react-native';
import { List, Divider } from 'react-native-paper';
import styled from 'styled-components/native';

import { Spacer } from '../../../components/spacer/spacer.component';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { RestaurantInfoCard } from '../components/restaurant-info-card';
import { OrderButton } from '../components/restaurant-list.styles';
import { CartContext } from '../../../services/cart/cart.context'

const Accordion = styled(List.Accordion)`
  color: red;
`;
// background-color: ${(props) => props.theme.colors.bg.secondary}
export const RestaurantDetailScreen = ({ route, navigation }) => {
  const { restaurant }  = route.params;
  const { addToCart } = useContext(CartContext);
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinkExpanded, setDrinkExpanded] = useState(false);

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant}/>
      <ScrollView>
        <List.Accordion
          title="Breakfast"
          left={props => <List.Icon {...props} icon="bread-slice" />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <List.Item title="Eggs Benedict" />
          <Divider />
          <List.Item title="Classic Breakfast" />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Lunch"
          left={props => <List.Icon {...props} icon="hamburger" />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <List.Item title="Burger w/Fries" />
          <Divider />
          <List.Item title="Steak Sandwich" />
          <Divider />
          <List.Item title="Mushroom Soup" />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Dinner"
          left={props => <List.Icon {...props} icon="food-variant" />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <List.Item title="First item" />
          <Divider />
          <List.Item title="Second item" />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Drink"
          left={props => <List.Icon {...props} icon="cup" />}
          expanded={drinkExpanded}
          onPress={() => setDrinkExpanded(!drinkExpanded)}
        >
          <List.Item title="Coffee" />
          <Divider />
          <List.Item title="Tea" />
          <Divider />
          <List.Item title="Modelo" />
          <Divider />
          <List.Item title="Coke" />
        </List.Accordion>
      </ScrollView>
      <Spacer position="bottom" size="large">
        <OrderButton
          icon="cash-usd"
          mode='contained'
          onPress={() => {
            addToCart({item: 'Special', price: 1299 }, restaurant)
            navigation.navigate('CheckoutNavigator')
          }}
        >
          Order special only 12.99.
        </OrderButton>
      </Spacer>
    </SafeArea>
  )
}
