// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt0OM4BjPrzs9Nzg1FBgrQrwbQgjRRcZk",
  authDomain: "react-assignment-2-fa38f.firebaseapp.com",
  databaseURL: "https://react-assignment-2-fa38f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-assignment-2-fa38f",
  storageBucket: "react-assignment-2-fa38f.appspot.com",
  messagingSenderId: "567105089363",
  appId: "1:567105089363:web:74f9cf94d044fcb437bba6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app