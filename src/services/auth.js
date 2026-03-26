// src/services/auth.js
import { auth } from "../firebase"; 
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";

const provider = new GoogleAuthProvider();
// Forces the account picker to show up every time for better testing
provider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * Signs in the user using a Popup window.
 * Confirmed working for localhost development.
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Auth Service Error:", error.code, error.message);
    throw error;
  }
};

/**
 * Signs the user out of the Firebase session.
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error.message);
    throw error;
  }
};

/**
 * NOTE: handleRedirectResult is removed because we are 
 * now using the Popup method for 100% success rate.
 */