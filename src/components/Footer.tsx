import React from 'react';
import { 
  Globe, 
  ShieldCheck, 
  HelpCircle, 
  ArrowUp, 
  Twitter, 
  Youtube, 
  Facebook, 
  Instagram, 
  Linkedin,
  Sparkles
} from 'lucide-react';
import { MicrosoftLogo } from './MicrosoftLogo';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActiveCategory, setFilters } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: any) => {
    setActiveCategory(cat);
    setFilters(prev => ({ ...prev, category: cat, subcategory: 'all' }));
    const el = document.getElementById('catalog-browse-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="microsoft-store-footer" className="bg-[#f2f2f2] text-neutral-600 text-xs border-t border-neutral-300">
      
      {/* Pre-Footer Value Props */}
      <div className="border-b border-neutral-300/80 py-5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-md bg-sky-50 text-[#0067b8] flex items-center justify-center shrink-0 border border-sky-100 text-sm">
                🚚
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-xs">Free 2-3 Day Shipping</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">On all Surface devices, Xbox consoles, and accessories.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 text-sm">
                🔄
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-xs">60-Day Free Returns</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">Shop with peace of mind. Hassle-free returns & refunds.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 text-sm">
                🛡️
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-xs">Official Microsoft Promise</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">Genuine hardware, guaranteed compatibility, warranties.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 text-sm">
                🎁
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-xs">Microsoft Rewards</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">Earn points on every purchase to redeem for games & gift cards.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main 6-Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-xs">
          
          {/* Col 1: What's new */}
          <div>
            <h3 className="font-semibold text-neutral-900 text-xs mb-2">What's new</h3>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => handleCategoryClick('devices')} className="hover:underline text-left text-neutral-600">
                  Surface Pro (11th Edition)
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('devices')} className="hover:underline text-left text-neutral-600">
                  Surface Laptop (7th Edition)
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('productivity')} className="hover:underline text-left text-neutral-600">
                  Microsoft 365 Copilot
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('apps')} className="hover:underline text-left text-neutral-600">
                  Windows 11 apps
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Microsoft Store */}
          <div>
            <h3 className="font-semibold text-neutral-900 text-xs mb-2">Microsoft Store</h3>
            <ul className="space-y-1.5">
              <li><button onClick={() => handleCategoryClick('all')} className="hover:underline text-left text-neutral-600">Account profile</button></li>
              <li><button onClick={() => handleCategoryClick('apps')} className="hover:underline text-left text-neutral-600">Download Center</button></li>
              <li><button onClick={() => handleCategoryClick('devices')} className="hover:underline text-left text-neutral-600">Microsoft Store Support</button></li>
              <li><button onClick={() => handleCategoryClick('all')} className="hover:underline text-left text-neutral-600">Returns & Exchanges</button></li>
              <li><button onClick={() => handleCategoryClick('all')} className="hover:underline text-left text-neutral-600">Order tracking</button></li>
            </ul>
          </div>

          {/* Col 3: Education */}
          <div>
            <h3 className="font-semibold text-neutral-900 text-xs mb-2">Education</h3>
            <ul className="space-y-1.5">
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Microsoft in education</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Devices for education</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Microsoft Teams for Edu</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Microsoft 365 Education</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Student & parent discounts</a></li>
            </ul>
          </div>

          {/* Col 4: Business */}
          <div>
            <h3 className="font-semibold text-neutral-900 text-xs mb-2">Business</h3>
            <ul className="space-y-1.5">
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Microsoft Cloud</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Microsoft Security</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Azure Cloud Solutions</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Dynamics 365</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Copilot for Microsoft 365</a></li>
            </ul>
          </div>

          {/* Col 5: Developer & IT */}
          <div>
            <h3 className="font-semibold text-neutral-900 text-xs mb-2">Developer & IT</h3>
            <ul className="space-y-1.5">
              <li><button onClick={() => handleCategoryClick('apps')} className="hover:underline text-left text-neutral-600">Visual Studio Code</button></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Developer Center</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Documentation</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Microsoft Learn</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Tech Community</a></li>
            </ul>
          </div>

          {/* Col 6: Company */}
          <div>
            <h3 className="font-semibold text-neutral-900 text-xs mb-2">Company</h3>
            <ul className="space-y-1.5">
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Careers</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">About Microsoft</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Company news</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Privacy at Microsoft</a></li>
              <li><a href="#catalog-browse-section" className="hover:underline text-neutral-600">Sustainability</a></li>
            </ul>
          </div>

        </div>

        {/* Social Media & Brand Bar */}
        <div className="mt-8 pt-5 border-t border-neutral-300/80 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <MicrosoftLogo size={18} textSize="text-xs" />
            <span className="text-neutral-400">|</span>
            <span className="text-[11px] text-neutral-500">Official Microsoft Store Clone Showcase</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-500">
            <span className="text-[11px] font-semibold text-neutral-700">Follow Microsoft:</span>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#0067b8]" aria-label="Twitter">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#0067b8]" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-rose-600" aria-label="YouTube">
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-rose-500" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#0067b8]" aria-label="LinkedIn">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-4 pt-4 border-t border-neutral-300/60 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-neutral-500">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3 h-3" />
            <span>English (United States)</span>
            <span className="text-neutral-300">•</span>
            <span>Your California Privacy Choices</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <a href="#catalog-browse-section" className="hover:underline">Contact Microsoft</a>
            <a href="#catalog-browse-section" className="hover:underline">Privacy & Cookies</a>
            <a href="#catalog-browse-section" className="hover:underline">Terms of Sale</a>
            <a href="#catalog-browse-section" className="hover:underline">Trademarks</a>
            <a href="#catalog-browse-section" className="hover:underline">Safety & Eco</a>
            <a href="#catalog-browse-section" className="hover:underline">About our ads</a>
            <span>© Microsoft 2026</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900 font-semibold p-1 rounded hover:bg-neutral-200 cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
