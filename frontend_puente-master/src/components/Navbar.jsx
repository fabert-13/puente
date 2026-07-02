import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-sky-600 text-white py-2">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        {/* Logo + texto */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo PUENTE" className="h-12 w-auto" />
          <span className="text-white text-xl font-bold hidden sm:inline">
            PUENTE
          </span>
        </Link>

        {/* Botón hamburguesa (solo visible en mobile) */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Menú principal */}
        <div className={`md:flex gap-4 ${isOpen ? "block mt-2" : "hidden"} md:mt-0`}>
          <Link
            to="/"
            className="relative block px-2 py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/tests"
            className="relative block px-2 py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => setIsOpen(false)}
          >
            Tests Vocacionales
          </Link>
        </div>
      </div>
    </nav>
  );
}
