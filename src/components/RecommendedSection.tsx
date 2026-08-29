import React, { useState } from 'react';
import { Star, Flame, Award, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const RecommendedSection: React.FC = () => {
  const { products, activeCategory } = useStore();
  const [filterType, setFilterType] = useState<'recommended' | 'bestsellers' | 'trending'>('recommended');

  const displayedProducts = React.useMemo(() => {
    if (filterType === 'bestsellers') {
      return products.filter((p) => p.bestSeller || p.reviewCount > 1000).slice(0, 4);
    }
    if (filterType === 'trending') {
      return products.filter((p) => p.isDeal || p.rating >= 4.8).slice(0, 4);
    }
    // Recommended
    return products.filter((p) => p.featured || p.badge).slice(0, 4);
  }, [products, filterType]);

  return (
    <section id="recommended-section" className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 md:py-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated For You</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Recommended & Best Sellers
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Top-rated devices, bestselling digital licenses, and highly recommended Windows essentials
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-neutral-200/80 dark:bg-neutral-800 p-1 rounded-xl shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setFilterType('recommended')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'recommended'
                ? 'bg-white dark:bg-[#202020] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Recommended
          </button>
          <button
            onClick={() => setFilterType('bestsellers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              filterType === 'bestsellers'
                ? 'bg-white dark:bg-[#202020] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span>Best Sellers</span>
          </button>
          <button
            onClick={() => setFilterType('trending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              filterType === 'trending'
                ? 'bg-white dark:bg-[#202020] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-sky-500" />
            <span>Top Rated</span>
          </button>
        </div>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {displayedProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} layout="grid" />
        ))}
      </div>
    </section>
  );
};
