import React, { useState } from 'react';
import { Star, Download, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const TopAppsShowcase: React.FC = () => {
  const { products, openProductDetails, addToCart, quickViewProduct } = useStore();
  const [tab, setTab] = useState<'free' | 'paid' | 'dev'>('free');

  // Filter top apps
  const apps = React.useMemo(() => {
    return products.filter((p) => p.category === 'apps' || p.category === 'productivity');
  }, [products]);

  const displayedApps = React.useMemo(() => {
    if (tab === 'free') return apps.filter((a) => a.isFree || a.price === 0).slice(0, 6);
    if (tab === 'paid') return apps.filter((a) => a.price > 0).slice(0, 6);
    return apps.filter((a) => a.subcategory.toLowerCase().includes('developer') || a.subcategory.toLowerCase().includes('creativity') || a.id.includes('visual-studio') || a.id.includes('powertoys') || a.id.includes('terminal')).slice(0, 6);
  }, [apps, tab]);

  return (
    <section id="top-apps-section" className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 md:py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#0067b8]/10 text-[#0067b8] dark:bg-[#60cdff]/15 dark:text-[#60cdff] mb-2">
            <Download className="w-3 h-3 text-[#0067b8] dark:text-[#60cdff]" />
            <span>Microsoft Store Apps</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Top Apps for Windows 11
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Supercharge your workflow, creativity, and daily productivity with verified Microsoft Store apps
          </p>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center bg-neutral-200/80 dark:bg-neutral-800 p-1 rounded-xl shrink-0 self-start md:self-auto">
          <button
            onClick={() => setTab('free')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tab === 'free'
                ? 'bg-white dark:bg-[#202020] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Top Free Apps
          </button>
          <button
            onClick={() => setTab('paid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tab === 'paid'
                ? 'bg-white dark:bg-[#202020] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Top Paid Apps
          </button>
          <button
            onClick={() => setTab('dev')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tab === 'dev'
                ? 'bg-white dark:bg-[#202020] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Developer & Pro
          </button>
        </div>
      </div>

      {/* Grid of Apps (2 cols on tablet, 3 on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedApps.map((app, index) => (
          <div
            key={app.id}
            onClick={() => openProductDetails(app)}
            className="group bg-white dark:bg-[#202020] rounded-xl p-3.5 border border-neutral-200 dark:border-neutral-700/80 hover:border-[#0067b8]/60 dark:hover:border-[#60cdff]/60 hover:shadow-md transition-all flex items-center justify-between gap-3 cursor-pointer"
          >
            {/* Left: Rank + App Icon + Details */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-sm font-black text-neutral-400 dark:text-neutral-600 w-4 text-center">
                {index + 1}
              </span>

              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 border border-neutral-200/80 dark:border-neutral-700 shadow-2xs">
                <img
                  src={app.image}
                  alt={app.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white truncate group-hover:text-[#0067b8] dark:group-hover:text-[#60cdff] transition-colors">
                  {app.title}
                </h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                  {app.developer || 'Microsoft Corporation'}
                </p>

                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex items-center text-amber-500 text-[11px] font-bold">
                    <Star className="w-3 h-3 fill-current mr-0.5" />
                    <span>{app.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">
                    ({app.reviewCount.toLocaleString()})
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Get / Price Action Button */}
            <div className="shrink-0 flex flex-col items-end gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(app);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  app.isFree
                    ? 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-[#0067b8] dark:text-[#60cdff] border border-neutral-300 dark:border-neutral-700'
                    : 'bg-[#0067b8] hover:bg-[#005da6] text-white shadow-2xs'
                }`}
              >
                {app.isFree ? 'Get Free' : `$${app.price.toFixed(2)}`}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  quickViewProduct(app);
                }}
                className="text-[10px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer"
              >
                Quick view
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
