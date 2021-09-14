import React from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native'
// on click of icon on map to show image on android we 
// use webview bcz image on map is not render properly in map callout
import WebView from 'react-native-webview';

import { Text } from '../typography/text.component';

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;
const CompactWebView = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid = Platform.OS === 'android';

export const CompactRestaurantInfo = ({ restaurant, isMap }) => {
  const Image = isAndroid && isMap ? CompactWebView : CompactImage;
  return (
    <Item>
      <Image
        source={{ uri: restaurant.photos[0] }}
      />
      <Text  variant='caption' numberOfLines={3}>
        {restaurant.name}
      </Text>
    </Item>
  )
}
