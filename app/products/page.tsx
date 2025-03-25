'use client';

import ClientScripts from '../components/ClientScripts';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import ProductPage from '../pages/ProductPage';

export default function Products() {
  return (
    <>
      <div className="page-wrapper">
        <Header />
        <ProductPage />
        <Footer />
      </div>
      <ScrollToTop />
      <MobileMenu />
      <ClientScripts />
    </>
  );
} 