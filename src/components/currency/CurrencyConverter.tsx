
import { ArrowLeftRight } from "lucide-react";
import { Currency } from "@/types/currency";

interface CurrencyConverterProps {
  amount: string;
  setAmount: (amount: string) => void;
  fromCurrency: Currency;
  setFromCurrency: (currency: Currency) => void;
  toCurrency: Currency;
  setToCurrency: (currency: Currency) => void;
  convertedAmount: number;
  isLoading: boolean;
  currencies: Currency[];
  onSwap: () => void;
}

const CurrencyConverter = ({
  amount,
  setAmount,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
  convertedAmount,
  isLoading,
  currencies,
  onSwap,
}: CurrencyConverterProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted-foreground">De</label>
        <select
          value={fromCurrency.code}
          onChange={(e) => setFromCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
          className="w-full px-4 py-2 rounded-lg bg-background border border-input input-transition focus:ring-2 focus:ring-accent focus:outline-none"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-2 rounded-lg bg-background border border-input input-transition focus:ring-2 focus:ring-accent focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={onSwap}
        className="p-3 rounded-full bg-accent text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mx-auto"
      >
        <ArrowLeftRight className="w-5 h-5" />
      </button>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted-foreground">A</label>
        <select
          value={toCurrency.code}
          onChange={(e) => setToCurrency(currencies.find(c => c.code === e.target.value) || currencies[1])}
          className="w-full px-4 py-2 rounded-lg bg-background border border-input input-transition focus:ring-2 focus:ring-accent focus:outline-none"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
        <div className="relative">
          <input
            type="number"
            value={isLoading ? "..." : convertedAmount.toFixed(2)}
            readOnly
            className="w-full px-4 py-2 rounded-lg bg-background border border-input"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
