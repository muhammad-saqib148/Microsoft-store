export type ProductCategory = 
  | 'all' 
  | 'apps' 
  | 'games' 
  | 'devices' 
  | 'accessories' 
  | 'entertainment' 
  | 'deals' 
  | 'productivity';

export interface ProductVariant {
  id: string;
  name: string;
  priceDelta?: number;
  colorHex?: string;
  storage?: string;
  edition?: string;
  inStock?: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  title: string;
  tagline: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  isFree?: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  badge?: string;
  developer?: string;
  publisher?: string;
  releaseDate?: string;
  platform: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  included: string[];
  isDeal?: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  newRelease?: boolean;
  colorVariants?: ProductVariant[];
  storageVariants?: ProductVariant[];
  editionVariants?: ProductVariant[];
  reviews: ProductReview[];
  downloadSize?: string;
  ageRating?: string;
  gamePassIncluded?: boolean;
}

export interface CartItem {
  id: string; // unique item id including variant selection
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: ProductVariant;
  selectedStorage?: ProductVariant;
  selectedEdition?: ProductVariant;
}

export interface FilterState {
  category: ProductCategory;
  subcategory: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  onlyDeals: boolean;
  onlyFree: boolean;
  gamePassOnly: boolean;
  platform: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'popular' | 'newest';
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'cart' | 'wishlist' | 'error';
  image?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  rewardsPoints: number;
  tier: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}
