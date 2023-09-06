// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
/*import { getAnalytics } from "firebase/analytics";*/
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.JS_APP_FIREBASE_APIKEY,
  authDomain: process.env.JS_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.JS_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.JS_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.JS_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.JS_APP_FIREBASE_APPID,
  measurementId:process.env.JS_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
/*const analytics = getAnalytics(app);*/

export default db;