// 1. Import 'db' from your local file
import { db } from './firebase'; 

// 2. Import tools from the official SDK
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// Note: Ensure the import path to './firebase' is correct relative to this file. 
// If both are in 'utils', use './firebase'. If firebase is in 'src', use '../firebase'.

// 👇 THIS LINE MUST SAY "export const", NOT "export default"
export const publishReport = async (reportData) => {
  try {
    const payload = {
      ...reportData,
      createdAt: serverTimestamp(),
      verified: true,
      appVersion: "1.0.0"
    };

    const docRef = await addDoc(collection(db, "reports"), payload);

    // Assumes your app is verified at /verify/ID
    const verificationUrl = `${window.location.origin}/verify/${docRef.id}`;

    return verificationUrl;
  } catch (error) {
    console.error("Error publishing report:", error);
    return null;
  }
};