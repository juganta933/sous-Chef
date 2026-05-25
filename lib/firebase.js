import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOWRsD_AVfrWoD6jKyivamtZ_2GddE2Jc",
  authDomain: "sous-chef-f4c7e.firebaseapp.com",
  projectId: "sous-chef-f4c7e",
  storageBucket: "sous-chef-f4c7e.firebasestorage.app",
  messagingSenderId: "499130807788",
  appId: "1:499130807788:web:dc198603d6580190847cc9",
  measurementId: "G-P26TDF3JC7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);