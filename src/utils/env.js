const liveHost = '';
const localHost = 'http://localhost:5001/native-firebase-638cf/us-central1/';
export const isDevelopment = process.env.NODE_ENV === 'development'

export const host = isDevelopment ?  localHost : liveHost;
export const isMock = true;
