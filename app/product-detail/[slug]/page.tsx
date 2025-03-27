'use client';

import ClientScripts from '@/app/components/ClientScripts';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import MobileMenu from '@/app/components/MobileMenu/MobileMenu';
import ScrollToTop from '@/app/components/ScrollToTop/ScrollToTop';
import ProductDetailPage from '@/app/pages/ProductDetailPage';

export default function ProductDetail() {
  return (
    <>
      <div className="page-wrapper">
        <Header />
        <ProductDetailPage />
        <Footer />
      </div>
      <ScrollToTop />
      <MobileMenu />
      <ClientScripts />
    </>
  );
} 