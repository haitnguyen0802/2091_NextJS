import { PATHS } from '@/public/constants/paths';
import Link from 'next/link';
import ToolBox from './ToolBox';
import Pagination from '@/app/components/Pagination';
export default function MainProduct() {
    return (
        <>
            <div className="col-lg-9">
                <ToolBox />
                <div className="products mb-3">
                    <div className="row justify-content-center">
                        <div className="col-6 col-md-4 col-lg-4">
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link href={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-11.jpg" alt="Product image" className="product-image" />
                                    </Link>
                                    <div className="product-action-vertical">
                                        <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
                                            <span>add to wishlist</span>
                                        </a>
                                    </div>
                                    <div className="product-action product-action-dark">
                                        <a href="#" className="btn-product btn-cart" title="Add to cart">
                                            <span>add to cart</span>
                                        </a>
                                    </div>
                                </figure>
                                <div className="product-body">
                                    <h3 className="product-title">
                                        <Link href={PATHS.PRODUCTS_DETAIL}>MacBook Pro 13&quot; Display, i5</Link>
                                    </h3>
                                    <div className="product-price"> $1,199.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '100%' }} />
                                        </div>
                                        <span className="ratings-text">( 4 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4">
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link href={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-12.jpg" alt="Product image" className="product-image" />
                                    </Link>
                                    <div className="product-action-vertical">
                                        <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
                                            <span>add to wishlist</span>
                                        </a>
                                    </div>
                                    <div className="product-action product-action-dark">
                                        <a href="#" className="btn-product btn-cart" title="Add to cart">
                                            <span>add to cart</span>
                                        </a>
                                    </div>
                                </figure>
                                <div className="product-body">
                                    <h3 className="product-title">
                                        <Link href={PATHS.PRODUCTS_DETAIL}>Bose - SoundLink Bluetooth Speaker</Link>
                                    </h3>
                                    <div className="product-price"> $79.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '60%' }} />
                                        </div>
                                        <span className="ratings-text">( 6 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4">
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link href={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-13.jpg" alt="Product image" className="product-image" />
                                    </Link>
                                    <div className="product-action-vertical">
                                        <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
                                            <span>add to wishlist</span>
                                        </a>
                                    </div>
                                    <div className="product-action product-action-dark">
                                        <a href="#" className="btn-product btn-cart" title="Add to cart">
                                            <span>add to cart</span>
                                        </a>
                                    </div>
                                </figure>
                                <div className="product-body">
                                    <h3 className="product-title">
                                        <Link href={PATHS.PRODUCTS_DETAIL}>Apple - 11 Inch iPad Pro with Wi-Fi
                                            256GB </Link>
                                    </h3>
                                    <div className="product-price"> $899.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '80%' }} />
                                        </div>
                                        <span className="ratings-text">( 4 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4">
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link href={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-14.jpg" alt="Product image" className="product-image" />
                                    </Link>
                                    <div className="product-action-vertical">
                                        <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
                                            <span>add to wishlist</span>
                                        </a>
                                    </div>
                                    <div className="product-action product-action-dark">
                                        <a href="#" className="btn-product btn-cart" title="Add to cart">
                                            <span>add to cart</span>
                                        </a>
                                    </div>
                                </figure>
                                <div className="product-body">
                                    <h3 className="product-title">
                                        <Link href={PATHS.PRODUCTS_DETAIL}>Google - Pixel 3 XL 128GB</Link>
                                    </h3>
                                    <div className="product-price">
                                        <span className="new-price">$35.41</span>
                                        <span className="old-price">Was $41.67</span>
                                    </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '100%' }} />
                                        </div>
                                        <span className="ratings-text">( 10 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4">
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link href={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-15.jpg" alt="Product image" className="product-image" />
                                    </Link>
                                    <div className="product-action-vertical">
                                        <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
                                            <span>add to wishlist</span>
                                        </a>
                                    </div>
                                    <div className="product-action product-action-dark">
                                        <a href="#" className="btn-product btn-cart" title="Add to cart">
                                            <span>add to cart</span>
                                        </a>
                                    </div>
                                </figure>
                                <div className="product-body">
                                    <h3 className="product-title">
                                        <Link href={PATHS.PRODUCTS_DETAIL}>Samsung - 55&quot; Class LED 2160p
                                            Smart</Link>
                                    </h3>
                                    <div className="product-price"> $899.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '60%' }} />
                                        </div>
                                        <span className="ratings-text">( 5 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4">
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link href={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-11.jpg" alt="Product image" className="product-image" />
                                    </Link>
                                    <div className="product-action-vertical">
                                        <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
                                            <span>add to wishlist</span>
                                        </a>
                                    </div>
                                    <div className="product-action product-action-dark">
                                        <a href="#" className="btn-product btn-cart" title="Add to cart">
                                            <span>add to cart</span>
                                        </a>
                                    </div>
                                </figure>
                                <div className="product-body">
                                    <h3 className="product-title">
                                        <Link href={PATHS.PRODUCTS_DETAIL}>MacBook Pro 13&quot; Display, i5</Link>
                                    </h3>
                                    <div className="product-price"> $1,199.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '100%' }} />
                                        </div>
                                        <span className="ratings-text">( 4 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination />
            </div>
        </>
    );
}
