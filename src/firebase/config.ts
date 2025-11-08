// Import the functions you need from the SDKs you need
import { initializeApp,getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgGRi91JQU2iDocbVB7UPbL9Y0e0C4LBM",
  authDomain: "aila-steam.firebaseapp.com",
  projectId: "aila-steam",
  storageBucket: "aila-steam.firebasestorage.app",
  messagingSenderId: "350786662195",
  appId: "1:350786662195:web:1fbe6b4a1bb996fca51846"
};

// Initialize Firebase
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export const db = getFirestore(app);

