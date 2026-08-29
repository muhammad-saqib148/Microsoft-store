import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Pause,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { heroSlides } from '../data/products';
import { useStore } from '../context/StoreContext';

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { products, quickViewProduct, addToCart, setActiveCategory } = useStore();

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const slide = heroSlides[currentSlide];
  const activeProduct = products.find((p) => p.id === slide.productId);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handlePrimaryCta = () => {
    if (activeProduct) {
      quickViewProduct(activeProduct);
    }
  };

  const handleSecondaryCta = () => {
    if (activeProduct) {
      if (activeProduct.category) {
        setActiveCategory(activeProduct.category);
        const el = document.getElementById('catalog-browse-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero-banner-section" className="relative overflow-hidden bg-neutral-950 text-white select-none">
      <div className="relative min-h-[400px] lg:min-h-[440px] flex items-center">
        
        {/* Animated Background & Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} flex items-center overflow-hidden`}
          >
            {/* Background Texture & Floating Glow Orbs */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
            
            {/* Ambient Pulsing Glow Orbs */}
            <motion.div 
              animate={{ 
                scale: [1, 1.25, 1],
                opacity: [0.2, 0.35, 0.2],
                x: [0, 25, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-24 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: slide.accentColor }}
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.15, 0.3, 0.15],
                x: [0, -30, 0],
                y: [0, 25, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-[#0078d4]/30"
            />

            {/* Slide Content Container */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 w-full py-8 md:py-10 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* Left Text Column (7 cols) */}
                <div className="lg:col-span-7 space-y-3.5 text-left">
                  
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md border border-white/15 text-sky-200 shadow-sm"
                  >
                    <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                    <span>{slide.badge}</span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.45 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                    className="text-xs sm:text-sm text-neutral-200/90 max-w-xl leading-relaxed"
                  >
                    {slide.subtitle}
                  </motion.p>

                  {/* Specs / Highlights Pill */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-300 font-medium pt-0.5"
                  >
                    <span className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-xs text-[11px]">
                      <Zap className="w-3 h-3 text-amber-400" />
                      {slide.specsBadge}
                    </span>
                    <span className="text-emerald-400 font-bold text-xs">
                      {slide.priceText}
                    </span>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="flex flex-wrap items-center gap-2.5 pt-1"
                  >
                    <button
                      id="hero-primary-cta-button"
                      onClick={handlePrimaryCta}
                      className="px-4 py-2 rounded-md font-semibold text-xs bg-[#0067b8] hover:bg-[#005da6] text-white shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer group focus:outline-hidden hover:scale-102 active:scale-98"
                    >
                      <span>{slide.primaryCta}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                    <button
                      id="hero-secondary-cta-button"
                      onClick={handleSecondaryCta}
                      className="px-3.5 py-2 rounded-md font-semibold text-xs bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer focus:outline-hidden hover:scale-102 active:scale-98"
                    >
                      <span>{slide.secondaryCta}</span>
                    </button>
                  </motion.div>

                </div>

                {/* Right Image Column (5 cols) with Floating Levitation Animation */}
                <div className="lg:col-span-5 flex justify-center items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: [0, -8, 0] 
                    }}
                    transition={{ 
                      opacity: { delay: 0.15, duration: 0.4 },
                      scale: { delay: 0.15, duration: 0.4 },
                      y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
                    }}
                    className="relative group cursor-pointer"
                    onClick={handlePrimaryCta}
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-neutral-900/60 backdrop-blur-md max-w-sm w-full aspect-4/3 flex items-center justify-center p-2 ring-1 ring-white/10">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Floating Price Pill */}
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-lg flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Official Microsoft Store</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Slide Indicators & Play/Pause */}
        <div className="absolute bottom-3 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between">
            
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {heroSlides.map((s, index) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === index ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Controls (Prev, Pause/Play, Next) */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-1 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={handleNext}
                className="p-1 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
