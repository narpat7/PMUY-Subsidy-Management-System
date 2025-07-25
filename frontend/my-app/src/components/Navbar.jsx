import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    setMenuOpen(false); // close menu on navigation
    navigate(path);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          onClick={() => handleNavigate("/")}
          className="cursor-pointer text-xl font-bold"
        >
          PMUY Portal
        </h1>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Links (Desktop View) */}
        <div className="hidden md:flex space-x-4">
          <button onClick={() => handleNavigate("/")} className="hover:text-gray-300">Home</button>
          <button onClick={() => handleNavigate("/apply")} className="hover:text-gray-300">Apply</button>
          <button onClick={() => handleNavigate("/status")} className="hover:text-gray-300">Status</button>
          <button onClick={() => handleNavigate("/admin")} className="hover:text-gray-300">Admin</button>
        </div>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4">
          <button onClick={() => handleNavigate("/")} className="block w-full text-left hover:text-gray-300">Home</button>
          <button onClick={() => handleNavigate("/apply")} className="block w-full text-left hover:text-gray-300">Apply</button>
          <button onClick={() => handleNavigate("/status")} className="block w-full text-left hover:text-gray-300">Status</button>
          <button onClick={() => handleNavigate("/admin")} className="block w-full text-left hover:text-gray-300">Admin</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
