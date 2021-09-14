import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Camera } from 'expo-camera';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Spacer } from '../../../components/spacer/spacer.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;
export const CameraScreen = ({ navigation }) => {

  const { user } = useContext(AuthenticationContext);
  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);

  const snap = async () => {
    if (ref) {
      const photo = await ref.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ProfileCamera
      ref={(camera)=> (ref.current = camera)}
      type={type}
      ratio={"16:9"}
    >
      <TouchableOpacity
        onPress={snap}
      >
        <Spacer position='top' size='large'>
          <Button icon='camera' color='white' mode="outlined" />
        </Spacer>
      </TouchableOpacity>
    </ProfileCamera>
  )
}