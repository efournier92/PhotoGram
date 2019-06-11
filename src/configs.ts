import { firebase, firebaseui } from 'firebaseui-angular';

export const FireConfig = {
  apiKey: "AIzaSyBRM81GkbYLAG_ZHrkXVHMk4EiSso9uVOU",
  databaseURL: "https://photogram-a599b.firebaseio.com/",
  projectId: "photogram-a599b",
  storageBucket: "photogram-a599b.appspot.com",
};

export const FireAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    }
  ]
};
