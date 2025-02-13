
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UserMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('sessionToken');
    navigate('/login');
  };

  return (
    <div className="relative">
      <button 
        className="p-2 rounded-full hover:bg-accent/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-accent/10 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
