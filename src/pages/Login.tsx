
import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { AUTH_API } from "@/config/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      verifyToken(token);
    }
  }, [searchParams]);

  const verifyToken = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${AUTH_API.verifyToken}?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('sessionToken', data.sessionToken);
        toast.success("¡Inicio de sesión exitoso!");
        navigate('/');
      } else {
        toast.error("Token inválido o expirado. Por favor, intente nuevamente.");
      }
    } catch (error) {
      toast.error("No se pudo verificar el token. Por favor, intente más tarde.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`${AUTH_API.magicLink}?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        toast.success("¡Enlace mágico enviado! Por favor, revise su correo.");
      } else {
        toast.error("Error al enviar el enlace mágico. Por favor, intente nuevamente.");
      }
    } catch (error) {
      toast.error("No se pudo conectar al servidor. Por favor, intente más tarde.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (searchParams.get('token') && isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto"/>
          <p className="text-muted-foreground">Verificando su inicio de sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold mt-4 animate-slideUp">
            Bienvenido de Nuevo
          </h1>
        </div>

        <div className="glass-card rounded-2xl p-6 space-y-6 animate-float">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-foreground">
                Correo Electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingrese su correo"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-input input-transition focus:ring-2 focus:ring-accent focus:outline-none"
                  required
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent/90 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Enviar Enlace Mágico"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
