'use client';

import ProductDetailGallery from "./ProductDetailGallery";
import ProductDetails from "./ProductDetails";

export default function ProductDetailTop() {
    return (
        <>
            <div className="product-details-top">
                <div className="row">
                    <div className="col-md-6">
                        <ProductDetailGallery />
                    </div>
                    <div className="col-md-6">
                        <ProductDetails />
                    </div>
                </div>
            </div>
        </>
    )
}