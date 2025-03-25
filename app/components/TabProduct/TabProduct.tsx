import { Link } from 'react-router-dom';
import { PATHS } from '../../../public/constants/paths';

export default function TabProduct() {
    return (
        <>
            <div className="container featured">
                <ul className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="products-featured-link" data-toggle="tab" href="#products-featured-tab" role="tab" aria-controls="products-featured-tab" aria-selected="true">Featured</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="products-sale-link" data-toggle="tab" href="#products-sale-tab" role="tab" aria-controls="products-sale-tab" aria-selected="false">On Sale</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="products-top-link" data-toggle="tab" href="#products-top-tab" role="tab" aria-controls="products-top-tab" aria-selected="false">Top Rated</a>
                    </li>
                </ul>
                <div className="tab-content tab-content-carousel">
                    <div className="tab-pane p-0 fade show active" id="products-featured-tab" role="tabpanel" aria-labelledby="products-featured-link">
                        <div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow" data-toggle="owl" data-owl-options="{
                                                      &quot;nav&quot;: true, 
                                                      &quot;dots&quot;: true,
                                                      &quot;margin&quot;: 20,
                                                      &quot;loop&quot;: false,
                                                      &quot;responsive&quot;: {
                                                          &quot;0&quot;: {
                                                              &quot;items&quot;:2
                                                          },
                                                          &quot;600&quot;: {
                                                              &quot;items&quot;:2
                                                          },
                                                          &quot;992&quot;: {
                                                              &quot;items&quot;:3
                                                          },
                                                          &quot;1200&quot;: {
                                                              &quot;items&quot;:4
                                                          }
                                                      }
                                                  }">
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-1.jpg" alt="Product image" className="product-image" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>GoPro - HERO7 Black HD Waterproof Action</Link>
                                    </h3>
                                    <div className="product-price"> $349.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '60%' }} />
                                        </div>
                                        <span className="ratings-text">( 2 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product product-2">
                                <figure className="product-media">
                                    <span className="product-label label-circle label-new">New</span>
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-2.jpg" alt="Product image" className="product-image" />
                                        <img src="assets/images/demos/demo-3/products/product-2-2.jpg" alt="Product image" className="product-image-hover" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>Apple - Apple Watch Series 3 with White Sport
                                            Band</Link>
                                    </h3>
                                    <div className="product-price"> $214.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '0%' }} />
                                        </div>
                                        <span className="ratings-text">( 0 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-3.jpg" alt="Product image" className="product-image" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>Lenovo - 330-15IKBR 15.6&quot;</Link>
                                    </h3>
                                    <div className="product-price">
                                        <span className="out-price">$339.99</span>
                                        <span className="out-text">Out of Stock</span>
                                    </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '60%' }} />
                                        </div>
                                        <span className="ratings-text">( 3 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-4.jpg" alt="Product image" className="product-image" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>Sony - Alpha a5100 Mirrorless Camera</Link>
                                    </h3>
                                    <div className="product-price"> $499.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '70%' }} />
                                        </div>
                                        <span className="ratings-text">( 11 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-1.jpg" alt="Product image" className="product-image" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>GoPro - HERO7 Black HD Waterproof Action</Link>
                                    </h3>
                                    <div className="product-price"> $349.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '60%' }} />
                                        </div>
                                        <span className="ratings-text">( 2 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane p-0 fade" id="products-sale-tab" role="tabpanel" aria-labelledby="products-sale-link">
                        <div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow" data-toggle="owl" data-owl-options="{
                                                      &quot;nav&quot;: true, 
                                                      &quot;dots&quot;: true,
                                                      &quot;margin&quot;: 20,
                                                      &quot;loop&quot;: false,
                                                      &quot;responsive&quot;: {
                                                          &quot;0&quot;: {
                                                              &quot;items&quot;:2
                                                          },
                                                          &quot;600&quot;: {
                                                              &quot;items&quot;:2
                                                          },
                                                          &quot;992&quot;: {
                                                              &quot;items&quot;:3
                                                          },
                                                          &quot;1200&quot;: {
                                                              &quot;items&quot;:4
                                                          }
                                                      }
                                                  }">
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-4.jpg" alt="Product image" className="product-image" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>Sony - Alpha a5100 Mirrorless Camera</Link>
                                    </h3>
                                    <div className="product-price"> $499.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '70%' }} />
                                        </div>
                                        <span className="ratings-text">( 11 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-1.jpg" alt="Product image" className="product-image" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>GoPro - HERO7 Black HD Waterproof Action</Link>
                                    </h3>
                                    <div className="product-price"> $349.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '60%' }} />
                                        </div>
                                        <span className="ratings-text">( 2 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-3.jpg" alt="Product image" className="product-image" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>Lenovo - 330-15IKBR 15.6&quot;</Link>
                                    </h3>
                                    <div className="product-price">
                                        <span className="out-price">$339.99</span>
                                        <span className="out-text">Out of Stock</span>
                                    </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '60%' }} />
                                        </div>
                                        <span className="ratings-text">( 3 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product product-2">
                                <figure className="product-media">
                                    <span className="product-label label-circle label-new">New</span>
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-2.jpg" alt="Product image" className="product-image" />
                                        <img src="assets/images/demos/demo-3/products/product-2-2.jpg" alt="Product image" className="product-image-hover" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>Apple - Apple Watch Series 3 with White Sport
                                            Band</Link>
                                    </h3>
                                    <div className="product-price"> $214.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '0%' }} />
                                        </div>
                                        <span className="ratings-text">( 0 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane p-0 fade" id="products-top-tab" role="tabpanel" aria-labelledby="products-top-link">
                        <div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow" data-toggle="owl" data-owl-options="{
                                                      &quot;nav&quot;: true, 
                                                      &quot;dots&quot;: true,
                                                      &quot;margin&quot;: 20,
                                                      &quot;loop&quot;: false,
                                                      &quot;responsive&quot;: {
                                                          &quot;0&quot;: {
                                                              &quot;items&quot;:2
                                                          },
                                                          &quot;600&quot;: {
                                                              &quot;items&quot;:2
                                                          },
                                                          &quot;992&quot;: {
                                                              &quot;items&quot;:3
                                                          },
                                                          &quot;1200&quot;: {
                                                              &quot;items&quot;:4
                                                          }
                                                      }
                                                  }">
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-3.jpg" alt="Product image" className="product-image" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>Lenovo - 330-15IKBR 15.6&quot;</Link>
                                    </h3>
                                    <div className="product-price">
                                        <span className="out-price">$339.99</span>
                                        <span className="out-text">Out of Stock</span>
                                    </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '60%' }} />
                                        </div>
                                        <span className="ratings-text">( 3 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-1.jpg" alt="Product image" className="product-image" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>GoPro - HERO7 Black HD Waterproof Action</Link>
                                    </h3>
                                    <div className="product-price"> $349.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '60%' }} />
                                        </div>
                                        <span className="ratings-text">( 2 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-4.jpg" alt="Product image" className="product-image" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>Sony - Alpha a5100 Mirrorless Camera</Link>
                                    </h3>
                                    <div className="product-price"> $499.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '70%' }} />
                                        </div>
                                        <span className="ratings-text">( 11 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product product-2">
                                <figure className="product-media">
                                    <span className="product-label label-circle label-new">New</span>
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-2.jpg" alt="Product image" className="product-image" />
                                        <img src="assets/images/demos/demo-3/products/product-2-2.jpg" alt="Product image" className="product-image-hover" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>Apple - Apple Watch Series 3 with White Sport
                                            Band</Link>
                                    </h3>
                                    <div className="product-price"> $214.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '0%' }} />
                                        </div>
                                        <span className="ratings-text">( 0 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link to={PATHS.PRODUCTS_DETAIL}>
                                        <img src="assets/images/demos/demo-3/products/product-1.jpg" alt="Product image" className="product-image" />
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
                                        <Link to={PATHS.PRODUCTS_DETAIL}>GoPro - HERO7 Black HD Waterproof Action</Link>
                                    </h3>
                                    <div className="product-price"> $349.99 </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '60%' }} />
                                        </div>
                                        <span className="ratings-text">( 2 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-7 mb-lg-11" />
        </>
    )
}
