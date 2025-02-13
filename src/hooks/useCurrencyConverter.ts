
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Currency } from "@/types/currency";
import { CURRENCY_API } from "@/config/api";

export const useCurrencyConverter = (initialFromCurrency: Currency, initialToCurrency: Currency) => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState(initialFromCurrency);
  const [toCurrency, setToCurrency] = useState(initialToCurrency);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [currentRate, setCurrentRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sessionToken = localStorage.getItem('sessionToken');

  const handleAuthError = () => {
    toast.error("Sesión expirada. Por favor, inicia sesión nuevamente.");
    localStorage.removeItem('sessionToken');
    navigate('/login');
  };

  const fetchExchangeRate = async () => {
    try {
      console.log("Obteniendo tasa de cambio...");
      const response = await fetch(
        `${CURRENCY_API.exchangeRate}?base=${fromCurrency.code}&target=${toCurrency.code}`,
        {
          headers: {
            'Authorization': `Bearer ${sessionToken}`,
          },
        }
      );
      
      console.log("Estado de respuesta de tasa de cambio:", response.status);
      
      if (response.status === 401 || response.status === 403) {
        handleAuthError();
        return;
      }
      
      if (!response.ok) {
        toast.error("Error al obtener la tasa de cambio");
        return;
      }
      
      const data = await response.json();
      console.log("Datos de respuesta de tasa de cambio:", data);
      
      const rate = Number(data);
      if (!isNaN(rate)) {
        setCurrentRate(rate);
      } else {
        console.error("Formato de datos de tasa de cambio inválido:", data);
        toast.error("Se recibieron datos de tasa de cambio inválidos");
      }
    } catch (error) {
      console.error("Error de tasa de cambio:", error);
      toast.error("Error al obtener la tasa de cambio");
    }
  };

  const handleConversion = async () => {
    if (!amount) return;
    
    setIsLoading(true);
    try {
      console.log("Convirtiendo monto...");
      const response = await fetch(
        `${CURRENCY_API.convert}?amount=${amount}&base=${fromCurrency.code}&target=${toCurrency.code}`,
        {
          headers: {
            'Authorization': `Bearer ${sessionToken}`,
          },
        }
      );
      
      console.log("Estado de respuesta de conversión:", response.status);
      
      if (response.status === 401 || response.status === 403) {
        handleAuthError();
        return;
      }
      
      if (!response.ok) {
        toast.error("Error en la conversión");
        return;
      }
      
      const data = await response.json();
      console.log("Datos de respuesta de conversión:", data);
      
      const result = Number(data);
      if (!isNaN(result)) {
        setConvertedAmount(result);
      } else {
        console.error("Formato de datos de conversión inválido:", data);
        toast.error("Se recibieron datos de conversión inválidos");
      }
    } catch (error) {
      console.error("Error de conversión:", error);
      toast.error("Error al convertir la moneda");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    if (sessionToken) {
      console.log("Moneda cambiada, obteniendo nueva tasa...");
      fetchExchangeRate();
    }
  }, [fromCurrency.code, toCurrency.code]);

  useEffect(() => {
    if (amount && sessionToken) {
      console.log("Monto cambiado, realizando conversión...");
      handleConversion();
    } else {
      setConvertedAmount(0);
    }
  }, [amount, fromCurrency.code, toCurrency.code]);

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    convertedAmount,
    currentRate,
    isLoading,
    handleSwap,
  };
};
