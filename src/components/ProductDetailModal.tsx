import React, { useState, useEffect } from 'react';
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
  ArrowRight
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
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'reviews' | 'included'>('features');

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

  // Related products from same category
  const relatedProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  return (
    <div 
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={() => setSelectedProduct(null)}
    >
      <div 
        id="product-detail-modal-container"
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-neutral-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-4 py-2.5 border-b border-neutral-200 flex items-center justify-between z-20">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0067b8]">
              {selectedProduct.subcategory}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-xs text-neutral-500">{selectedProduct.developer || 'Microsoft'}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
              title="Share product"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              id="close-product-modal-button"
              onClick={() => setSelectedProduct(null)}
              className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-5 space-y-5 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left Image Gallery (6 cols) */}
            <div className="lg:col-span-6 space-y-3">
              {/* Main Image View */}
              <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shadow-2xs flex items-center justify-center">
                <img
                  src={images[activeImageIndex] || selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('unsplash.com/photo-1611339555312-e607c8352fd7')) {
                      target.src = 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=900&auto=format&fit=crop&q=80';
                    }
                  }}
                />
                {selectedProduct.badge && (
                  <span className="absolute top-2.5 left-2.5 bg-[#0067b8] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs uppercase tracking-wider">
                    {selectedProduct.badge}
                  </span>
                )}
                {selectedProduct.discountPercent && selectedProduct.discountPercent > 0 && (
                  <span className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                    Save {selectedProduct.discountPercent}%
                  </span>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-12 h-12 rounded-md overflow-hidden border transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#0067b8] ring-1 ring-[#0067b8]/30'
                          : 'border-neutral-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees Badges */}
              <div className="grid grid-cols-3 gap-1.5 pt-1 text-center text-[11px] text-neutral-600 font-medium">
                <div className="p-1.5 bg-neutral-50 rounded-md border border-neutral-200 flex flex-col items-center gap-0.5">
                  <Truck className="w-3.5 h-3.5 text-[#0067b8]" />
                  <span>Free 2-3 Day Shipping</span>
                </div>
                <div className="p-1.5 bg-neutral-50 rounded-md border border-neutral-200 flex flex-col items-center gap-0.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#0067b8]" />
                  <span>60-Day Returns</span>
                </div>
                <div className="p-1.5 bg-neutral-50 rounded-md border border-neutral-200 flex flex-col items-center gap-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>1-Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Right Product Details & Options (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Title & Ratings */}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
                  {selectedProduct.title}
                </h1>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  {selectedProduct.tagline || selectedProduct.description}
                </p>

                {/* Rating & Reviews Bar */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i <= Math.round(selectedProduct.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-neutral-800">
                    {selectedProduct.rating.toFixed(1)}
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    ({selectedProduct.reviewCount.toLocaleString()} ratings)
                  </span>
                </div>
              </div>

              {/* Price Display */}
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-neutral-900">
                    {selectedProduct.isFree ? 'Free Download' : `$${currentPrice.toFixed(2)}`}
                  </span>
                  {originalPrice && originalPrice > currentPrice && (
                    <span className="text-xs text-neutral-400 line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                  )}
                  {selectedProduct.discountPercent && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                      Save ${(originalPrice! - currentPrice).toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Taxes calculated at checkout. Rewards: +{Math.round(currentPrice * 10)} pts
                </p>
              </div>

              {/* Color Variant Picker */}
              {selectedProduct.colorVariants && selectedProduct.colorVariants.length > 0 && (
                <div>
                  <label className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider block mb-1.5">
                    Color: <span className="text-[#0067b8]">{selectedColor?.name}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {selectedProduct.colorVariants.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-all cursor-pointer ${
                          selectedColor?.id === c.id
                            ? 'border-[#0067b8] ring-1 ring-[#0067b8]/30 bg-sky-50 font-bold text-[#0067b8]'
                            : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                        }`}
                      >
                        <span 
                          className="w-3 h-3 rounded-full border border-black/20"
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
                  <label className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider block mb-1.5">
                    Configuration & Storage:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {selectedProduct.storageVariants.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedStorage(s)}
                        className={`p-2 rounded-md border text-left text-xs transition-all cursor-pointer ${
                          selectedStorage?.id === s.id
                            ? 'border-[#0067b8] ring-1 ring-[#0067b8]/30 bg-sky-50 font-bold text-[#0067b8]'
                            : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                        }`}
                      >
                        <p className="font-semibold text-neutral-900">{s.name}</p>
                        {s.priceDelta ? (
                          <p className="text-[10px] text-neutral-500 mt-0.2">+{`$${s.priceDelta}`}</p>
                        ) : (
                          <p className="text-[10px] text-emerald-600 mt-0.2">Base Configuration</p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-2.5 pt-1">
                {!selectedProduct.isFree && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 py-0.5 text-xs font-bold text-neutral-900 min-w-[28px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(99, quantity + 1))}
                        className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs cursor-pointer"
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
                    className="flex-1 py-2 px-3 rounded-lg bg-[#0067b8] hover:bg-[#005da6] active:scale-98 text-white font-semibold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{selectedProduct.isFree ? 'Get Free Download' : 'Add to Cart'}</span>
                  </button>

                  {!selectedProduct.isFree && (
                    <button
                      id="modal-buy-now-button"
                      onClick={handleBuyNow}
                      className="py-2 px-4 rounded-lg bg-neutral-900 hover:bg-black active:scale-98 text-white font-semibold text-xs shadow-2xs transition-all cursor-pointer"
                    >
                      <span>Buy Now</span>
                    </button>
                  )}

                  <button
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'border-neutral-200 text-neutral-500 hover:text-rose-600 hover:bg-neutral-50'
                    }`}
                    title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Deep Tabs Section: Features, Specs, Reviews, What's Included */}
          <div className="pt-4 border-t border-neutral-200">
            {/* Tab Headers */}
            <div className="flex items-center gap-1.5 border-b border-neutral-200 pb-1.5 overflow-x-auto">
              <button
                onClick={() => setActiveTab('features')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'features'
                    ? 'bg-sky-50 text-[#0067b8] border border-sky-200'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                Features & Overview
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-sky-50 text-[#0067b8] border border-sky-200'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'bg-sky-50 text-[#0067b8] border border-sky-200'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <span>Customer Reviews</span>
                <span className="bg-neutral-200 text-neutral-700 text-[9px] px-1.5 py-0.2 rounded-full">
                  {localReviews.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('included')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'included'
                    ? 'bg-sky-50 text-[#0067b8] border border-sky-200'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                In The Box / Delivery
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-4">
              
              {/* Features Tab */}
              {activeTab === 'features' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-neutral-900">Key Capabilities & Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-neutral-50 rounded-md border border-neutral-200/80">
                        <Check className="w-3.5 h-3.5 text-[#0067b8] shrink-0 mt-0.5" />
                        <span className="text-xs text-neutral-700 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs Tab */}
              {activeTab === 'specs' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-neutral-900">Technical Specifications</h3>
                  <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden divide-y divide-neutral-200">
                    {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-1 sm:grid-cols-3 p-2 text-xs">
                        <span className="font-bold text-neutral-800">{key}</span>
                        <span className="sm:col-span-2 text-neutral-600 mt-0.5 sm:mt-0">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900">Customer Feedback</h3>
                      <p className="text-[11px] text-neutral-500">Based on verified purchases from Microsoft Store</p>
                    </div>
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-md flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <MessageSquarePlus className="w-3 h-3" />
                      <span>Write Review</span>
                    </button>
                  </div>

                  {/* Write Review Form */}
                  {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="p-3 bg-sky-50/70 border border-sky-200 rounded-lg space-y-2">
                      <h4 className="text-[10px] font-bold text-[#0067b8] uppercase tracking-wider">Leave Your Review</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          required
                          className="px-2.5 py-1 text-xs bg-white border border-neutral-300 rounded-md outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-neutral-700">Rating:</span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewReviewRating(star)}
                                className="text-amber-400 p-0.5"
                              >
                                <Star className={`w-3.5 h-3.5 ${star <= newReviewRating ? 'fill-amber-400' : 'text-neutral-300'}`} />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Review Headline (e.g. Fantastic performance)"
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        className="w-full px-2.5 py-1 text-xs bg-white border border-neutral-300 rounded-md outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                      />
                      <textarea
                        placeholder="Share your detailed experience with this product..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        required
                        rows={2}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-md outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                      />
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="px-2.5 py-1 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-md"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 text-xs font-semibold bg-[#0067b8] text-white rounded-md hover:bg-[#005da6]"
                        >
                          Submit Review
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-2">
                    {localReviews.length > 0 ? (
                      localReviews.map((rev) => (
                        <div key={rev.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-neutral-900">{rev.author}</span>
                              {rev.verified && (
                                <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-neutral-400">{rev.date}</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3 h-3 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}`}
                              />
                            ))}
                          </div>
                          <p className="text-xs font-bold text-neutral-800">{rev.title}</p>
                          <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-neutral-500 italic">No reviews yet. Be the first to share your thoughts!</p>
                    )}
                  </div>
                </div>
              )}

              {/* What's Included Tab */}
              {activeTab === 'included' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-neutral-900">What's in the Box & Delivery Info</h3>
                  <div className="space-y-1.5">
                    {selectedProduct.included.map((inc, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-neutral-50 rounded-md border border-neutral-200/80 text-xs font-medium text-neutral-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
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
            <div className="pt-4 border-t border-neutral-200">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5">
                You May Also Like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => quickViewProduct(rel)}
                    className="p-2 rounded-lg border border-neutral-200 hover:border-[#0067b8] bg-neutral-50/50 hover:bg-sky-50/40 transition-all cursor-pointer flex items-center gap-2.5 group"
                  >
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-10 h-10 rounded-md object-cover bg-neutral-100 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-neutral-900 truncate group-hover:text-[#0067b8]">
                        {rel.title}
                      </p>
                      <p className="text-[10px] text-neutral-500">
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
