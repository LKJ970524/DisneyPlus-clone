// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPNEv6uOxDkZZp8AwPr46XY3Xyz4r3TKc",
  authDomain: "react-disney-plus-7bba2.firebaseapp.com",
  projectId: "react-disney-plus-7bba2",
  storageBucket: "react-disney-plus-7bba2.appspot.com",
  messagingSenderId: "92369778553",
  appId: "1:92369778553:web:964785f740e831ef1761a8"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase