// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjK36MF3rowUdmbd09nJf7V3-Rqb7-88g",
  authDomain: "prephelp-fa511.firebaseapp.com",
  projectId: "prephelp-fa511",
  storageBucket: "prephelp-fa511.appspot.com",
  messagingSenderId: "440036453710",
  appId: "1:440036453710:web:e250ac016e08fd45d1c21f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export { auth, db };
export default app;
