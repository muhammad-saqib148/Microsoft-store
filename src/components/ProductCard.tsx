import React from 'react';
import { Star, Heart, ShoppingCart, Eye, Sparkles, Check, Gamepad2, Laptop, Monitor } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { addToCart, quickViewProduct, toggleWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);

  if (layout === 'list') {
    return (
      <div 
        id={`product-card-list-${product.id}`}
        className="group bg-white rounded-lg border border-neutral-200 hover:border-[#0067b8]/50 hover:shadow-sm transition-all p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer" onClick={() => quickViewProduct(product)}>
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('unsplash.com/photo-1611339555312-e607c8352fd7')) {
                  target.src = 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=900&auto=format&fit=crop&q=80';
                }
              }}
            />
            {product.badge && (
              <span className="absolute top-1 left-1 bg-[#0067b8] text-white text-[9px] font-bold px-1.5 py-0.2 rounded shadow-2xs uppercase">
                {product.badge}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-medium">
              <span className="text-[#0067b8] uppercase tracking-wider font-bold">{product.subcategory}</span>
              <span>•</span>
              <span>{product.developer || 'Microsoft'}</span>
            </div>
            <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#0067b8] transition-colors truncate mt-0.5">
              {product.title}
            </h4>
            <p className="text-[11px] text-neutral-600 line-clamp-1 mt-0.5 max-w-xl">
              {product.tagline || product.description}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-center text-amber-500">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs font-bold text-neutral-800 ml-1">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-[10px] text-neutral-400">({product.reviewCount.toLocaleString()} ratings)</span>
            </div>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
          <div className="text-left sm:text-right">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-neutral-900">
                {product.isFree ? 'Free' : `$${product.price.toFixed(2)}`}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[10px] text-neutral-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.discountPercent && product.discountPercent > 0 && (
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                isWishlisted 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'border-neutral-200 text-neutral-500 hover:text-rose-600 hover:bg-neutral-50'
              }`}
              title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              aria-label="Wishlist toggle"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => addToCart(product)}
              className="px-3 py-1.5 rounded-md bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShoppingCart className="w-3 h-3" />
              <span>{product.isFree ? 'Get App' : 'Add to cart'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout
  return (
    <div 
      id={`product-card-${product.id}`}
      className="group bg-white rounded-lg border border-neutral-200/90 hover:border-[#0067b8]/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden relative"
    >
      {/* Top Image Container */}
      <div 
        className="relative aspect-4/3 overflow-hidden bg-neutral-100/70 cursor-pointer"
        onClick={() => quickViewProduct(product)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('unsplash.com/photo-1611339555312-e607c8352fd7')) {
              target.src = 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=900&auto=format&fit=crop&q=80';
            }
          }}
        />

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-[#0067b8] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs uppercase tracking-wider">
              {product.badge}
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-md backdrop-blur-xs transition-all shadow-2xs z-10 cursor-pointer ${
            isWishlisted
              ? 'bg-white text-rose-600 border border-rose-200'
              : 'bg-white/80 hover:bg-white text-neutral-600 hover:text-rose-600 border border-neutral-200/60'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current text-rose-600' : ''}`} />
        </button>

        {/* Quick View Hover Bar */}
        <div className="absolute inset-x-0 bottom-0 py-1.5 bg-gradient-to-t from-black/70 to-transparent text-white text-[11px] font-medium flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Eye className="w-3 h-3 text-sky-200" />
          <span>Quick View</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Publisher */}
          <div className="flex items-center justify-between text-[10px] text-neutral-500 font-medium mb-0.5">
            <span className="text-[#0067b8] uppercase tracking-wider font-bold truncate">
              {product.subcategory}
            </span>
            <span className="truncate ml-1">{product.developer || 'Microsoft'}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => quickViewProduct(product)}
            className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-[#0067b8] transition-colors line-clamp-1 cursor-pointer"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Tagline / Description */}
          <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5 leading-relaxed">
            {product.tagline || product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-xs font-bold text-neutral-800">{product.rating.toFixed(1)}</span>
            <span className="text-[10px] text-neutral-400">({product.reviewCount.toLocaleString()})</span>
          </div>
        </div>

        {/* Bottom Pricing & Action Buttons */}
        <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between gap-1.5">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-sm font-extrabold text-neutral-900">
                {product.isFree ? 'Free' : `$${product.price.toFixed(2)}`}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[10px] text-neutral-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.gamePassIncluded && (
              <span className="text-[9px] font-bold text-emerald-700 block">
                Game Pass
              </span>
            )}
          </div>

          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={() => addToCart(product)}
            className="px-2.5 py-1 rounded-md bg-[#0067b8] hover:bg-[#005da6] active:scale-97 text-white text-xs font-semibold shadow-2xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
          >
            <ShoppingCart className="w-3 h-3" />
            <span>{product.isFree ? 'Get' : 'Buy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
