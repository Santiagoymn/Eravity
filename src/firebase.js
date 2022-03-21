import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAaW0xhhCE1aaOSlaA9iKebljVr_yDI8Q8",
    authDomain: "eravity-60abe.firebaseapp.com",
    projectId: "eravity-60abe",
    storageBucket: "eravity-60abe.appspot.com",
    messagingSenderId: "519270175492",
    appId: "1:519270175492:web:626459026e69b21eaaf651",
    measurementId: "G-DS75B5R87X"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  export { db, auth };