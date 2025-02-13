
const API_URL = import.meta.env.PROD 
  ? 'https://tu-dominio-produccion.com'  // Reemplaza con tu URL de producción
  : 'http://localhost:9091';

export const CURRENCY_API = {
  exchangeRate: `${API_URL}/currency/exchange-rate`,
  convert: `${API_URL}/currency/convert`,
};
