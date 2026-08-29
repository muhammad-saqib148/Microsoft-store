import React, { useState } from 'react';
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
  ChevronDown
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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

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
    { label: 'Free only', min: 0, max: 0, onlyFree: true },
    { label: 'Under $30', min: 0, max: 30 },
    { label: '$30 to $100', min: 30, max: 100 },
    { label: '$100 to $500', min: 100, max: 500 },
    { label: '$500+', min: 500, max: 2500 },
  ];

  const ratingOptions = [
    { label: 'Any Rating', value: 0 },
    { label: '4.5 & up ★', value: 4.5 },
    { label: '4.0 & up ★', value: 4.0 },
    { label: '3.5 & up ★', value: 3.5 },
  ];

  return (
    <section id="catalog-browse-section" className="py-6 bg-[#f8f9fa] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Section Header with Live Search & Tabs */}
        <div className="mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-neutral-200">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0067b8]">
                Store Catalog
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mt-0.5">
                Browse & Discover
              </h2>
              <p className="text-xs text-neutral-500 mt-0.2">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Category Navigation Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
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
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0067b8] text-white shadow-2xs'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subcategories Scroll Bar (if available) */}
          {availableSubcategories.length > 0 && (
            <div className="flex items-center gap-1.5 pt-2.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-medium text-neutral-400 shrink-0">Subcategory:</span>
              <button
                onClick={() => setFilters(prev => ({ ...prev, subcategory: 'all' }))}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
                  filters.subcategory === 'all'
                    ? 'bg-neutral-800 text-white'
                    : 'bg-neutral-200/80 text-neutral-700 hover:bg-neutral-300'
                }`}
              >
                All
              </button>
              {availableSubcategories.map((subcat) => (
                <button
                  key={subcat}
                  onClick={() => setFilters(prev => ({ ...prev, subcategory: subcat }))}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
                    filters.subcategory === subcat
                      ? 'bg-neutral-800 text-white'
                      : 'bg-neutral-200/80 text-neutral-700 hover:bg-neutral-300'
                  }`}
                >
                  {subcat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Bar Controls & View Mode */}
        <div className="bg-white rounded-lg border border-neutral-200 p-2.5 mb-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            
            {/* Search within catalog */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <input
                type="text"
                placeholder="Filter by keyword (e.g. Surface, 4K, AI)..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-md text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-[#0067b8] focus:ring-1 focus:ring-[#0067b8]/30 outline-hidden transition-all"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick Checkboxes (Deals Only, Free Only, Game Pass) */}
            <div className="flex items-center gap-2.5 text-xs font-medium text-neutral-700">
              <label className="inline-flex items-center gap-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.onlyDeals}
                  onChange={(e) => setFilters(prev => ({ ...prev, onlyDeals: e.target.checked }))}
                  className="rounded border-neutral-300 text-[#0067b8] focus:ring-[#0067b8] w-3.5 h-3.5"
                />
                <span>On Sale</span>
              </label>

              <label className="inline-flex items-center gap-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.onlyFree}
                  onChange={(e) => setFilters(prev => ({ ...prev, onlyFree: e.target.checked }))}
                  className="rounded border-neutral-300 text-[#0067b8] focus:ring-[#0067b8] w-3.5 h-3.5"
                />
                <span>Free Downloads</span>
              </label>

              <label className="hidden sm:inline-flex items-center gap-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.gamePassOnly}
                  onChange={(e) => setFilters(prev => ({ ...prev, gamePassOnly: e.target.checked }))}
                  className="rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                <span>Game Pass</span>
              </label>
            </div>

            {/* Sort By Dropdown & Grid Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-neutral-500 hidden sm:inline">Sort:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  className="px-2 py-1 bg-neutral-50 border border-neutral-200 rounded-md text-xs font-medium text-neutral-800 focus:border-[#0067b8] focus:outline-hidden cursor-pointer"
                >
                  <option value="featured">Featured / Best Match</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Releases</option>
                </select>
              </div>

              {/* Grid / List View Toggle */}
              <div className="flex items-center border border-neutral-200 rounded-md p-0.5 bg-neutral-50">
                <button
                  onClick={() => setLayoutMode('grid')}
                  className={`p-1 rounded transition-colors ${
                    layoutMode === 'grid'
                      ? 'bg-white shadow-2xs text-[#0067b8]'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                  aria-label="Grid layout"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setLayoutMode('list')}
                  className={`p-1 rounded transition-colors ${
                    layoutMode === 'list'
                      ? 'bg-white shadow-2xs text-[#0067b8]'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                  aria-label="List layout"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Reset Filters */}
              {(filters.searchQuery || filters.subcategory !== 'all' || filters.onlyDeals || filters.onlyFree || filters.minRating > 0 || filters.maxPrice < 2500) && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-neutral-500 hover:text-rose-600 flex items-center gap-1 font-medium p-1 cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Product Grid / List or Empty State */}
        {filteredProducts.length > 0 ? (
          layoutMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout="list" />
              ))}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center max-w-md mx-auto shadow-2xs">
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400 mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">
              No products found
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
              We couldn't find any results matching your search or active filters. Try broadening your keywords or resetting filters.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={resetFilters}
                className="px-3.5 py-1.5 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-semibold rounded-md shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
