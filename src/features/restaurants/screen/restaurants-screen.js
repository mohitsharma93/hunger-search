import React, { useState, useContext } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import styled from 'styled-components/native';

import { Search } from '../components/search.component';
import { RestaurantInfoCard } from '../components/restaurant-info-card'

import { FadeInView } from '../../../components/animations/fade.animation';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import { LocationContext } from '../../../services/location/location.context';
import { FavouritesBar } from '../../../components/favourites/favourites-bar.component';
import { RestaurantList } from '../components/restaurant-list.styles';


const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`

export const RestaurantsScreen = ({ navigation}) => {
  const { isLoading, restaurants, error: restaurantError } = useContext(RestaurantsContext);
  const { error: locationError } = useContext(LocationContext);
  const { favourites } = useContext(FavouritesContext)
  const [isToggled, setIsToggled] = useState(false);
  const hasError = !!restaurantError || !!locationError ;

  return (
    <SafeArea >
      <Search isFavouritesToggled={isToggled} onFavouritesToggle={() => setIsToggled(!isToggled)}/>
      {
        isToggled && <FavouritesBar favourites={favourites} onNavigate={navigation.navigate}/>
      }
      {
        (hasError) && (
          <Spacer position='left' size='large'>
            <Text variant='error'>
              Something went wrong retrieving the data.
            </Text>
          </Spacer>
        ) 
      }
      {!isLoading && !hasError ?
        <>
          <RestaurantList
            data={restaurants}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity 
                  onPress={() => navigation.navigate('RestaurantDetail', {
                    restaurant: item
                  })}
                >
                  <Spacer key={item.name} position="bottom" size="medium">
                    <FadeInView duration={1000}>
                      <RestaurantInfoCard restaurant={item}/>
                    </FadeInView>
                  </Spacer>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item) => item.name}
          />
        </> : 
          isLoading && (
            <LoadingContainer>
              <Loading
                size={50}
                animating={true}
                color={Colors.blue300}
              />
            </LoadingContainer>
          )
      }
    </SafeArea>
  )
}
