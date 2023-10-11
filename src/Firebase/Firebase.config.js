// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg-NiiJnSujBaqrvGcj-euo2aHJbjW9D8",
  authDomain: "user-email-pass-auth-7be8e.firebaseapp.com",
  projectId: "user-email-pass-auth-7be8e",
  storageBucket: "user-email-pass-auth-7be8e.appspot.com",
  messagingSenderId: "784591078604",
  appId: "1:784591078604:web:0634c0f275479b70b02e69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;