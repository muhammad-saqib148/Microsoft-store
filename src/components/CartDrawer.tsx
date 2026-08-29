import React, { useState } from 'react';
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
  Sparkles
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

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const discountAmount = promoDiscount < 1 
    ? cartSubtotal * promoDiscount 
    : Math.min(promoDiscount, cartSubtotal);

  const estimatedTax = (cartSubtotal - discountAmount) * 0.0825;

  return (
    <div 
      id="shopping-cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
    >
      <div 
        id="shopping-cart-drawer-panel"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-3 sm:p-4 border-b border-neutral-200 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-1.5">
            <ShoppingCart className="w-4 h-4 text-[#0067b8]" />
            <h2 className="text-base font-bold text-neutral-900">
              Shopping Cart ({cartCount})
            </h2>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Content: Item List or Empty State */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
          {cart.length > 0 ? (
            <>
              {/* Free Shipping Progress Indicator */}
              <div className="p-2 rounded-md bg-sky-50 border border-sky-200/80 text-[11px] font-medium text-[#0067b8] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 shrink-0 text-[#0067b8]" />
                <span>You've unlocked <strong>Free Standard Express Shipping</strong> on this order!</span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-neutral-100 space-y-2.5">
                {cart.map((item) => {
                  const itemUnitPrice = item.product.price + (item.selectedStorage?.priceDelta || 0);
                  const itemTotalPrice = itemUnitPrice * item.quantity;

                  return (
                    <div key={item.id} className="pt-2.5 first:pt-0 flex gap-2.5">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-14 h-14 rounded-md object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1.5">
                            <h4 className="text-xs font-bold text-neutral-900 line-clamp-2 leading-tight">
                              {item.product.title}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-neutral-400 hover:text-rose-600 p-0.5 rounded cursor-pointer transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Variants Info */}
                          <div className="text-[10px] text-neutral-500 mt-0.5 space-y-0.2">
                            {item.selectedColor && (
                              <p>Color: <span className="font-semibold text-neutral-700">{item.selectedColor.name}</span></p>
                            )}
                            {item.selectedStorage && (
                              <p>Config: <span className="font-semibold text-neutral-700">{item.selectedStorage.name}</span></p>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls & Price */}
                        <div className="flex items-center justify-between mt-1.5 pt-0.5">
                          <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden bg-white">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-1.5 py-0.2 hover:bg-neutral-100 text-neutral-600 cursor-pointer"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="px-2 text-xs font-bold text-neutral-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-1.5 py-0.2 hover:bg-neutral-100 text-neutral-600 cursor-pointer"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-extrabold text-neutral-900">
                              {item.product.isFree ? 'Free' : `$${itemTotalPrice.toFixed(2)}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promo Code Input Form */}
              <div className="pt-3 border-t border-neutral-200">
                <form onSubmit={handleApplyPromo} className="flex gap-1.5">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. MICROSOFT10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 uppercase font-semibold outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {promoCode && (
                  <div className="mt-1.5 flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                    <span className="flex items-center gap-1 font-semibold">
                      <Tag className="w-3 h-3" />
                      {promoCode}
                    </span>
                    <span className="font-bold">Active</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Empty Cart View */
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900">Your cart is empty</h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Explore Microsoft devices, Windows apps, Xbox games, and digital entertainment to get started.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveCategory('all');
                  const el = document.getElementById('catalog-browse-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-semibold rounded-md shadow-2xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Checkout Section */}
        {cart.length > 0 && (
          <div className="p-3 sm:p-4 bg-neutral-50 border-t border-neutral-200 space-y-2">
            <div className="space-y-1 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Tax (8.25%)</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-xs font-extrabold text-neutral-900 pt-1.5 border-t border-neutral-200">
                <span>Estimated Total</span>
                <span className="text-sm text-[#0067b8]">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              id="proceed-to-checkout-btn"
              onClick={handleProceedToCheckout}
              className="w-full py-2.5 bg-[#0067b8] hover:bg-[#005da6] active:scale-98 text-white font-bold text-xs rounded-md shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <p className="text-[9px] text-neutral-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>256-bit SSL Secure Checkout powered by Microsoft Pay</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
