import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [animated, setAnimated] = useState(false);

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
        setAnimated(true);
        setTimeout(() => setAnimated(false), 400);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #1e3a5f 50%, #0f2027 100%)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>

      {/* Header */}
      <header style={{
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.04)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, color: 'white', fontSize: 16,
          }}>D</div>
          <span style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>
            DevOps Project — Ziad Fawzi
          </span>
        </div>

        {/* Right side: live indicator + avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#22c55e',
              display: 'inline-block',
              boxShadow: '0 0 6px #22c55e',
            }}></span>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace' }}>
              Live on AWS
            </span>
          </div>

          {/* Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: '0.85rem',
              border: '2px solid rgba(255,255,255,0.2)',
            }}>ZF</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 600, lineHeight: 1.2 }}>Ziad Fawzi</span>
              <span style={{ color: '#64748b', fontSize: '0.7rem' }}>DevOps Engineer</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 28,
          padding: '3rem 2.5rem',
          width: '100%',
          maxWidth: 380,
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
        }}>

          <p style={{
            color: '#94a3b8',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '0.25rem',
          }}>DevOps Counter</p>

          <p style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 500, marginBottom: '2rem' }}>
            Persisted in MongoDB
          </p>

          <div style={{
            fontSize: '7rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #6366f1, #3b82f6, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            marginBottom: '0.5rem',
            transition: 'transform 0.2s',
            transform: animated ? 'scale(1.15)' : 'scale(1)',
            display: 'inline-block',
          }}>{count}</div>

          <p style={{ color: '#f59e0b', fontSize: '0.72rem', fontWeight: 500, marginBottom: '2rem' }}>
            Total increments
          </p>

          <button
            onClick={handleIncrement}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: 50,
              border: 'none',
              background: loading
                ? 'rgba(99,102,241,0.4)'
                : 'linear-gradient(135deg, #6366f1, #3b82f6)',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(99,102,241,0.4)',
            }}
          >
            {loading ? 'Saving...' : 'Increment +'}
          </button>

          {/* Architecture badges */}
          <div style={{
            marginTop: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '0.7rem',
            fontFamily: 'monospace',
          }}>
            <span style={{
              background: 'rgba(59,130,246,0.2)',
              color: '#93c5fd',
              padding: '0.25rem 0.6rem',
              borderRadius: 6,
              border: '1px solid rgba(59,130,246,0.3)',
            }}>EC2</span>
            <span style={{ color: '#475569' }}>→</span>
            <span style={{
              background: 'rgba(16,185,129,0.2)',
              color: '#6ee7b7',
              padding: '0.25rem 0.6rem',
              borderRadius: 6,
              border: '1px solid rgba(16,185,129,0.3)',
            }}>MongoDB</span>
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;