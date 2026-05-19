"use client";

import MenuCard from "@/components/MenuCard";
import { useState, useEffect } from "react";
import { API_URL } from "@/config";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  isPopular: boolean;
}

interface CategoryGroup {
  id: string;
  name: string;
  note?: string;
  items: Product[];
}

export default function MenuPage() {
  const [menu, setMenu] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Intentando conectar con el backend en:", API_URL);
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products: Product[] = (await response.json()).map((p: any) => ({
          ...p,
          price: Number(p.price)
        }));
        
        // Transform flat list to grouped categories
        const categories: Record<string, CategoryGroup> = {};
        
        // Predefined order and notes
        const categoryConfig: Record<string, { id: string; note?: string }> = {
          "Aperitivos y Entrantes": { id: "entrantes" },
          "Sopas": { id: "sopas" },
          "Tempura": { id: "tempura" },
          "Sushi y Maki": { id: "sushi", note: "Solo disponible viernes, sábado y domingo" },
          "Verduras": { id: "verduras" },
          "Pollo": { id: "pollo" },
          "Ternera": { id: "ternera" },
          "Pato": { id: "pato" },
          "Pescado y Gambas": { id: "pescado-gambas" },
          "Cerdo": { id: "cerdo" },
          "Cordero": { id: "cordero" },
          "Arroces": { id: "arroces" },
          "Tallarines y Fideos": { id: "tallarines" },
          "Menú de Niños": { id: "ninos" },
          "Menú del Día": { id: "menu-dia", note: "Incluye: Rollito de Primavera + Plato Principal + Arroz/Tallarines (Bebida y postre NO incluidos para llevar)" },
          "Menús para Grupos": { id: "menus-grupos" },
          "Postres y Bebidas": { id: "postres" },
        };

        products.forEach(product => {
          const config = categoryConfig[product.category] || { id: product.category.toLowerCase().replace(/\s+/g, '-') };
          if (!categories[product.category]) {
            categories[product.category] = {
              id: config.id,
              name: product.category,
              note: config.note,
              items: []
            };
          }
          categories[product.category].items.push(product);
        });

        // Convert to array and sort by categoryConfig order
        const sortedCategories = Object.keys(categoryConfig)
          .filter(name => categories[name])
          .map(name => categories[name]);

        // Append any categories not in categoryConfig
        Object.keys(categories).forEach(name => {
          if (!categoryConfig[name]) {
            sortedCategories.push(categories[name]);
          }
        });

        setMenu(sortedCategories);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-stone-500 font-bold uppercase tracking-widest text-xs">Cargando carta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-red-100 max-w-md mx-4">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-black mb-2">Error al cargar la carta</h2>
          <p className="text-stone-500 text-sm mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50/50 pt-16 pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-4">Carta Digital</h2>
          <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter mb-8">NUESTRAS ESPECIALIDADES</h1>
          <div className="w-24 h-1.5 bg-primary mx-auto mb-8 rounded-full" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
            "Ingredientes frescos, recetas milenarias y el toque especial de nuestra familia."
          </p>
        </div>

        {/* Category Navigation */}
        <div className="sticky top-16 md:top-24 z-40 mb-12 -mx-4 px-4 py-2 bg-stone-50/80 backdrop-blur-md border-b border-stone-200 md:border-none md:bg-transparent md:backdrop-blur-none md:static md:mb-20">
          <div className="flex overflow-x-auto pb-2 md:pb-0 no-scrollbar md:flex-wrap md:justify-center gap-2">
            {menu.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="whitespace-nowrap px-4 py-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-foreground bg-white md:bg-white/50 border border-stone-200 md:glass-panel hover:bg-primary hover:text-white rounded-xl transition-all shadow-sm md:shadow-xl"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>

        {/* Categories Sections */}
        <div className="space-y-32">
          {menu.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-48">
              <div className="flex flex-col md:flex-row items-baseline gap-4 mb-10 border-b-2 border-stone-100 pb-4">
                <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase">{category.name}</h2>
                <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase opacity-60">
                  {category.items.length} Platos disponibles
                </span>
              </div>

              {category.note && (
                <div className="mb-8 p-4 bg-primary/5 border-l-4 border-primary rounded-r-xl">
                  <p className="text-sm font-bold text-primary italic uppercase tracking-wider">{category.note}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, idx) => (
                  <MenuCard
                    key={idx}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    isPopular={item.isPopular}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
