import React, { useState } from 'react';
import { 
  X, 
  Check, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  PackageCheck, 
  Receipt, 
  Printer, 
  CheckCircle2,
  Award,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { MicrosoftLogo } from './MicrosoftLogo';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartTotal,
    promoDiscount,
    placeOrder,
    lastOrder,
    user
  } = useStore();

  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user.name || 'Muhammad Saqib',
    email: user.email || 'sk8013908@gmail.com',
    phone: user.phone || '03491905800',
    street: '123 Innovation Boulevard',
    city: 'Lahore',
    state: 'Punjab',
    zip: '54000'
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mspay' | 'paypal'>('mspay');
  const [cardInfo, setCardInfo] = useState({
    number: '•••• •••• •••• 4242',
    name: user.name || 'Muhammad Saqib',
    expiry: '08/28',
    cvv: '912'
  });

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleFinalPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = placeOrder(shippingInfo, paymentMethod.toUpperCase());
      setConfirmedOrder(order);
      setIsProcessing(false);
      setStep('success');
    }, 1200);
  };

  const discountAmount = promoDiscount < 1 
    ? cartSubtotal * promoDiscount 
    : Math.min(promoDiscount, cartSubtotal);

  const estimatedTax = (cartSubtotal - discountAmount) * 0.0825;

  return (
    <div 
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={() => step !== 'success' && setIsCheckoutOpen(false)}
    >
      <div 
        id="checkout-modal-container"
        className="bg-white rounded-xl max-w-2xl w-full max-h-[94vh] overflow-y-auto shadow-xl border border-neutral-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header */}
        <div className="px-4 py-2.5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <MicrosoftLogo size={18} textSize="text-xs" />
            <span className="text-neutral-300">|</span>
            <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              Secure Checkout
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Checkout Steps Progress Bar (if not success) */}
        {step !== 'success' && (
          <div className="px-4 pt-2.5 pb-2 border-b border-neutral-100 flex items-center justify-center gap-3 text-[11px] font-semibold">
            <div className={`flex items-center gap-1 ${step === 'shipping' ? 'text-[#0067b8]' : 'text-emerald-600'}`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] text-white ${step === 'shipping' ? 'bg-[#0067b8]' : 'bg-emerald-600'}`}>
                {step === 'payment' ? <Check className="w-2.5 h-2.5" /> : '1'}
              </span>
              <span>1. Delivery & Address</span>
            </div>
            <span className="text-neutral-300">———</span>
            <div className={`flex items-center gap-1 ${step === 'payment' ? 'text-[#0067b8]' : 'text-neutral-400'}`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] text-white ${step === 'payment' ? 'bg-[#0067b8]' : 'bg-neutral-300'}`}>
                2
              </span>
              <span>2. Payment & Review</span>
            </div>
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-4 sm:p-5 flex-1">
          
          {/* STEP 1: Shipping Address */}
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Shipping & Delivery Information</h3>
                <p className="text-[11px] text-neutral-500 mt-0.5">Enter the address where your physical devices & invoice should be sent.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-0.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-md outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-0.5">
                    Phone Number / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-md outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="text-[11px] font-bold text-neutral-700">Notification Email (Order Receipt)</label>
                    <span className="text-[10px] text-[#0067b8] font-medium">Instant alerts sent here</span>
                  </div>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-md outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-neutral-700 block mb-0.5">Street Address</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.street}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, street: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-md outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-0.5">City</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-md outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 block mb-0.5">State / Province</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-md outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 block mb-0.5">Postal / Zip Code</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-md outline-hidden focus:ring-1 focus:ring-[#0067b8]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Speed Card */}
              <div className="p-3 rounded-lg bg-sky-50/70 border border-sky-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#0067b8]" />
                  <div>
                    <p className="text-xs font-bold text-neutral-900">Microsoft Express Delivery</p>
                    <p className="text-[10px] text-neutral-500">Estimated delivery: 2-3 Business Days</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  FREE
                </span>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-4 py-2 rounded-md text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment & Order Summary */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* Left Payment Options (7 cols) */}
                <div className="md:col-span-7 space-y-3">
                  <h3 className="text-base font-bold text-neutral-900">Choose Payment Method</h3>
                  
                  <div className="space-y-2">
                    {/* Microsoft Pay */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mspay')}
                      className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'mspay'
                          ? 'border-[#0067b8] ring-1 ring-[#0067b8]/30 bg-sky-50/70'
                          : 'border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-neutral-900 flex items-center justify-center text-white font-bold text-xs">
                          ⊞
                        </div>
                        <div>
                          <p className="text-xs font-bold text-neutral-900">Microsoft Pay (1-Click)</p>
                          <p className="text-[10px] text-neutral-500">Fast, encrypted checkout with Microsoft Account</p>
                        </div>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'mspay' ? 'border-[#0067b8] bg-[#0067b8]' : 'border-neutral-300'
                      }`}>
                        {paymentMethod === 'mspay' && <div className="w-1 h-1 rounded-full bg-white" />}
                      </div>
                    </button>

                    {/* Credit / Debit Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#0067b8] ring-1 ring-[#0067b8]/30 bg-sky-50/70'
                          : 'border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-5 h-5 text-[#0067b8]" />
                        <div>
                          <p className="text-xs font-bold text-neutral-900">Credit / Debit Card</p>
                          <p className="text-[10px] text-neutral-500">Visa, Mastercard, Amex, Discover</p>
                        </div>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-[#0067b8] bg-[#0067b8]' : 'border-neutral-300'
                      }`}>
                        {paymentMethod === 'card' && <div className="w-1 h-1 rounded-full bg-white" />}
                      </div>
                    </button>

                    {/* PayPal */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'paypal'
                          ? 'border-[#0067b8] ring-1 ring-[#0067b8]/30 bg-sky-50/70'
                          : 'border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-blue-700 flex items-center justify-center text-white font-bold text-xs italic">
                          P
                        </div>
                        <div>
                          <p className="text-xs font-bold text-neutral-900">PayPal Express</p>
                          <p className="text-[10px] text-neutral-500">Safe online payment via PayPal</p>
                        </div>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'paypal' ? 'border-[#0067b8] bg-[#0067b8]' : 'border-neutral-300'
                      }`}>
                        {paymentMethod === 'paypal' && <div className="w-1 h-1 rounded-full bg-white" />}
                      </div>
                    </button>
                  </div>

                  {/* Simulated Card inputs */}
                  {paymentMethod === 'card' && (
                    <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-700 block mb-0.5">Card Number</label>
                        <input
                          type="text"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                          className="w-full px-2.5 py-1 text-xs bg-white border border-neutral-300 rounded-md"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-700 block mb-0.5">Expiration</label>
                          <input
                            type="text"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                            className="w-full px-2.5 py-1 text-xs bg-white border border-neutral-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-neutral-700 block mb-0.5">Security Code (CVV)</label>
                          <input
                            type="text"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                            className="w-full px-2.5 py-1 text-xs bg-white border border-neutral-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Order Review (5 cols) */}
                <div className="md:col-span-5 bg-neutral-50 p-3 rounded-lg border border-neutral-200 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      Order Summary ({cart.length} items)
                    </h4>

                    <div className="space-y-1.5 max-h-40 overflow-y-auto divide-y divide-neutral-200/60 pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="pt-1.5 first:pt-0 flex items-center justify-between text-xs">
                          <div className="truncate mr-1.5">
                            <span className="font-medium text-neutral-800">{item.product.title}</span>
                            <span className="text-neutral-500 ml-1">x{item.quantity}</span>
                          </div>
                          <span className="font-bold text-neutral-900 shrink-0">
                            {item.product.isFree ? 'Free' : `$${((item.product.price + (item.selectedStorage?.priceDelta || 0)) * item.quantity).toFixed(2)}`}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-2 border-t border-neutral-200 space-y-1 text-xs text-neutral-600">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${cartSubtotal.toFixed(2)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-semibold">
                          <span>Discount</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${estimatedTax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-emerald-700 font-semibold">FREE</span>
                      </div>
                      <div className="flex justify-between font-extrabold text-xs text-neutral-900 pt-1.5 border-t border-neutral-200">
                        <span>Total Due</span>
                        <span className="text-sm text-[#0067b8]">${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleFinalPayment}
                      className="w-full py-2 bg-[#0067b8] hover:bg-[#005da6] active:scale-98 text-white font-bold text-xs rounded-md shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span>Authorizing Payment...</span>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Place Order (${cartTotal.toFixed(2)})</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="w-full text-center text-[11px] text-neutral-500 hover:text-neutral-800 mt-1.5 cursor-pointer"
                    >
                      ← Back to shipping details
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3: Order Confirmation & Receipt */}
          {step === 'success' && confirmedOrder && (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Payment Verified & Order Confirmed
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 mt-2">
                  Thank you for your order, {confirmedOrder.shippingAddress.fullName}!
                </h2>
                <p className="text-xs text-neutral-600 mt-1">
                  Your purchase was completed successfully. Order details & digital license keys have been dispatched.
                </p>
              </div>

              {/* Notification Banner to sk8013908@gmail.com & Customer details */}
              <div className="max-w-lg mx-auto bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-xl p-3.5 text-left shadow-2xs space-y-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0067b8] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-[#0067b8]">Microsoft Store Instant Email Notification</h4>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        DISPATCHED
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-neutral-900 mt-0.5">
                      Store Admin & Notification Email: <span className="font-mono text-[#0067b8]">sk8013908@gmail.com</span>
                    </p>
                    <p className="text-[11px] text-neutral-600 mt-0.5">
                      Customer: <strong>{confirmedOrder.shippingAddress.fullName}</strong> • Phone: <strong className="text-neutral-800">{confirmedOrder.shippingAddress.phone}</strong> • Customer Email: <strong className="text-neutral-800">{confirmedOrder.shippingAddress.email}</strong>
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-sky-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-neutral-500">Subject: [Microsoft Store] New Order #{confirmedOrder.id} - {confirmedOrder.shippingAddress.fullName}</span>
                  <a
                    href={`mailto:sk8013908@gmail.com?subject=${encodeURIComponent(`[Microsoft Store Order Notification] #${confirmedOrder.id} - ${confirmedOrder.shippingAddress.fullName}`)}&body=${encodeURIComponent(`Microsoft Store Order Notification\n===============================\nOrder ID: #${confirmedOrder.id}\nDate: ${confirmedOrder.date}\n\nCustomer Details from Form:\n- Full Name: ${confirmedOrder.shippingAddress.fullName}\n- Phone Number: ${confirmedOrder.shippingAddress.phone}\n- Customer Email: ${confirmedOrder.shippingAddress.email}\n- Shipping Address: ${confirmedOrder.shippingAddress.street}, ${confirmedOrder.shippingAddress.city}, ${confirmedOrder.shippingAddress.state} ${confirmedOrder.shippingAddress.zip}\n\nOrder Items:\n${confirmedOrder.items.map(it => `• ${it.product.title} (Qty: ${it.quantity}) - $${((it.product.price + (it.selectedStorage?.priceDelta || 0)) * it.quantity).toFixed(2)}`).join('\n')}\n\nOrder Summary:\n- Subtotal: $${confirmedOrder.subtotal.toFixed(2)}\n- Total Paid: $${confirmedOrder.total.toFixed(2)}\n- Payment Method: ${confirmedOrder.paymentMethod}\n- Status: ${confirmedOrder.status}\n\nMicrosoft Store Notification Service\nAdmin: sk8013908@gmail.com\nPhone: 03491905800`)}`}
                    className="inline-flex items-center gap-1 font-bold text-[#0067b8] hover:underline cursor-pointer"
                  >
                    <span>Open in Gmail / Mail App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-4 max-w-lg mx-auto text-left space-y-3 shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 text-xs">
                  <div>
                    <span className="text-neutral-500 text-[10px]">Order Number</span>
                    <p className="font-mono font-bold text-xs text-neutral-900">{confirmedOrder.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 text-[10px]">Order Date</span>
                    <p className="font-bold text-xs text-neutral-900">{confirmedOrder.date}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider">Ordered Items</span>
                  <div className="divide-y divide-neutral-200/70 max-h-32 overflow-y-auto">
                    {confirmedOrder.items.map((it) => (
                      <div key={it.id} className="py-1.5 flex items-center justify-between text-xs">
                        <span className="font-medium text-neutral-800 truncate">{it.product.title} (x{it.quantity})</span>
                        <span className="font-bold text-neutral-900 ml-2">
                          {it.product.isFree ? 'Free' : `$${((it.product.price + (it.selectedStorage?.priceDelta || 0)) * it.quantity).toFixed(2)}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Contact Details from Form */}
                <div className="pt-2 border-t border-neutral-200 grid grid-cols-2 gap-2 text-[11px] text-neutral-600 bg-white p-2.5 rounded-lg border border-neutral-200">
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-bold uppercase">Customer Name</span>
                    <span className="font-semibold text-neutral-900">{confirmedOrder.shippingAddress.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-bold uppercase">Phone Number</span>
                    <span className="font-semibold text-neutral-900">{confirmedOrder.shippingAddress.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-bold uppercase">Customer Email</span>
                    <span className="font-semibold text-[#0067b8] truncate block">{confirmedOrder.shippingAddress.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-bold uppercase">Admin Notification</span>
                    <span className="font-semibold text-emerald-700">sk8013908@gmail.com</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-neutral-100">
                    <span className="text-[10px] text-neutral-400 block font-bold uppercase">Delivery Address</span>
                    <span className="font-medium text-neutral-800">{confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} {confirmedOrder.shippingAddress.zip}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-bold text-[11px]">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>+{Math.round(confirmedOrder.total * 10)} Rewards Points</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-500 block">Total Paid</span>
                    <span className="text-sm font-extrabold text-[#0067b8]">${confirmedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 pt-1">
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-5 py-2 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-bold rounded-md shadow-2xs transition-all cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
