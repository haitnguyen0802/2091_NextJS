'use client';

import { useCart } from "@/app/context/CartContext";
import { formatCurrency } from "@/app/utils/formatCurrency";
import Link from "next/link";
import { PATHS } from "@/public/constants/paths";
import CartDiscount from "./CartDiscount";
import { useState, useCallback } from "react";

export default function ListProduct() {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const [updatingItems, setUpdatingItems] = useState<number[]>([]);

    const handleQuantityChange = useCallback((productId: number, value: number) => {
        // Ngăn chặn cập nhật nhiều lần cho cùng một sản phẩm
        if (updatingItems.includes(productId)) {
            return;
        }
        
        // Đánh dấu sản phẩm đang được cập nhật
        setUpdatingItems(prev => [...prev, productId]);
        
        // Cập nhật số lượng
        updateQuantity(productId, value);
        
        // Sau một khoảng thời gian ngắn, bỏ đánh dấu sản phẩm đang cập nhật
        setTimeout(() => {
            setUpdatingItems(prev => prev.filter(id => id !== productId));
        }, 300);
    }, [updateQuantity, updatingItems]);

    const handleRemoveItem = useCallback((productId: number) => {
        // Ngăn chặn xóa nhiều lần
        if (updatingItems.includes(productId)) {
            return;
        }
        
        // Đánh dấu sản phẩm đang được cập nhật
        setUpdatingItems(prev => [...prev, productId]);
        
        // Xóa sản phẩm
        removeFromCart(productId);
    }, [removeFromCart, updatingItems]);

    return (
        <>
            <div className="col-lg-9">
                {cartItems.length > 0 ? (
                    <>
                        <table className="table table-cart table-mobile">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id}>
                                        <td className="product-col">
                                            <div className="product">
                                                <figure className="product-media">
                                                    <Link href={`${PATHS.PRODUCT_DETAIL}/${item.slug || item.id}`}>
                                                        <img src={item.hinh} alt={item.ten_sp} />
                                                    </Link>
                                                </figure>
                                                <h3 className="product-title">
                                                    <Link href={`${PATHS.PRODUCT_DETAIL}/${item.slug || item.id}`}>
                                                        {item.ten_sp}
                                                    </Link>
                                                </h3>
                                            </div>
                                        </td>
                                        <td className="price-col">
                                            {formatCurrency(item.gia_km !== null ? item.gia_km : item.gia)}
                                        </td>
                                        <td className="quantity-col">
                                            <div className="cart-product-quantity">
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    value={item.quantity} 
                                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                    min={1} 
                                                    max={10} 
                                                    step={1} 
                                                    data-decimals={0} 
                                                    required 
                                                    disabled={updatingItems.includes(item.id)}
                                                />
                                            </div>
                                        </td>
                                        <td className="total-col">
                                            {formatCurrency((item.gia_km !== null ? item.gia_km : item.gia) * item.quantity)}
                                        </td>
                                        <td className="remove-col">
                                            <button 
                                                className="btn-remove"
                                                onClick={() => handleRemoveItem(item.id)}
                                                disabled={updatingItems.includes(item.id)}
                                            >
                                                <i className="icon-close" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="cart-bottom">
                            <CartDiscount />
                            <Link href={PATHS.PRODUCTS} className="btn btn-outline-dark-2">
                                <span>CONTINUE SHOPPING</span>
                                <i className="icon-refresh" />
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-5">
                        <div className="mb-4">
                            <i className="icon-shopping-cart" style={{ fontSize: '3rem' }}></i>
                        </div>
                        <h3>Your cart is empty</h3>
                        <p>Looks like you haven&apos;t added any products to your cart yet.</p>
                        <Link href={PATHS.PRODUCTS} className="btn btn-primary">
                            <span>CONTINUE SHOPPING</span>
                            <i className="icon-long-arrow-right" />
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}