'use client';

import ClientScripts from '../components/ClientScripts';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import AboutUs from '../pages/AboutUs';

export default function Cart() {
    return (
        <>
            <div className="page-wrapper">
                <Header />
                <AboutUs />
                <Footer />
            </div>
            <ScrollToTop />
            <MobileMenu />
            <ClientScripts />
        </>
    );
} 