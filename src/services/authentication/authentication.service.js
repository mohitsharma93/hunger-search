import * as firebase from 'firebase'

export const loginRequest = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
}

export const registerRequest = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
}

export const logOutRequest = () => firebase.auth().signOut();