import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';

interface ProductSectionSliderProps {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  products: Product[];
  categoryFilter?: ProductCategory;
  viewAllAction?: () => void;
}

export const ProductSectionSlider: React.FC<ProductSectionSliderProps> = ({
  id,
  title,
  subtitle,
  badge,
  products,
  categoryFilter,
  viewAllAction
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { setActiveCategory, setFilters } = useStore();

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleViewAll = () => {
    if (viewAllAction) {
      viewAllAction();
    } else if (categoryFilter) {
      setActiveCategory(categoryFilter);
      setFilters(prev => ({ ...prev, category: categoryFilter, subcategory: 'all' }));
      const el = document.getElementById('catalog-browse-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <section id={id} className="py-5 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Section Top Header */}
        <div className="flex items-end justify-between mb-3.5">
          <div>
            {badge && (
              <span className="text-[9px] font-bold text-[#0067b8] uppercase tracking-wider bg-sky-50 px-1.5 py-0.2 rounded mb-0.5 inline-block border border-sky-100">
                {badge}
              </span>
            )}
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-neutral-500 mt-0.2">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* View All Button */}
            <button
              onClick={handleViewAll}
              className="text-xs font-semibold text-[#0067b8] hover:underline flex items-center gap-1 mr-1.5 cursor-pointer"
            >
              <span>See all</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            {/* Slider Arrow Buttons */}
            <button
              onClick={() => handleScroll('left')}
              className="p-1.5 rounded-md border border-neutral-200 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors shadow-2xs cursor-pointer focus:outline-hidden"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-1.5 rounded-md border border-neutral-200 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors shadow-2xs cursor-pointer focus:outline-hidden"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto pb-2 pt-0.5 snap-x scrollbar-none no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[220px] sm:min-w-[240px] max-w-[240px] snap-start shrink-0"
            >
              <ProductCard product={product} layout="grid" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
