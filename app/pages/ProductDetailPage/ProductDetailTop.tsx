'use client';

import { useState, useCallback } from 'react';
import ProductDetailGallery from "./ProductDetailGallery";
import { useCart } from '@/app/context/CartContext';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/public/constants/paths';

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

interface ProductDetailTopProps {
    product: Product;
}

export default function ProductDetailTop({ product }: ProductDetailTopProps) {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { addToCart } = useCart();
    const router = useRouter();

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= 10) {
            setQuantity(value);
        }
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSize(e.target.value);
    };

    // Hàm giúp thêm sản phẩm nhiều lần vào giỏ hàng
    const addMultipleTimes = useCallback((baseProduct: Product, times: number) => {
        for (let i = 0; i < times; i++) {
            // Đợi một khoảng thời gian nhỏ giữa các lần thêm để tránh xung đột
            setTimeout(() => {
                addToCart(baseProduct);
            }, i * 100);
        }
    }, [addToCart]);

    const handleAddToCart = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        
        if (size === '' || size === '#') {
            setMessage({
                type: 'error',
                text: 'Please select a size before adding to cart'
            });
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
            return;
        }

        // Prevent multiple clicks
        if (isAddingToCart) return;
        
        setIsAddingToCart(true);
        
        // Clone product with size information
        const productWithSize = {
            ...product,
            size: size
        };
        
        // Thêm sản phẩm vào giỏ hàng nhiều lần theo số lượng đã chọn
        addMultipleTimes(productWithSize, quantity);
        
        setMessage({
            type: 'success',
            text: `${product.ten_sp} has been added to your cart`
        });
        setShowMessage(true);
        
        // Reset flag after delay
        setTimeout(() => {
            setIsAddingToCart(false);
            setShowMessage(false);
        }, 3000);
    }, [product, quantity, size, isAddingToCart, addToCart, addMultipleTimes]);

    const goToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push(PATHS.CART);
    };

    return (
        <div className="product-details-top">
            {showMessage && (
                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`}>
                    {message.text}
                    {message.type === 'success' && (
                        <button 
                            className="btn btn-outline-primary-2 btn-sm ml-2"
                            onClick={goToCart}
                        >
                            View Cart
                        </button>
                    )}
                    <button 
                        type="button" 
                        className="close" 
                        onClick={() => setShowMessage(false)}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )}
            <div className="row">
                <div className="col-md-6">
                    <div className="product-gallery product-gallery-vertical">
                        <div className="row">
                            <ProductDetailGallery product={product} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="product-details">
                        <h1 className="product-title">{product?.ten_sp}</h1>
                        <div className="ratings-container">
                            <div className="ratings">
                                <div className="ratings-val" style={{ width: '80%' }}></div>
                            </div>
                            <span className="ratings-text">( 2 Reviews )</span>
                        </div>
                        <div className="product-price">
                            {product?.gia_km ? (
                                <>
                                    <span className="new-price">{formatCurrency(product?.gia_km)}</span>
                                    <span className="old-price">Was {formatCurrency(product?.gia)}</span>
                                </>
                            ) : (
                                <span>{formatCurrency(product?.gia)}</span>
                            )}
                        </div>
                        <div className="product-content">
                            <p>{product?.mo_ta || 'No description available'}</p>
                        </div>
                        <div className="details-filter-row details-row-size">
                            <label>Color:</label>
                            <div className="product-nav product-nav-thumbs">
                                <a href="#" className="active" onClick={(e) => {
                                    e.preventDefault();
                                    const thumbs = document.querySelectorAll('.product-nav-thumbs a');
                                    thumbs.forEach(thumb => thumb.classList.remove('active'));
                                    e.currentTarget.classList.add('active');
                                }}>
                                    <img src={product.hinh} alt={product.ten_sp} />
                                </a>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    const thumbs = document.querySelectorAll('.product-nav-thumbs a');
                                    thumbs.forEach(thumb => thumb.classList.remove('active'));
                                    e.currentTarget.classList.add('active');
                                }}>
                                    <img src={product.hinh} alt={product.ten_sp} />
                                </a>
                            </div>
                        </div>
                        <div className="details-filter-row details-row-size">
                            <label htmlFor="size">Size:</label>
                            <div className="select-custom">
                                <select 
                                    name="size" 
                                    id="size" 
                                    className="form-control"
                                    value={size}
                                    onChange={handleSizeChange}
                                >
                                    <option value="#">Select a size</option>
                                    <option value="s">Small</option>
                                    <option value="m">Medium</option>
                                    <option value="l">Large</option>
                                    <option value="xl">Extra Large</option>
                                </select>
                            </div>
                        </div>
                        <div className="details-filter-row details-row-size">
                            <label htmlFor="qty">Qty:</label>
                            <div className="product-details-quantity">
                                <input
                                    type="number"
                                    id="qty"
                                    className="form-control"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    min="1"
                                    max="10"
                                    step="1"
                                />
                            </div>
                        </div>
                        <div className="product-details-action">
                            <a 
                                href="#" 
                                className={`btn-product btn-cart ${isAddingToCart ? 'disabled' : ''}`}
                                onClick={handleAddToCart}
                            >
                                <span>add to cart</span>
                            </a>
                            <div className="details-action-wrapper">
                                <a
                                    href="#"
                                    className="btn-product btn-wishlist"
                                    title="Wishlist"
                                >
                                    <span>Add to Wishlist</span>
                                </a>
                                <a
                                    href="#"
                                    className="btn-product btn-compare"
                                    title="Compare"
                                >
                                    <span>Add to Compare</span>
                                </a>
                            </div>
                        </div>
                        <div className="product-details-footer">
                            <div className="product-cat">
                                <span>Category: </span>
                                <a href="#">{product?.id_loai}</a>
                            </div>
                            <div className="social-icons social-icons-sm">
                                <span className="social-label">Share:</span>
                                <a href="#" className="social-icon" title="Facebook" target="_blank">
                                    <i className="icon-facebook-f"></i>
                                </a>
                                <a href="#" className="social-icon" title="Twitter" target="_blank">
                                    <i className="icon-twitter"></i>
                                </a>
                                <a href="#" className="social-icon" title="Instagram" target="_blank">
                                    <i className="icon-instagram"></i>
                                </a>
                                <a href="#" className="social-icon" title="Pinterest" target="_blank">
                                    <i className="icon-pinterest"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}