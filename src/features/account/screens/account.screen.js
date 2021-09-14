import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
// import { Button } from 'react-native-paper';

import { AccountBackground, AccountCover, AccountContainer, AuthButton, Title, AnimationWrapper } from '../components/account.styles';
import { Spacer } from '../../../components/spacer/spacer.component'
import hunger from '../../../../assets/hunger-scrolling.gif';

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <Image 
          source={hunger}
        />
      </AnimationWrapper>
      <Title>Hunger Search</Title>
      <AccountContainer>
        <AuthButton
          icon='login'
          mode='contained'
          color=''
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </AuthButton>
        <Spacer position='top' size='large'>
          <AuthButton
            icon='lock-open-outline'
            mode='contained'
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  )
}
