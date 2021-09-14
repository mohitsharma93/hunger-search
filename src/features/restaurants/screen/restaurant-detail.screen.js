import React, {useState } from 'react';
import {ScrollView} from 'react-native';
import { List } from 'react-native-paper';
import styled from 'styled-components/native';

import { SafeArea } from '../../../components/utility/safe-area.component';
import { RestaurantInfoCard } from '../components/restaurant-info-card';

// const DetailWrapper = styled.View`
//   background: ${props => props.theme.colors.bg.primary}
// `;

const Accordion = styled(List.Accordion)`
  background-color: ${(props) => props.theme.colors.bg.secondary}
`;


export const RestaurantDetailScreen = ({ route }) => {
  const { restaurant }  = route.params;
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
          <List.Item title="Classic Breakfast" />
        </List.Accordion>

        <List.Accordion
          title="Lunch"
          left={props => <List.Icon {...props} icon="hamburger" />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <List.Item title="Burger w/Fries" />
          <List.Item title="Steak Sandwich" />
          <List.Item title="Mushroom Soup" />
        </List.Accordion>

        <List.Accordion
          title="Dinner"
          left={props => <List.Icon {...props} icon="food-variant" />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>

        <List.Accordion
          title="Drink"
          left={props => <List.Icon {...props} icon="cup" />}
          expanded={drinkExpanded}
          onPress={() => setDrinkExpanded(!drinkExpanded)}
        >
          <List.Item title="Coffee" />
          <List.Item title="Tea" />
          <List.Item title="Modelo" />
          <List.Item title="Coke" />
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  )
}
