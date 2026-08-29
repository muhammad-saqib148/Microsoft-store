import React from 'react';
import { ArrowRight, Sparkles, Shield, Cpu, Zap, Battery, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DevicePromos: React.FC = () => {
  const { products, quickViewProduct, addToCart } = useStore();

  const surfacePro = products.find(p => p.id === 'surface-pro-11');
  const surfaceLaptop = products.find(p => p.id === 'surface-laptop-7');
  const xboxSeriesX = products.find(p => p.id === 'xbox-series-x-galaxy');
  const surfaceArcMouse = products.find(p => p.id === 'surface-arc-mouse');

  return (
    <section id="device-promotions-section" className="py-6 bg-neutral-100/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0067b8] mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Microsoft Hardware Showcase</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
              Designed by Microsoft for What’s Next
            </h2>
            <p className="text-xs text-neutral-600 mt-0.5 max-w-xl">
              Meet the industry-defining Copilot+ PCs, high-performance Xbox consoles, and precision accessories built to elevate your daily productivity and entertainment.
            </p>
          </div>
        </div>

        {/* 2-Column Flagship Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          
          {/* Banner 1: Surface Pro Copilot+ PC */}
          <div className="relative rounded-xl overflow-hidden bg-white border border-neutral-200 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
            <div className="p-4 sm:p-5 z-10">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="bg-[#0067b8] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  Copilot+ PC
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  Save $200
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight group-hover:text-[#0067b8] transition-colors">
                Surface Pro (11th Edition)
              </h3>
              <p className="text-xs text-neutral-600 mt-1 max-w-md leading-relaxed">
                The most flexible 2-in-1 laptop on earth. Supercharged by Snapdragon X Elite, OLED 120Hz display, and 45 TOPS AI acceleration.
              </p>

              <div className="grid grid-cols-2 gap-2 my-3.5 text-xs text-neutral-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#0067b8]" />
                  <span>Snapdragon X Elite</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Battery className="w-3.5 h-3.5 text-[#0067b8]" />
                  <span>Up to 14 hrs battery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#0067b8]" />
                  <span>13" 120Hz OLED Screen</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free 2-Day Shipping</span>
                </div>
              </div>

              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-xl font-extrabold text-neutral-900">$999.99</span>
                <span className="text-xs text-neutral-400 line-through">$1,199.99</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="promo-surface-pro-shop-btn"
                  onClick={() => surfacePro && quickViewProduct(surfacePro)}
                  className="px-3.5 py-1.5 rounded-md bg-[#0067b8] hover:bg-[#005da6] text-white font-semibold text-xs shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Shop Surface Pro</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  id="promo-surface-pro-quick-btn"
                  onClick={() => surfacePro && quickViewProduct(surfacePro)}
                  className="px-3 py-1.5 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <span>Learn more</span>
                </button>
              </div>
            </div>

            {/* Image Showcase */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gradient-to-b from-transparent to-neutral-100/60 p-3 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80"
                alt="Surface Pro 11"
                className="max-h-full max-w-full object-contain drop-shadow-lg group-hover:scale-103 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Banner 2: Xbox Series X Special Edition */}
          <div className="relative rounded-xl overflow-hidden bg-neutral-900 text-white border border-neutral-800 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
            <div className="p-4 sm:p-5 z-10">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="bg-[#107c10] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  Xbox Special Edition
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800">
                  2TB NVMe SSD
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                Xbox Series X – Galaxy Black
              </h3>
              <p className="text-xs text-neutral-300 mt-1 max-w-md leading-relaxed">
                True 4K 120 FPS gaming power with 12 Teraflops of GPU output, Quick Resume across open titles, and a starry celestial shell.
              </p>

              <div className="grid grid-cols-2 gap-2 my-3.5 text-xs text-neutral-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>12 TFLOPS 4K 120FPS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2TB High-Speed SSD</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4 Gen Backward Compatible</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Matching Controller Included</span>
                </div>
              </div>

              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-xl font-extrabold text-white">$599.99</span>
                <span className="text-xs text-neutral-400 line-through">$649.99</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="promo-xbox-shop-btn"
                  onClick={() => xboxSeriesX && quickViewProduct(xboxSeriesX)}
                  className="px-3.5 py-1.5 rounded-md bg-[#107c10] hover:bg-[#0e6b0e] text-white font-semibold text-xs shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Shop Xbox Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  id="promo-xbox-learn-btn"
                  onClick={() => xboxSeriesX && quickViewProduct(xboxSeriesX)}
                  className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  <span>Learn more</span>
                </button>
              </div>
            </div>

            {/* Image Showcase */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gradient-to-b from-transparent to-black/40 p-3 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=800&auto=format&fit=crop&q=80"
                alt="Xbox Series X"
                className="max-h-full max-w-full object-contain drop-shadow-xl group-hover:scale-103 transition-transform duration-300"
              />
            </div>
          </div>

        </div>

        {/* 3 Secondary Device Tiles (Surface Laptop 7, Surface Studio, Accessories) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          
          {/* Tile 1: Surface Laptop 7 */}
          <div className="bg-white rounded-lg p-3.5 border border-neutral-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#0067b8] bg-sky-50 px-1.5 py-0.2 rounded border border-sky-100">
                Laptop of the Year
              </span>
              <h4 className="text-sm font-bold text-neutral-900 mt-1">Surface Laptop 7th Edition</h4>
              <p className="text-[11px] text-neutral-600 mt-0.5 line-clamp-2 leading-tight">
                Up to 22 hours of battery life with an ultra-thin anodized aluminum chassis.
              </p>
              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="text-sm font-bold text-neutral-900">$999.00</span>
                <span className="text-[10px] text-neutral-400 line-through">$1,099.00</span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={() => surfaceLaptop && quickViewProduct(surfaceLaptop)}
                className="text-xs font-bold text-[#0067b8] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Shop now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&auto=format&fit=crop&q=80"
                alt="Surface Laptop"
                className="w-14 h-10 object-cover rounded"
              />
            </div>
          </div>

          {/* Tile 2: Surface Studio 2 */}
          <div className="bg-white rounded-lg p-3.5 border border-neutral-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-100">
                Pro Workstation
              </span>
              <h4 className="text-sm font-bold text-neutral-900 mt-1">Surface Laptop Studio 2</h4>
              <p className="text-[11px] text-neutral-600 mt-0.5 line-clamp-2 leading-tight">
                Intel i7 13th Gen with NVIDIA RTX 4060 graphics & dynamic woven hinge.
              </p>
              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="text-sm font-bold text-neutral-900">$1,999.99</span>
                <span className="text-[10px] text-neutral-400 line-through">$2,399.99</span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={() => {
                  const p = products.find(i => i.id === 'surface-laptop-studio-2');
                  if (p) quickViewProduct(p);
                }}
                className="text-xs font-bold text-[#0067b8] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Shop now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <img
                src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&auto=format&fit=crop&q=80"
                alt="Surface Studio"
                className="w-14 h-10 object-cover rounded"
              />
            </div>
          </div>

          {/* Tile 3: Surface Arc Mouse & Accessories */}
          <div className="bg-white rounded-lg p-3.5 border border-neutral-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-100">
                Special Offer • 31% Off
              </span>
              <h4 className="text-sm font-bold text-neutral-900 mt-1">Surface Arc Mouse</h4>
              <p className="text-[11px] text-neutral-600 mt-0.5 line-clamp-2 leading-tight">
                Snaps flat to slip easily into your pocket or bag. Bluetooth Swift Pair.
              </p>
              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="text-sm font-bold text-neutral-900">$54.99</span>
                <span className="text-[10px] text-neutral-400 line-through">$79.99</span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={() => surfaceArcMouse && quickViewProduct(surfaceArcMouse)}
                className="text-xs font-bold text-[#0067b8] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Shop now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <img
                src="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&auto=format&fit=crop&q=80"
                alt="Surface Arc Mouse"
                className="w-14 h-10 object-cover rounded"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
