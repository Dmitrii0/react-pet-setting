// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7MAPVPDPqWdSpRAnVlTPhafFixS5hyO8",
  authDomain: "we-pet-care.firebaseapp.com",
  projectId: "we-pet-care",
  storageBucket: "we-pet-care.firebasestorage.app",
  messagingSenderId: "336461793459",
  appId: "1:336461793459:web:e1242e1d2381bc152788c6",
  measurementId: "G-CKPC7X96KF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics
export const analytics = getAnalytics(app);

export default app;
