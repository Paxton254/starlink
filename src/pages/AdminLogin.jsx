import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
      <div style={{
        background: 'var(--bg-dark-lighter)',
        padding: '50px',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-glow-purple)',
        maxWidth: '400px',
        width: '100%',
        color: 'var(--text-on-dark)',
        animation: 'fadeInUp var(--transition-base)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>Admin Access</h2>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none'
              }}
              onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px var(--brand-purple)'}
              onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none'
              }}
              onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px var(--brand-purple)'}
              onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
            />
          </div>
          <button 
            type="submit"
            style={{
              padding: '15px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--brand-purple)',
              color: 'white',
              fontWeight: 'bold',
              marginTop: '10px',
              cursor: 'pointer',
              transition: 'background var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--brand-purple-dark)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--brand-purple)'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
