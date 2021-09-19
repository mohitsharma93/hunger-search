import React, { useState, createContext } from 'react';
import * as firebase from 'firebase';

import { loginRequest, registerRequest, logOutRequest } from './authentication.service'

export const AuthenticationContext = createContext();


export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUser(user);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  })

  const onLogin = (email, password) => {
    console.log(email, password);
    setIsLoading(true);
    loginRequest(email, password).then(u => {
      setUser(u);
      setIsLoading(false);
      setError(null);
      console.log('authenticationContextProvider', u)
    }).catch(err => {
      console.log(err.toString());
      setIsLoading(false);
      setError(err.toString());
    })
  }

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError('Error: Password do not match')
    }
    setIsLoading(true);
    registerRequest(email, password).then(u => {
      setUser(u);
      setIsLoading(false);
      setError(null);
    }).catch(err => {
      setIsLoading(false);
      setError(err.toString());
    })
  }

  const onLogout = () => {
    setUser(null);
    logOutRequest();
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}