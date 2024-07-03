import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBdYhk8C-7QkmpSNQS937vExi-D_imgj0o",
    authDomain: "doctorchatapp-edf3b.firebaseapp.com",
    projectId: "doctorchatapp-edf3b",
    storageBucket: "doctorchatapp-edf3b.appspot.com",
    messagingSenderId: "336443264479",
    appId: "1:336443264479:web:d8ee0ac4189903b045886a",
    measurementId: "G-V8ESVTBEK4"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Connect to Firestore emulator if in development mode
if (__DEV__) {
  console.log('Running in development mode');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export { db };