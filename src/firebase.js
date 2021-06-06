import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB67P6_zM8hwxeaEhdNhM4Tvt00NqtP_IE",
  authDomain: "todo-app-930ea.firebaseapp.com",
  projectId: "todo-app-930ea",
  storageBucket: "todo-app-930ea.appspot.com",
  messagingSenderId: "574692365716",
  appId: "1:574692365716:web:0cd51a8483e05ebb6dab81",
  measurementId: "G-DF2MVGWFLZ",
});

const db = firebaseApp.firestore();

export default db;
