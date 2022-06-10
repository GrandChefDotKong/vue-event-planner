import { initializeApp, getApps } from "firebase/app";
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB3rwHCSCk6BAM35N2gEuZ7rPG1ltcRKNI",
  authDomain: "vue-event-planner-d74c8.firebaseapp.com",
  projectId: "vue-event-planner-d74c8",
  storageBucket: "vue-event-planner-d74c8.appspot.com",
  messagingSenderId: "370568373374",
  appId: "1:370568373374:web:4500d37e31da0b15d2e42f"
};

// Initialize Firebase
const apps = getApps()
const app = !apps.length ? initializeApp(firebaseConfig) : apps[0];

const projectStore = getFirestore(app);
const projectAuth = getAuth(app);
const projectStorage = getStorage(app);

const timestamp = Timestamp;

export { projectStore, projectAuth, projectStorage, timestamp };