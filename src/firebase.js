// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-backend-7e1b9.firebaseapp.com",
  projectId: "blog-backend-7e1b9",
  storageBucket: "blog-backend-7e1b9.appspot.com",
  messagingSenderId: "469786645890",
  appId: "1:469786645890:web:e8ee2df176c55527b92b9b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);