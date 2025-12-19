import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import SwissInfographic from '../components/SwissInfographic';
import { Loader2, ShieldCheck, ShieldAlert } from 'lucide-react';

const Verify = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        // 1. Point to the specific document in Firebase
        const docRef = doc(db, "reports", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          // 2. If found, save data to state
          setData(docSnap.data());
        } else {
          setError("Report not found in the official registry.");
        }
      } catch (err) {
        console.error(err);
        setError("System Error: Could not verify report authenticity.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-swiss-offwhite">
        <Loader2 className="animate-spin w-10 h-10 text-swiss-black" />
        <p className="font-mono text-xs uppercase tracking-widest">Verifying Blockchain Signature...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-swiss-offwhite text-center">
        <ShieldAlert className="w-16 h-16 text-swiss-red mb-4" />
        <h1 className="text-2xl font-black uppercase text-swiss-red mb-2">Verification Failed</h1>
        <p className="font-mono text-sm text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8 flex flex-col items-center">
      {/* The Verification Badge */}
      <div className="w-full max-w-4xl bg-green-100 border border-green-200 text-green-800 p-4 mb-8 flex items-center justify-center gap-2 rounded-lg">
         <ShieldCheck className="w-5 h-5" />
         <span className="font-mono text-xs font-bold uppercase tracking-widest">
           Official Verified Record • ID: {id.slice(0, 8)}...
         </span>
      </div>

      {/* The Actual Report */}
      <SwissInfographic data={data} />
    </div>
  );
};

export default Verify;