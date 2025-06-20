import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b4e47.firebaseapp.com",
  projectId: "mern-estate-b4e47",
  storageBucket: "mern-estate-b4e47.appspot.com",
  messagingSenderId: "887791614894",
  appId: "1:887791614894:web:c611fb5f757605c774663f",
  databaseURL: "https://mern-estate-b4e47-default-rtdb.asia-southeast1.firebasedatabase.app",
};

export const app = initializeApp(firebaseConfig);