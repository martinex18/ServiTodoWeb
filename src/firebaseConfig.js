import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDRPleWsJRr2xCl-ioo6dQcf2CuCedKRMQ",
  authDomain: "servitodo-47422.firebaseapp.com",
  projectId: "servitodo-47422",
  storageBucket: "servitodo-47422.firebasestorage.app",
  messagingSenderId: "373904156165",
  appId: "1:373904156165:web:7d1f0111d5df5cd0321e6c",
  measurementId: "G-69HSRMQ852",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
