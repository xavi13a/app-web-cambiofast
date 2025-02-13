
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Currency } from "@/types/currency";

interface CurrencyChartProps {
  data: Array<{ date: string; rate: number }>;
  fromCurrency: Currency;
  toCurrency: Currency;
  currentRate: number;
}

const CurrencyChart = ({ data, fromCurrency, toCurrency, currentRate }: CurrencyChartProps) => {
  return (
    <div className="pt-6 border-t border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          <span className="font-medium">Historial de Tasas de Cambio</span>
        </div>
        <span className="text-sm text-muted-foreground">
          1 {fromCurrency.code} = {currentRate.toFixed(4)} {toCurrency.code}
        </span>
      </div>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#4ADE80"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CurrencyChart;
