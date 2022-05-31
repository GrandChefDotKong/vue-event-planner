import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB5LfQ-jF4nT4HZYX7GFkw0IsTXxTzEH6c",
  authDomain: "vue-terminal-13cdb.firebaseapp.com",
  projectId: "vue-terminal-13cdb",
  storageBucket: "vue-terminal-13cdb.appspot.com",
  messagingSenderId: "543562584593",
  appId: "1:543562584593:web:a3a6c2bdd0ae7c255c97b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectAuth = getAuth(app);

export { projectAuth };