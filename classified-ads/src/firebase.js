
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAdehubLHtjAiElChMfnGBgOXJEmVy2KhU",
  authDomain: "urban-classified.firebaseapp.com",
  projectId: "urban-classified",
  storageBucket: "urban-classified.firebasestorage.app",
  messagingSenderId: "719052553537",
  appId: "1:719052553537:web:19e12e23444c34f10035c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);