// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE9870_X3bxLLySyEQivKm7LiuVB5Ehvo",
  authDomain: "slack-clone-5.firebaseapp.com",
  projectId: "slack-clone-5",
  storageBucket: "slack-clone-5.appspot.com",
  messagingSenderId: "383476838907",
  appId: "1:383476838907:web:b30521ebd83b70f8775b5e",
  measurementId: "G-80JFB6Q299",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const Authentication = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { db, Authentication, provider };
