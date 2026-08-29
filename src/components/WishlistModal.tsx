import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistModal: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    quickViewProduct,
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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={() => setIsWishlistOpen(false)}
    >
      <div 
        id="wishlist-modal-container"
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-neutral-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
            <h2 className="text-base font-bold text-neutral-900">
              Saved Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-2.5">
          {wishlist.length > 0 ? (
            <div className="divide-y divide-neutral-100 space-y-2.5">
              {wishlist.map((product) => (
                <div key={product.id} className="pt-2.5 first:pt-0 flex items-center justify-between gap-2.5">
                  <div 
                    className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer group"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      quickViewProduct(product);
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 rounded-md object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold text-[#0067b8] uppercase">{product.subcategory}</p>
                      <h4 className="text-xs font-bold text-neutral-900 truncate group-hover:text-[#0067b8] transition-colors">
                        {product.title}
                      </h4>
                      <div className="flex items-baseline gap-1.5 mt-0.2">
                        <span className="text-xs font-extrabold text-neutral-900">
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

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => addToCart(product)}
                      className="px-2.5 py-1 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-semibold rounded-md shadow-2xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="p-1 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 space-y-2.5">
              <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900">Your wishlist is empty</h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Save items you want to keep track of by clicking the heart icon on any product card.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  setActiveCategory('all');
                  const el = document.getElementById('catalog-browse-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-1.5 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-semibold rounded-md shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-3 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
            <button
              onClick={() => wishlist.forEach(p => toggleWishlist(p))}
              className="text-xs text-neutral-500 hover:text-rose-600 font-medium cursor-pointer"
            >
              Clear wishlist
            </button>
            <button
              onClick={handleMoveAllToCart}
              className="px-3 py-1.5 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-bold rounded-md shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add All to Cart</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
