// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-xuqJuBjNQpnieD41HNIK5u0qjyslN60",
  authDomain: "brorzdb.firebaseapp.com",
  databaseURL: "https://brorzdb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "brorzdb",
  storageBucket: "brorzdb.appspot.com",
  messagingSenderId: "153296976078",
  appId: "1:153296976078:web:a45ca237c15fa06971b89f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);