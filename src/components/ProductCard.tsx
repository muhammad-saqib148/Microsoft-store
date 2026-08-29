import React from 'react';
import { motion } from 'motion/react';
import { Star, Heart, ShoppingCart, Eye, Sparkles, Check, Gamepad2, Laptop, Monitor, Zap } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { addToCart, quickViewProduct, openProductDetails, toggleWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);

  if (layout === 'list') {
    return (
      <div 
        id={`product-card-list-${product.id}`}
        className="group bg-white dark:bg-[#202020] rounded-xl border border-neutral-200 dark:border-neutral-700/80 hover:border-[#0067b8]/60 dark:hover:border-[#60cdff]/60 hover:shadow-md transition-all p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5"
      >
        <div className="flex items-center gap-3.5 min-w-0 flex-1 cursor-pointer" onClick={() => openProductDetails(product)}>
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 border border-neutral-200 dark:border-neutral-700">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <span className="absolute top-1 left-1 bg-[#0067b8] text-white text-[9px] font-bold px-1.5 py-0.2 rounded shadow-2xs uppercase">
                {product.badge}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
              <span className="text-[#0067b8] dark:text-[#60cdff] uppercase tracking-wider font-bold">{product.subcategory}</span>
              <span>•</span>
              <span>{product.developer || 'Microsoft'}</span>
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-[#0067b8] dark:group-hover:text-[#60cdff] transition-colors truncate mt-0.5">
              {product.title}
            </h4>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-300 line-clamp-1 mt-0.5 max-w-xl">
              {product.tagline || product.description}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-center text-amber-500">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 ml-1">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-[10px] text-neutral-400">({product.reviewCount.toLocaleString()} ratings)</span>
            </div>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-700/60">
          <div className="text-left sm:text-right">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-black text-neutral-900 dark:text-white">
                {product.isFree ? 'Free' : `$${product.price.toFixed(2)}`}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[10px] text-neutral-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.discountPercent && product.discountPercent > 0 && (
              <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => quickViewProduct(product)}
              className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Quick View"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => toggleWishlist(product)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isWishlisted 
                  ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-600' 
                  : 'border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-rose-600 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
              title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              aria-label="Wishlist toggle"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>
            <button
              onClick={() => addToCart(product)}
              className="px-3 py-1.5 rounded-lg bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
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
    <motion.div 
      id={`product-card-${product.id}`}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group bg-white dark:bg-[#202020] rounded-2xl border border-neutral-200 dark:border-neutral-700/80 hover:border-[#0067b8]/60 dark:hover:border-[#60cdff]/60 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden relative"
    >
      {/* Top Image Container */}
      <div 
        className="relative aspect-4/3 overflow-hidden bg-neutral-100 dark:bg-neutral-800 cursor-pointer"
        onClick={() => openProductDetails(product)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-[#0067b8] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider">
              {product.badge}
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-xs">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button Overlay */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-md z-10 cursor-pointer ${
            isWishlisted
              ? 'bg-white dark:bg-neutral-900 text-rose-600 border border-rose-200 dark:border-rose-800'
              : 'bg-white/80 dark:bg-neutral-900/80 hover:bg-white dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:text-rose-600 border border-neutral-200/60 dark:border-neutral-700'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current text-rose-600' : ''}`} />
        </motion.button>

        {/* Quick View Hover Bar */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            quickViewProduct(product);
          }}
          className="absolute inset-x-3 bottom-3 py-1.5 px-3 rounded-xl bg-black/75 hover:bg-[#0067b8] text-white text-xs font-bold flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-xs shadow-lg cursor-pointer transform translate-y-1 group-hover:translate-y-0"
        >
          <Eye className="w-3.5 h-3.5 text-sky-200" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Publisher */}
          <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 font-medium mb-1">
            <span className="text-[#0067b8] dark:text-[#60cdff] uppercase tracking-wider font-bold truncate">
              {product.subcategory}
            </span>
            <span className="truncate ml-1">{product.developer || 'Microsoft'}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => openProductDetails(product)}
            className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white group-hover:text-[#0067b8] dark:group-hover:text-[#60cdff] transition-colors line-clamp-1 cursor-pointer"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Tagline / Description */}
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-1 leading-relaxed">
            {product.tagline || product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{product.rating.toFixed(1)}</span>
            <span className="text-[10px] text-neutral-400">({product.reviewCount.toLocaleString()})</span>
          </div>
        </div>

        {/* Bottom Pricing & Action Buttons */}
        <div className="mt-3.5 pt-2.5 border-t border-neutral-100 dark:border-neutral-700/70 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white">
                {product.isFree ? 'Free' : `$${product.price.toFixed(2)}`}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[10px] text-neutral-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.gamePassIncluded && (
              <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 block">
                Game Pass Included
              </span>
            )}
          </div>

          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={() => addToCart(product)}
            className="px-3 py-1.5 rounded-lg bg-[#0067b8] hover:bg-[#005da6] active:scale-95 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
          >
            <ShoppingCart className="w-3 h-3" />
            <span>{product.isFree ? 'Get' : 'Add'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
