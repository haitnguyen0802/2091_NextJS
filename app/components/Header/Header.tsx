import Link from 'next/link';
import { PATHS } from '@/public/constants/paths';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="header">
            <div className="header-top">
                <div className="container">
                    <div className="header-left">
                        <a href="tel:0989596912">
                            <i className="icon-phone" /> Hotline: 098 9596 912 </a>
                    </div>
                    <div className="header-right">
                        {/* Not LogIn */}
                        {/* 
                            <ul class="top-menu top-link-menu">
                                <li><a href="#signin-modal" data-toggle="modal" class="top-menu-login"><i class="icon-user"></i>Login | Resgister </a></li>
                            </ul> 
                        */}
                        {/* Logged In */}
                        <ul className="top-menu">
                            <li>
                                <a href="#" className="top-link-menu"><i className="icon-user" />Thai Nguyen </a>
                                <ul>
                                    <li>
                                        <ul>
                                            <li><Link href={PATHS.DASHBOARD}>Account Details</Link></li>
                                            <li><Link href={PATHS.DASHBOARD}>Your Orders</Link></li>
                                            <li><Link href={PATHS.DASHBOARD}>Wishlist <span>(3)</span></Link></li>
                                            <li><a href="#">Sign Out</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
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
                        <div className="header-search">
                            <a href="#" className="search-toggle" role="button" title="Search">
                                <i className="icon-search" />
                            </a>
                            <form action="#" method="get">
                                <div className="header-search-wrapper">
                                    <label htmlFor="q" className="sr-only">Search</label>
                                    <input type="search" className="form-control" name="q" id="q" placeholder="Search in..." required />
                                </div>
                            </form>
                        </div>
                        <div className="dropdown cart-dropdown">
                            <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                <i className="icon-shopping-cart" />
                                <span className="cart-count">2</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <div className="dropdown-cart-products">
                                    <div className="product">
                                        <div className="product-cart-details">
                                            <h4 className="product-title">
                                                <Link href={PATHS.PRODUCTS_DETAIL}>Beige knitted</Link>
                                            </h4>
                                            <span className="cart-product-info">
                                                <span className="cart-product-qty">1</span> x $84.00 </span>
                                        </div>
                                        <figure className="product-image-container">
                                            <Link href={PATHS.PRODUCTS_DETAIL} className="product-image">
                                                <img src="assets/images/products/cart/product-1.jpg" alt="product" />
                                            </Link>
                                        </figure>
                                        <a href="#" className="btn-remove" title="Remove Product">
                                            <i className="icon-close" />
                                        </a>
                                    </div>
                                    <div className="product">
                                        <div className="product-cart-details">
                                            <h4 className="product-title">
                                                <Link href={PATHS.PRODUCTS_DETAIL}>Blue utility</Link>
                                            </h4>
                                            <span className="cart-product-info">
                                                <span className="cart-product-qty">1</span> x $76.00 </span>
                                        </div>
                                        <figure className="product-image-container">
                                            <Link href={PATHS.PRODUCTS_DETAIL} className="product-image">
                                                <img src="assets/images/products/cart/product-2.jpg" alt="product" />
                                            </Link>
                                        </figure>
                                        <a href="#" className="btn-remove" title="Remove Product">
                                            <i className="icon-close" />
                                        </a>
                                    </div>
                                </div>
                                <div className="dropdown-cart-total">
                                    <span>Total</span>
                                    <span className="cart-total-price">$160.00</span>
                                </div>
                                <div className="dropdown-cart-action">
                                    <Link href={PATHS.CART} className="btn btn-primary">View Cart</Link>
                                    <Link href={PATHS.CHECKOUT} className="btn btn-outline-primary-2">
                                        <span>Checkout</span>
                                        <i className="icon-long-arrow-right" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
