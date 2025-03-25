export default function ProductDetailGallery() {
    return (
        <>
            <div className="product-gallery product-gallery-vertical">
                <div className="row">
                    <figure className="product-main-image">
                        <img id="product-zoom" src="assets/images/products/single/1.jpg" data-zoom-image="assets/images/products/single/1-big.jpg" alt="product image" />
                        <div id="btn-product-gallery" className="btn-product-gallery">
                            <i className="icon-arrows" />
                        </div>
                    </figure>
                    <div id="product-zoom-gallery" className="product-image-gallery">
                        <a className="product-gallery-item active" href="#" data-image="assets/images/products/single/1.jpg" data-zoom-image="assets/images/products/single/1-big.jpg">
                            <img src="assets/images/products/single/1-small.jpg" alt="Dark yellow lace" />
                        </a>
                        <a className="product-gallery-item" href="#" data-image="assets/images/products/single/2-big.jpg" data-zoom-image="assets/images/products/single/2-big.jpg">
                            <img src="assets/images/products/single/2-small.jpg" alt="Dark yellow lace" />
                        </a>
                        <a className="product-gallery-item" href="#" data-image="assets/images/products/single/3-big.jpg" data-zoom-image="assets/images/products/single/3-big.jpg">
                            <img src="assets/images/products/single/3-small.jpg" alt="Dark yellow lace" />
                        </a>
                        <a className="product-gallery-item" href="#" data-image="assets/images/products/single/4-big.jpg" data-zoom-image="assets/images/products/single/4-big.jpg">
                            <img src="assets/images/products/single/4-small.jpg" alt="Dark yellow lace" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}