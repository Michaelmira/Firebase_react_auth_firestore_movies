// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2sqJkRTFnpVJeBZqHH2ELTDqUQJzpnHE",
  authDomain: "deploy-firebase-1d57b.firebaseapp.com",
  projectId: "deploy-firebase-1d57b",
  storageBucket: "deploy-firebase-1d57b.firebasestorage.app",
  messagingSenderId: "436135247749",
  appId: "1:436135247749:web:ef6f04db02d667a4684eec",
  measurementId: "G-63V6S8Z5L8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);