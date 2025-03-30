'use client';

import Link from 'next/link';
import { PATHS } from '@/public/constants/paths';
import { usePathname } from 'next/navigation';
import CartDropdown from '../CartDropdown/CartDropdown';
import SearchProduct from '../SearchProduct/Search';
import { useAuth } from '@/app/context/AuthContext';
import { useState } from 'react';
import AuthModal from '../AuthenModal';

export default function Header() {
    const pathname = usePathname();
    const { user, logout, isAuthenticated } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleOpenAuthModal = () => {
        setShowAuthModal(true);
    };

    const handleCloseAuthModal = () => {
        setShowAuthModal(false);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="header">
            <div className="header-top">
                <div className="container">
                    <div className="header-left">
                        <a href="tel:0989596912">
                            <i className="icon-phone" /> Hotline: 098 9596 912 </a>
                    </div>
                    <div className="header-right">
                        {!isAuthenticated ? (
                            // Not LogIn
                            <ul className="top-menu top-link-menu">
                                <li>
                                    <a href="#" onClick={handleOpenAuthModal} className="top-menu-login">
                                        <i className="icon-user"></i>Login | Register
                                    </a>
                                </li>
                            </ul>
                        ) : (
                            // Logged In
                            <ul className="top-menu">
                                <li>
                                    <a href="#" className="top-link-menu">
                                        <i className="icon-user" />{user?.ho_ten || 'User'}
                                    </a>
                                    <ul>
                                        <li>
                                            <ul>
                                                <li><Link href={PATHS.DASHBOARD}>Account Details</Link></li>
                                                <li><Link href={PATHS.DASHBOARD}>Your Orders</Link></li>
                                                <li><Link href={PATHS.DASHBOARD}>Wishlist <span>(3)</span></Link></li>
                                                <li><a href="#" onClick={handleLogout}>Sign Out</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <div className="header-middle sticky-header">
                <div className="container">
                    <div className="header-left">
                        <button className="mobile-menu-toggler">
                            <span className="sr-only">Toggle mobile menu</span>
                            <i className="icon-bars" />
                        </button>
                        <Link href={PATHS.HOME} className="logo">
                            <img src="assets/images/logo.svg" alt="Molla Logo" width={160} />
                        </Link>
                    </div>
                    <nav className="main-nav">
                        <ul className="menu">
                            <li className={pathname === PATHS.HOME || pathname === '/' ? 'active' : ''}>
                                <Link href={PATHS.HOME}>Home</Link>
                            </li>
                            <li className={pathname === PATHS.ABOUT ? 'active' : ''}>
                                <Link href={PATHS.ABOUT}>About Us</Link>
                            </li>
                            <li className={pathname === PATHS.PRODUCTS ? 'active' : ''}>
                                <Link href={PATHS.PRODUCTS}>Products</Link>
                            </li>
                            <li className={pathname === PATHS.BLOG ? 'active' : ''}>
                                <Link href={PATHS.BLOG}>Blog</Link>
                            </li>
                            <li className={pathname === PATHS.CONTACT ? 'active' : ''}>
                                <Link href={PATHS.CONTACT}>Contact Us</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-right">
                        <SearchProduct />
                        <CartDropdown />
                    </div>
                </div>
            </div>

            {/* Auth Modal */}
            <AuthModal 
                isOpen={showAuthModal} 
                onClose={handleCloseAuthModal} 
            />
        </header>
    )
}
