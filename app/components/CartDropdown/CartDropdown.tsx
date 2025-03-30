'use client';

import { PATHS } from "@/public/constants/paths";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { formatCurrency } from "@/app/utils/formatCurrency";

export default function CartDropdown() {
    const router = useRouter();
    const { cartItems, removeFromCart, getCartTotal, getCartCount } = useCart();
    
    const handleCheckout = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(PATHS.CHECKOUT);
    };
    
    return (
        <>
            <div className="dropdown cart-dropdown">
                <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                    <i className="icon-shopping-cart" />
                    <span className="cart-count">{getCartCount()}</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                    {cartItems.length > 0 ? (
                        <>
                            <div className="dropdown-cart-products">
                                {cartItems.map(item => (
                                    <div className="product" key={item.id}>
                                        <div className="product-cart-details">
                                            <h4 className="product-title">
                                                <Link href={`${PATHS.PRODUCT_DETAIL}/${item.slug || item.id}`}>
                                                    {item.ten_sp}
                                                </Link>
                                            </h4>
                                            <span className="cart-product-info">
                                                <span className="cart-product-qty">{item.quantity}</span> x {formatCurrency(item.gia_km !== null ? item.gia_km : item.gia)}
                                            </span>
                                        </div>
                                        <figure className="product-image-container">
                                            <Link href={`${PATHS.PRODUCT_DETAIL}/${item.slug || item.id}`} className="product-image">
                                                <img src={item.hinh} alt={item.ten_sp} />
                                            </Link>
                                        </figure>
                                        <button 
                                            className="btn-remove" 
                                            title="Remove Product"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <i className="icon-close" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="dropdown-cart-total">
                                <span>Total</span>
                                <span className="cart-total-price">{formatCurrency(getCartTotal())}</span>
                            </div>
                            <div className="dropdown-cart-action">
                                <Link href={PATHS.CART} className="btn btn-primary">View Cart</Link>
                                <a 
                                    href="#" 
                                    className="btn btn-outline-primary-2"
                                    onClick={handleCheckout}
                                >
                                    <span>Checkout</span>
                                    <i className="icon-long-arrow-right" />
                                </a>
                            </div>
                        </>
                    ) : (
                        <div className="dropdown-cart-products">
                            <p className="text-center py-3">Your cart is empty</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}