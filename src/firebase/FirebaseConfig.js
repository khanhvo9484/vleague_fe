// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBh3kCIkeCfG5NKWbwKf12U6LaVqSJgoH8",
  authDomain: "myleague-c54ab.firebaseapp.com",
  projectId: "myleague-c54ab",
  storageBucket: "myleague-c54ab.appspot.com",
  messagingSenderId: "724743329595",
  appId: "1:724743329595:web:e549709092413ffe59c91e",
  measurementId: "G-P7BX44HFV7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
