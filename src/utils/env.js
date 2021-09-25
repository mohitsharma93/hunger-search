import { Platform } from "react-native";

// your firebase functions url.
const liveHost = '';
const localHost = 'http://localhost:5001/native-firebase-638cf/us-central1/';

export const isAndroid = Platform.OS === 'android';
export const isDevelopment = process.env.NODE_ENV === 'development'
// android not support http call, there must be a https to call anything.
export const host = !isDevelopment || isAndroid ?  liveHost : localHost;
export const isMock = true;

// it is a public key from stripe site.
export const stripeClientKey = ''
