import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../spacer/spacer.component';

import { CompactRestaurantInfo } from '../../components/restaurant/compact-restaurant-info.component';
import { Text } from '../../components/typography/text.component';

const FavouritesWrapper = styled.View`
  padding: 10px;
`;
const NoFavouritesWrapper = styled.Text`
  padding: 10px;
  align-items: center;
  color: red;
`;

export const FavouritesBar = ({ favourites, onNavigate }) => {

  return (
    <FavouritesWrapper>
      {
        favourites?.length ?
          <>
            <Spacer position="left" size="medium">
              <Text variant="caption">Favourites</Text>
            </Spacer>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {
                favourites.map((restaurant) => {
                  const key = restaurant.name.split(' ').join('');
                  return (
                    <Spacer key={`${key}-${restaurant.placeId}`} position="left" size="medium">
                      <TouchableOpacity onPress={() =>
                        onNavigate('RestaurantDetail', {
                          restaurant: restaurant,
                        })
                      }>
                        <CompactRestaurantInfo restaurant={restaurant} isMap={false}/>
                      </TouchableOpacity>
                    </Spacer>
                  )
                })
              }
            </ScrollView>
          </> :
          <Spacer position="left" size="medium">
            <Text variant='hint'>
                Write now no favourites restaurants.
            </Text>
          </Spacer>
      }
    </FavouritesWrapper>
  )
}
