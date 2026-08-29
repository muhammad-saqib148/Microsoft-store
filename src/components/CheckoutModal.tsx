import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ExternalLink,
  ChevronLeft,
  MapPin,
  ChevronDown,
  Search,
  Building2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { MicrosoftLogo } from './MicrosoftLogo';
import { CITIES_DATABASE, searchCities, findCityData, getPopularCities, CityData } from '../data/citiesData';

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

  // Form states with default profile values
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user.name || 'Muhammad Saqib',
    email: user.email || 'sk8013908@gmail.com',
    phone: user.phone || '03491905800',
    street: '123 Innovation Boulevard',
    city: 'Lahore',
    state: 'Punjab',
    zip: '54000'
  });

  // City Autocomplete & Auto-populate state
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState(shippingInfo.city);
  const [autoFilledNotice, setAutoFilledNotice] = useState<string | null>('✓ Auto-filled: Punjab & Postal Code 54000');
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popularCities = getPopularCities().slice(0, 8);
  const filteredCityList = searchCities(citySearchQuery);

  const handleSelectCity = (c: CityData) => {
    setShippingInfo(prev => ({
      ...prev,
      city: c.city,
      state: c.state,
      zip: c.zip
    }));
    setCitySearchQuery(c.city);
    setAutoFilledNotice(`✓ Auto-filled: ${c.state} & Postal Code ${c.zip}`);
    setIsCityDropdownOpen(false);
  };

  const handleCityInput = (val: string) => {
    setCitySearchQuery(val);
    setIsCityDropdownOpen(true);
    
    // Check if entered text matches a known city
    const matched = findCityData(val);
    if (matched) {
      setShippingInfo(prev => ({
        ...prev,
        city: matched.city,
        state: matched.state,
        zip: matched.zip
      }));
      setAutoFilledNotice(`✓ Auto-filled: ${matched.state} & Postal Code ${matched.zip}`);
    } else {
      setShippingInfo(prev => ({ ...prev, city: val }));
      setAutoFilledNotice(null);
    }
  };

  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'priority'>('standard');
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

  const handlePrintReceipt = () => {
    window.print();
  };

  const discountAmount = promoDiscount < 1 
    ? cartSubtotal * promoDiscount 
    : Math.min(promoDiscount, cartSubtotal);

  const deliveryCost = deliveryOption === 'priority' ? 9.99 : 0;
  const estimatedTax = (cartSubtotal - discountAmount) * 0.0825;
  const finalPayableTotal = cartTotal + deliveryCost;

  return (
    <div 
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={() => step !== 'success' && setIsCheckoutOpen(false)}
    >
      <motion.div 
        id="checkout-modal-container"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white dark:bg-[#1f1f1f] text-neutral-900 dark:text-neutral-100 rounded-2xl max-w-2xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-neutral-200 dark:border-neutral-700 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/80 dark:bg-neutral-850/80 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <MicrosoftLogo size={18} textSize="text-xs" />
            <span className="text-neutral-300 dark:text-neutral-600">|</span>
            <span className="text-[11px] font-extrabold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Microsoft Secure Checkout
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Checkout Steps Progress Bar (if not success) */}
        {step !== 'success' && (
          <div className="px-6 pt-3 pb-2.5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-center gap-4 text-xs font-bold">
            <div className={`flex items-center gap-1.5 ${step === 'shipping' ? 'text-[#0067b8] dark:text-[#60cdff]' : 'text-emerald-600 dark:text-emerald-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${step === 'shipping' ? 'bg-[#0067b8] dark:bg-[#0078d4]' : 'bg-emerald-600'}`}>
                {step === 'payment' ? <Check className="w-3 h-3" /> : '1'}
              </span>
              <span>1. Customer & Delivery</span>
            </div>
            <span className="text-neutral-300 dark:text-neutral-700">———</span>
            <div className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-[#0067b8] dark:text-[#60cdff]' : 'text-neutral-400 dark:text-neutral-600'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${step === 'payment' ? 'bg-[#0067b8] dark:bg-[#0078d4]' : 'bg-neutral-300 dark:bg-neutral-700'}`}>
                2
              </span>
              <span>2. Payment & Place Order</span>
            </div>
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 flex-1">
          
          {/* STEP 1: Shipping Address */}
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">Customer & Delivery Information</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Please provide your contact details for Microsoft Store order tracking and receipt dispatch.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl outline-hidden focus:ring-2 focus:ring-[#0067b8]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Phone Number / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl outline-hidden focus:ring-2 focus:ring-[#0067b8]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300">Notification Email (Order Receipt)</label>
                    <span className="text-[10px] text-[#0067b8] dark:text-[#60cdff] font-semibold">Store alert sent to sk8013908@gmail.com</span>
                  </div>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl outline-hidden focus:ring-2 focus:ring-[#0067b8]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="House / Flat No., Street, Area"
                    value={shippingInfo.street}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, street: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl outline-hidden focus:ring-2 focus:ring-[#0067b8]"
                  />
                </div>

                {/* Popular City Quick-Select Chips */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#0067b8] dark:text-[#60cdff]" />
                      Quick Popular Cities (1-Click Auto-Fill Province & Postal Code):
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {popularCities.map((c) => {
                      const isSelected = shippingInfo.city.toLowerCase() === c.city.toLowerCase();
                      return (
                        <button
                          key={c.city}
                          type="button"
                          onClick={() => handleSelectCity(c)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            isSelected
                              ? 'bg-[#0067b8] dark:bg-[#0078d4] text-white shadow-xs'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700'
                          }`}
                        >
                          <span>{c.city}</span>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Smart City Selection with Searchable Autocomplete */}
                <div className="relative" ref={cityDropdownRef}>
                  <label className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    City <span className="text-[#0067b8] dark:text-[#60cdff] text-[10px] font-normal">(Auto-fills Province & Postal Code)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Type or select city (e.g. Lahore, Karachi, Islamabad)..."
                      value={citySearchQuery}
                      onChange={(e) => handleCityInput(e.target.value)}
                      onFocus={() => setIsCityDropdownOpen(true)}
                      className="w-full pl-8 pr-8 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl outline-hidden focus:ring-2 focus:ring-[#0067b8] font-medium"
                    />
                    <Building2 className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Autocomplete Dropdown List */}
                  <AnimatePresence>
                    {isCityDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute left-0 right-0 top-full mt-1 z-30 bg-white dark:bg-[#252525] border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-xl max-h-56 overflow-y-auto"
                      >
                        <div className="p-1.5 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2 border-b border-neutral-100 dark:border-neutral-800">
                          {filteredCityList.length} Cities Available (Select to auto-fill)
                        </div>
                        {filteredCityList.length > 0 ? (
                          filteredCityList.map((c) => (
                            <button
                              key={`${c.city}-${c.zip}`}
                              type="button"
                              onClick={() => handleSelectCity(c)}
                              className="w-full text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between text-xs transition-colors border-b border-neutral-50 dark:border-neutral-800/40 last:border-0 cursor-pointer"
                            >
                              <div>
                                <span className="font-bold text-neutral-900 dark:text-white">{c.city}</span>
                                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 ml-1.5">
                                  ({c.state})
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-mono bg-sky-100 dark:bg-sky-950/80 text-[#0067b8] dark:text-[#60cdff] px-1.5 py-0.5 rounded font-bold">
                                  {c.zip}
                                </span>
                                <span className="text-[10px] text-neutral-400">
                                  {c.country}
                                </span>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="p-3 text-center text-xs text-neutral-500">
                            No matching city found. You can enter manually below.
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block mb-1">State / Province</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Punjab"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl outline-hidden focus:ring-2 focus:ring-[#0067b8] font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Postal / Zip Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 54000"
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl outline-hidden focus:ring-2 focus:ring-[#0067b8] font-mono font-medium"
                    />
                  </div>
                </div>

                {/* Auto-filled Feedback Badge */}
                {autoFilledNotice && (
                  <div className="sm:col-span-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-lg text-[11px] font-bold text-emerald-700 dark:text-emerald-400 animate-in fade-in">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{autoFilledNotice}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Speed Card Selection */}
              <div className="space-y-2 pt-1">
                <label className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block">Shipping Method</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div
                    onClick={() => setDeliveryOption('standard')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      deliveryOption === 'standard'
                        ? 'border-[#0067b8] dark:border-[#60cdff] bg-sky-50/70 dark:bg-sky-950/40 ring-1 ring-[#0067b8]/20'
                        : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Truck className="w-4 h-4 text-[#0067b8] dark:text-[#60cdff]" />
                      <div>
                        <p className="text-xs font-bold text-neutral-900 dark:text-white">Microsoft Express</p>
                        <p className="text-[10px] text-neutral-500">2-3 Business Days</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      FREE
                    </span>
                  </div>

                  <div
                    onClick={() => setDeliveryOption('priority')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      deliveryOption === 'priority'
                        ? 'border-[#0067b8] dark:border-[#60cdff] bg-sky-50/70 dark:bg-sky-950/40 ring-1 ring-[#0067b8]/20'
                        : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <div>
                        <p className="text-xs font-bold text-neutral-900 dark:text-white">Priority Overnight</p>
                        <p className="text-[10px] text-neutral-500">Next-Day Morning</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      +$9.99
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
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
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                
                {/* Left Payment Options (7 cols) */}
                <div className="md:col-span-7 space-y-3">
                  <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">Select Payment Method</h3>
                  
                  <div className="space-y-2">
                    {/* Microsoft Pay */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mspay')}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'mspay'
                          ? 'border-[#0067b8] dark:border-[#60cdff] ring-2 ring-[#0067b8]/20 bg-sky-50/70 dark:bg-sky-950/40'
                          : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-black flex items-center justify-center text-white font-bold text-sm shadow-xs">
                          ⊞
                        </div>
                        <div>
                          <p className="text-xs font-bold text-neutral-900 dark:text-white">Microsoft Pay (1-Click)</p>
                          <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Authenticated via {user.email}</p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'mspay' ? 'border-[#0067b8] bg-[#0067b8]' : 'border-neutral-300 dark:border-neutral-600'
                      }`}>
                        {paymentMethod === 'mspay' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>

                    {/* Credit / Debit Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#0067b8] dark:border-[#60cdff] ring-2 ring-[#0067b8]/20 bg-sky-50/70 dark:bg-sky-950/40'
                          : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-[#0067b8] dark:text-[#60cdff]" />
                        <div>
                          <p className="text-xs font-bold text-neutral-900 dark:text-white">Credit / Debit Card</p>
                          <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Visa, Mastercard, Amex, UnionPay</p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-[#0067b8] bg-[#0067b8]' : 'border-neutral-300 dark:border-neutral-600'
                      }`}>
                        {paymentMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>

                    {/* PayPal */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'paypal'
                          ? 'border-[#0067b8] dark:border-[#60cdff] ring-2 ring-[#0067b8]/20 bg-sky-50/70 dark:bg-sky-950/40'
                          : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-black text-xs italic">
                          P
                        </div>
                        <div>
                          <p className="text-xs font-bold text-neutral-900 dark:text-white">PayPal Express</p>
                          <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Fast digital buyer protection</p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'paypal' ? 'border-[#0067b8] bg-[#0067b8]' : 'border-neutral-300 dark:border-neutral-600'
                      }`}>
                        {paymentMethod === 'paypal' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  </div>

                  {/* Card input mockup */}
                  {paymentMethod === 'card' && (
                    <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-2.5">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300 block mb-0.5">Card Number</label>
                        <input
                          type="text"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300 block mb-0.5">Expiration</label>
                          <input
                            type="text"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300 block mb-0.5">Security Code (CVV)</label>
                          <input
                            type="text"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Order Review (5 cols) */}
                <div className="md:col-span-5 bg-neutral-50 dark:bg-neutral-800/80 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">
                      Order Summary ({cart.length} items)
                    </h4>

                    <div className="space-y-1.5 max-h-40 overflow-y-auto divide-y divide-neutral-200/60 dark:divide-neutral-700/60 pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="pt-1.5 first:pt-0 flex items-center justify-between text-xs">
                          <div className="truncate mr-1.5">
                            <span className="font-medium text-neutral-800 dark:text-neutral-200">{item.product.title}</span>
                            <span className="text-neutral-500 ml-1">x{item.quantity}</span>
                          </div>
                          <span className="font-bold text-neutral-900 dark:text-white shrink-0">
                            {item.product.isFree ? 'Free' : `$${((item.product.price + (item.selectedStorage?.priceDelta || 0)) * item.quantity).toFixed(2)}`}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-neutral-200 dark:border-neutral-700 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${cartSubtotal.toFixed(2)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                          <span>Discount</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${estimatedTax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping ({deliveryOption === 'priority' ? 'Priority' : 'Express'})</span>
                        <span className={deliveryOption === 'priority' ? 'font-bold text-neutral-900 dark:text-white' : 'text-emerald-700 dark:text-emerald-400 font-bold'}>
                          {deliveryOption === 'priority' ? '$9.99' : 'FREE'}
                        </span>
                      </div>
                      <div className="flex justify-between font-black text-xs text-neutral-900 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-700">
                        <span>Total Due</span>
                        <span className="text-base text-[#0067b8] dark:text-[#60cdff]">${finalPayableTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleFinalPayment}
                      className="w-full py-3 bg-[#0067b8] hover:bg-[#005da6] active:scale-98 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span>Authorizing Payment & Sending Notification...</span>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Authorize & Place Order (${finalPayableTotal.toFixed(2)})</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="w-full text-center text-xs font-semibold text-neutral-500 hover:text-neutral-800 dark:hover:text-white mt-2 cursor-pointer"
                    >
                      ← Edit shipping & contact details
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3: Order Confirmation & Receipt */}
          {step === 'success' && confirmedOrder && (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Payment Verified & Order Placed
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mt-2">
                  Thank you for your order, {confirmedOrder.shippingAddress.fullName}!
                </h2>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  Your order has been recorded in the store system and confirmed with Microsoft Store services.
                </p>
              </div>

              {/* Notification Banner to sk8013908@gmail.com & Customer details */}
              <div className="max-w-lg mx-auto bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 border border-sky-200 dark:border-sky-800 rounded-2xl p-4 text-left shadow-xs space-y-2.5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0067b8] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-[#0067b8] dark:text-[#60cdff]">Microsoft Store Instant Email Notification</h4>
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        DISPATCHED
                      </span>
                    </div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white mt-1">
                      Store Notification Sent To: <span className="font-mono text-[#0067b8] dark:text-[#60cdff]">sk8013908@gmail.com</span>
                    </p>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-300 mt-0.5">
                      Customer: <strong>{confirmedOrder.shippingAddress.fullName}</strong> • Phone: <strong className="text-neutral-900 dark:text-white">{confirmedOrder.shippingAddress.phone}</strong> • Customer Email: <strong className="text-neutral-900 dark:text-white">{confirmedOrder.shippingAddress.email}</strong>
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-sky-200/80 dark:border-sky-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-neutral-500 dark:text-neutral-400">Subject: [Microsoft Store Order] #{confirmedOrder.id} - {confirmedOrder.shippingAddress.fullName}</span>
                  <a
                    href={`mailto:sk8013908@gmail.com?subject=${encodeURIComponent(`[Microsoft Store Order Notification] #${confirmedOrder.id} - ${confirmedOrder.shippingAddress.fullName}`)}&body=${encodeURIComponent(`Microsoft Store Order Notification\n===============================\nOrder ID: #${confirmedOrder.id}\nDate: ${confirmedOrder.date}\n\nCustomer Details from Form:\n- Full Name: ${confirmedOrder.shippingAddress.fullName}\n- Phone Number: ${confirmedOrder.shippingAddress.phone}\n- Customer Email: ${confirmedOrder.shippingAddress.email}\n- Shipping Address: ${confirmedOrder.shippingAddress.street}, ${confirmedOrder.shippingAddress.city}, ${confirmedOrder.shippingAddress.state} ${confirmedOrder.shippingAddress.zip}\n\nOrder Items:\n${confirmedOrder.items.map(it => `• ${it.product.title} (Qty: ${it.quantity}) - $${((it.product.price + (it.selectedStorage?.priceDelta || 0)) * it.quantity).toFixed(2)}`).join('\n')}\n\nOrder Summary:\n- Subtotal: $${confirmedOrder.subtotal.toFixed(2)}\n- Total Paid: $${confirmedOrder.total.toFixed(2)}\n- Payment Method: ${confirmedOrder.paymentMethod}\n- Status: ${confirmedOrder.status}\n\nMicrosoft Store Notification Service\nAdmin: sk8013908@gmail.com\nPhone: 03491905800`)}`}
                    className="inline-flex items-center gap-1 font-bold text-[#0067b8] dark:text-[#60cdff] hover:underline cursor-pointer"
                  >
                    <span>Open in Gmail / Mail Client</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Printable Receipt Summary Card */}
              <div className="bg-neutral-50 dark:bg-neutral-800/80 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4 max-w-lg mx-auto text-left space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-700 text-xs">
                  <div>
                    <span className="text-neutral-500 text-[10px]">Order Number</span>
                    <p className="font-mono font-bold text-xs text-neutral-900 dark:text-white">{confirmedOrder.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 text-[10px]">Order Date</span>
                    <p className="font-bold text-xs text-neutral-900 dark:text-white">{confirmedOrder.date}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">Ordered Items</span>
                  <div className="divide-y divide-neutral-200/70 dark:divide-neutral-700 max-h-32 overflow-y-auto">
                    {confirmedOrder.items.map((it) => (
                      <div key={it.id} className="py-1.5 flex items-center justify-between text-xs">
                        <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate">{it.product.title} (x{it.quantity})</span>
                        <span className="font-bold text-neutral-900 dark:text-white ml-2">
                          {it.product.isFree ? 'Free' : `$${((it.product.price + (it.selectedStorage?.priceDelta || 0)) * it.quantity).toFixed(2)}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Contact Details from Form */}
                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 grid grid-cols-2 gap-2 text-[11px] text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-850 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-bold uppercase">Customer Name</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">{confirmedOrder.shippingAddress.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-bold uppercase">Phone Number</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">{confirmedOrder.shippingAddress.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-bold uppercase">Customer Email</span>
                    <span className="font-semibold text-[#0067b8] dark:text-[#60cdff] truncate block">{confirmedOrder.shippingAddress.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-bold uppercase">Admin Notification</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">sk8013908@gmail.com</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-neutral-100 dark:border-neutral-700">
                    <span className="text-[10px] text-neutral-400 block font-bold uppercase">Delivery Address</span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">{confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} {confirmedOrder.shippingAddress.zip}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800 font-bold text-[11px]">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>+{Math.round(confirmedOrder.total * 10)} Rewards Points</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-500 block">Total Paid</span>
                    <span className="text-base font-black text-[#0067b8] dark:text-[#60cdff]">${confirmedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Official Invoice</span>
                </button>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-5 py-2.5 bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Return to Store
                </button>
              </div>
            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
};
