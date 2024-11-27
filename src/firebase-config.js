// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLv8DgYQvKxkLtnFUeTTCgDzfMFhc-xNY",
  authDomain: "chat-53f8e.firebaseapp.com",
  projectId: "chat-53f8e",
  storageBucket: "chat-53f8e.firebasestorage.app",
  messagingSenderId: "359084401556",
  appId: "1:359084401556:web:3e5c902f1ef94f6aafa581",
  measurementId: "G-YB77QNWF2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();