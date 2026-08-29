import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Package, 
  Tag, 
  Award, 
  ArrowRight,
  Monitor,
  Gamepad2,
  LayoutGrid,
  Laptop,
  Headphones,
  Film,
  Sun,
  Moon,
  Clock,
  Trash2,
  Flame,
  Check
} from 'lucide-react';
import { MicrosoftLogo } from './MicrosoftLogo';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';

export const Navbar: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    filters,
    setFilters,
    products,
    quickViewProduct,
    openProductDetails,
    theme,
    toggleTheme,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    user
  } = useStore();

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const navLinks: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Products', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'apps', label: 'Apps', icon: <Monitor className="w-4 h-4" /> },
    { id: 'games', label: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'devices', label: 'Devices', icon: <Laptop className="w-4 h-4" /> },
    { id: 'accessories', label: 'Accessories', icon: <Headphones className="w-4 h-4" /> },
    { id: 'entertainment', label: 'Entertainment', icon: <Film className="w-4 h-4" /> },
    { id: 'deals', label: 'Deals & Savings', icon: <Tag className="w-4 h-4" /> },
  ];

  const popularSearches = [
    'Surface Pro 11',
    'Copilot Pro',
    'Xbox Game Pass',
    'Flight Simulator 2024',
    'Visual Studio',
    'Surface Laptop 7'
  ];

  // Quick suggestions based on searchInput
  const searchSuggestions = React.useMemo(() => {
    if (!searchInput.trim()) return [];
    const query = searchInput.toLowerCase();
    return products
      .filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.subcategory.toLowerCase().includes(query) ||
        p.developer?.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [searchInput, products]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim();
    if (query) {
      addRecentSearch(query);
      setFilters(prev => ({
        ...prev,
        searchQuery: query
      }));
    }
    setIsSearchFocused(false);
    // Smooth scroll to catalog
    const catalogEl = document.getElementById('catalog-browse-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSuggestionClick = (product: any) => {
    addRecentSearch(product.title);
    quickViewProduct(product);
    setIsSearchFocused(false);
  };

  const handlePopularSearchClick = (keyword: string) => {
    setSearchInput(keyword);
    addRecentSearch(keyword);
    setFilters(prev => ({
      ...prev,
      searchQuery: keyword
    }));
    setIsSearchFocused(false);
    const catalogEl = document.getElementById('catalog-browse-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close account menu on outside click or escape key
  useEffect(() => {
    const handleAccountClickOutside = (event: MouseEvent | TouchEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAccountMenuOpen(false);
      }
    };

    if (accountMenuOpen) {
      document.addEventListener('mousedown', handleAccountClickOutside);
      document.addEventListener('touchstart', handleAccountClickOutside);
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleAccountClickOutside);
      document.removeEventListener('touchstart', handleAccountClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [accountMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#1f1f1f]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-2xs transition-colors duration-200">
      {/* Top Banner */}
      <div id="top-announcement-bar" className="bg-[#0067b8] dark:bg-[#005da6] text-white text-[11px] font-medium py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-white/20 px-1.5 py-0.2 rounded text-[10px] font-bold tracking-wider uppercase">
              Special Offer
            </span>
            <span className="truncate">Free 2-3 day delivery & 60-day price guarantee on all Surface Copilot+ PCs & Xbox</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[11px]">
            <button 
              onClick={() => {
                setActiveCategory('deals');
                const el = document.getElementById('deals-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Explore Deals</span>
            </button>
            <span className="text-white/40">|</span>
            <div className="flex items-center gap-1 text-sky-100">
              <Award className="w-3 h-3 text-yellow-300" />
              <span>{user.rewardsPoints.toLocaleString()} Rewards pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 gap-3">
          
          {/* Left: Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-menu-toggle-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 -ml-1 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-hidden focus:ring-1 focus:ring-[#0067b8]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button 
              id="main-store-home-link"
              onClick={() => {
                setActiveCategory('all');
                setFilters(prev => ({ ...prev, searchQuery: '', category: 'all' }));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer focus:outline-hidden group flex items-center"
            >
              <MicrosoftLogo size={20} textSize="text-lg" />
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = activeCategory === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => {
                    setActiveCategory(link.id);
                    setFilters(prev => ({
                      ...prev,
                      category: link.id,
                      subcategory: 'all'
                    }));
                    if (link.id !== 'all') {
                      const el = document.getElementById('catalog-browse-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 relative flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-[#0067b8] dark:text-[#60cdff] bg-sky-50 dark:bg-sky-950/40 shadow-2xs'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/90 dark:hover:bg-neutral-800'
                  }`}
                >
                  {link.id === 'deals' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  )}
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#0067b8] dark:bg-[#60cdff] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Search, Dark Mode, Wishlist, Cart, Profile */}
          <div className="flex items-center gap-2">
            
            {/* Search Box */}
            <div ref={searchContainerRef} className="relative hidden sm:block w-48 md:w-60 lg:w-72">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    id="desktop-search-input"
                    type="text"
                    placeholder="Search apps, games, Surface..."
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setIsSearchFocused(true);
                    }}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full pl-8 pr-7 py-1.5 text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-100/80 dark:hover:bg-neutral-750 focus:bg-white dark:focus:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:border-[#0067b8] dark:focus:border-[#60cdff] focus:ring-1 focus:ring-[#0067b8] dark:focus:ring-[#60cdff] rounded-lg transition-all text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 outline-hidden"
                  />
                  <Search className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchInput('');
                        setFilters(prev => ({ ...prev, searchQuery: '' }));
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-0.5 rounded cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </form>

              {/* Instant Search Dropdown Suggestions & History */}
              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#202020] rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden z-50 divide-y divide-neutral-100 dark:divide-neutral-800"
                  >
                    {/* Live Matching Results */}
                    {searchSuggestions.length > 0 && (
                      <div>
                        <div className="p-2 bg-neutral-50/90 dark:bg-neutral-800/80 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider px-3">
                          Matching Products
                        </div>
                        <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60 max-h-60 overflow-y-auto">
                          {searchSuggestions.map((product) => (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => handleSuggestionClick(product)}
                              className="w-full px-3 py-2 flex items-center gap-2.5 hover:bg-sky-50/70 dark:hover:bg-neutral-800 transition-colors text-left group cursor-pointer"
                            >
                              <img
                                src={product.image}
                                alt={product.title}
                                className="w-8 h-8 rounded-lg object-cover bg-neutral-100 dark:bg-neutral-800 shrink-0 border border-neutral-200 dark:border-neutral-700"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-neutral-900 dark:text-white truncate group-hover:text-[#0067b8] dark:group-hover:text-[#60cdff]">
                                  {product.title}
                                </p>
                                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                                  {product.subcategory} • {product.developer}
                                </p>
                              </div>
                              <span className="text-xs font-extrabold text-neutral-900 dark:text-white shrink-0">
                                {product.isFree ? 'Free' : `$${product.price.toFixed(2)}`}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div className="p-3">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                        <Flame className="w-3 h-3 text-amber-500" />
                        <span>Popular Searches</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {popularSearches.map((keyword, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handlePopularSearchClick(keyword)}
                            className="px-2 py-1 rounded-md text-[11px] bg-neutral-100 dark:bg-neutral-800 hover:bg-[#0067b8] hover:text-white dark:hover:bg-[#0067b8] text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                          >
                            {keyword}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="p-3 bg-neutral-50/50 dark:bg-neutral-900/30">
                        <div className="flex items-center justify-between text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            <span>Recent Searches</span>
                          </div>
                          <button
                            type="button"
                            onClick={clearRecentSearches}
                            className="text-[10px] text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="space-y-1">
                          {recentSearches.slice(0, 3).map((term, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between py-1 text-xs text-neutral-700 dark:text-neutral-300 hover:text-[#0067b8] dark:hover:text-[#60cdff]"
                            >
                              <button
                                type="button"
                                onClick={() => handlePopularSearchClick(term)}
                                className="text-left flex-1 truncate cursor-pointer"
                              >
                                {term}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeRecentSearch(term)}
                                className="text-neutral-400 hover:text-neutral-600 p-0.5 cursor-pointer"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleSearchSubmit}
                      className="w-full py-2 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-center text-xs font-bold text-[#0067b8] dark:text-[#60cdff] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>View all results for &ldquo;{searchInput || 'catalog'}&rdquo;</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Search Toggle */}
            <button
              id="mobile-search-toggle"
              onClick={() => setSearchOpen(!searchOpen)}
              className="sm:hidden p-1.5 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-hidden cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle-button"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-hidden cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700 animate-in spin-in-180 duration-200" />
              )}
            </button>

            {/* Wishlist Button */}
            <button
              id="wishlist-trigger-button"
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors relative focus:outline-hidden cursor-pointer"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-600 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border-2 border-white dark:border-neutral-900 shadow-sm"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="cart-trigger-button"
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/90 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-100 transition-all relative flex items-center gap-2 focus:outline-hidden cursor-pointer group border border-neutral-200 dark:border-neutral-700"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 text-neutral-700 dark:text-neutral-300 group-hover:text-[#0067b8] dark:group-hover:text-[#60cdff] transition-colors" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2.5 min-w-[17px] h-[17px] px-1 bg-[#0067b8] dark:bg-[#0078d4] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-neutral-900 shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </div>
              <span className="hidden md:inline text-xs font-bold text-neutral-800 dark:text-neutral-200">
                Cart
              </span>
            </button>

            {/* User Account / Profile */}
            <div className="relative" ref={accountMenuRef}>
              <button
                id="user-profile-menu-button"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-hidden cursor-pointer"
                aria-label="Account Settings"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-neutral-300 dark:ring-neutral-700 shadow-2xs"
                />
                <ChevronDown className="w-3 h-3 text-neutral-500 dark:text-neutral-400 hidden sm:block" />
              </button>

              {/* Account Dropdown */}
              <AnimatePresence>
                {accountMenuOpen && (
                  <motion.div 
                    id="user-account-dropdown"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#202020] rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 p-3.5 z-50 divide-y divide-neutral-100 dark:divide-neutral-800"
                  >
                    <div className="flex items-center gap-3 pb-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0067b8]/30 dark:ring-[#60cdff]/30 shadow-xs"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-extrabold text-neutral-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 truncate">{user.email}</p>
                        <p className="text-[10px] text-[#0067b8] dark:text-[#60cdff] font-bold">{user.phone}</p>
                      </div>
                    </div>

                    {/* Rewards Widget */}
                    <div className="py-2.5">
                      <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                            <Award className="w-3.5 h-3.5" />
                            {user.tier}
                          </span>
                          <span className="font-extrabold text-amber-800 dark:text-amber-300">{user.rewardsPoints.toLocaleString()} pts</span>
                        </div>
                      </div>
                    </div>

                    <div className="py-2 space-y-1">
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          setIsCartOpen(true);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Package className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                        <span>My Orders & Cart ({cartCount})</span>
                      </button>
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          setIsWishlistOpen(true);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                        <span>Saved Wishlist ({wishlist.length})</span>
                      </button>
                    </div>

                    <div className="pt-2">
                      <p className="text-[10px] text-neutral-400 text-center">
                        Microsoft Account Connected
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Mobile Search Bar (Collapsible) */}
        {searchOpen && (
          <div className="sm:hidden py-2 border-t border-neutral-100 dark:border-neutral-800 pb-3">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Microsoft Store..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-500 outline-hidden focus:ring-2 focus:ring-[#0067b8]"
                  autoFocus
                />
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile-navigation-drawer" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 top-[97px] bg-black/50 backdrop-blur-xs z-30 flex"
          >
            <motion.div 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2 }}
              className="w-4/5 max-w-xs bg-white dark:bg-[#1f1f1f] text-neutral-900 dark:text-white h-full shadow-2xl p-4 overflow-y-auto flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-3 py-2">
                  Browse Microsoft Store
                </div>
                {navLinks.map((link) => {
                  const isActive = activeCategory === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        setActiveCategory(link.id);
                        setMobileMenuOpen(false);
                        const el = document.getElementById('catalog-browse-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-sky-50 dark:bg-sky-950/50 text-[#0067b8] dark:text-[#60cdff]'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {link.icon}
                        <span>{link.label}</span>
                      </div>
                      {link.id === 'deals' && (
                        <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Hot
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 mt-6 space-y-3">
                <div className="flex items-center justify-between px-3 py-2 bg-neutral-50 dark:bg-neutral-850 rounded-xl">
                  <span className="text-xs font-semibold">Appearance</span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 shadow-xs border border-neutral-200 dark:border-neutral-700"
                  >
                    {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                    <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-850 rounded-xl">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{user.rewardsPoints} Rewards Pts</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full py-2.5 bg-[#0067b8] hover:bg-[#005da6] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Open Cart ({cartCount})</span>
                </button>
              </div>
            </motion.div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
