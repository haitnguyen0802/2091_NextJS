// MainLayout.tsx (Next.js version)
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import MobileMenu from "@/app/components/MobileMenu/MobileMenu";
import ScrollToTop from "@/app/components/ScrollToTop/ScrollToTop";
import { Outlet } from "react-router-dom";
import ClientScripts from "@/app/components/ClientScripts";

export default function MainLayout() {
    return (
        <>
            <div className="page-wrapper">
                <Header />
                <Outlet />
                <Footer />
            </div>
            <ScrollToTop />
            <MobileMenu />
            <ClientScripts />
        </>
    );
}
