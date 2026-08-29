import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNavGrid } from './components/CategoryNavGrid';
import { WhatsNewSection } from './components/WhatsNewSection';
import { DevicePromos } from './components/DevicePromos';
import { TopAppsShowcase } from './components/TopAppsShowcase';
import { PopularGamesShowcase } from './components/PopularGamesShowcase';
import { DealsSection } from './components/DealsSection';
import { RecommendedSection } from './components/RecommendedSection';
import { ExploreMicrosoft } from './components/ExploreMicrosoft';
import { CatalogBrowse } from './components/CatalogBrowse';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

const StoreContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] dark:bg-[#121212] text-neutral-900 dark:text-neutral-100 font-sans selection:bg-[#0067b8] selection:text-white transition-colors duration-200">
      {/* Top Navbar with Theme, Search, Cart & Wishlist */}
      <Navbar />

      {/* Main Storefront Body */}
      <main className="flex-1">
        {/* Flagship Hero Carousel with Fluent Depth */}
        <HeroBanner />

        {/* Visual Category Quick-Access Navigation Grid */}
        <CategoryNavGrid />

        {/* What's New Bento Showcase */}
        <WhatsNewSection />

        {/* Hardware & Copilot+ PC Banner Showcase */}
        <DevicePromos />

        {/* Top Windows 11 Apps Showcase with Tabbed Filters */}
        <TopAppsShowcase />

        {/* Popular PC & Xbox Games Showcase with Game Pass Highlights */}
        <PopularGamesShowcase />

        {/* Deals & Savings Spotlight with Real-time Countdowns */}
        <DealsSection />

        {/* Curated Recommendations & Bestsellers */}
        <RecommendedSection />

        {/* Microsoft Ecosystem & Enterprise Services */}
        <ExploreMicrosoft />

        {/* Comprehensive Interactive Store Catalog with Full Multi-Filter System */}
        <CatalogBrowse />
      </main>

      {/* Modern Fluent Microsoft Footer */}
      <Footer />

      {/* Global Modals, Drawers, Notifications, and Cursor FX */}
      <ProductDetailModal />
      <QuickViewModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistModal />
      <ToastContainer />
      <CustomCursor />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
