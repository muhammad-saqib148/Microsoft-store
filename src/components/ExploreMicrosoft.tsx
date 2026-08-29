import React from 'react';
import { ArrowRight, Sparkles, Shield, Cloud, Terminal, Cpu } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ExploreMicrosoft: React.FC = () => {
  const { setActiveCategory, setFilters } = useStore();

  const handleExploreCategory = (cat: any, query?: string) => {
    setActiveCategory(cat);
    if (query) {
      setFilters(prev => ({ ...prev, searchQuery: query }));
    }
    const el = document.getElementById('catalog-browse-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const stories = [
    {
      id: 'copilot-ai',
      badge: 'Artificial Intelligence',
      title: 'Copilot+ PCs & Everyday AI',
      description: 'Transform how you work, create, and communicate with dedicated 45+ TOPS Neural Processing Units.',
      bgGradient: 'from-[#0078d4]/90 via-[#004e8c] to-[#002d5a]',
      icon: <Sparkles className="w-6 h-6 text-amber-300" />,
      cta: 'Explore Copilot Devices',
      category: 'devices',
      query: 'Copilot'
    },
    {
      id: 'xbox-cloud',
      badge: 'Cloud Gaming',
      title: 'Xbox Game Pass Ultimate',
      description: 'Play hundreds of high-quality PC and console games on your PC, mobile phone, and Samsung Smart TVs without a console.',
      bgGradient: 'from-[#107c41]/90 via-[#0e6032] to-[#083b1f]',
      icon: <Cpu className="w-6 h-6 text-emerald-300" />,
      cta: 'Discover Game Pass',
      category: 'games',
      query: 'Game Pass'
    },
    {
      id: 'dev-power',
      badge: 'Developer Platform',
      title: 'Visual Studio & Windows Terminal',
      description: 'The premier toolchain for modern cloud native, web, desktop, and AI application engineering on Windows.',
      bgGradient: 'from-[#5c2d91]/90 via-[#451f70] to-[#2b1049]',
      icon: <Terminal className="w-6 h-6 text-purple-300" />,
      cta: 'Get Developer Tools',
      category: 'apps',
      query: 'Developer'
    },
    {
      id: 'enterprise-security',
      badge: 'Zero-Trust Security',
      title: 'Windows 11 Pro & Microsoft Defender',
      description: 'Hardware-backed TPM 2.0 encryption, biometric Windows Hello, and real-time enterprise threat protection.',
      bgGradient: 'from-neutral-800 via-neutral-900 to-black',
      icon: <Shield className="w-6 h-6 text-sky-400" />,
      cta: 'Shop Windows 11',
      category: 'productivity',
      query: 'Windows 11'
    }
  ];

  return (
    <section id="explore-microsoft-section" className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 md:py-12">
      {/* Header */}
      <div className="mb-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0067b8] dark:text-[#60cdff]">
          Ecosystem & Services
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-1">
          Explore the Microsoft Ecosystem
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Seamlessly connect your devices, cloud computing, developer platforms, and entertainment
        </p>
      </div>

      {/* 4 Story Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => handleExploreCategory(story.category, story.query)}
            className={`rounded-2xl p-6 bg-gradient-to-br ${story.bgGradient} text-white shadow-xl flex flex-col justify-between group cursor-pointer border border-white/15 relative overflow-hidden hover:scale-102 hover:shadow-2xl transition-all duration-300`}
          >
            {/* Ambient pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4">
                {story.icon}
              </div>

              <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-200 block mb-1">
                {story.badge}
              </span>

              <h3 className="text-lg font-bold leading-tight group-hover:text-sky-100 transition-colors">
                {story.title}
              </h3>

              <p className="text-xs text-neutral-200/90 mt-2 leading-relaxed">
                {story.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
              <span className="text-xs font-bold text-white group-hover:underline">
                {story.cta}
              </span>
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
