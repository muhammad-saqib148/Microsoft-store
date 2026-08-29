import React, { useState, useEffect } from 'react';
import { Tag, Clock, Sparkles, ArrowRight, Percent, CheckCircle2, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const DealsSection: React.FC = () => {
  const { products, quickViewProduct } = useStore();

  // Limited time countdown simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter(p => p.isDeal).slice(0, 4);

  return (
    <section id="deals-section" className="py-6 bg-gradient-to-b from-amber-500/10 via-amber-50/30 to-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Deal Header Banner */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-xl p-4 sm:p-5 shadow-lg mb-4 relative overflow-hidden">
          {/* Subtle background art */}
          <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none hidden lg:block">
            <Tag className="w-36 h-36 text-white" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1.5 border border-amber-400/30">
                <Sparkles className="w-3 h-3" />
                <span>Limited-Time Store Event</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Super Savings & Daily Deals
              </h2>
              <p className="text-xs text-neutral-300 mt-1 max-w-lg leading-relaxed">
                Save up to 50% on select Surface devices, top Xbox games, digital movies, and productivity essentials with free express shipping.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-lg p-3 shrink-0 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] text-amber-300 font-semibold uppercase tracking-wider mb-1.5">
                <Clock className="w-3 h-3" />
                <span>Offers End In</span>
              </div>
              <div className="flex items-center gap-1.5 text-white">
                <div className="bg-black/60 px-2.5 py-1 rounded text-center min-w-[42px]">
                  <span className="text-base font-extrabold font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[8px] uppercase tracking-wider text-neutral-400">Hours</span>
                </div>
                <span className="text-base font-bold text-amber-400">:</span>
                <div className="bg-black/60 px-2.5 py-1 rounded text-center min-w-[42px]">
                  <span className="text-base font-extrabold font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[8px] uppercase tracking-wider text-neutral-400">Mins</span>
                </div>
                <span className="text-base font-bold text-amber-400">:</span>
                <div className="bg-black/60 px-2.5 py-1 rounded text-center min-w-[42px]">
                  <span className="text-base font-extrabold font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[8px] uppercase tracking-wider text-neutral-400">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} layout="grid" />
          ))}
        </div>

      </div>
    </section>
  );
};
