'use client';

import Link from 'next/link';
import ToolBox from './ToolBox';
import Pagination from '@/app/components/Pagination';
import { useEffect, useState, useCallback } from 'react';
import { useCart } from '@/app/context/CartContext';
import { formatCurrency } from '@/app/utils/formatCurrency';
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

interface MainProductProps {
    selectedCategoryId?: number;
}

const PRODUCTS_PER_PAGE = 9;

export default function MainProduct({ selectedCategoryId }: MainProductProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState('popular');
    const [notifications, setNotifications] = useState<{ id: number, message: string }[]>([]);
    const [addingToCartIds, setAddingToCartIds] = useState<number[]>([]);
    const { addToCart } = useCart();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            let url = selectedCategoryId
                ? `https://fpl.timefortea.io.vn/api/categories/${selectedCategoryId}`
                : 'https://fpl.timefortea.io.vn/api/products';

            // Thêm tham số sort vào URL cho cả hai trường hợp
            url += `?sort=${sortType}`;

            console.log('Fetching URL:', url); // Debug log
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            console.log('Fetched data:', data); // Debug log
            setProducts(data); // Sử dụng dữ liệu đã sắp xếp từ server
            setCurrentPage(1); // Reset to first page when category or sort changes
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedCategoryId, sortType]);

    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSortChange = (newSortType: string) => {
        console.log('Sort type changed to:', newSortType); // Debug log
        setSortType(newSortType);
    };

    const handleAddToCart = useCallback((product: Product) => {
        // Prevent multiple clicks on the same product
        if (addingToCartIds.includes(product.id)) return;
        
        setAddingToCartIds(prev => [...prev, product.id]);
        
        // Thêm sản phẩm vào giỏ hàng với logic đơn giản hóa mới
        addToCart(product);
        
        // Add notification
        const newNotification = {
            id: Date.now(),
            message: `${product.ten_sp} has been added to your cart`
        };
        
        setNotifications(prev => [...prev, newNotification]);
        
        // Remove notification and unlock button after 3 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
            setAddingToCartIds(prev => prev.filter(id => id !== product.id));
        }, 3000);
    }, [addToCart, addingToCartIds]);

    if (loading) {
        return (
            <div className="col-lg-9">
                <ToolBox
                    onSortChange={handleSortChange}
                    totalProducts={products.length}
                    currentPage={currentPage}
                    productsPerPage={PRODUCTS_PER_PAGE}
                />
                <div className="products mb-3">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="col-lg-9">
                <ToolBox
                    onSortChange={handleSortChange}
                    totalProducts={products.length}
                    currentPage={currentPage}
                    productsPerPage={PRODUCTS_PER_PAGE}
                />
                <div className="products mb-3">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <div className="alert alert-danger" role="alert">
                                Error: {error}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="col-lg-9">
            {notifications.map(notification => (
                <div key={notification.id} className="alert alert-success alert-dismissible fade show">
                    {notification.message}
                    <Link href={PATHS.CART} className="btn btn-outline-primary-2 btn-sm ml-2">
                        View Cart
                    </Link>
                    <button 
                        type="button" 
                        className="close" 
                        onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            ))}
            
            <ToolBox
                onSortChange={handleSortChange}
                totalProducts={products.length}
                currentPage={currentPage}
                productsPerPage={PRODUCTS_PER_PAGE}
            />
            <div className="products mb-3">
                <div className="row justify-content-center">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="col-6 col-md-4 col-lg-4">
                            <div className="product product-2">
                                <figure className="product-media">
                                    <Link 
                                        href={{
                                            pathname: '/product-detail',
                                            query: { id: product.id }
                                        }}
                                    >
                                        <img
                                            src={product.hinh}
                                            alt={product.ten_sp}
                                            className="product-image"
                                        />
                                    </Link>
                                    <div className="product-action-vertical">
                                        <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
                                            <span>add to wishlist</span>
                                        </a>
                                    </div>
                                    <div className="product-action product-action-dark">
                                        <button 
                                            className={`btn-product btn-cart ${addingToCartIds.includes(product.id) ? 'disabled' : ''}`}
                                            title="Add to cart"
                                            onClick={() => handleAddToCart(product)}
                                            disabled={addingToCartIds.includes(product.id)}
                                        >
                                            <span>add to cart</span>
                                        </button>
                                    </div>
                                </figure>
                                <div className="product-body">
                                    <h3 className="product-title">
                                        <Link 
                                            href={{
                                                pathname: '/product-detail',
                                                query: { id: product.id }
                                            }}
                                        >
                                            {product.ten_sp}
                                        </Link>
                                    </h3>
                                    <div className="product-price">
                                        {product.gia_km ? (
                                            <>
                                                <span className="new-price">{formatCurrency(product.gia_km)}</span>
                                                <span className="old-price">Was {formatCurrency(product.gia)}</span>
                                            </>
                                        ) : (
                                            <span>{formatCurrency(product.gia)}</span>
                                        )}
                                    </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{ width: '100%' }} />
                                        </div>
                                        <span className="ratings-text">( 4 Reviews )</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
