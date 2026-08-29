import React from 'react';
import { 
  LayoutGrid, 
  Gamepad2, 
  Laptop, 
  Headphones, 
  Film, 
  Briefcase, 
  Tag, 
  Monitor, 
  Tablet,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';

export const CategoryNavGrid: React.FC = () => {
  const { activeCategory, setActiveCategory, setFilters } = useStore();

  const categories: {
    id: ProductCategory;
    title: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
    bgImage: string;
    accentBg: string;
  }[] = [
    {
      id: 'apps',
      title: 'Apps & Software',
      description: 'Desktop utilities, creative suites & tools',
      icon: <LayoutGrid className="w-6 h-6 text-blue-600" />,
      badge: '10K+ Available',
      bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80',
      accentBg: 'hover:border-blue-300 hover:bg-blue-50/40'
    },
    {
      id: 'games',
      title: 'PC & Xbox Games',
      description: 'Blockbusters, indies & Game Pass Ultimate',
      icon: <Gamepad2 className="w-6 h-6 text-emerald-600" />,
      badge: 'Game Pass',
      bgImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=80',
      accentBg: 'hover:border-emerald-300 hover:bg-emerald-50/40'
    },
    {
      id: 'devices',
      title: 'Surface & Devices',
      description: 'Copilot+ PCs, Surface Pro & 2-in-1 laptops',
      icon: <Laptop className="w-6 h-6 text-indigo-600" />,
      badge: 'Copilot+ AI',
      bgImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=80',
      accentBg: 'hover:border-indigo-300 hover:bg-indigo-50/40'
    },
    {
      id: 'accessories',
      title: 'Accessories & Audio',
      description: 'Controllers, keyboards, mice & headsets',
      icon: <Headphones className="w-6 h-6 text-purple-600" />,
      badge: 'Original Gear',
      bgImage: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&auto=format&fit=crop&q=80',
      accentBg: 'hover:border-purple-300 hover:bg-purple-50/40'
    },
    {
      id: 'entertainment',
      title: 'Movies & TV',
      description: 'Rent or buy UHD 4K digital movies',
      icon: <Film className="w-6 h-6 text-rose-600" />,
      badge: '4K Dolby Vision',
      bgImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
      accentBg: 'hover:border-rose-300 hover:bg-rose-50/40'
    },
    {
      id: 'productivity',
      title: 'Productivity & Office',
      description: 'Microsoft 365, Copilot AI & Windows 11',
      icon: <Briefcase className="w-6 h-6 text-cyan-600" />,
      badge: 'Essential',
      bgImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80',
      accentBg: 'hover:border-cyan-300 hover:bg-cyan-50/40'
    },
    {
      id: 'deals',
      title: 'Deals & Savings',
      description: 'Save up to 50% on top hardware & games',
      icon: <Tag className="w-6 h-6 text-amber-600" />,
      badge: 'Limited Time',
      bgImage: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&auto=format&fit=crop&q=80',
      accentBg: 'hover:border-amber-300 hover:bg-amber-50/40'
    }
  ];

  const handleSelectCategory = (catId: ProductCategory) => {
    setActiveCategory(catId);
    setFilters(prev => ({
      ...prev,
      category: catId,
      subcategory: 'all'
    }));
    const el = document.getElementById('catalog-browse-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="category-navigation-section" className="py-5 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
              Explore by Category
            </h2>
            <p className="text-xs text-neutral-500 mt-0.2">
              Find software, hardware, games, and entertainment tailored to your setup
            </p>
          </div>
          <button
            onClick={() => handleSelectCategory('all')}
            className="text-xs font-semibold text-[#0067b8] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View all products</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2.5 sm:gap-3">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => handleSelectCategory(cat.id)}
                className={`group relative text-left p-3 rounded-lg border transition-all duration-150 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#0067b8] ring-1 ring-[#0067b8]/30 bg-sky-50 shadow-2xs'
                    : `border-neutral-200 bg-neutral-50/70 hover:shadow-xs ${cat.accentBg}`
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-1.5 rounded-md bg-white shadow-2xs border border-neutral-200/80 group-hover:scale-105 transition-transform">
                      {cat.icon}
                    </div>
                    {cat.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white text-neutral-700 border border-neutral-200">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-[#0067b8] transition-colors leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-[10px] text-neutral-500 mt-0.5 line-clamp-2 leading-tight">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-2 pt-1.5 border-t border-neutral-200/60 flex items-center justify-between text-[10px] font-semibold text-[#0067b8] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Browse</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
