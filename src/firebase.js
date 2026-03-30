import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithRedirect, // Changed to Redirect
  getRedirectResult,   // Added to catch the result
  signOut,
  onAuthStateChanged 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCih-bFwaWmWYqOoBZ8HtqAHXIlb0ZUAoc",
  authDomain: "roadready-c0d1a.firebaseapp.com",
  projectId: "roadready-c0d1a",
  storageBucket: "roadready-c0d1a.firebasestorage.app",
  messagingSenderId: "270653807978",
  appId: "1:270653807978:web:ef3b939d91380a21b85913",
  measurementId: "G-R841G4PNNW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account' 
});

/**
 * Mobile-friendly Redirect Login
 */
export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("❌ Auth Error:", error.code);
    throw error;
  }
};

/**
 * Checks if the user just returned from a Google Login
 */
export const checkRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("🔥 RoadReady Auth: Success", result.user.email);
      return result.user;
    }
  } catch (error) {
    console.error("❌ Redirect Result Error:", error);
  }
  return null;
};

export const logout = () => signOut(auth);

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