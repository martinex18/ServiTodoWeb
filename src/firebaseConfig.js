import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkeNsrJbx7VnLBGdP2PDAAw-h9SU2UdUU",
  authDomain: "servitodo-47422.firebaseapp.com",
  projectId: "servitodo-47422",
  storageBucket: "servitodo-47422.firebasestorage.app",
  messagingSenderId: "373904156165",
  appId: "1:373904156165:web:7d1f0111d5df5cd0321e6c",
  measurementId: "G-69HSRMQ852"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export const auth = getAuth(app);
export const messaging = getMessaging(app);