import React, { useState, useContext } from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { AccountBackground, AccountCover, AccountContainer, AuthButton, AuthInput, ErrorContainer } from '../components/account.styles';
import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';


export const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { onLogin, error, isLoading } = useContext(AuthenticationContext)
  
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
        {
          error && error.length && (
            <Spacer position='top' size='large'>
              <ErrorContainer>
                <Text variant='error'>
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
                icon='lock-open-outline'
                mode='contained'
                onPress={() => onLogin(email, password)}
              >
                Login
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
