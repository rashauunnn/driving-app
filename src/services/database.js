import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

/**
 * Saves a student's evaluation result to Firestore
 * @param {string} userId - The unique ID from Firebase Auth
 * @param {string} name - The student's full name
 * @param {number} score - The percentage score (0-100)
 */
export const saveEvaluation = async (userId, name, score) => {
  console.log("Button clicked! Attempting to connect to Firebase..."); // ADD THIS
  try {
    const docRef = doc(db, "evaluations", userId);
    await setDoc(docRef, {
      studentName: name,
      finalScore: score,
      status: score >= 75 ? "Passed" : "Failed",
      rank: score >= 90 ? "Master Operator" : "Operator",
      completedAt: serverTimestamp(),
    });
    console.log("Success! Data is in the cloud."); // ADD THIS
  } catch (error) {
    console.error("Firebase Error Details:", error); // ADD THIS
  }
};
