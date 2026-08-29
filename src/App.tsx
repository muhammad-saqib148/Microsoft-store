import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNavGrid } from './components/CategoryNavGrid';
import { DevicePromos } from './components/DevicePromos';
import { ProductSectionSlider } from './components/ProductSectionSlider';
import { DealsSection } from './components/DealsSection';
import { CatalogBrowse } from './components/CatalogBrowse';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const StoreContent: React.FC = () => {
  const { products, activeCategory } = useStore();

  // Curated slider collections
  const featuredApps = React.useMemo(
    () => products.filter((p) => p.category === 'apps' || p.category === 'productivity'),
    [products]
  );

  const popularGames = React.useMemo(
    () => products.filter((p) => p.category === 'games'),
    [products]
  );

  const bestSellingDevices = React.useMemo(
    () => products.filter((p) => p.category === 'devices' || p.category === 'accessories'),
    [products]
  );

  const topEntertainment = React.useMemo(
    () => products.filter((p) => p.category === 'entertainment'),
    [products]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-neutral-900 font-sans selection:bg-[#0067b8] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* Flagship Hero Carousel */}
        <HeroBanner />

        {/* Category Navigation Visual Tiles */}
        <CategoryNavGrid />

        {/* Hardware & Copilot+ PC Banner Showcase */}
        <DevicePromos />

        {/* Featured Apps Slider */}
        <ProductSectionSlider
          id="featured-apps-slider"
          badge="Essential Software"
          title="Featured Windows Apps & Tools"
          subtitle="Discover powerful developer utilities, creativity engines, and daily desktop essentials"
          products={featuredApps}
          categoryFilter="apps"
        />

        {/* Popular Games Slider */}
        <ProductSectionSlider
          id="popular-games-slider"
          badge="Xbox Game Pass & PC"
          title="Popular PC & Xbox Games"
          subtitle="Explore award-winning blockbusters, simulators, and multiplayer adventures"
          products={popularGames}
          categoryFilter="games"
        />

        {/* Deals & Savings Spotlight with Countdown */}
        <DealsSection />

        {/* Best Selling Devices & Accessories Slider */}
        <ProductSectionSlider
          id="best-selling-devices-slider"
          badge="Hardware & Accessories"
          title="Surface Devices & Xbox Gear"
          subtitle="Copilot+ PCs, precision wireless controllers, and mobile accessories"
          products={bestSellingDevices}
          categoryFilter="devices"
        />

        {/* Top Movies & Digital Entertainment */}
        <ProductSectionSlider
          id="entertainment-slider"
          badge="4K UHD Dolby Atmos"
          title="Movies & Digital Entertainment"
          subtitle="Rent or buy the latest blockbuster releases in 4K Ultra HD"
          products={topEntertainment}
          categoryFilter="entertainment"
        />

        {/* Interactive Store Catalog with Full Search, Filters, Subcategories & Sort */}
        <CatalogBrowse />
      </main>

      {/* Footers & Modals */}
      <Footer />

      {/* Global Interactive Modals and Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistModal />
      <ToastContainer />
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
