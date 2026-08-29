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
  Film,
  Phone,
  Mail,
  UserCheck,
  ShieldCheck,
  ZoomIn,
  Camera,
  Upload,
  Image as ImageIcon
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
    user,
    setUser,
    addToast
  } = useStore();

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        addToast('File too large', 'Please select an image smaller than 10MB', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setUser({ ...user, avatar: result });
          addToast('Profile Photo Updated!', 'Your new portrait picture is now active across the entire store.', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
        setIsPhotoModalOpen(false);
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
                className="flex items-center gap-1.5 p-1 rounded-md hover:bg-neutral-100 transition-colors focus:outline-hidden cursor-pointer border border-transparent hover:border-neutral-200"
                aria-label="Account Settings"
                title="Account Settings & Profile"
              >
                <div className="relative group/avatar">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-neutral-300 group-hover/avatar:ring-[#0067b8]"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-white" />
                </div>
                <ChevronDown className="w-3 h-3 text-neutral-500 hidden sm:block" />
              </button>

              {/* Account Dropdown */}
              {accountMenuOpen && (
                <div 
                  id="user-account-dropdown"
                  className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-neutral-200 p-3.5 z-50 animate-in fade-in duration-150 text-left"
                >
                  <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
                    <button
                      onClick={() => {
                        setIsPhotoModalOpen(true);
                        setAccountMenuOpen(false);
                      }}
                      className="relative group cursor-pointer shrink-0 rounded-full focus:outline-hidden"
                      title="Click to view full photo"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-[#0067b8]/30 group-hover:ring-[#0067b8] transition-all"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-bold text-neutral-900 truncate">{user.name}</p>
                        <UserCheck className="w-3.5 h-3.5 text-[#0067b8] shrink-0" />
                      </div>
                      <p className="text-[10px] font-medium text-neutral-500 truncate">{user.email}</p>
                      <p className="text-[10px] text-[#0067b8] font-bold mt-0.5">{user.phone}</p>
                    </div>
                  </div>

                  {/* View Full Profile Picture & Upload Buttons */}
                  <div className="grid grid-cols-2 gap-1.5 mt-2">
                    <button
                      onClick={() => {
                        setIsPhotoModalOpen(true);
                        setAccountMenuOpen(false);
                      }}
                      className="py-1.5 px-2 text-[11px] font-semibold text-[#0067b8] bg-sky-50 hover:bg-sky-100 rounded-md border border-sky-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>View Photo</span>
                    </button>
                    <button
                      onClick={() => {
                        fileInputRef.current?.click();
                      }}
                      className="py-1.5 px-2 text-[11px] font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md border border-neutral-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Upload Pic</span>
                    </button>
                  </div>

                  {/* Rewards Widget */}
                  <div className="mt-2.5 p-2 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
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

                  <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-500">
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Verified
                    </span>
                    <span>Account Active</span>
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
      {/* Hidden file input for uploading profile picture */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
        id="profile-avatar-file-input"
      />

      {/* Full Photo Lightbox Modal - Opens on click, dismisses when clicking anywhere outside */}
      {isPhotoModalOpen && (
        <div 
          id="profile-photo-lightbox-modal"
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-sm sm:max-w-md w-full my-auto overflow-hidden shadow-2xl border border-neutral-200 relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title, Upload & Close Button */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 bg-neutral-50/90 shrink-0">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#0067b8]" />
                <span className="text-xs font-bold text-neutral-900">Muhammad Saqib Profile</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-[#0067b8] hover:text-[#005da6] bg-sky-50 hover:bg-sky-100 px-2 py-1 rounded-md border border-sky-200 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Upload picture from computer or phone"
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload Pic</span>
                </button>
                <button
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors cursor-pointer"
                  aria-label="Close photo preview"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Photo View Container with scroll if needed */}
            <div className="p-4 sm:p-5 flex flex-col items-center text-center overflow-y-auto">
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-2 ring-[#0067b8]/40 bg-neutral-900 group">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay with Change Photo action */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white cursor-pointer"
                  title="Click to choose a photo from your device"
                >
                  <Camera className="w-7 h-7" />
                  <span className="text-xs font-semibold bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs shadow-md">
                    Change / Upload Photo
                  </span>
                </button>

                <div className="absolute bottom-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Active Owner
                </div>
              </div>

              {/* Upload photo helper button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 w-full py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl border border-neutral-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#0067b8]" />
                <span>Upload Custom Photo (JPG / PNG)</span>
              </button>

              {/* User Bio Details */}
              <div className="mt-3.5 w-full">
                <div className="flex items-center justify-center gap-1.5">
                  <h3 className="text-lg font-extrabold text-neutral-900">{user.name}</h3>
                  <span className="bg-sky-100 text-[#0067b8] text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-200">
                    Admin
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">{user.tier}</p>

                {/* Contact cards */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-left text-xs bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Phone / WhatsApp</span>
                    <a 
                      href={`tel:${user.phone}`} 
                      className="font-bold text-neutral-900 hover:text-[#0067b8] transition-colors flex items-center gap-1 mt-0.5"
                    >
                      <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{user.phone}</span>
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Email Address</span>
                    <a 
                      href={`mailto:${user.email}`} 
                      className="font-bold text-[#0067b8] hover:underline transition-colors flex items-center gap-1 mt-0.5 truncate"
                    >
                      <Mail className="w-3 h-3 text-[#0067b8] shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </a>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-neutral-100 text-xs">
                  <span className="text-[11px] text-neutral-400">Click outside to close</span>
                  <button
                    onClick={() => setIsPhotoModalOpen(false)}
                    className="px-4 py-1.5 bg-[#0067b8] hover:bg-[#005da6] text-white font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
