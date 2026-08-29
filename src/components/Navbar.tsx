import React, { useState, useRef, useEffect } from 'react';
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
  Film
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

  // Quick suggestions based on searchInput
  const searchSuggestions = React.useMemo(() => {
    if (!searchInput.trim()) return [];
    const query = searchInput.toLowerCase();
    return products
      .filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.subcategory.toLowerCase().includes(query) ||
        p.developer?.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [searchInput, products]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      searchQuery: searchInput
    }));
    setIsSearchFocused(false);
    // Smooth scroll to catalog
    const catalogEl = document.getElementById('catalog-browse-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSuggestionClick = (product: any) => {
    quickViewProduct(product);
    setIsSearchFocused(false);
    setSearchInput('');
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-2xs transition-all">
      {/* Top Banner */}
      <div id="top-announcement-bar" className="bg-[#0067b8] text-white text-[11px] font-medium py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-white/20 px-1.5 py-0.2 rounded text-[10px] font-bold tracking-wider uppercase">
              Special Offer
            </span>
            <span className="truncate">Free 2-3 day shipping & 60-day price match on all Surface Copilot+ PCs & Xbox</span>
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
              className="lg:hidden p-1.5 -ml-1 rounded-md text-neutral-600 hover:bg-neutral-100 focus:outline-hidden focus:ring-1 focus:ring-[#0067b8]"
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
                  className={`px-2.5 py-1.5 rounded text-xs font-semibold transition-all duration-150 relative flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-[#0067b8] bg-sky-50 shadow-2xs'
                      : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/90'
                  }`}
                >
                  {link.id === 'deals' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  )}
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#0067b8] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Search, Wishlist, Cart, Profile */}
          <div className="flex items-center gap-2">
            
            {/* Search Box */}
            <div ref={searchContainerRef} className="relative hidden sm:block w-44 md:w-56 lg:w-64">
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
                    className="w-full pl-8 pr-7 py-1 text-xs bg-neutral-100 hover:bg-neutral-100/80 focus:bg-white border border-neutral-300 focus:border-[#0067b8] focus:ring-1 focus:ring-[#0067b8] rounded-md transition-all text-neutral-800 placeholder-neutral-500 outline-hidden"
                  />
                  <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchInput('');
                        setFilters(prev => ({ ...prev, searchQuery: '' }));
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5 rounded"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </form>

              {/* Instant Search Dropdown Suggestions */}
              {isSearchFocused && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="p-1.5 border-b border-neutral-100 text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-2.5">
                    Top Results
                  </div>
                  <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto">
                    {searchSuggestions.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => handleSuggestionClick(product)}
                        className="w-full px-2.5 py-1.5 flex items-center gap-2.5 hover:bg-sky-50/70 transition-colors text-left group cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-8 h-8 rounded object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-neutral-900 truncate group-hover:text-[#0067b8]">
                            {product.title}
                          </p>
                          <p className="text-[10px] text-neutral-500 truncate">
                            {product.subcategory} • {product.developer}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-neutral-900 shrink-0">
                          {product.isFree ? 'Free' : `$${product.price.toFixed(2)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full py-1.5 bg-neutral-50 hover:bg-neutral-100 text-center text-xs font-medium text-[#0067b8] border-t border-neutral-100 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View all matching items</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              id="mobile-search-toggle"
              onClick={() => setSearchOpen(!searchOpen)}
              className="sm:hidden p-1.5 rounded text-neutral-600 hover:bg-neutral-100 focus:outline-hidden"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Button */}
            <button
              id="wishlist-trigger-button"
              onClick={() => setIsWishlistOpen(true)}
              className="p-1.5 rounded-md text-neutral-700 hover:text-rose-600 hover:bg-rose-50 transition-colors relative focus:outline-hidden cursor-pointer"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="cart-trigger-button"
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-md bg-neutral-100 hover:bg-neutral-200/90 text-neutral-800 transition-all relative flex items-center gap-1.5 focus:outline-hidden cursor-pointer group border border-neutral-200"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 text-neutral-700 group-hover:text-[#0067b8] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-0.5 bg-[#0067b8] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white shadow-2xs animate-in zoom-in-50">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-xs font-semibold text-neutral-700">
                Cart
              </span>
            </button>

            {/* User Account / Profile */}
            <div className="relative" ref={accountMenuRef}>
              <button
                id="user-profile-menu-button"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-1.5 p-1 rounded-md hover:bg-neutral-100 transition-colors focus:outline-hidden cursor-pointer"
                aria-label="Account Settings"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-neutral-300"
                />
                <ChevronDown className="w-3 h-3 text-neutral-500 hidden sm:block" />
              </button>

              {/* Account Dropdown */}
              {accountMenuOpen && (
                <div 
                  id="user-account-dropdown"
                  className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-lg border border-neutral-200 p-3 z-50 animate-in fade-in duration-150"
                >
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-neutral-100">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-[#0067b8]/30"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-neutral-900 truncate">{user.name}</p>
                      <p className="text-[10px] font-medium text-neutral-500 truncate">{user.email}</p>
                      <p className="text-[10px] text-[#0067b8] font-semibold">{user.phone}</p>
                    </div>
                  </div>

                  {/* Rewards Widget */}
                  <div className="mt-2 p-2 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-amber-900 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        {user.tier}
                      </span>
                      <span className="font-bold text-amber-900">{user.rewardsPoints.toLocaleString()} pts</span>
                    </div>
                  </div>

                  <div className="mt-2 space-y-0.5">
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        const el = document.getElementById('catalog-browse-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded text-xs font-medium text-neutral-700 hover:bg-neutral-100 flex items-center gap-2 cursor-pointer"
                    >
                      <Package className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Order History</span>
                    </button>
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        setIsWishlistOpen(true);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded text-xs font-medium text-neutral-700 hover:bg-neutral-100 flex items-center gap-2 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Saved Items ({wishlist.length})</span>
                    </button>
                  </div>

                  <div className="mt-2 pt-2 border-t border-neutral-100">
                    <p className="text-[10px] text-neutral-400 text-center">
                      Microsoft Account Connected
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Search Bar (Collapsible) */}
        {searchOpen && (
          <div className="sm:hidden py-2 border-t border-neutral-100 pb-3">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Microsoft Store..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 outline-hidden focus:ring-2 focus:ring-[#0067b8]"
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
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="lg:hidden fixed inset-0 top-[97px] bg-black/40 backdrop-blur-xs z-30 flex">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-4 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider px-3 py-2">
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
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-sky-50 text-[#0067b8] font-bold'
                        : 'text-neutral-700 hover:bg-neutral-100'
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

            <div className="pt-4 border-t border-neutral-200 mt-6 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-neutral-900">{user.name}</p>
                  <p className="text-xs text-amber-600 font-semibold">{user.rewardsPoints} Rewards Pts</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-2.5 bg-[#0067b8] text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 shadow-xs"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Open Cart ({cartCount})</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
