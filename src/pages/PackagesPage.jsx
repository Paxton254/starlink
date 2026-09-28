import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import './PackagesPage.css';

export default function PackagesPage() {
  const navigate = useNavigate();
  const { country, currency, formatPackagePrice } = useCurrency();

  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleOperatorSelect = (operator) => {
    setShowModal(false);
    if (operator === 'Airtel') {
      const serializablePkg = selectedPackage ? {
        id: selectedPackage.id,
        name: selectedPackage.name,
        price: selectedPackage.price,
        basePriceKES: selectedPackage.basePriceKES,
        currency: currency,
        country: country
      } : null;
      navigate('/checkout/airtel', { state: { pkg: serializablePkg } });
    } else {
      alert(operator + ' integration coming soon.');
    }
  };

  const rawPackages = [
    {
      id: 'basic',
      name: 'Basic Bundle',
      desc: '5 GB / 30 days',
      basePriceKES: 46,
      tags: [{ text: 'Données illimitées', bg: '#dcfce7', color: '#22c55e' }, { text: 'Budget-friendly', bg: '#dcfce7', color: '#22c55e' }],
      themeColor: '#dcfce7',
      iconColor: '#22c55e',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    },
    {
      id: 'standard',
      name: 'Standard Bundle',
      desc: '15 GB / 30 days',
      basePriceKES: 115,
      tags: [],
      isPopular: true,
      themeColor: '#ede9fe',
      iconColor: '#7c3aed',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      )
    },
    {
      id: 'premium',
      name: 'Premium Bundle',
      desc: '30 GB / 30 days',
      basePriceKES: 230,
      tags: [{ text: 'Données illimitées', bg: '#fce7f3', color: '#db2777' }, { text: 'HD Streaming', bg: '#fce7f3', color: '#db2777' }],
      themeColor: '#fce7f3',
      iconColor: '#db2777',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
        </svg>
      )
    },
    {
      id: 'ultra',
      name: 'Ultra Bundle',
      desc: '60 GB / 30 days',
      basePriceKES: 460,
      tags: [{ text: 'Données illimitées', bg: '#cffafe', color: '#0891b2' }, { text: 'Heavy usage', bg: '#cffafe', color: '#0891b2' }],
      themeColor: '#cffafe',
      iconColor: '#0891b2',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12v6"></path>
          <path d="M9 15h6"></path>
          <path d="M4 10.4A5.5 5.5 0 0 1 14 6a4.5 4.5 0 0 1 6.3 4.2"></path>
        </svg>
      )
    },
    {
      id: 'business',
      name: 'Business Bundle',
      desc: '100 GB / 30 days',
      basePriceKES: 1150,
      tags: [{ text: 'Données illimitées', bg: '#ede9fe', color: '#7c3aed' }, { text: 'Enterprise', bg: '#ede9fe', color: '#7c3aed' }, { text: 'Priority support', bg: '#ede9fe', color: '#7c3aed' }],
      themeColor: '#ede9fe',
      iconColor: '#7c3aed',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    },
    {
      id: 'unlimited',
      name: 'Unlimited Bundle',
      desc: 'Unlimited data / 30 days',
      basePriceKES: 2300,
      tags: [{ text: 'Illimité 24/7', bg: '#fef3c7', color: '#d97706' }, { text: 'VIP Support', bg: '#fef3c7', color: '#d97706' }, { text: 'Static IP', bg: '#fef3c7', color: '#d97706' }],
      themeColor: '#fef08a',
      iconColor: '#d97706',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    }
  ];

  // Calculate dynamic price matching detected country and currency
  const packages = rawPackages.map(pkg => ({
    ...pkg,
    price: formatPackagePrice(pkg.basePriceKES)
  }));

  return (
    <div className="packages-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h3>INTERNET PACKAGES</h3>
          <h1>Choose Your Package</h1>
          <p>Select a package and pay via Airtel Money to activate immediately.</p>
        </div>
        <div className="hero-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
      </div>

      {/* Package List */}
      <div className="packages-list">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card" onClick={() => handlePackageClick(pkg)}>
            {pkg.isPopular && <div className="package-badge-popular">POPULAR</div>}

            <div className="package-left">
              <div className="package-icon-container" style={{ backgroundColor: pkg.themeColor, color: pkg.iconColor }}>
                {pkg.icon}
              </div>
              <div className="package-details">
                <h2>{pkg.name}</h2>
                <p>{pkg.desc}</p>
                {pkg.tags && pkg.tags.length > 0 && (
                  <div className="package-tags">
                    {pkg.tags.map((tag, idx) => (
                      <span key={idx} className="tag" style={{ backgroundColor: tag.bg, color: tag.color }}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="package-right">
              <div style={{ textAlign: 'right' }}>
                <div className="package-price" style={{ color: pkg.iconColor }}>{pkg.price}</div>
                <div className="package-month">/month</div>
              </div>
              <div className="package-instruction">
                1) Tap a package 2) Choose your Mobile Money operator
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="info-box">
        <div style={{ color: '#7c3aed', flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <div>
          <p className="title">Mobile Money payment (Airtel,Orange)</p>
          <p className="desc">First click a package, then choose your operator to complete the payment in {currency}.</p>
        </div>
      </div>

      {/* Payment Method Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Select Payment Method</h2>
            <p className="modal-subtitle">Choose how you want to pay</p>

            <div className="payment-option" onClick={() => handleOperatorSelect('Airtel')}>
              <div className="payment-icon-box airtel-icon">airtel</div>
              <div className="payment-details">
                <h4>Airtel Money</h4>
                <p>Pay with your Airtel wallet ({currency})</p>
              </div>
              <div style={{ color: '#9ca3af' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>

            <div className="payment-option" onClick={() => handleOperatorSelect('Orange')}>
              <div className="payment-icon-box orange-icon">Orange</div>
              <div className="payment-details">
                <h4>Orange Money</h4>
                <p>Pay with Orange Money ({currency})</p>
              </div>
              <div style={{ color: '#9ca3af' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>

            <button className="btn-cancel" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
