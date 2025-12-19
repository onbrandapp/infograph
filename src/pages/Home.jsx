import React, { useState } from 'react';
import SwissInfographic from '../components/SwissInfographic';
import { generateInfographicData } from '../utils/gemini';
import { publishReport } from '../utils/publishReport';
import { Loader2, Sparkles } from 'lucide-react';

const Home = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      // 1. Get Data from Gemini
      const rawData = await generateInfographicData(topic);
      
      // 2. Publish to Firebase (to get the Verification URL)
      const verifyLink = await publishReport(rawData);

      // 3. Update the data with the real link
      const finalData = {
        ...rawData,
        content: {
          ...rawData.content,
          source_url: verifyLink || window.location.origin
        }
      };

      setData(finalData);
    } catch (err) {
      console.error(err);
      setError("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-12">
      
      {/* HERO SECTION (Input) */}
      <div className="w-full max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-swiss-black uppercase">
          InfoGraph <span className="text-swiss-blue">Pro</span>
        </h1>
        <p className="font-mono text-sm text-gray-500 uppercase tracking-widest">
          The Source of Truth Engine
        </p>

        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 mt-8">
          <input 
            type="text" 
            placeholder="Enter a topic (e.g. 'Future of Quantum Computing')"
            className="flex-1 p-4 border-4 border-swiss-black font-sans text-lg focus:outline-none focus:border-swiss-blue transition-colors"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-swiss-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-swiss-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            Generate
          </button>
        </form>

        {error && (
          <div className="p-4 border-2 border-swiss-red bg-red-50 text-swiss-red font-bold text-sm uppercase">
            {error}
          </div>
        )}
      </div>

      {/* RESULT SECTION */}
      {data && (
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 w-full flex justify-center pb-20">
          <SwissInfographic data={data} />
        </div>
      )}

    </div>
  );
};

export default Home;