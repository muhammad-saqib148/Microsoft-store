import React from 'react';
import { motion } from 'motion/react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistModal: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    quickViewProduct,
    openProductDetails,
    setActiveCategory
  } = useStore();

  if (!isWishlistOpen) return null;

  const handleMoveAllToCart = () => {
    wishlist.forEach((p) => addToCart(p));
    setIsWishlistOpen(false);
  };

  return (
    <div 
      id="wishlist-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={() => setIsWishlistOpen(false)}
    >
      <div 
        id="wishlist-modal-container"
        className="bg-white dark:bg-[#1f1f1f] text-neutral-900 dark:text-neutral-100 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-neutral-200 dark:border-neutral-700 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between sticky top-0 bg-white dark:bg-[#1f1f1f] z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-600">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                Saved Wishlist
              </h2>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{wishlist.length} saved products</p>
            </div>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {wishlist.length > 0 ? (
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800 space-y-3">
              {wishlist.map((product) => (
                <div key={product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div 
                    className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer group"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openProductDetails(product);
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-14 h-14 rounded-xl object-cover bg-neutral-100 dark:bg-neutral-800 shrink-0 border border-neutral-200 dark:border-neutral-700 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-[#0067b8] dark:text-[#60cdff] uppercase tracking-wider">{product.subcategory}</p>
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate group-hover:text-[#0067b8] dark:group-hover:text-[#60cdff] transition-colors mt-0.5">
                        {product.title}
                      </h4>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-xs font-black text-neutral-900 dark:text-white">
                          {product.isFree ? 'Free' : `$${product.price.toFixed(2)}`}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-[10px] text-neutral-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => addToCart(product)}
                      className="px-3 py-1.5 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 bg-rose-50 dark:bg-rose-950/40 rounded-full flex items-center justify-center mx-auto text-rose-500">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Your wishlist is empty</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed">
                Save your favorite Surface hardware, Xbox games, and Windows apps by clicking the heart button.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  setActiveCategory('all');
                  const el = document.getElementById('catalog-browse-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-3.5 bg-neutral-50 dark:bg-neutral-850 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <button
              onClick={() => wishlist.forEach(p => toggleWishlist(p))}
              className="text-xs text-neutral-500 hover:text-rose-600 font-semibold cursor-pointer"
            >
              Clear all items
            </button>
            <button
              onClick={handleMoveAllToCart}
              className="px-4 py-2 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add All to Cart</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
