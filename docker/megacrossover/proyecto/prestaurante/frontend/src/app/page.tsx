import Link from "next/link";
import Image from "next/image";
import { Clock, Phone, MapPin, ChevronRight, Star, Utensils } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/interior.jpg"
            alt="Interior del Restaurante"
            fill
            className="object-cover opacity-40 scale-105 animate-pulse-slow"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-2 rounded-full mb-8">
              <Star className="h-4 w-4 text-secondary fill-secondary" />
              <span className="text-secondary text-xs font-black uppercase tracking-[0.2em]">Sabor Auténtico</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
              CAFE BAR <br />
              RESTAURANTE <br />
              <span className="text-primary italic">ASIÁTICO</span>
            </h1>
            
            <p className="text-xl text-white/70 max-w-xl mb-12 leading-relaxed">
              Desde el corazón de Huércal-Overa, te traemos la esencia de la cocina tradicional asiática. Recetas de familia, preparadas con alma.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-black text-lg hover:bg-accent transition-all hover:scale-105 shadow-2xl shadow-primary/40 group"
              >
                Explorar Carta
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+34950793336"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full font-black text-lg hover:bg-white/20 transition-all"
              >
                Llamar para Pedir
              </a>
            </div>
          </div>
        </div>

        {/* Floating Info */}
        <div className="absolute bottom-12 left-0 w-full z-10 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-panel rounded-3xl p-8 grid grid-cols-3 gap-8 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Ubicación</p>
                  <p className="font-bold text-foreground">Ctra. Nacional 340, Local 144</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-x border-muted px-8">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Horario</p>
                  <p className="font-bold text-foreground">11:00-15:30 / 18:30-23:00</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Servicio</p>
                  <p className="font-bold text-foreground">Solo Recogida en Local</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Banner */}
      <section className="bg-muted py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-[3rem] p-12 md:p-24 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 border border-secondary/20">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-4">¿LISTO PARA PEDIR?</h2>
              <p className="text-xl text-muted-foreground">Llámanos y preparamos tu pedido para recoger.</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm font-black text-primary uppercase tracking-widest mb-4">Teléfonos de pedidos</p>
              <div className="flex flex-col items-center gap-2">
                <a href="tel:+34950793336" className="text-4xl md:text-6xl font-black text-foreground hover:text-primary transition-colors tracking-tighter">
                  950 79 33 36
                </a>
                <a href="tel:+34630099409" className="text-4xl md:text-6xl font-black text-foreground hover:text-primary transition-colors tracking-tighter">
                  630 09 94 09
                </a>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Cerrado los Martes
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
