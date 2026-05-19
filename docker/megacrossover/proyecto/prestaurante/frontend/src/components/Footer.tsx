import Link from "next/link";
import { MapPin, Phone, Clock, UtensilsCrossed } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 opacity-5 -translate-y-1/2 translate-x-1/3">
        <UtensilsCrossed className="w-[600px] h-[600px]" strokeWidth={1} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary p-2 rounded-xl">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tighter uppercase">
                CAFÉ BAR RESTAURANTE <span className="text-primary italic">ASIÁTICO</span>
              </span>
            </div>
            <p className="text-stone-400 text-lg leading-relaxed mb-8 max-w-md">
              Llevamos el auténtico sabor de Oriente a Huércal-Overa. Una tradición familiar dedicada a la excelencia gastronómica asiática.
            </p>
            <div className="inline-flex items-center gap-3 bg-stone-900 border border-stone-800 px-6 py-4 rounded-2xl">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-widest text-stone-200">Solo Recogida en Local</span>
            </div>
          </div>

          {/* Info Column */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-10">Información</h3>
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-black uppercase tracking-widest text-stone-500 mb-1">Dirección</p>
                  <p className="text-stone-200">Calle Carretera Nacional nº340 local 144,<br />04600 Huércal-Overa, Almería</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-black uppercase tracking-widest text-stone-500 mb-1">Horario</p>
                  <p className="text-stone-200">Lun, Mié - Dom: 11:00 - 15:30 / 18:30 - 23:00</p>
                  <p className="text-primary font-bold mt-1 uppercase text-xs tracking-widest">Martes Cerrado</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-black uppercase tracking-widest text-stone-500 mb-1">Teléfonos</p>
                  <a href="tel:+34950793336" className="text-stone-200 hover:text-primary transition-colors">950 79 33 36</a><br />
                  <a href="tel:+34630099409" className="text-stone-200 hover:text-primary transition-colors">630 09 94 09</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-10">Enlaces</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-stone-400 hover:text-white transition-colors text-lg font-bold">Inicio</Link>
              </li>
              <li>
                <Link href="/menu" className="text-stone-400 hover:text-white transition-colors text-lg font-bold">Nuestra Carta</Link>
              </li>
              <li>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-white transition-colors text-lg font-bold">Cómo llegar</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-900 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Restaurante Chino Asiático. Huércal-Overa.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-stone-600">
            <span>Aviso Legal</span>
            <span>Privacidad</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
