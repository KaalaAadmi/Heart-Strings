// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnvr4FKMLbsIU5Xjs6HPuzKIZvWWlMask",
  authDomain: "heart-strings-b0e74.firebaseapp.com",
  projectId: "heart-strings-b0e74",
  storageBucket: "heart-strings-b0e74.appspot.com",
  messagingSenderId: "607072329948",
  appId: "1:607072329948:web:49ed0f2cdd4e3f9b8fd419",
  measurementId: "G-GG7R3KGVD3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}