interface Product {
    id: number;
    ten_sp: string;
    gia: number;
    gia_km: number | null;
    hinh: string;
    mo_ta: string;
    id_loai: number;
    created_at: string | null;
    updated_at: string | null;
    slug?: string;
}

interface ProductDetailGalleryProps {
    product: Product;
}

export default function ProductDetailGallery({ product }: ProductDetailGalleryProps) {
    // This function handles thumbnail click events
    // It removes the active class from all thumbnails and adds it to the clicked one
    // It relies on the elevateZoom plugin to actually change the main image
    const handleThumbnailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        
        // Remove active class from all thumbnails
        const thumbnails = document.querySelectorAll('.product-gallery-item');
        thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        e.currentTarget.classList.add('active');
        
        // The elevateZoom jQuery plugin handles the actual image switching
        // No need to manually update the main image as the plugin does this
        // when the 'active' class changes on gallery items
    };

    return (
        <>
            <figure className="product-main-image">
                <img 
                    id="product-zoom" 
                    src={product.hinh} 
                    data-zoom-image={product.hinh} 
                    alt={product.ten_sp} 
                    style={{ objectFit: 'contain', width: '100%', height: '400px' }}
                />
                <div id="btn-product-gallery" className="btn-product-gallery">
                    <i className="icon-arrows" />
                </div>
            </figure>
            <div id="product-zoom-gallery" className="product-image-gallery">
                {/* Hiển thị 4 lần cùng một hình ảnh để đảm bảo gallery đầy đủ */}
                <a className="product-gallery-item active" href="#" onClick={handleThumbnailClick} data-image={product.hinh} data-zoom-image={product.hinh}>
                    <img src={product.hinh} alt={product.ten_sp} />
                </a>
                <a className="product-gallery-item" href="#" onClick={handleThumbnailClick} data-image={product.hinh} data-zoom-image={product.hinh}>
                    <img src={product.hinh} alt={product.ten_sp} />
                </a>
                <a className="product-gallery-item" href="#" onClick={handleThumbnailClick} data-image={product.hinh} data-zoom-image={product.hinh}>
                    <img src={product.hinh} alt={product.ten_sp} />
                </a>
                <a className="product-gallery-item" href="#" onClick={handleThumbnailClick} data-image={product.hinh} data-zoom-image={product.hinh}>
                    <img src={product.hinh} alt={product.ten_sp} />
                </a>
            </div>
        </>
    )
}