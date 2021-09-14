import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import { ThemeProvider } from 'styled-components/native'

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald'
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato'

import { theme } from './src/infrastructure/theme'
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context'
import firebase from 'firebase'
import { Navigation } from './src/infrastructure/navigation'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authenticationError, setAuthenticationError] = useState(null)

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  })
  const [latoLoaded] = useLato({
    Lato_400Regular,
  })

  return oswaldLoaded && latoLoaded ? (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  ) : (
    <Text>loading...</Text>
  )
}
