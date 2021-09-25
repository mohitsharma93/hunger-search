import React from 'react'
import { SvgXml } from 'react-native-svg'

import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { Favourite } from '../../../components/favourites/favourites.component';
import start from '../../../../assets/svg/star';
import open from '../../../../assets/svg/open';

import {
  RestaurantCard,
  RestaurantCardCover,
  Address,
  Info,
  Section,
  Rating,
  IsOpen,
  Icon,
} from './restaurant-info-card.styles'

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = 'Some Restaurant',
    icon = 'https://i.picsum.photos/id/28/700/700.jpg?hmac=TqbJuy_JuZo-5-GdCtr997XOmoa_pCGSJ02B1Gb44eA',
    photos = [
      'https://i.picsum.photos/id/28/700/700.jpg?hmac=TqbJuy_JuZo-5-GdCtr997XOmoa_pCGSJ02B1Gb44eA',
    ],
    address = '100 some random street',
    isOpenNow = true,
    rating = 4,
    isCloseTemporarily = true,
    placeId
  } = restaurant
  const ratingArray = Array.from(new Array(Math.floor(rating)))
  
  return (
    <RestaurantCard elevation={2}>
      <Favourite restaurant={restaurant} />
      <RestaurantCardCover source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((rating, i) => (
              <SvgXml  key={`star-${placeId}-${i}`} xml={start} width={20} height={20} />
            ))}
          </Rating>
          <IsOpen>
            {isCloseTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Icon
                style={{ width: 15, height: 15 }}
                source={{ uri: icon }}
              />
            </Spacer>
          </IsOpen>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  )
}
