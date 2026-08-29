import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Filter, 
  Search, 
  X, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  Star, 
  Tag, 
  Sparkles,
  Check,
  ChevronDown,
  Gamepad2,
  DollarSign
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../types';

export const CatalogBrowse: React.FC = () => {
  const {
    filters,
    setFilters,
    resetFilters,
    filteredProducts,
    activeCategory,
    setActiveCategory,
    products
  } = useStore();

  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'apps', label: 'Apps' },
    { id: 'games', label: 'Games' },
    { id: 'devices', label: 'Surface & PCs' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'entertainment', label: 'Movies & TV' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'deals', label: 'Special Deals' },
  ];

  // Derive available subcategories based on category
  const availableSubcategories = React.useMemo(() => {
    const list = new Set<string>();
    products.forEach(p => {
      if (filters.category === 'all' || p.category === filters.category) {
        if (p.subcategory) list.add(p.subcategory);
      }
    });
    return Array.from(list);
  }, [products, filters.category]);

  const pricePresets = [
    { label: 'All Prices', min: 0, max: 2500 },
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 to $200', min: 50, max: 200 },
    { label: '$200 to $800', min: 200, max: 800 },
    { label: '$800+', min: 800, max: 2500 },
  ];

  const ratingOptions = [
    { label: 'Any Rating', value: 0 },
    { label: '4.5 & up ★', value: 4.5 },
    { label: '4.0 & up ★', value: 4.0 },
    { label: '3.5 & up ★', value: 3.5 },
  ];

  // Active filters count & list
  const hasActiveFilters = Boolean(
    filters.searchQuery ||
    filters.subcategory !== 'all' ||
    filters.onlyDeals ||
    filters.onlyFree ||
    filters.gamePassOnly ||
    filters.minRating > 0 ||
    filters.maxPrice < 2500 ||
    filters.minPrice > 0
  );

  return (
    <section id="catalog-browse-section" className="py-8 md:py-12 bg-white dark:bg-[#191919] border-t border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Section Header with Live Search & Tabs */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0067b8] dark:text-[#60cdff]">
                Complete Store Catalog
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1">
                Explore All Products
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Showing <strong className="text-neutral-900 dark:text-white">{filteredProducts.length}</strong> of {products.length} verified products
              </p>
            </div>

            {/* Category Navigation Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((c) => {
                const isSelected = filters.category === c.id;
                return (
                  <button
                    key={c.id}
                    id={`catalog-tab-${c.id}`}
                    onClick={() => {
                      setActiveCategory(c.id);
                      setFilters(prev => ({
                        ...prev,
                        category: c.id,
                        subcategory: 'all'
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0067b8] dark:bg-[#0078d4] text-white shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700'
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subcategories Scroll Bar */}
          {availableSubcategories.length > 0 && (
            <div className="flex items-center gap-2 pt-3 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 shrink-0">Subcategory:</span>
              <button
                onClick={() => setFilters(prev => ({ ...prev, subcategory: 'all' }))}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                  filters.subcategory === 'all'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                All Subcategories
              </button>
              {availableSubcategories.map((subcat) => (
                <button
                  key={subcat}
                  onClick={() => setFilters(prev => ({ ...prev, subcategory: subcat }))}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                    filters.subcategory === subcat
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {subcat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Bar Controls & View Mode */}
        <div className="bg-neutral-50 dark:bg-[#202020] rounded-2xl border border-neutral-200 dark:border-neutral-700/80 p-3 sm:p-4 mb-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Search within catalog */}
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <input
                type="text"
                placeholder="Filter by keyword (e.g. Surface, 4K, AI, Controller)..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-[#0067b8] dark:focus:border-[#60cdff] focus:ring-1 focus:ring-[#0067b8] outline-hidden transition-all"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Checkboxes (Deals Only, Free Only, Game Pass) */}
            <div className="flex items-center gap-3 text-xs font-bold text-neutral-700 dark:text-neutral-300 flex-wrap">
              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none bg-white dark:bg-neutral-850 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <input
                  type="checkbox"
                  checked={filters.onlyDeals}
                  onChange={(e) => setFilters(prev => ({ ...prev, onlyDeals: e.target.checked }))}
                  className="rounded border-neutral-300 text-[#0067b8] focus:ring-[#0067b8] w-3.5 h-3.5"
                />
                <span>On Sale</span>
              </label>

              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none bg-white dark:bg-neutral-850 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <input
                  type="checkbox"
                  checked={filters.onlyFree}
                  onChange={(e) => setFilters(prev => ({ ...prev, onlyFree: e.target.checked }))}
                  className="rounded border-neutral-300 text-[#0067b8] focus:ring-[#0067b8] w-3.5 h-3.5"
                />
                <span>Free</span>
              </label>

              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none bg-white dark:bg-neutral-850 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <input
                  type="checkbox"
                  checked={filters.gamePassOnly}
                  onChange={(e) => setFilters(prev => ({ ...prev, gamePassOnly: e.target.checked }))}
                  className="rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                <span className="text-emerald-700 dark:text-emerald-400">Game Pass</span>
              </label>

              {/* Advanced Filter Drawer Button */}
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showAdvancedFilters
                    ? 'bg-[#0067b8] text-white border-[#0067b8]'
                    : 'bg-white dark:bg-neutral-850 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Sort By Dropdown & Grid Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 hidden sm:inline">Sort:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  className="px-2.5 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs font-bold text-neutral-800 dark:text-neutral-200 focus:border-[#0067b8] focus:outline-hidden cursor-pointer"
                >
                  <option value="featured">Featured / Best Match</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated (★)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Releases</option>
                </select>
              </div>

              {/* Grid / List View Toggle */}
              <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-xl p-0.5 bg-white dark:bg-neutral-900">
                <button
                  onClick={() => setLayoutMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    layoutMode === 'grid'
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-[#0067b8] dark:text-[#60cdff]'
                      : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                  }`}
                  aria-label="Grid layout"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayoutMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    layoutMode === 'list'
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-[#0067b8] dark:text-[#60cdff]'
                      : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                  }`}
                  aria-label="List layout"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-neutral-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 font-bold p-1 cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>

          </div>

          {/* Collapsible Advanced Filters Panel */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {/* Price Filter Presets */}
                <div>
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2">
                    Price Range
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {pricePresets.map((preset, idx) => {
                      const isActive = filters.minPrice === preset.min && filters.maxPrice === preset.max;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFilters(prev => ({ ...prev, minPrice: preset.min, maxPrice: preset.max }))}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-[#0067b8] text-white'
                              : 'bg-white dark:bg-neutral-850 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2">
                    Minimum Customer Rating
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {ratingOptions.map((opt, idx) => {
                      const isActive = filters.minRating === opt.value;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFilters(prev => ({ ...prev, minRating: opt.value }))}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-amber-500 text-white'
                              : 'bg-white dark:bg-neutral-850 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Reset button inside panel */}
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear All Filter Selections</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filter Chips Bar */}
          {hasActiveFilters && (
            <div className="flex items-center gap-1.5 flex-wrap pt-3 mt-3 border-t border-neutral-200 dark:border-neutral-700/60 text-xs">
              <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500">Active:</span>
              {filters.searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-[#0067b8] dark:text-[#60cdff] font-semibold text-[11px]">
                  &ldquo;{filters.searchQuery}&rdquo;
                  <button onClick={() => setFilters(p => ({ ...p, searchQuery: '' }))} className="hover:text-rose-500"><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.subcategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-[11px]">
                  {filters.subcategory}
                  <button onClick={() => setFilters(p => ({ ...p, subcategory: 'all' }))} className="hover:text-rose-500"><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.onlyDeals && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-semibold text-[11px]">
                  Deals Only
                  <button onClick={() => setFilters(p => ({ ...p, onlyDeals: false }))} className="hover:text-rose-500"><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.onlyFree && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px]">
                  Free Only
                  <button onClick={() => setFilters(p => ({ ...p, onlyFree: false }))} className="hover:text-rose-500"><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.gamePassOnly && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px]">
                  Game Pass
                  <button onClick={() => setFilters(p => ({ ...p, gamePassOnly: false }))} className="hover:text-rose-500"><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-semibold text-[11px]">
                  {filters.minRating}+ Stars
                  <button onClick={() => setFilters(p => ({ ...p, minRating: 0 }))} className="hover:text-rose-500"><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Product Grid / List or Empty State */}
        {filteredProducts.length > 0 ? (
          layoutMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout="list" />
              ))}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="bg-neutral-50 dark:bg-[#202020] rounded-2xl border border-neutral-200 dark:border-neutral-700 p-10 text-center max-w-md mx-auto shadow-xs">
            <div className="w-14 h-14 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto text-neutral-400 mb-3">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
              No products found
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs mx-auto leading-relaxed">
              We couldn&apos;t find any items matching your filters. Try clearing your search keyword or switching category tabs.
            </p>
            <div className="mt-5 flex justify-center gap-2">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
