import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from './reducers/RootReducer'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore

import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore

const fbConfig = {
    apiKey: "AIzaSyBLN473x1cLai1y0iP_4frnOhbt_PJjFAc",
    authDomain: "react-blog-8fd0a.firebaseapp.com",
    databaseURL: "https://react-blog-8fd0a.firebaseio.com",
    projectId: "react-blog-8fd0a",
    storageBucket: "react-blog-8fd0a.appspot.com",
    messagingSenderId: "382657313393",
    appId: "1:382657313393:web:df9bf7bd33d68d838239d0"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

const store = createStore(RootReducer, composeWithDevTools());

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default store;
