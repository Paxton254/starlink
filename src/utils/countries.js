// Country, Currency, and Geolocation Utilities for Starlink Reseller

export const COUNTRIES = [
  // --- East & Central Africa (Primary mobile money & Starlink markets) ---
  { code: 'KE', name: 'Kenya', currency: 'KES', symbol: 'KES', callingCode: '254', flag: '🇰🇪', isPopular: true },
  { code: 'UG', name: 'Uganda', currency: 'UGX', symbol: 'USh', callingCode: '256', flag: '🇺🇬', isPopular: true },
  { code: 'TZ', name: 'Tanzania', currency: 'TZS', symbol: 'TSh', callingCode: '255', flag: '🇹🇿', isPopular: true },
  { code: 'RW', name: 'Rwanda', currency: 'RWF', symbol: 'FRw', callingCode: '250', flag: '🇷🇼', isPopular: true },
  { code: 'BI', name: 'Burundi', currency: 'BIF', symbol: 'FBu', callingCode: '257', flag: '🇧🇮', isPopular: true },
  { code: 'CD', name: 'DR Congo', currency: 'CDF', symbol: 'FC', callingCode: '243', flag: '🇨🇩', isPopular: true },
  { code: 'CG', name: 'Congo (Brazzaville)', currency: 'XAF', symbol: 'FCFA', callingCode: '242', flag: '🇨🇬', isPopular: true },
  { code: 'SS', name: 'South Sudan', currency: 'SSP', symbol: 'SS£', callingCode: '211', flag: '🇸🇸' },
  { code: 'ET', name: 'Ethiopia', currency: 'ETB', symbol: 'Br', callingCode: '251', flag: '🇪🇹' },
  { code: 'SO', name: 'Somalia', currency: 'USD', symbol: '$', callingCode: '252', flag: '🇸🇴' },

  // --- Southern Africa ---
  { code: 'ZM', name: 'Zambia', currency: 'ZMW', symbol: 'ZK', callingCode: '260', flag: '🇿🇲', isPopular: true },
  { code: 'MW', name: 'Malawi', currency: 'MWK', symbol: 'MK', callingCode: '265', flag: '🇲🇼', isPopular: true },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', symbol: 'R', callingCode: '27', flag: '🇿🇦', isPopular: true },
  { code: 'MZ', name: 'Mozambique', currency: 'MZN', symbol: 'MT', callingCode: '258', flag: '🇲🇿' },
  { code: 'ZW', name: 'Zimbabwe', currency: 'USD', symbol: '$', callingCode: '263', flag: '🇿🇼' },
  { code: 'BW', name: 'Botswana', currency: 'BWP', symbol: 'P', callingCode: '267', flag: '🇧🇼' },
  { code: 'NA', name: 'Namibia', currency: 'NAD', symbol: 'N$', callingCode: '264', flag: '🇳🇦' },
  { code: 'MG', name: 'Madagascar', currency: 'MGA', symbol: 'Ar', callingCode: '261', flag: '🇲🇬' },
  { code: 'MU', name: 'Mauritius', currency: 'MUR', symbol: 'Rs', callingCode: '230', flag: '🇲🇺' },
  { code: 'SC', name: 'Seychelles', currency: 'SCR', symbol: 'SR', callingCode: '248', flag: '🇸🇨' },

  // --- West & Central Francophone / Anglophone Africa ---
  { code: 'NG', name: 'Nigeria', currency: 'NGN', symbol: '₦', callingCode: '234', flag: '🇳🇬', isPopular: true },
  { code: 'GH', name: 'Ghana', currency: 'GHS', symbol: 'GH₵', callingCode: '233', flag: '🇬🇭', isPopular: true },
  { code: 'CM', name: 'Cameroon', currency: 'XAF', symbol: 'FCFA', callingCode: '237', flag: '🇨🇲', isPopular: true },
  { code: 'GA', name: 'Gabon', currency: 'XAF', symbol: 'FCFA', callingCode: '241', flag: '🇬🇦' },
  { code: 'TD', name: 'Chad', currency: 'XAF', symbol: 'FCFA', callingCode: '235', flag: '🇹🇩' },
  { code: 'CF', name: 'Central African Republic', currency: 'XAF', symbol: 'FCFA', callingCode: '236', flag: '🇨🇫' },
  { code: 'SN', name: 'Senegal', currency: 'XOF', symbol: 'CFA', callingCode: '221', flag: '🇸🇳' },
  { code: 'CI', name: "Côte d'Ivoire", currency: 'XOF', symbol: 'CFA', callingCode: '225', flag: '🇨🇮' },
  { code: 'NE', name: 'Niger', currency: 'XOF', symbol: 'CFA', callingCode: '227', flag: '🇳🇪' },
  { code: 'BF', name: 'Burkina Faso', currency: 'XOF', symbol: 'CFA', callingCode: '226', flag: '🇧🇫' },
  { code: 'ML', name: 'Mali', currency: 'XOF', symbol: 'CFA', callingCode: '223', flag: '🇲🇱' },
  { code: 'BJ', name: 'Benin', currency: 'XOF', symbol: 'CFA', callingCode: '229', flag: '🇧🇯' },
  { code: 'TG', name: 'Togo', currency: 'XOF', symbol: 'CFA', callingCode: '228', flag: '🇹🇬' },
  { code: 'GN', name: 'Guinea', currency: 'GNF', symbol: 'FG', callingCode: '224', flag: '🇬🇳' },
  { code: 'SL', name: 'Sierra Leone', currency: 'SLL', symbol: 'Le', callingCode: '232', flag: '🇸🇱' },
  { code: 'LR', name: 'Liberia', currency: 'LRD', symbol: 'L$', callingCode: '231', flag: '🇱🇷' },
  { code: 'AO', name: 'Angola', currency: 'AOA', symbol: 'Kz', callingCode: '244', flag: '🇦🇴' },

  // --- North Africa ---
  { code: 'EG', name: 'Egypt', currency: 'EGP', symbol: 'E£', callingCode: '20', flag: '🇪🇬' },
  { code: 'MA', name: 'Morocco', currency: 'MAD', symbol: 'DH', callingCode: '212', flag: '🇲🇦' },
  { code: 'TN', name: 'Tunisia', currency: 'TND', symbol: 'DT', callingCode: '216', flag: '🇹🇳' },
  { code: 'DZ', name: 'Algeria', currency: 'DZD', symbol: 'DA', callingCode: '213', flag: '🇩🇿' },

  // --- International / Global ---
  { code: 'US', name: 'United States', currency: 'USD', symbol: '$', callingCode: '1', flag: '🇺🇸', isPopular: true },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£', callingCode: '44', flag: '🇬🇧', isPopular: true },
  { code: 'FR', name: 'France', currency: 'EUR', symbol: '€', callingCode: '33', flag: '🇫🇷', isPopular: true },
  { code: 'DE', name: 'Germany', currency: 'EUR', symbol: '€', callingCode: '49', flag: '🇩🇪' },
  { code: 'BE', name: 'Belgium', currency: 'EUR', symbol: '€', callingCode: '32', flag: '🇧🇪' },
  { code: 'CA', name: 'Canada', currency: 'CAD', symbol: 'CA$', callingCode: '1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', currency: 'AUD', symbol: 'A$', callingCode: '61', flag: '🇦🇺' },
  { code: 'IN', name: 'India', currency: 'INR', symbol: '₹', callingCode: '91', flag: '🇮🇳' },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', symbol: 'AED', callingCode: '971', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', currency: 'SAR', symbol: 'SAR', callingCode: '966', flag: '🇸🇦' },
  { code: 'CN', name: 'China', currency: 'CNY', symbol: '¥', callingCode: '86', flag: '🇨🇳' },
  { code: 'JP', name: 'Japan', currency: 'JPY', symbol: '¥', callingCode: '81', flag: '🇯🇵' },
  { code: 'BR', name: 'Brazil', currency: 'BRL', symbol: 'R$', callingCode: '55', flag: '🇧🇷' }
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // Kenya (KE)

export const COUNTRY_MAP = new Map(COUNTRIES.map(c => [c.code.toUpperCase(), c]));
COUNTRY_MAP.set('COD', COUNTRY_MAP.get('CD'));
COUNTRY_MAP.set('DRC', COUNTRY_MAP.get('CD'));

// Fallback rates relative to 1 KES (base)
export const FALLBACK_RATES = {
  KES: 1,
  USD: 0.007715,
  EUR: 0.006767,
  GBP: 0.005820,
  UGX: 30.168,
  TZS: 20.494,
  RWF: 11.403,
  BIF: 22.500,
  CDF: 21.500,
  XAF: 4.600,
  XOF: 4.600,
  NGN: 10.250,
  GHS: 0.112,
  ZAR: 0.141,
  ZMW: 0.208,
  MWK: 13.450,
  MZN: 0.492,
  ETB: 0.950,
  MGA: 35.120,
  MUR: 0.355,
  SCR: 0.108,
  SSP: 10.000,
  EGP: 0.380,
  MAD: 0.075,
  AED: 0.0283,
  SAR: 0.0289,
  INR: 0.650,
  CAD: 0.0105,
  AUD: 0.0118,
  CNY: 0.0552,
  JPY: 1.150,
  BRL: 0.0425
};

/**
 * Fetch live exchange rates against KES with caching
 */
export async function fetchExchangeRates() {
  const CACHE_KEY = 'starlink_rates_cache_kes';
  const CACHE_TIME_KEY = 'starlink_rates_time_kes';
  const ONE_HOUR = 3600 * 1000;

  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
    if (cached && cachedTime && (Date.now() - Number(cachedTime) < ONE_HOUR)) {
      return { ...FALLBACK_RATES, ...JSON.parse(cached) };
    }
  } catch {
    // ignore sessionStorage errors
  }

  try {
    const res = await fetch('https://open.er-api.com/v6/latest/KES');
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates) {
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(data.rates));
          sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
        } catch {
          // ignore
        }
        return { ...FALLBACK_RATES, ...data.rates };
      }
    }
  } catch (err) {
    console.warn('Failed to fetch live exchange rates, using fallback rates:', err);
  }

  return FALLBACK_RATES;
}

/**
 * Detect country code from user IP using robust multi-tier fallbacks
 */
export async function detectCountryFromIP() {
  const CACHE_KEY = 'starlink_detected_geo';

  // 1. Check session cache first to prevent repeated network requests
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.code && COUNTRY_MAP.has(parsed.code.toUpperCase())) {
        return COUNTRY_MAP.get(parsed.code.toUpperCase());
      }
    }
  } catch {
    // ignore
  }

  // 2. Primary detector: ipwho.is (fast, reliable, CORS enabled, generous quota)
  try {
    const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(3500) });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false && data.country_code) {
        let code = data.country_code.toUpperCase();
        if (code === 'COD' || (data.country && /democratic republic of the congo|congo.*kinshasa|drc/i.test(data.country))) {
          code = 'CD';
        }
        const country = COUNTRY_MAP.get(code) || {
          code,
          name: data.country || code,
          currency: code === 'CD' ? 'CDF' : 'USD',
          symbol: code === 'CD' ? 'FC' : '$',
          callingCode: data.calling_code ? String(data.calling_code) : '1',
          flag: data.flag?.emoji || '🌐'
        };
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(country));
        } catch {}
        return country;
      }
    }
  } catch (e) {
    console.warn('ipwho.is detection error:', e);
  }

  // 3. Fallback 1: freeipapi.com
  try {
    const res = await fetch('https://freeipapi.com/api/json', { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data && data.countryCode) {
        let code = data.countryCode.toUpperCase();
        if (code === 'COD' || (data.countryName && /democratic republic of the congo|congo.*kinshasa|drc/i.test(data.countryName))) {
          code = 'CD';
        }
        if (COUNTRY_MAP.has(code)) {
          const country = COUNTRY_MAP.get(code);
          try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(country)); } catch {}
          return country;
        }
      }
    }
  } catch (e) {
    console.warn('freeipapi fallback error:', e);
  }

  // 4. Fallback 2: api.country.is
  try {
    const res = await fetch('https://api.country.is/', { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data && data.country) {
        let code = data.country.toUpperCase();
        if (code === 'COD') code = 'CD';
        if (COUNTRY_MAP.has(code)) {
          const country = COUNTRY_MAP.get(code);
          try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(country)); } catch {}
          return country;
        }
      }
    }
  } catch (e) {
    console.warn('api.country.is fallback error:', e);
  }

  // 5. Default fallback to Kenya
  return DEFAULT_COUNTRY;
}

/**
 * Format a base price in KES into a localized, elegant currency string
 * @param {number} basePriceKES - Base package price in KES (e.g., 46, 115, 230, etc.)
 * @param {string} currencyCode - Target currency code (e.g., 'KES', 'USD', 'UGX', 'EUR', etc.)
 * @param {object} exchangeRates - Rates object against KES
 * @returns {string} Formatted price string (e.g., 'KES 115', '$0.89', 'UGX 3,450', 'XAF 530')
 */
export function formatPrice(basePriceKES, currencyCode = 'KES', exchangeRates = {}) {
  const rate = exchangeRates[currencyCode] || FALLBACK_RATES[currencyCode] || 1;
  const raw = basePriceKES * rate;

  if (currencyCode === 'KES') {
    return `KES ${Math.round(raw).toLocaleString()}`;
  }

  // Currencies with standard symbols and cents
  if (currencyCode === 'USD') {
    return `$${raw < 10 ? raw.toFixed(2) : Math.round(raw).toLocaleString()}`;
  }
  if (currencyCode === 'EUR') {
    return `€${raw < 10 ? raw.toFixed(2) : Math.round(raw).toLocaleString()}`;
  }
  if (currencyCode === 'GBP') {
    return `£${raw < 10 ? raw.toFixed(2) : Math.round(raw).toLocaleString()}`;
  }

  // High-denomination currencies (e.g. UGX, TZS, RWF, BIF, CDF, MGA, NGN, XAF, XOF)
  if (raw >= 1000) {
    // Round to nearest 50 for clean merchant pricing
    const rounded = Math.round(raw / 50) * 50;
    return `${currencyCode} ${rounded.toLocaleString()}`;
  }
  if (raw >= 100) {
    // Round to nearest 10
    const rounded = Math.round(raw / 10) * 10;
    return `${currencyCode} ${rounded.toLocaleString()}`;
  }
  if (raw >= 10) {
    const rounded = Math.round(raw);
    return `${currencyCode} ${rounded.toLocaleString()}`;
  }

  // Under 10
  return `${currencyCode} ${raw.toFixed(2)}`;
}
