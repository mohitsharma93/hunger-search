import React, { useState, useContext } from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { AccountBackground, AccountCover, AccountContainer, AuthButton, AuthInput, ErrorContainer } from '../components/account.styles';
import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';



export const RegisterScreen = ({ navigation }) => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatedPassword, setRepeatedPassword] = useState(null);

  const { onRegister, error, isLoading } = useContext(AuthenticationContext)
  
  return (
    <AccountBackground>
      <AccountCover />
      <AccountContainer>
        <AuthInput
          label="E-mail"
          textContentType='emailAddress'
          keyboardType='email-address'
          autoCapitalize='none'
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Spacer position='top' size='large'>
          <AuthInput
            value={password}
            label="Password"
            textContentType='password'
            secureTextEntry
            autoCapitalize='none'
            onChangeText={text => setPassword(text)}
          />
        </Spacer>
        <Spacer position='top' size='large'>
          <AuthInput
            value={repeatedPassword}
            label="Repeat Password"
            textContentType='password'
            secureTextEntry
            autoCapitalize='none'
            onChangeText={text => setRepeatedPassword(text)}
          />
        </Spacer>
        {
          error && error.length && (
            <Spacer position='top' size='large'>
              <ErrorContainer>
                <Text>
                  {error}
                </Text>
              </ErrorContainer>
            </Spacer>
          )
        }
        <Spacer position='top' size='large'>
          {
            !isLoading ? (
              <AuthButton
                icon='email'
                mode='contained'
                onPress={() => onRegister(email, password, repeatedPassword)}
              >
                Register
              </AuthButton>
              ) : (
                <ActivityIndicator animating={true} color={Colors.blue300} />
              )
          }
        </Spacer>
      </AccountContainer>
      <Spacer position='top' size='large'>
        <AuthButton
          mode='contained'
          onPress={() => navigation.goBack()}
        >
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  )
}
