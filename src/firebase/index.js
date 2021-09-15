import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// Replace this with your Firebase SDK config snippet
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyAIqT-uDTArSld2mpE6NWsUq4EhpUay0YQ",
      authDomain: "esssproject.firebaseapp.com",
      projectId: "esssproject",
      storageBucket: "esssproject.appspot.com",
      messagingSenderId: "1030917353274",
      appId: "1:1030917353274:web:7336e3072b9dcd5c87ea03",
      measurementId: "G-L60P804LZ5"
    };
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const fire = firebase.database();

export { db, auth, fire };