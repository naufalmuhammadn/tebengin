import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbYYMEwMLzqtYyHv1cuegqRQj7S2EckfE",
  authDomain: "tebengin-mobile-app.firebaseapp.com",
  databaseURL: "https://tebengin-mobile-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tebengin-mobile-app",
  storageBucket: "tebengin-mobile-app.appspot.com",
  messagingSenderId: "239458108126",
  appId: "1:239458108126:web:1d99bc42514fde000eb84f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// const auth = getAuth(app);

export { app, db, auth };