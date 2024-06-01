// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKerMjM5-BKovvtav_uQYFbG8WAG9-xRg",
  authDomain: "shavvy-academy.firebaseapp.com",
  projectId: "shavvy-academy",
  storageBucket: "shavvy-academy.appspot.com",
  messagingSenderId: "988800548805",
  appId: "1:988800548805:web:9726c8ff6afa799321d5ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;