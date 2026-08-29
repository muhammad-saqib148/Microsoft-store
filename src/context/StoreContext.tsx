import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  Product, 
  CartItem, 
  ProductVariant, 
  ProductCategory, 
  FilterState, 
  ToastNotification, 
  UserProfile, 
  Order 
} from '../types';
import { sampleProducts } from '../data/products';

interface StoreContextType {
  products: Product[];
  activeCategory: ProductCategory;
  setActiveCategory: (cat: ProductCategory) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartTotal: number;
  promoDiscount: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  addToCart: (product: Product, options?: { quantity?: number; color?: ProductVariant; storage?: ProductVariant; edition?: ProductVariant }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  
  // Filter & Search
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: Product[];
  
  // Modals & Navigation
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  placeOrder: (shippingInfo: any, paymentMethod: string) => Order;
  lastOrder: Order | null;
  
  // Toasts
  toasts: ToastNotification[];
  addToast: (title: string, message: string, type?: ToastNotification['type'], image?: string) => void;
  removeToast: (id: string) => void;
  
  // User Profile
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  quickViewProduct: (product: Product) => void;
  scrollToSection: (sectionId: string) => void;
}

const defaultFilters: FilterState = {
  category: 'all',
  subcategory: 'all',
  searchQuery: '',
  minPrice: 0,
  maxPrice: 2500,
  minRating: 0,
  onlyDeals: false,
  onlyFree: false,
  gamePassOnly: false,
  platform: 'all',
  sortBy: 'featured'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ms_store_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ms_store_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ms_store_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Filter state
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Toast state
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // User Profile
  const [user, setUser] = useState<UserProfile>({
    name: 'Alex Mercer',
    email: 'alex.mercer@outlook.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rewardsPoints: 4250,
    tier: 'Level 2 Microsoft Rewards'
  });

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ms_store_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ms_store_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('ms_store_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Sync category selection with filters
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: activeCategory
    }));
  }, [activeCategory]);

  const addToast = (title: string, message: string, type: ToastNotification['type'] = 'info', image?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type, image }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (
    product: Product,
    options?: {
      quantity?: number;
      color?: ProductVariant;
      storage?: ProductVariant;
      edition?: ProductVariant;
    }
  ) => {
    const quantity = options?.quantity || 1;
    const variantKey = `${product.id}-${options?.color?.id || 'def'}-${options?.storage?.id || 'def'}-${options?.edition?.id || 'def'}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === variantKey);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [
        ...prev,
        {
          id: variantKey,
          productId: product.id,
          product,
          quantity,
          selectedColor: options?.color,
          selectedStorage: options?.storage,
          selectedEdition: options?.edition
        }
      ];
    });

    addToast(
      'Added to Shopping Cart',
      `${product.title} (${quantity}) is now in your cart.`,
      'cart',
      product.image
    );
  };

  const removeFromCart = (cartItemId: string) => {
    const target = cart.find(i => i.id === cartItemId);
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    if (target) {
      addToast('Item Removed', `${target.product.title} was removed from your cart.`, 'info');
    }
  };

  const updateQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: Math.min(qty, 99) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setPromoDiscount(0);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        addToast('Removed from Wishlist', `${product.title} removed from saved items.`, 'info');
        return prev.filter(p => p.id !== product.id);
      } else {
        addToast('Saved to Wishlist', `${product.title} has been added to your favorites.`, 'wishlist', product.image);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'MICROSOFT10') {
      setPromoCode('MICROSOFT10 (10% Off)');
      setPromoDiscount(0.10);
      addToast('Promo Code Applied!', '10% discount has been applied to your order total.', 'success');
      return true;
    } else if (clean === 'SURFACE100') {
      setPromoCode('SURFACE100 ($100 Off)');
      setPromoDiscount(100);
      addToast('Promo Code Applied!', '$100 discount has been applied to your order.', 'success');
      return true;
    } else if (clean === 'GAMEPASS') {
      setPromoCode('GAMEPASS (15% Off)');
      setPromoDiscount(0.15);
      addToast('Promo Code Applied!', '15% Gamer discount has been activated.', 'success');
      return true;
    } else {
      addToast('Invalid Promo Code', 'Please check the code and try again (try MICROSOFT10 or SURFACE100).', 'error');
      return false;
    }
  };

  const resetFilters = () => {
    setFilters({
      ...defaultFilters,
      category: activeCategory
    });
  };

  const quickViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cart financial calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      let itemPrice = item.product.price;
      if (item.selectedStorage?.priceDelta) {
        itemPrice += item.selectedStorage.priceDelta;
      }
      return sum + itemPrice * item.quantity;
    }, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    let discountAmount = 0;
    if (promoDiscount > 0 && promoDiscount < 1) {
      discountAmount = cartSubtotal * promoDiscount;
    } else if (promoDiscount >= 1) {
      discountAmount = Math.min(promoDiscount, cartSubtotal);
    }
    const taxedAmount = (cartSubtotal - discountAmount) * 0.0825; // 8.25% estimated tax
    const total = Math.max(0, cartSubtotal - discountAmount + (cartSubtotal > 0 ? taxedAmount : 0));
    return total;
  }, [cartSubtotal, promoDiscount]);

  // Place Order Simulation
  const placeOrder = (shippingInfo: any, paymentMethod: string): Order => {
    const orderId = `MS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      tax: cartSubtotal * 0.0825,
      discount: promoDiscount < 1 ? cartSubtotal * promoDiscount : promoDiscount,
      total: cartTotal,
      shippingAddress: shippingInfo,
      paymentMethod,
      status: 'Processing',
      estimatedDelivery: '3-5 Business Days (Free Standard Delivery)'
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    
    // Reward points for order: 10 points per dollar
    const earnedPoints = Math.round(cartTotal * 10);
    setUser(prev => ({
      ...prev,
      rewardsPoints: prev.rewardsPoints + earnedPoints
    }));

    clearCart();
    addToast(
      'Order Confirmed!',
      `Order #${orderId} was placed successfully! You earned +${earnedPoints} Microsoft Rewards points.`,
      'success'
    );
    return newOrder;
  };

  // Filtered Products computation
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category check
      if (filters.category !== 'all') {
        if (filters.category === 'deals') {
          if (!p.isDeal) return false;
        } else if (p.category !== filters.category) {
          return false;
        }
      }

      // Subcategory check
      if (filters.subcategory && filters.subcategory !== 'all') {
        if (p.subcategory.toLowerCase() !== filters.subcategory.toLowerCase()) {
          return false;
        }
      }

      // Search query check
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesTagline = p.tagline.toLowerCase().includes(query);
        const matchesDescription = p.description.toLowerCase().includes(query);
        const matchesDev = p.developer?.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesSubcat = p.subcategory.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTagline && !matchesDescription && !matchesDev && !matchesCat && !matchesSubcat) {
          return false;
        }
      }

      // Price filter
      if (p.price < filters.minPrice || p.price > filters.maxPrice) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && p.rating < filters.minRating) {
        return false;
      }

      // Only Deals filter
      if (filters.onlyDeals && !p.isDeal) {
        return false;
      }

      // Only Free filter
      if (filters.onlyFree && !p.isFree) {
        return false;
      }

      // Game pass only filter
      if (filters.gamePassOnly && !p.gamePassIncluded) {
        return false;
      }

      // Platform filter
      if (filters.platform && filters.platform !== 'all') {
        const hasPlatform = p.platform.some(plat => plat.toLowerCase().includes(filters.platform.toLowerCase()));
        if (!hasPlatform) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.reviewCount - a.reviewCount;
        case 'newest':
          return new Date(b.releaseDate || '2020-01-01').getTime() - new Date(a.releaseDate || '2020-01-01').getTime();
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [products, filters]);

  return (
    <StoreContext.Provider
      value={{
        products,
        activeCategory,
        setActiveCategory,
        selectedProduct,
        setSelectedProduct,
        cart,
        cartCount,
        cartSubtotal,
        cartTotal,
        promoDiscount,
        promoCode,
        applyPromoCode,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        filters,
        setFilters,
        resetFilters,
        filteredProducts,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        placeOrder,
        lastOrder,
        toasts,
        addToast,
        removeToast,
        user,
        setUser,
        quickViewProduct,
        scrollToSection
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
