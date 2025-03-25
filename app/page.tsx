"use client"

import ClientScripts from './components/ClientScripts';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MobileMenu from './components/MobileMenu/MobileMenu';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import HomePage from './pages/HomePage';

export default function Home() {
  return (
    <>
      <div className="page-wrapper">
        <Header />
        <HomePage />
        <Footer />
      </div>
      <ScrollToTop />
      <MobileMenu />
      <ClientScripts />
    </>
  );
} 
  