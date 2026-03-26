import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
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

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize & Export Services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Setup Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account' 
});

/**
 * Signs in the user using a Popup window.
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("🔥 RoadReady Auth: Success", result.user.email);
    return result.user;
  } catch (error) {
    console.error("❌ Auth Error:", error.code);
    throw error;
  }
};

/**
 * Signs out the current user.
 */
export const logout = () => signOut(auth);

// --- CLOUD SYNC FUNCTIONS ---

/**
 * Saves user progress to Firestore
 */
export const saveUserProgress = async (userId, data) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, data, { merge: true });
    console.log("☁️ Progress Synced to Cloud");
  } catch (error) {
    console.error("❌ Cloud Sync Error:", error);
  }
};

/**
 * Retrieves user progress from Firestore
 */
export const getUserProgress = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    }
  } catch (error) {
    console.error("❌ Cloud Retrieval Error:", error);
  }
  return null;
};

export { onAuthStateChanged };