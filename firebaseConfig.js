
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBa1p5HBlPlh-HwYzPxcNELpb2Bm2EdkoY",
  authDomain: "tutorial-14f64.firebaseapp.com",
  projectId: "tutorial-14f64",
  storageBucket: "tutorial-14f64.firebasestorage.app",
  messagingSenderId: "371390990763",
  appId: "1:371390990763:web:dff6fbc7ac8821031b2aee",
  measurementId: "G-XXNFEMS3KW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };