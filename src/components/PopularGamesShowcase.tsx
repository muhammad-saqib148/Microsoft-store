import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Star, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const PopularGamesShowcase: React.FC = () => {
  const { products, openProductDetails, addToCart, quickViewProduct } = useStore();

  const games = React.useMemo(() => {
    return products.filter((p) => p.category === 'games');
  }, [products]);

  const featuredGame = games[0] || products[0];
  const sideGames = games.slice(1, 5);

  return (
    <section id="popular-games-showcase" className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 md:py-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Xbox Game Pass & PC Gaming</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Popular PC & Xbox Games
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Immerse yourself in blockbuster worlds, 4K HDR ray-traced visuals, and competitive multiplayer
          </p>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('catalog-browse-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#107c41] dark:text-emerald-400 hover:underline cursor-pointer group"
        >
          <span>View All Xbox Games</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Big Featured Game (5 cols) */}
        {featuredGame && (
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => openProductDetails(featuredGame)}
            className="lg:col-span-5 bg-neutral-900 text-white rounded-2xl overflow-hidden border border-neutral-800 shadow-xl relative flex flex-col justify-between group cursor-pointer"
          >
            {/* Background Cover Image with Gradient */}
            <div className="relative aspect-16/10 w-full overflow-hidden">
              <img
                src={featuredGame.image}
                alt={featuredGame.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

              {/* Game Pass Tag */}
              {featuredGame.gamePassIncluded && (
                <div className="absolute top-3 left-3 bg-[#107c41] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>Game Pass Included</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">
                    {featuredGame.subcategory}
                  </span>
                  <span>•</span>
                  <span>{featuredGame.developer || 'Xbox Game Studios'}</span>
                </div>

                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors">
                  {featuredGame.title}
                </h3>

                <p className="text-xs text-neutral-300 line-clamp-2 mt-1.5 leading-relaxed">
                  {featuredGame.description}
                </p>

                {/* Rating & Platforms */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <div className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded text-xs font-bold text-amber-400 border border-white/10">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{featuredGame.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-[11px] text-neutral-300 bg-white/10 px-2 py-0.5 rounded">
                    4K Ultra HD
                  </span>
                  <span className="text-[11px] text-neutral-300 bg-white/10 px-2 py-0.5 rounded">
                    Xbox Cloud Gaming
                  </span>
                </div>
              </div>

              {/* Bottom Price & CTA */}
              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase block">Purchase Price</span>
                  <span className="text-lg font-black text-white">
                    {featuredGame.isFree ? 'Free' : `$${featuredGame.price.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      quickViewProduct(featuredGame);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
                  >
                    Quick View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(featuredGame);
                    }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#107c41] hover:bg-[#0e6b37] text-white shadow-md transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{featuredGame.gamePassIncluded ? 'Play / Buy' : 'Buy Game'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4 Games Grid (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sideGames.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ y: -2 }}
              onClick={() => openProductDetails(game)}
              className="bg-white dark:bg-[#202020] rounded-2xl border border-neutral-200 dark:border-neutral-700/80 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#107c41]/50 dark:hover:border-emerald-500/50 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="relative aspect-16/9 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                {game.badge && (
                  <span className="absolute top-2 left-2 bg-[#107c41] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                    {game.badge}
                  </span>
                )}
                {game.discountPercent && game.discountPercent > 0 && (
                  <span className="absolute top-2 right-2 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    -{game.discountPercent}%
                  </span>
                )}
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#107c41] dark:text-emerald-400">
                    {game.subcategory}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white truncate group-hover:text-[#107c41] dark:group-hover:text-emerald-400 transition-colors mt-0.5">
                    {game.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                    {game.tagline || game.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-700/70 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-neutral-900 dark:text-white">
                      {game.isFree ? 'Free' : `$${game.price.toFixed(2)}`}
                    </span>
                    {game.gamePassIncluded && (
                      <span className="text-[9px] text-[#107c41] dark:text-emerald-400 font-bold block">
                        Game Pass
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        quickViewProduct(game);
                      }}
                      className="px-2 py-1 rounded text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                    >
                      Quick view
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(game);
                      }}
                      className="px-2.5 py-1 rounded-md bg-[#107c41] hover:bg-[#0e6b37] text-white text-xs font-semibold cursor-pointer shadow-2xs"
                    >
                      Get
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
