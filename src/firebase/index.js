import firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

// Replace this with your Firebase SDK config snippet
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUSY7bU0tB8cxxnMo020-pVcgZT3ygw7k",
  authDomain: "esssproj.firebaseapp.com",
  projectId: "esssproj",
  storageBucket: "esssproj.appspot.com",
  messagingSenderId: "560492761933",
  appId: "1:560492761933:web:b388a56210f7d2ade4dd04",
  measurementId: "G-TC74PBG26W"
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.firestore;

export { db, auth, storage };
