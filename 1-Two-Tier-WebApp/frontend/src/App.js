import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // In production, change 'localhost' to your Web EC2 Public IP
  const API_URL = process.env.REACT_APP_API_URL || 'http://34.236.146.163:5000/api';


  useEffect(() => {
    fetch('/api/count')
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(err => console.error("Error fetching count:", err));
  }, []);

  const handleIncrement = () => {
    setLoading(true);
    fetch('/api/increment', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setCount(data.count);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">D</span>
          </div>
          <span className="font-bold text-slate-800 text-lg">DevOps Project</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm text-slate-500 font-mono">Live on AWS</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center border border-slate-200 w-full max-w-sm">

          <h1 className="text-slate-500 uppercase tracking-widest text-sm font-bold mb-1">DevOps Counter</h1>
          <p className="text-slate-400 text-xs mb-6">Persisted in MongoDB</p>

          <div className="text-8xl font-black text-blue-600 mb-2 tabular-nums">{count}</div>
          <p className="text-slate-300 text-xs mb-8">total increments</p>

          <button
            onClick={handleIncrement}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-8 rounded-full transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            {loading ? 'Saving...' : 'Increment +'}
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
            <span className="bg-slate-100 px-2 py-1 rounded">EC2</span>
            <span>→</span>
            <span className="bg-slate-100 px-2 py-1 rounded">EC2</span>
            <span>→</span>
            <span className="bg-slate-100 px-2 py-1 rounded">MongoDB</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;