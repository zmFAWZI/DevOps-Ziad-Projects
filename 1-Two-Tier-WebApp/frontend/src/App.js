import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  // In production, change 'localhost' to your Web EC2 Public IP
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_URL}/count`)
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(err => console.error("Error fetching count:", err));
  }, [API_URL]);

  const handleIncrement = () => {
    fetch(`${API_URL}/increment`, { method: 'POST' })
      .then(res => res.json())
      .then(data => setCount(data.count));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center border border-slate-200">
        <h1 className="text-slate-500 uppercase tracking-widest text-sm font-bold mb-2">DevOps Counter</h1>
        <div className="text-7xl font-black text-blue-600 mb-6">{count}</div>
        <button 
          onClick={handleIncrement}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all active:scale-95 shadow-lg shadow-blue-200"
        >
          Increment +
        </button>
        <p className="mt-4 text-xs text-slate-400 font-mono">Tier 1 → Tier 2 → MongoDB</p>
      </div>
    </div>
  );
}

export default App;