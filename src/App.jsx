import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Verify from './pages/Verify';

function App() {
  return (
    <Router>
      <Routes>
        {/* The Main Generator Page */}
        <Route path="/" element={<Home />} />
        
        {/* The Verification Page (Dynamic ID) */}
        <Route path="/verify/:id" element={<Verify />} />
      </Routes>
    </Router>
  );
}

export default App;