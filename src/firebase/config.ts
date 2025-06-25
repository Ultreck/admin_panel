import { initializeApp } from "firebase/app";
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCvydMWRc8ACtYWHmhrMu2emvr9EmmZZhA",
  authDomain: "adming-panel-c0d51.firebaseapp.com",
  projectId: "adming-panel-c0d51",
  storageBucket: "adming-panel-c0d51.firebasestorage.app",
  messagingSenderId: "1087891109119",
  appId: "1:1087891109119:web:6d235e37283fea88e788ca",
  measurementId: "G-YN0EE2BK7N"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Auth and Provider
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();


export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    window.location.href = "/dashboard";
    console.log("✅ Logged in user:", user);
} catch (error) {
    console.error("❌ Google sign-in failed:", error);
}
};

export const logout = async () => {
  try {
      await signOut(auth);
      console.log("✅ Logged out successfully");
      window.location.href = "/";
  } catch (error) {
    console.error("❌ Logout error", error);
  }
};
