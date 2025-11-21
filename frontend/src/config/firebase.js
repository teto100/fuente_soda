import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDM4Go9KFO4XI8GTRB1B-4_ncgf_FbmVao",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mocksantonio.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mocksantonio",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mocksantonio.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "558729401686",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:558729401686:web:1567ff09d3d789c862b2f7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
