import firebase from "firebase";
import "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDmoGS0vnyJWmSfAnEHsglPnMfUmShHGw",
  authDomain: "stein-182fa.firebaseapp.com",
  projectId: "stein-182fa",
  storageBucket: "stein-182fa.appspot.com",
  messagingSenderId: "348126047276",
  appId: "1:348126047276:web:f984bf93cd75e5251bf589",
  measurementId: "G-7F7X3HCMS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = firebase.firestore();
export default database;