import "@react-native-firebase/storage";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

// Configurar o Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCDmoGS0vnyJWmSfAnEHsglPnMfUmShHGw",
  authDomain: "stein-182fa.firebaseapp.com",
  databaseURL: "https://stein-182fa-default-rtdb.firebaseio.com",
  projectId: "stein-182fa",
  storageBucket: "stein-182fa.appspot.com",
  messagingSenderId: "348126047276",
  appId: "1:348126047276:web:f984bf93cd75e5251bf589",
  measurementId: "G-7F7X3HCMS3"
};


let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig )
} else {
    app = firebase.app()
}

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

