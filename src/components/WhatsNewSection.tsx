import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Star, Cpu, ShieldCheck, Flame, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsNewSection: React.FC = () => {
  const { products, openProductDetails, quickViewProduct } = useStore();

  // Find curated new items
  const newProducts = React.useMemo(() => {
    return products.filter((p) => p.newRelease || p.badge?.toLowerCase().includes('copilot') || p.id === 'surface-pro-11' || p.id === 'copilot-pro' || p.id === 'ms-flight-sim-2024');
  }, [products]);

  const mainFeatured = newProducts[0] || products[0];
  const sideItems = newProducts.slice(1, 4);

  if (!mainFeatured) return null;

  return (
    <section id="whats-new-section" className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 md:py-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#0067b8]/10 text-[#0067b8] dark:bg-[#60cdff]/15 dark:text-[#60cdff] mb-2">
            <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
            <span>Latest Innovations</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            What&apos;s New at Microsoft Store
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Experience the next era of Copilot+ PCs, AI acceleration, and groundbreaking Windows software
          </p>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('catalog-browse-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#0067b8] dark:text-[#60cdff] hover:underline cursor-pointer group"
        >
          <span>Explore All New Releases</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Big Feature Card (7 cols) */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-7 bg-gradient-to-br from-neutral-900 via-neutral-900 to-sky-950 text-white rounded-2xl overflow-hidden shadow-xl border border-neutral-800 relative flex flex-col justify-between p-6 sm:p-8 group cursor-pointer"
          onClick={() => openProductDetails(mainFeatured)}
        >
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#0078d4]/30 blur-3xl pointer-events-none" />

          {/* Top badges */}
          <div className="flex items-center justify-between z-10">
            <span className="bg-[#0078d4] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
              {mainFeatured.badge || 'Flagship Release'}
            </span>
            <div className="flex items-center gap-1 text-amber-400 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold border border-white/10">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{mainFeatured.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Center Image */}
          <div className="my-6 relative flex items-center justify-center">
            <div className="relative max-w-md w-full aspect-16/10 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/40">
              <img
                src={mainFeatured.image}
                alt={mainFeatured.title}
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Bottom Details & CTA */}
          <div className="z-10">
            <span className="text-xs uppercase font-bold tracking-wider text-sky-400">
              {mainFeatured.subcategory}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 group-hover:text-sky-300 transition-colors">
              {mainFeatured.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 mt-1.5 leading-relaxed">
              {mainFeatured.description}
            </p>

            <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase block">Starting At</span>
                <span className="text-xl sm:text-2xl font-black text-white">
                  ${mainFeatured.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    quickViewProduct(mainFeatured);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 backdrop-blur-xs transition-all cursor-pointer"
                >
                  Quick View
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openProductDetails(mainFeatured);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0067b8] hover:bg-[#005da6] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Side Stack of 3 New Items (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          {sideItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
              onClick={() => openProductDetails(item)}
              className="flex-1 bg-white dark:bg-[#202020] rounded-2xl p-4 border border-neutral-200 dark:border-neutral-700/80 shadow-xs hover:shadow-md hover:border-[#0067b8]/50 dark:hover:border-[#60cdff]/50 transition-all flex items-center gap-4 cursor-pointer group"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 border border-neutral-200/80 dark:border-neutral-700">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                {item.badge && (
                  <span className="absolute top-1 left-1 bg-[#0067b8] text-white text-[8px] font-bold px-1.5 py-0.2 rounded uppercase">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0067b8] dark:text-[#60cdff]">
                  {item.subcategory}
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white truncate group-hover:text-[#0067b8] dark:group-hover:text-[#60cdff] transition-colors mt-0.5">
                  {item.title}
                </h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                  {item.tagline || item.description}
                </p>

                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex items-center text-amber-500 text-xs font-bold">
                    <Star className="w-3 h-3 fill-current mr-0.5" />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs font-extrabold text-neutral-900 dark:text-white">
                    {item.isFree ? 'Free' : `$${item.price.toFixed(2)}`}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#0067b8] dark:text-[#60cdff] group-hover:underline flex items-center gap-0.5">
                    View Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
