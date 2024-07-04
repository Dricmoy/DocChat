import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { Platform } from 'react-native';

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
const db = getFirestore(app);
const auth = getAuth(app);

// Set development mode
const __DEV__ = process.env.NODE_ENV !== 'production';

// Connect to Firestore emulator if in development mode
if (__DEV__) {
  if (Platform.OS=='web') {
    // Running on web
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099');
  } else {
    // Running on Android
    connectFirestoreEmulator(db, '10.0.2.2', 8080);
    connectAuthEmulator(auth, 'http://10.0.2.2:9099');
  }
}

export { db, auth };

