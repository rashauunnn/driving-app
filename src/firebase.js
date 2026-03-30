import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithCredential, 
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

const firebaseConfig = {
  apiKey: "AIzaSyCih-bFwaWmWYqOoBZ8HtqAHXIlb0ZUAoc",
  authDomain: "roadready-c0d1a.firebaseapp.com",
  projectId: "roadready-c0d1a",
  storageBucket: "roadready-c0d1a.firebasestorage.app",
  messagingSenderId: "270653807978",
  appId: "1:270653807978:web:ef3b939d91380a21b85913",
  measurementId: "G-R841G4PNNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

/**
 * 1. INITIALIZE NATIVE GOOGLE AUTH
 * This must match your Web Client ID from the Google Cloud Console.
 */
GoogleAuth.initialize({
  clientId: '270653807978-ef3b939d91380a21b85913.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true,
});

/**
 * 2. NATIVE SIGN IN FUNCTION
 * This replaces the Redirect/Popup method.
 */
export const signInWithGoogle = async () => {
  try {
    console.log("🚀 Starting Native Sign-In...");
    
    // Trigger the native Android account picker
    const googleUser = await GoogleAuth.signIn();
    console.log("📡 Google User received:", googleUser);
    
    // Create the credential for Firebase
    const credential = GoogleAuthProvider.credential(googleUser.authentication.idToken);
    
    // Sign into Firebase with the native credential
    const result = await signInWithCredential(auth, credential);
    console.log("✅ Firebase Auth Success:", result.user.displayName);
    
    return result.user;
  } catch (error) {
    console.error("❌ Native Auth Error:", error);
    // This will help you see why it's failing in the logs
    if (error.message) alert("Login Error: " + error.message);
  }
};

export const logout = async () => {
  await GoogleAuth.signOut(); // Signs out of Google
  return signOut(auth);       // Signs out of Firebase
};

// --- CLOUD SYNC FUNCTIONS ---
export const saveUserProgress = async (userId, data) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, data, { merge: true });
    console.log("☁️ Progress Synced to Cloud");
  } catch (error) {
    console.error("❌ Cloud Sync Error:", error);
  }
};

export const getUserProgress = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) return userSnap.data();
  } catch (error) {
    console.error("❌ Cloud Retrieval Error:", error);
  }
  return null;
};

export { onAuthStateChanged };