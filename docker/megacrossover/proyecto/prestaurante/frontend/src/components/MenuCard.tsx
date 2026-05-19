"use client";

import {  } from "lucide-react";

interface MenuCardProps {
  num?: number | string;
  name: string;
  description?: string;
  price: number;
  isPopular?: boolean;
}

export default function MenuCard({ num, name, description, price, isPopular }: MenuCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-stone-100 p-5 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-secondary/30 hover:-translate-y-1">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {isPopular && (
              <span className="bg-primary/10 text-primary text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                Popular
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
            {name}
          </h3>
          {description && (
            <p className="text-muted-foreground text-xs mt-1 leading-relaxed line-clamp-2 italic">
              {description}
            </p>
          )}
        </div>
        
        <div className="flex flex-col items-end shrink-0">
          <span className="text-xl font-black text-foreground tabular-nums">
            {typeof price === 'number' ? price.toFixed(2) : price}<span className="text-xs ml-0.5">€</span>
          </span>
        </div>
      </div>
    </div>
  );
}
