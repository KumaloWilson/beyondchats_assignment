import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAvgoRC1rPqGJ0Hz6YjB4ggoQ1uFhkH0Gg",
  authDomain: "beyond-chats-assignment.firebaseapp.com",
  projectId: "beyond-chats-assignment",
  storageBucket: "beyond-chats-assignment.firebasestorage.app",
  messagingSenderId: "982052720692",
  appId: "1:982052720692:web:50b1d739e4a1a7178aba61",
  measurementId: "G-XNVS9S3CZQ"
};

let auth: Auth

try {
  const app = initializeApp(firebaseConfig);

  auth = getAuth(app);

} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export { auth };

