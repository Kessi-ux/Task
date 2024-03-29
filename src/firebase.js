// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx5HF1eKruYVQqX0qULuvIO0TUBMWjR40",
  authDomain: "mfeyti.firebaseapp.com",
  projectId: "mfeyti",
  storageBucket: "mfeyti.appspot.com",
  messagingSenderId: "179118992770",
  appId: "1:179118992770:web:875b473110262ea50a339b",
  measurementId: "G-F70KVNX6E3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);