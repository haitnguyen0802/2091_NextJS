'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { removeVietnameseAccents } from '@/app/utils/stringUtils';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { PATHS } from '@/public/constants/paths';

// Interface cho dữ liệu sản phẩm
interface Product {
    id: number;
    ten_sp: string;
    gia: number;
    gia_km: number | null;
    hinh: string;
    slug?: string;
}

export default function SearchProduct() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const searchTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Xử lý khi người dùng nhập từ khóa tìm kiếm
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Xóa timer cũ nếu có
        if (searchTimerRef.current) {
            clearTimeout(searchTimerRef.current);
        }
        
        // Đặt timer mới với delay 500ms
        if (value.trim()) {
            searchTimerRef.current = setTimeout(() => {
                const normalized = removeVietnameseAccents(value);
                performSearch(normalized);
            }, 500);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    };

    // Thực hiện tìm kiếm
    const performSearch = async (normalized: string) => {
        if (!normalized.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        setIsSearching(true);
        try {
            // Fetch tất cả sản phẩm và lọc ở client side
            // Trong thực tế, nên có API riêng cho việc tìm kiếm
            const response = await fetch('https://fpl.timefortea.io.vn/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            
            const products: Product[] = await response.json();
            
            // Lọc sản phẩm dựa trên từ khóa đã normalize (không dấu)
            const filtered = products.filter(product => {
                const normalizedProductName = removeVietnameseAccents(product.ten_sp);
                return normalizedProductName.includes(normalized);
            });
            
            setSearchResults(filtered);
            setShowResults(true);
        } catch (err) {
            console.error('Error searching products:', err);
        } finally {
            setIsSearching(false);
        }
    };

    // Xử lý toggle chức năng tìm kiếm
    const toggleSearch = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsActive(prev => !prev);
        
        // Focus vào input khi kích hoạt
        if (!isActive && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    // Xử lý click bên ngoài dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
                
                // Nếu không có text và click ra ngoài thì bỏ active
                if (!searchTerm.trim()) {
                    setIsActive(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchTerm]);

    // Xử lý khi người dùng nhấp vào một sản phẩm
    const handleProductClick = (productId: number) => {
        setShowResults(false);
        setSearchTerm('');
        setIsActive(false);
        router.push(`${PATHS.PRODUCT_DETAIL}?id=${productId}`);
    };

    // Xử lý focus vào input
    const handleInputFocus = () => {
        setIsActive(true);
    };

    return (
        <div className={`header-search ${isActive ? 'active' : ''}`} ref={searchRef}>
            <a href="#" className="search-toggle" role="button" title="Search" onClick={toggleSearch}>
                <i className="icon-search" />
            </a>
            <form action="#" method="get" onSubmit={(e) => e.preventDefault()}>
                <div className="header-search-wrapper">
                    <label htmlFor="q" className="sr-only">Search</label>
                    <input 
                        ref={inputRef}
                        type="search" 
                        className="form-control" 
                        name="q" 
                        id="q" 
                        placeholder="Tìm kiếm sản phẩm..." 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={handleInputFocus}
                        required 
                    />
                    {isSearching && (
                        <div className="search-loader">
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </div>
                    )}
                </div>
                
                {/* Kết quả tìm kiếm */}
                {showResults && searchResults.length > 0 && (
                    <div className="search-results">
                        <ul>
                            {searchResults.map((product) => (
                                <li key={product.id} onClick={() => handleProductClick(product.id)}>
                                    <div className="search-result-item">
                                        <img 
                                            src={product.hinh || '/assets/images/products/placeholder.png'} 
                                            alt={product.ten_sp} 
                                            width="40" 
                                            height="40"
                                        />
                                        <div className="product-info">
                                            <h5>{product.ten_sp}</h5>
                                            <p>
                                                {product.gia_km !== null ? (
                                                    <>
                                                        <span className="new-price">{formatCurrency(product.gia_km)}</span>
                                                        <span className="old-price">{formatCurrency(product.gia)}</span>
                                                    </>
                                                ) : (
                                                    <span>{formatCurrency(product.gia)}</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {showResults && searchResults.length === 0 && searchTerm.trim() !== '' && (
                    <div className="search-results">
                        <p className="no-results">Không tìm thấy sản phẩm nào phù hợp</p>
                    </div>
                )}
            </form>
        </div>
    );
}