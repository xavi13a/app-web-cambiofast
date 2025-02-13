
import UserMenu from "@/components/UserMenu";

const CurrencyHeader = () => {
  return (
    <div className="text-center space-y-2">
      <div className="flex justify-end mb-4">
        <UserMenu />
      </div>
      <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent-foreground inline-block animate-slideUp">
        Tasas de Cambio en Tiempo Real
      </span>
      <h1 className="text-4xl font-bold mt-4 animate-slideUp" style={{ animationDelay: "100ms" }}>
        Cambio de Divisas
      </h1>
      <p className="text-muted-foreground animate-slideUp" style={{ animationDelay: "200ms" }}>
        Cambio de moneda rápido y seguro con tasas en tiempo real
      </p>
    </div>
  );
};

export default CurrencyHeader;
