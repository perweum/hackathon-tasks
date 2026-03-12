import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSG4P6irGpqnR2jUC8dZmlNceGuKqcOW0",
  authDomain: "fridgaton.firebaseapp.com",
  projectId: "fridgaton",
  storageBucket: "fridgaton.firebasestorage.app",
  messagingSenderId: "903114220683",
  appId: "1:903114220683:web:38edca5ecc5d031457a08e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
