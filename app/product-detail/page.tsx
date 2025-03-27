'use client';

import { useSearchParams } from 'next/navigation';
import ClientScripts from '../components/ClientScripts';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import ProductDetailPage from '../pages/ProductDetailPage';

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <>
      <div className="page-wrapper">
        <Header />
        <ProductDetailPage productId={id} />
        <Footer />
      </div>
      <ScrollToTop />
      <MobileMenu />
      <ClientScripts />
    </>
  );
} 