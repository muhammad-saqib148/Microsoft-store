import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Plus, 
  Minus,
  Sparkles,
  Heart,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    cartTotal,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    setIsCheckoutOpen,
    setActiveCategory
  } = useStore();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  const handleApplySuggestedCode = (code: string) => {
    applyPromoCode(code);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleMoveToWishlist = (item: any) => {
    toggleWishlist(item.product);
    removeFromCart(item.id);
  };

  const discountAmount = promoDiscount < 1 
    ? cartSubtotal * promoDiscount 
    : Math.min(promoDiscount, cartSubtotal);

  const estimatedTax = (cartSubtotal - discountAmount) * 0.0825;

  return (
    <div 
      id="shopping-cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 dark:bg-black/80 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
    >
      <motion.div 
        id="shopping-cart-drawer-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-white dark:bg-[#1f1f1f] text-neutral-900 dark:text-neutral-100 h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-white dark:bg-[#1f1f1f] z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-[#0067b8] dark:text-[#60cdff]">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                Shopping Cart
              </h2>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{cartCount} {cartCount === 1 ? 'item' : 'items'} ready for checkout</p>
            </div>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Content: Item List or Empty State */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length > 0 ? (
            <>
              {/* Free Shipping Progress Indicator */}
              <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 text-xs font-semibold text-[#0067b8] dark:text-[#60cdff] flex items-center gap-2">
                <Truck className="w-4 h-4 shrink-0" />
                <span>You qualify for <strong>Free 2-3 Day Express Shipping</strong>!</span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-neutral-100 dark:divide-neutral-800 space-y-3">
                {cart.map((item) => {
                  const itemUnitPrice = item.product.price + (item.selectedStorage?.priceDelta || 0);
                  const itemTotalPrice = itemUnitPrice * item.quantity;

                  return (
                    <motion.div 
                      key={item.id} 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="pt-3 first:pt-0 flex gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 rounded-xl object-cover bg-neutral-100 dark:bg-neutral-800 shrink-0 border border-neutral-200 dark:border-neutral-700"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-2 leading-tight">
                              {item.product.title}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-neutral-400 hover:text-rose-600 p-1 rounded-md cursor-pointer transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Variants Info */}
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 space-y-0.5">
                            {item.selectedColor && (
                              <p>Color: <span className="font-semibold text-neutral-700 dark:text-neutral-300">{item.selectedColor.name}</span></p>
                            )}
                            {item.selectedStorage && (
                              <p>Spec: <span className="font-semibold text-neutral-700 dark:text-neutral-300">{item.selectedStorage.name}</span></p>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls & Price */}
                        <div className="flex items-center justify-between mt-2 pt-1">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-800">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-0.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-bold text-neutral-900 dark:text-white min-w-[24px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-0.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => handleMoveToWishlist(item)}
                              className="text-[10px] text-neutral-400 hover:text-rose-600 transition-colors flex items-center gap-0.5 cursor-pointer"
                              title="Save to Wishlist"
                            >
                              <Heart className="w-3 h-3" />
                              <span>Save</span>
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-black text-neutral-900 dark:text-white">
                              {item.product.isFree ? 'Free' : `$${itemTotalPrice.toFixed(2)}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Promo Code Input Form & Pills */}
              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. MSSTORE10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white uppercase font-bold outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {/* Available Suggested Coupons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-neutral-400 font-semibold">Try:</span>
                  <button
                    type="button"
                    onClick={() => handleApplySuggestedCode('MSSTORE10')}
                    className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 hover:bg-sky-50 dark:hover:bg-sky-950 text-[#0067b8] dark:text-[#60cdff] border border-neutral-200 dark:border-neutral-700 cursor-pointer"
                  >
                    MSSTORE10 (-10%)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplySuggestedCode('SURFACE20')}
                    className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 hover:bg-sky-50 dark:hover:bg-sky-950 text-[#0067b8] dark:text-[#60cdff] border border-neutral-200 dark:border-neutral-700 cursor-pointer"
                  >
                    SURFACE20 (-20%)
                  </button>
                </div>

                {promoCode && (
                  <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <span className="flex items-center gap-1 font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      Promo &lsquo;{promoCode}&rsquo; Applied
                    </span>
                    <span className="font-extrabold text-[11px]">Save {promoDiscount < 1 ? `${promoDiscount * 100}%` : `$${promoDiscount}`}</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Empty Cart View */
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Your cart is empty</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed">
                Browse Microsoft Copilot+ PCs, Windows apps, Xbox Game Pass, and Surface accessories.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveCategory('all');
                  const el = document.getElementById('catalog-browse-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2.5 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-bold rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Checkout Section */}
        {cart.length > 0 && (
          <div className="p-4 bg-neutral-50 dark:bg-neutral-850 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900 dark:text-white">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span>Promo Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Tax (8.25%)</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Standard Express Delivery</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-xs font-extrabold text-neutral-900 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-700">
                <span>Estimated Total</span>
                <span className="text-base text-[#0067b8] dark:text-[#60cdff]">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              id="cart-checkout-button"
              onClick={handleProceedToCheckout}
              className="w-full py-3 bg-[#0067b8] hover:bg-[#005da6] active:scale-98 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 dark:text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Microsoft 256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
