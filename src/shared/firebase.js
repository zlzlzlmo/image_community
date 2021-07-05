import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  // 인증정보!
  apiKey: "AIzaSyA8UJtYYjsOu-gb6fpV3uO1xRCkh6pjPWk",
  authDomain: "image-community-7800c.firebaseapp.com",
  projectId: "image-community-7800c",
  storageBucket: "image-community-7800c.appspot.com",
  messagingSenderId: "408171862630",
  appId: "1:408171862630:web:2825cc2a8b583bd71d6ba7",
  measurementId: "G-Y5FTQ4ZS9X",
};
firebase.initializeApp(firebaseConfig);
const apiKey = firebaseConfig.apiKey;

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, apiKey, firestore };
