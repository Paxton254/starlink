import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_COUNTRY,
  COUNTRY_MAP,
  detectCountryFromIP,
  fetchExchangeRates,
  formatPrice
} from '../utils/countries';

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function initGeoAndRates() {
      // 1. Fetch live or cached exchange rates
      const fetchedRates = await fetchExchangeRates();
      if (isMounted) {
        setRates(fetchedRates);
      }

      // 2. Automatically detect country based on user's IP address
      const detected = await detectCountryFromIP();
      if (!isMounted) return;

      // Ensure that if the detected country is DRC, currency is CDF
      let activeCountry = detected;
      if (detected && (detected.code === 'CD' || detected.code === 'COD' || /congo.*kinshasa|democratic republic/i.test(detected.name))) {
        activeCountry = COUNTRY_MAP.get('CD') || {
          code: 'CD',
          name: 'DR Congo',
          currency: 'CDF',
          symbol: 'FC',
          callingCode: '243',
          flag: '🇨🇩'
        };
      }

      setCountry(activeCountry);
      setLoading(false);
    }

    initGeoAndRates();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatPackagePrice = (basePriceKES) => {
    return formatPrice(basePriceKES, country.currency, rates);
  };

  const value = {
    country,
    currency: country.currency,
    rates,
    loading,
    formatPackagePrice
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
