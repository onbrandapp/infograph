import { db } from './firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const publishReport = async (reportData) => {
  try {
    const payload = {
      ...reportData,
      createdAt: serverTimestamp(),
      verified: true,
      appVersion: "1.0.0"
    };

    const docRef = await addDoc(collection(db, "reports"), payload);

    // FIX: Forcefully remove trailing slash from origin to prevent "https://...//verify"
    const origin = window.location.origin.replace(/\/+$/, '');
    
    // Construct the clean URL
    const verificationUrl = `${origin}/verify/${docRef.id}`;

    return verificationUrl;
  } catch (error) {
    console.error("Error publishing report:", error);
    return null;
  }
};