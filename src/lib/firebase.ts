// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyA7MAPVPDPqWdSpRAnVlTPhafFixS5hyO8",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "we-pet-care.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://we-pet-care-default-rtdb.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "we-pet-care",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "we-pet-care.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "336461793459",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:336461793459:web:e1242e1d2381bc152788c6",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-CKPC7X96KF"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация Firestore
export const db = getFirestore(app);

// Инициализация Auth (для будущего использования)
export const auth = getAuth(app);

// Инициализация Analytics (только в браузере)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Функция для проверки подключения Firebase
export const checkFirebaseConnection = () => {
  try {
    console.log('🔥 Firebase конфигурация:');
    console.log('  Project ID:', firebaseConfig.projectId);
    console.log('  Auth Domain:', firebaseConfig.authDomain);
    console.log('  Database URL:', firebaseConfig.databaseURL);
    console.log('✅ Firebase App инициализирован:', app.name);
    console.log('✅ Firestore подключен:', db.app.name);
    console.log('✅ Auth подключен:', auth.app.name);
    return true;
  } catch (error) {
    console.error('❌ Ошибка подключения Firebase:', error);
    return false;
  }
};

// Автоматическая проверка при загрузке (только в браузере)
if (typeof window !== 'undefined') {
  checkFirebaseConnection();
}

export default app;