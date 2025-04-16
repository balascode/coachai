import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA9_gcKt8YRihMIQADBK5lO6fnSOttWXFw",
    authDomain: "coach-ai-204df.firebaseapp.com",
    projectId: "coach-ai-204df",
    storageBucket: "coach-ai-204df.firebasestorage.app",
    messagingSenderId: "986856803639",
    appId: "1:986856803639:web:23072adfcf16828600deb2",
    measurementId: "G-XP9L7EHK4Y"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA9_gcKt8YRihMIQADBK5lO6fnSOttWXFw",
//   authDomain: "coach-ai-204df.firebaseapp.com",
//   projectId: "coach-ai-204df",
//   storageBucket: "coach-ai-204df.firebasestorage.app",
//   messagingSenderId: "986856803639",
//   appId: "1:986856803639:web:23072adfcf16828600deb2",
//   measurementId: "G-XP9L7EHK4Y"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);