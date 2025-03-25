export default function ProductDetails() {
    return (
        <>
            <div className="product-details">
                <h1 className="product-title">Dark yellow lace</h1>
                <div className="ratings-container">
                    <div className="ratings">
                        <div className="ratings-val" style={{ width: '80%' }} />
                    </div>
                    <a className="ratings-text" href="#product-review-link" id="review-link">( 2 Reviews )</a>
                </div>
                <div className="product-price"> $84.00 </div>
                <div className="product-content">
                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus. </p>
                </div>
                <div className="details-filter-row details-row-size">
                    <label>Color:</label>
                    <div className="product-nav product-nav-dots">
                        <div className="product-nav-item active" style={{ background: '#e2e2e2' }}>
                            <span className="sr-only">Color name</span>
                        </div>
                        <div className="product-nav-item" style={{ background: '#333333' }}>
                            <span className="sr-only">Color name</span>
                        </div>
                        <div className="product-nav-item" style={{ background: '#f2bc9e' }}>
                            <span className="sr-only">Color name</span>
                        </div>
                    </div>
                </div>
                <div className="details-filter-row details-row-size">
                    <label htmlFor="qty">Qty:</label>
                    <div className="product-details-quantity">
                        <input type="number" id="qty" className="form-control" defaultValue={1} min={1} max={10} step={1} data-decimals={0} required />
                    </div>
                </div>
                <div className="product-details-action">
                    <a href="#" className="btn-product btn-cart">
                        <span>add to cart</span>
                    </a>
                    <div className="details-action-wrapper">
                        <a href="#" className="btn-product btn-wishlist" title="Wishlist">
                            <span>Add to Wishlist</span>
                        </a>
                    </div>
                </div>
                <div className="product-details-footer">
                    <div className="product-cat">
                        <span>Category:</span>
                        <a href="#">Women</a>, <a href="#">Dresses</a>, <a href="#">Yellow</a>
                    </div>
                    <div className="social-icons social-icons-sm">
                        <span className="social-label">Share:</span>
                        <a href="#" className="social-icon" title="Facebook" target="_blank">
                            <i className="icon-facebook-f" />
                        </a>
                        <a href="#" className="social-icon" title="Twitter" target="_blank">
                            <i className="icon-twitter" />
                        </a>
                        <a href="#" className="social-icon" title="Instagram" target="_blank">
                            <i className="icon-instagram" />
                        </a>
                        <a href="#" className="social-icon" title="Pinterest" target="_blank">
                            <i className="icon-pinterest" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}