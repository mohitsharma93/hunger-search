import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, StatusBar } from 'react-native'

import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { RestaurantList } from '../../restaurants/components/restaurant-list.styles';
import { RestaurantInfoCard } from '../../restaurants/components/restaurant-info-card';

import { FavouritesContext } from "../../../services/favourites/favourites.context";


const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  return (
    favourites.length ? (
      <SafeArea>
        <RestaurantList
          data={favourites}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity 
                  onPress={() => navigation.navigate('RestaurantDetail', {
                    restaurant: item
                  })}
                >
                  <Spacer key={item.name} position="bottom" size="medium">
                    <RestaurantInfoCard restaurant={item}/>
                  </Spacer>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item) => item.name}
          />
      </SafeArea>
    ) : (
      <NoFavouritesArea>
        <Text center >
          No favourites yet.
        </Text>
      </NoFavouritesArea>
    )
  )
}