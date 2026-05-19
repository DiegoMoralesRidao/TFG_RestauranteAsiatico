"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-lg py-2" 
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 group">
            <div className="bg-white p-1 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-md overflow-hidden flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
            </div>
            <Link href="/" className="flex flex-col">
              <span className="font-black text-xl leading-tight tracking-tight text-foreground">
                BAR RESTAURANTE <span className="text-primary italic">ASIÁTICO</span>
              </span>
              <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase -mt-1">
                Café Bar Restaurante
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-foreground hover:text-primary transition-colors font-bold text-sm uppercase tracking-wide"
            >
              Inicio
            </Link>
            <Link 
              href="/menu" 
              className="ml-4 bg-primary text-white px-6 py-2.5 rounded-full font-black hover:bg-accent transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-widest shadow-lg shadow-primary/20"
            >
              Ver Carta
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[300px] border-t border-muted" : "max-h-0"
        }`}
      >
        <div className="px-6 py-8 space-y-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/menu"
            onClick={() => setIsOpen(false)}
            className="block text-xl font-bold text-primary transition-colors"
          >
            Ver Carta
          </Link>
          <div className="pt-4 border-t border-muted">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Pedidos:</p>
            <div className="flex flex-col gap-1">
              <a href="tel:+34950793336" className="text-lg font-black text-foreground">950 79 33 36</a>
              <a href="tel:+34630099409" className="text-lg font-black text-foreground">630 09 94 09</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
