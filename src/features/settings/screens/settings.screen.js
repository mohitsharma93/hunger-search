import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "../../../infrastructure/theme/colors";

const SettingItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]}
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);
  const [photoGetError, setPhotoGetError] = useState(null);

  const getProfilePicture = async () => {
    const photoUri = AsyncStorage.getItem(`${user.uid}-photo`);
    if (photoUri) {
      photoUri.then(res => {
        setPhoto(res)
      }).catch(err => {
        setPhotoGetError(err)
      })
    }
  }

  useFocusEffect(() => {
    getProfilePicture();
  })

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          { 
            !photo ?
              <Avatar.Icon size={180} backgroundColor={colors.brand.primary} icon='human'/>
              : <Avatar.Image size={180} backgroundColor='#2182BD' source={{ uri: photo }}/>
          }
          
        </TouchableOpacity>
        <Spacer position='top' size='large'>
          <Text variant='label'>
            {user.email}
          </Text>
        </Spacer>
      </AvatarContainer>

      <List.Section>
        <SettingItem
          style={{padding: 16}}
          title='Favourites'
          description='View your favorites'
          left={(props) => <List.Icon {...props} color='blue' icon='heart'/>}
          onPress={() => navigation.navigate('Favourites')}
        />
        <SettingItem
          style={{padding: 16}}
          title='Logout'
          left={(props) => <List.Icon {...props} color='blue' icon='logout'/>}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  )
}