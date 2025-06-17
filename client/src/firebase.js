// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b4e47.firebaseapp.com",
  projectId: "mern-estate-b4e47",
  storageBucket: "mern-estate-b4e47.firebasestorage.app",
  messagingSenderId: "887791614894",
  appId: "1:887791614894:web:c611fb5f757605c774663f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);