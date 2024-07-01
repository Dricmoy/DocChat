// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdYhk8C-7QkmpSNQS937vExi-D_imgj0o",
  authDomain: "doctorchatapp-edf3b.firebaseapp.com",
  projectId: "doctorchatapp-edf3b",
  storageBucket: "doctorchatapp-edf3b.appspot.com",
  messagingSenderId: "336443264479",
  appId: "1:336443264479:web:d8ee0ac4189903b045886a",
  measurementId: "G-V8ESVTBEK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//var firebase = require('firebase');
//var firebaseui = require('firebaseui');

// Initialize the FirebaseUI Widget using Firebase.
//var ui = new firebaseui.auth.AuthUI(firebase.auth());