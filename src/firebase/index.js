import firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

// Replace this with your Firebase SDK config snippet
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  // apiKey: "AIzaSyCUSY7bU0tB8cxxnMo020-pVcgZT3ygw7k",
  // authDomain: "esssproj.firebaseapp.com",
  // projectId: "esssproj",
  // storageBucket: "esssproj.appspot.com",
  // messagingSenderId: "560492761933",
  // appId: "1:560492761933:web:b388a56210f7d2ade4dd04",
  // measurementId: "G-TC74PBG26W"

  /*apiKey: "AIzaSyDJNrRiujlkTCM11XYLmoiFzDUCVbSWTvU",
  authDomain: "esss-d5970.firebaseapp.com",
  projectId: "esss-d5970",
  storageBucket: "esss-d5970.appspot.com",
  messagingSenderId: "960134604085",
  appId: "1:960134604085:web:121d9eb8d70cfd57b8987c",
  measurementId: "G-QCRLFXX167"*/

  /*apiKey: "AIzaSyAIqT-uDTArSld2mpE6NWsUq4EhpUay0YQ",
  authDomain: "esssproject.firebaseapp.com",
  projectId: "esssproject",
  storageBucket: "esssproject.appspot.com",
  messagingSenderId: "1030917353274",
  appId: "1:1030917353274:web:7336e3072b9dcd5c87ea03",
  measurementId: "G-L60P804LZ5"*/

  // apiKey: "AIzaSyAIqT-uDTArSld2mpE6NWsUq4EhpUay0YQ",
  // authDomain: "esssproject.firebaseapp.com",
  // projectId: "esssproject",
  // storageBucket: "esssproject.appspot.com",
  // messagingSenderId: "1030917353274",
  // appId: "1:1030917353274:web:7336e3072b9dcd5c87ea03",
  // measurementId: "G-L60P804LZ5"

  // apiKey: "AIzaSyAvXPqN3c1AS4NXSQcQQ8KJbk5jB55QVBs",
  // authDomain: "varsity-connect-94b98.firebaseapp.com",
  // projectId: "varsity-connect-94b98",
  // storageBucket: "varsity-connect-94b98.appspot.com",
  // messagingSenderId: "125175989653",
  // appId: "1:125175989653:web:cafbf73994c3d124ba229c",
  // measurementId: "G-VFHL44BZGE"

  apiKey: "AIzaSyD8PBBOv_3uAMB_cDCEoWGHTy5ski7Y-74",
  authDomain: "esss-project-88363.firebaseapp.com",
  databaseURL: "https://esss-project-88363-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esss-project-88363",
  storageBucket: "esss-project-88363.appspot.com",
  messagingSenderId: "829890238663",
  appId: "1:829890238663:web:45ed796cc67ae1a0c3c6e2",
  measurementId: "G-XDZJ5HSEDH"
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
