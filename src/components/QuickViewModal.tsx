import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingCart, 
  Check, 
  Zap, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Truck,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductVariant } from '../types';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProductModal, 
    setQuickViewProductModal, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsCheckoutOpen,
    openProductDetails 
  } = useStore();

  const product = quickViewProductModal;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductVariant | undefined>(undefined);
  const [selectedStorage, setSelectedStorage] = useState<ProductVariant | undefined>(undefined);
  const [qty, setQty] = useState(1);

  // Sync variants when product opens
  useEffect(() => {
    if (product) {
      setActiveImgIndex(0);
      setQty(1);
      setSelectedColor(product.colorVariants ? product.colorVariants[0] : undefined);
      setSelectedStorage(product.storageVariants ? product.storageVariants[0] : undefined);
    }
  }, [product]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewProductModal(null);
      }
    };
    if (quickViewProductModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProductModal, setQuickViewProductModal]);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const images = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.image];

  const currentPrice = product.price + (selectedStorage?.priceDelta || 0);
  const originalPrice = product.originalPrice ? product.originalPrice + (selectedStorage?.priceDelta || 0) : undefined;

  const handleAddToCart = () => {
    addToCart(product, {
      quantity: qty,
      color: selectedColor,
      storage: selectedStorage
    });
  };

  const handleBuyNow = () => {
    addToCart(product, {
      quantity: qty,
      color: selectedColor,
      storage: selectedStorage
    });
    setQuickViewProductModal(null);
    setIsCheckoutOpen(true);
  };

  const handleOpenFullDetails = () => {
    const p = product;
    setQuickViewProductModal(null);
    openProductDetails(p);
  };

  return (
    <AnimatePresence>
      <div 
        id="quick-view-overlay"
        className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6"
        onClick={() => setQuickViewProductModal(null)}
      >
        <motion.div
          id="quick-view-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white dark:bg-[#202020] text-neutral-900 dark:text-neutral-100 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-700/80 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-neutral-200/80 dark:border-neutral-700/70 bg-neutral-50/80 dark:bg-[#1a1a1a]/80">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0067b8] dark:text-[#60cdff] bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 px-2 py-0.5 rounded">
                Quick View
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                {product.category} • {product.subcategory}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleOpenFullDetails}
                className="text-xs text-[#0067b8] dark:text-[#60cdff] hover:underline flex items-center gap-1 font-semibold px-2 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer mr-1"
              >
                <span>Full Page</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <button
                onClick={() => setQuickViewProductModal(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/80 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                aria-label="Close Quick View"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Grid Body */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto">
            {/* Left: Gallery Column */}
            <div className="flex flex-col gap-3">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/70 flex items-center justify-center">
                <img
                  src={images[activeImgIndex] || product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 bg-[#0067b8] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}

                {product.discountPercent && product.discountPercent > 0 && (
                  <span className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    -{product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImgIndex === idx
                          ? 'border-[#0067b8] dark:border-[#60cdff] shadow-sm scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Trust Badges */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-800/40 p-2 rounded-lg border border-neutral-200/60 dark:border-neutral-700/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0067b8] dark:text-[#60cdff]" />
                  <span>Official Microsoft Product</span>
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-800/40 p-2 rounded-lg border border-neutral-200/60 dark:border-neutral-700/50">
                  <Truck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Free Express Delivery</span>
                </div>
              </div>
            </div>

            {/* Right: Details & Action Column */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  <span className="text-[#0067b8] dark:text-[#60cdff] font-bold">{product.developer || 'Microsoft'}</span>
                  <span>•</span>
                  <span>{product.releaseDate || '2024'}</span>
                </div>

                <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900 dark:text-white mt-1 leading-snug">
                  {product.title}
                </h2>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1.5 leading-relaxed">
                  {product.tagline || product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="flex items-center text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= Math.round(product.rating)
                            ? 'fill-current'
                            : 'text-neutral-300 dark:text-neutral-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-neutral-400">
                    ({product.reviewCount.toLocaleString()} customer reviews)
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-3.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase font-bold block">
                      Price
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                        {product.isFree ? 'Free' : `$${currentPrice.toFixed(2)}`}
                      </span>
                      {originalPrice && originalPrice > currentPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          ${originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {product.gamePassIncluded && (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      Play with Game Pass
                    </span>
                  )}
                </div>

                {/* Color Variants (if any) */}
                {product.colorVariants && product.colorVariants.length > 0 && (
                  <div className="mt-3">
                    <label className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                      Color: <span className="font-semibold text-neutral-900 dark:text-white">{selectedColor?.name}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {product.colorVariants.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedColor(c)}
                          className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                            selectedColor?.id === c.id
                              ? 'border-[#0067b8] dark:border-[#60cdff] scale-110 shadow-sm'
                              : 'border-transparent hover:scale-105 opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c.colorHex || '#ccc' }}
                          title={c.name}
                        >
                          {selectedColor?.id === c.id && (
                            <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Storage Variants (if any) */}
                {product.storageVariants && product.storageVariants.length > 0 && (
                  <div className="mt-3">
                    <label className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                      Configuration / Storage:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {product.storageVariants.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedStorage(s)}
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                            selectedStorage?.id === s.id
                              ? 'bg-[#0067b8] text-white border-[#0067b8] shadow-xs'
                              : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400'
                          }`}
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Features Bullet Points */}
                {product.features && product.features.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block">
                      Highlights:
                    </span>
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-[#0067b8] dark:text-[#60cdff] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-neutral-200 dark:border-neutral-700 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#0067b8] hover:bg-[#005da6] active:scale-98 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{product.isFree ? 'Get App Free' : 'Add to Cart'}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 active:scale-98 text-white dark:text-neutral-900 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-amber-400 dark:text-amber-500 fill-current" />
                    <span>Buy Now</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-600'
                        : 'border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-rose-600 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-600' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
