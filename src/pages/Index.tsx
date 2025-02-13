
import CurrencyHeader from "@/components/currency/CurrencyHeader";
import CurrencyConverter from "@/components/currency/CurrencyConverter";
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";
import { currencies, historicalData } from "@/constants/currencyData";

const Index = () => {
  const {
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
  } = useCurrencyConverter(currencies[0], currencies[1]);

  return (
    <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto space-y-8">
        <CurrencyHeader />
        
        <div className="glass-card rounded-2xl p-6 animate-float">
          <CurrencyConverter
            amount={amount}
            setAmount={setAmount}
            fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency}
            toCurrency={toCurrency}
            setToCurrency={setToCurrency}
            convertedAmount={convertedAmount}
            isLoading={isLoading}
            currencies={currencies}
            onSwap={handleSwap}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
