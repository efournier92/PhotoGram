import { firebase, firebaseui } from 'firebaseui-angular';

export const FireConfig = {
  apiKey: "API_KEY",
  databaseURL: "https://PROJECT_ID.firebaseio.com/",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
};

export const FireAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [],
};
