
const API_URL = import.meta.env.PROD 
  ? 'https://money-app-135535991862.us-central1.run.app' // Reemplaza con tu URL de producción
  : 'http://localhost:9091';

export const CURRENCY_API = {
  exchangeRate: `${API_URL}/currency/exchange-rate`,
  convert: `${API_URL}/currency/convert`,
};

export const AUTH_API = {
  magicLink: `${API_URL}/auth/request-magic-link`,
  verifyToken: `${API_URL}/auth/magic-login`,
};
