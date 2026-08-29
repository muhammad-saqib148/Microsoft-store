import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingCart, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Share2, 
  Cpu, 
  HardDrive, 
  Sparkles, 
  Download, 
  MessageSquarePlus,
  ArrowRight,
  ThumbsUp,
  Monitor,
  Zap,
  Package,
  Layers,
  Plus
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductVariant, ProductReview } from '../types';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    products, 
    quickViewProduct,
    setIsCheckoutOpen,
    addToast
  } = useStore();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductVariant | undefined>(
    selectedProduct.colorVariants ? selectedProduct.colorVariants[0] : undefined
  );
  const [selectedStorage, setSelectedStorage] = useState<ProductVariant | undefined>(
    selectedProduct.storageVariants ? selectedProduct.storageVariants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'requirements' | 'reviews' | 'included'>('features');

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProduct]);

  // Interactive review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [localReviews, setLocalReviews] = useState<ProductReview[]>(selectedProduct.reviews || []);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});

  const isWishlisted = isInWishlist(selectedProduct.id);

  // Price adjustment based on storage variant
  const currentPrice = selectedProduct.price + (selectedStorage?.priceDelta || 0);
  const originalPrice = selectedProduct.originalPrice 
    ? selectedProduct.originalPrice + (selectedStorage?.priceDelta || 0) 
    : undefined;

  const images = selectedProduct.galleryImages && selectedProduct.galleryImages.length > 0 
    ? selectedProduct.galleryImages 
    : [selectedProduct.image];

  const handleAddToCart = () => {
    addToCart(selectedProduct, {
      quantity,
      color: selectedColor,
      storage: selectedStorage
    });
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, {
      quantity,
      color: selectedColor,
      storage: selectedStorage
    });
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Product link copied to your clipboard!', 'info');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      title: newReviewTitle || 'Great product',
      comment: newReviewComment,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      helpfulCount: 0
    };

    setLocalReviews(prev => [newRev, ...prev]);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    setShowReviewForm(false);
    addToast('Review Submitted', 'Thank you for your feedback! Your review is now live.', 'success');
  };

  const handleVoteHelpful = (reviewId: string) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1
    }));
    addToast('Helpful Vote', 'Thank you for your feedback.', 'info');
  };

  // Related products from same category
  const relatedProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  // Bundle product
  const bundleAddon = products.find(p => p.category === 'accessories' && p.id !== selectedProduct.id) || products[1];

  const handleAddBundle = () => {
    addToCart(selectedProduct, { quantity: 1, color: selectedColor, storage: selectedStorage });
    if (bundleAddon) {
      addToCart(bundleAddon, { quantity: 1 });
    }
    addToast('Bundle Added', 'Added product bundle to cart with bundle savings!', 'success');
  };

  return (
    <div 
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={() => setSelectedProduct(null)}
    >
      <div 
        id="product-detail-modal-container"
        className="bg-white dark:bg-[#1f1f1f] text-neutral-900 dark:text-neutral-100 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 dark:border-neutral-700/80 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header with Breadcrumb & Close Button */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#1f1f1f]/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0067b8] dark:text-[#60cdff]">
              {selectedProduct.category}
            </span>
            <span className="text-neutral-300 dark:text-neutral-600">/</span>
            <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">{selectedProduct.subcategory}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              id="close-product-modal-button"
              onClick={() => setSelectedProduct(null)}
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-6 space-y-6 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Image Gallery (6 cols) */}
            <div className="lg:col-span-6 space-y-3">
              {/* Main Image View */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xs flex items-center justify-center">
                <img
                  src={images[activeImageIndex] || selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                  {selectedProduct.badge && (
                    <span className="bg-[#0067b8] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider">
                      {selectedProduct.badge}
                    </span>
                  )}
                  {selectedProduct.gamePassIncluded && (
                    <span className="bg-[#107c41] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      Game Pass Included
                    </span>
                  )}
                </div>
                {selectedProduct.discountPercent && selectedProduct.discountPercent > 0 && (
                  <span className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                    Save {selectedProduct.discountPercent}%
                  </span>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#0067b8] dark:border-[#60cdff] ring-2 ring-[#0067b8]/20'
                          : 'border-neutral-200 dark:border-neutral-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[11px] text-neutral-600 dark:text-neutral-300 font-medium">
                <div className="p-2 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#0067b8] dark:text-[#60cdff]" />
                  <span>Free 2-3 Day Delivery</span>
                </div>
                <div className="p-2 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700 flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-[#0067b8] dark:text-[#60cdff]" />
                  <span>60-Day Returns</span>
                </div>
                <div className="p-2 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Microsoft Direct Support</span>
                </div>
              </div>
            </div>

            {/* Right Product Details & Options (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Title & Ratings */}
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                  <span className="text-[#0067b8] dark:text-[#60cdff] font-bold uppercase">{selectedProduct.developer || 'Microsoft Corporation'}</span>
                  <span>•</span>
                  <span>Direct from Microsoft</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white leading-tight">
                  {selectedProduct.title}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1.5 leading-relaxed">
                  {selectedProduct.tagline || selectedProduct.description}
                </p>

                {/* Rating & Reviews Bar */}
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i <= Math.round(selectedProduct.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-300 dark:text-neutral-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    {selectedProduct.rating.toFixed(1)}
                  </span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    ({selectedProduct.reviewCount.toLocaleString()} ratings & reviews)
                  </span>
                </div>
              </div>

              {/* Price Display */}
              <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
                    {selectedProduct.isFree ? 'Free Download' : `$${currentPrice.toFixed(2)}`}
                  </span>
                  {originalPrice && originalPrice > currentPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                  )}
                  {selectedProduct.discountPercent && (
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800">
                      Save ${(originalPrice! - currentPrice).toFixed(2)} ({selectedProduct.discountPercent}% off)
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                  Tax calculated at checkout. Earns +{Math.round(currentPrice * 10)} Microsoft Rewards points.
                </p>
              </div>

              {/* Color Variant Picker */}
              {selectedProduct.colorVariants && selectedProduct.colorVariants.length > 0 && (
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider block mb-1.5">
                    Color: <span className="text-[#0067b8] dark:text-[#60cdff]">{selectedColor?.name}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {selectedProduct.colorVariants.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                          selectedColor?.id === c.id
                            ? 'border-[#0067b8] dark:border-[#60cdff] ring-2 ring-[#0067b8]/20 bg-sky-50 dark:bg-sky-950/50 text-[#0067b8] dark:text-[#60cdff]'
                            : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.colorHex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage / Spec Variant Picker */}
              {selectedProduct.storageVariants && selectedProduct.storageVariants.length > 0 && (
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider block mb-1.5">
                    Configuration & Storage:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProduct.storageVariants.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedStorage(s)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          selectedStorage?.id === s.id
                            ? 'border-[#0067b8] dark:border-[#60cdff] ring-2 ring-[#0067b8]/20 bg-sky-50 dark:bg-sky-950/50 font-bold text-[#0067b8] dark:text-[#60cdff]'
                            : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <p className="font-bold text-neutral-900 dark:text-white">{s.name}</p>
                        {s.priceDelta ? (
                          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">+{`$${s.priceDelta}`}</p>
                        ) : (
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">Standard Spec</p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 pt-1">
                {!selectedProduct.isFree && (
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-800">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-white font-bold text-xs cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-xs font-bold text-neutral-900 dark:text-white min-w-[32px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(99, quantity + 1))}
                        className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-white font-bold text-xs cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Primary Cart & Buy Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    id="modal-add-to-cart-button"
                    onClick={handleAddToCart}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#0067b8] hover:bg-[#005da6] active:scale-98 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{selectedProduct.isFree ? 'Get Free Download' : 'Add to Cart'}</span>
                  </button>

                  {!selectedProduct.isFree && (
                    <button
                      id="modal-buy-now-button"
                      onClick={handleBuyNow}
                      className="py-2.5 px-5 rounded-xl bg-neutral-900 hover:bg-black dark:bg-neutral-750 dark:hover:bg-neutral-700 active:scale-98 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>Buy Now</span>
                    </button>
                  )}

                  <button
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-600'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-rose-600 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    }`}
                    title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Frequently Bought Together Bundle Card */}
          {bundleAddon && !selectedProduct.isFree && (
            <div className="p-4 bg-sky-50/60 dark:bg-neutral-800/60 rounded-2xl border border-sky-200 dark:border-neutral-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 shrink-0">
                  <img src={selectedProduct.image} alt={selectedProduct.title} className="w-12 h-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700" />
                  <Plus className="w-4 h-4 text-neutral-400" />
                  <img src={bundleAddon.image} alt={bundleAddon.title} className="w-12 h-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0067b8] dark:text-[#60cdff]">
                    Bundle & Save
                  </span>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white">
                    Frequently Bought Together: {bundleAddon.title}
                  </p>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                    Combo total: <span className="font-bold text-neutral-900 dark:text-white">${(currentPrice + bundleAddon.price * 0.85).toFixed(2)}</span> (Save 15% on accessory)
                  </p>
                </div>
              </div>

              <button
                onClick={handleAddBundle}
                className="px-3.5 py-2 rounded-xl bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-bold shrink-0 cursor-pointer shadow-xs"
              >
                Add Both to Cart
              </button>
            </div>
          )}

          {/* Deep Tabs Section: Features, Specs, System Requirements, Reviews, What's Included */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
            {/* Tab Headers */}
            <div className="flex items-center gap-1.5 border-b border-neutral-200 dark:border-neutral-800 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('features')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'features'
                    ? 'bg-sky-50 dark:bg-sky-950/60 text-[#0067b8] dark:text-[#60cdff] border border-sky-200 dark:border-sky-800'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                Features & Highlights
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-sky-50 dark:bg-sky-950/60 text-[#0067b8] dark:text-[#60cdff] border border-sky-200 dark:border-sky-800'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                Tech Specs
              </button>
              <button
                onClick={() => setActiveTab('requirements')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'requirements'
                    ? 'bg-sky-50 dark:bg-sky-950/60 text-[#0067b8] dark:text-[#60cdff] border border-sky-200 dark:border-sky-800'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                System Requirements
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'bg-sky-50 dark:bg-sky-950/60 text-[#0067b8] dark:text-[#60cdff] border border-sky-200 dark:border-sky-800'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <span>Customer Reviews</span>
                <span className="bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {localReviews.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('included')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'included'
                    ? 'bg-sky-50 dark:bg-sky-950/60 text-[#0067b8] dark:text-[#60cdff] border border-sky-200 dark:border-sky-800'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                In The Box
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-4">
              
              {/* Features Tab */}
              {activeTab === 'features' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Key Capabilities & Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {selectedProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border border-neutral-200/80 dark:border-neutral-700">
                        <Check className="w-4 h-4 text-[#0067b8] dark:text-[#60cdff] shrink-0 mt-0.5" />
                        <span className="text-xs text-neutral-700 dark:text-neutral-200 font-medium leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs Tab */}
              {activeTab === 'specs' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Technical Specifications</h3>
                  <div className="bg-white dark:bg-neutral-850 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden divide-y divide-neutral-200 dark:divide-neutral-700">
                    {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-1 sm:grid-cols-3 p-3 text-xs">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100">{key}</span>
                        <span className="sm:col-span-2 text-neutral-600 dark:text-neutral-300 mt-0.5 sm:mt-0">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* System Requirements Tab */}
              {activeTab === 'requirements' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Hardware & OS Compatibility</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700">
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-2">Minimum Requirements</h4>
                      <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1.5">
                        <li><strong>OS:</strong> Windows 10 (version 19041.0 or higher)</li>
                        <li><strong>Processor:</strong> 1.6 GHz dual-core or faster</li>
                        <li><strong>Memory:</strong> 4 GB RAM</li>
                        <li><strong>Graphics:</strong> DirectX 12 compatible</li>
                        <li><strong>Storage:</strong> 10 GB available drive space</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700">
                      <h4 className="text-xs font-bold text-[#0067b8] dark:text-[#60cdff] mb-2">Recommended for Best Experience</h4>
                      <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1.5">
                        <li><strong>OS:</strong> Windows 11 with latest Feature Update</li>
                        <li><strong>Processor:</strong> Intel Core i7 / AMD Ryzen 7 or Snapdragon X Elite (Copilot+ NPU)</li>
                        <li><strong>Memory:</strong> 16 GB or 32 GB RAM</li>
                        <li><strong>Graphics:</strong> NVIDIA GeForce RTX or Intel Arc Graphics</li>
                        <li><strong>Display:</strong> 1440p HDR or 4K with 120Hz refresh</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab with Visual Breakdown Bar Chart */}
              {activeTab === 'reviews' && (
                <div className="space-y-5">
                  {/* Reviews Summary & Rating Distribution */}
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800/70 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left shrink-0">
                      <span className="text-4xl font-black text-neutral-900 dark:text-white">
                        {selectedProduct.rating.toFixed(1)}
                      </span>
                      <div className="flex items-center justify-center md:justify-start text-amber-400 my-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {localReviews.length} total customer reviews
                      </p>
                    </div>

                    {/* Rating Breakdown Bars */}
                    <div className="w-full max-w-sm space-y-1.5">
                      {[
                        { stars: 5, pct: 78 },
                        { stars: 4, pct: 14 },
                        { stars: 3, pct: 5 },
                        { stars: 2, pct: 2 },
                        { stars: 1, pct: 1 }
                      ].map((bar) => (
                        <div key={bar.stars} className="flex items-center gap-2 text-xs">
                          <span className="w-6 font-semibold text-neutral-700 dark:text-neutral-300">{bar.stars}★</span>
                          <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${bar.pct}%` }} />
                          </div>
                          <span className="w-8 text-[11px] text-neutral-500 dark:text-neutral-400 text-right">{bar.pct}%</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="px-4 py-2 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shrink-0"
                    >
                      <MessageSquarePlus className="w-3.5 h-3.5" />
                      <span>Write a Review</span>
                    </button>
                  </div>

                  {/* Write Review Form */}
                  {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="p-4 bg-sky-50/70 dark:bg-neutral-800 border border-sky-200 dark:border-neutral-700 rounded-2xl space-y-3">
                      <h4 className="text-xs font-bold text-[#0067b8] dark:text-[#60cdff] uppercase tracking-wider">Leave Your Review</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          required
                          className="px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Rating:</span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewReviewRating(star)}
                                className="text-amber-400 p-0.5 cursor-pointer"
                              >
                                <Star className={`w-4 h-4 ${star <= newReviewRating ? 'fill-amber-400' : 'text-neutral-300 dark:text-neutral-600'}`} />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Review Headline (e.g. Fantastic performance & battery life)"
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                      />
                      <textarea
                        placeholder="Share your detailed thoughts, build quality, speed, setup experience..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        required
                        rows={3}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="px-3 py-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 text-xs font-bold bg-[#0067b8] text-white rounded-lg hover:bg-[#005da6] cursor-pointer shadow-xs"
                        >
                          Submit Review
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reviews List with Helpful Upvote */}
                  <div className="space-y-3">
                    {localReviews.length > 0 ? (
                      localReviews.map((rev) => {
                        const totalHelpful = (rev.helpfulCount || 0) + (helpfulVotes[rev.id] || 0);
                        return (
                          <div key={rev.id} className="p-4 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border border-neutral-200/80 dark:border-neutral-700 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-neutral-900 dark:text-white">{rev.author}</span>
                                {rev.verified && (
                                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                                    Verified Purchase
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-neutral-400">{rev.date}</span>
                            </div>
                            <div className="flex items-center gap-0.5 text-amber-400">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300 dark:text-neutral-600'}`}
                                />
                              ))}
                            </div>
                            <p className="text-xs font-bold text-neutral-900 dark:text-white">{rev.title}</p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">{rev.comment}</p>
                            <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-[11px]">
                              <span className="text-neutral-400">Was this review helpful?</span>
                              <button
                                onClick={() => handleVoteHelpful(rev.id)}
                                className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-[#0067b8] dark:hover:text-[#60cdff] cursor-pointer"
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span>Helpful ({totalHelpful})</span>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-xs text-neutral-500 italic">No reviews yet. Be the first to share your thoughts!</p>
                    )}
                  </div>
                </div>
              )}

              {/* What's Included Tab */}
              {activeTab === 'included' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">What&apos;s in the Box & Delivery Info</h3>
                  <div className="space-y-2">
                    {selectedProduct.included.map((inc, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border border-neutral-200/80 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Related Products Bar */}
          {relatedProducts.length > 0 && (
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-3">
                Customers Also Viewed
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => quickViewProduct(rel)}
                    className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-[#0067b8] dark:hover:border-[#60cdff] bg-neutral-50/50 dark:bg-neutral-800/50 hover:bg-sky-50/40 transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-12 h-12 rounded-lg object-cover bg-neutral-100 dark:bg-neutral-700 shrink-0 border border-neutral-200 dark:border-neutral-700"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-neutral-900 dark:text-white truncate group-hover:text-[#0067b8] dark:group-hover:text-[#60cdff]">
                        {rel.title}
                      </p>
                      <p className="text-[11px] font-extrabold text-neutral-900 dark:text-white">
                        {rel.isFree ? 'Free' : `$${rel.price.toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
