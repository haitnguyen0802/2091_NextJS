'use client';

import { useCart } from "@/app/context/CartContext";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PATHS } from "@/public/constants/paths";

export default function CartTotal() {
    const router = useRouter();
    const { getCartTotal, cartItems } = useCart();
    const [shippingMethod, setShippingMethod] = useState('free');
    
    const shippingCost = {
        free: 0,
        standard: 10,
        express: 20
    };
    
    const getTotal = () => {
        const subtotal = getCartTotal();
        const shipping = shippingCost[shippingMethod as keyof typeof shippingCost];
        return subtotal + shipping;
    };

    const handleProceedToCheckout = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(PATHS.CHECKOUT);
    };

    if (cartItems.length === 0) {
        return null;
    }

    return (
        <>
            <aside className="col-lg-3">
                <div className="summary summary-cart">
                    <h3 className="summary-title">Cart Total</h3>
                    <table className="table table-summary">
                        <tbody>
                            <tr className="summary-subtotal">
                                <td>Subtotal:</td>
                                <td>{formatCurrency(getCartTotal())}</td>
                            </tr>
                            <tr className="summary-shipping">
                                <td>Shipping:</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr className="summary-shipping-row">
                                <td>
                                    <div className="custom-control custom-radio">
                                        <input 
                                            type="radio" 
                                            id="free-shipping" 
                                            name="shipping" 
                                            className="custom-control-input"
                                            checked={shippingMethod === 'free'}
                                            onChange={() => setShippingMethod('free')}
                                        />
                                        <label className="custom-control-label" htmlFor="free-shipping">Free Shipping</label>
                                    </div>
                                </td>
                                <td>{formatCurrency(0)}</td>
                            </tr>
                            <tr className="summary-shipping-row">
                                <td>
                                    <div className="custom-control custom-radio">
                                        <input 
                                            type="radio" 
                                            id="standard-shipping" 
                                            name="shipping" 
                                            className="custom-control-input"
                                            checked={shippingMethod === 'standard'}
                                            onChange={() => setShippingMethod('standard')}
                                        />
                                        <label className="custom-control-label" htmlFor="standard-shipping">Standard:</label>
                                    </div>
                                </td>
                                <td>{formatCurrency(10)}</td>
                            </tr>
                            <tr className="summary-shipping-row">
                                <td>
                                    <div className="custom-control custom-radio">
                                        <input 
                                            type="radio" 
                                            id="express-shipping" 
                                            name="shipping" 
                                            className="custom-control-input"
                                            checked={shippingMethod === 'express'}
                                            onChange={() => setShippingMethod('express')}
                                        />
                                        <label className="custom-control-label" htmlFor="express-shipping">Express:</label>
                                    </div>
                                </td>
                                <td>{formatCurrency(20)}</td>
                            </tr>
                            <tr className="summary-shipping-estimate">
                                <td>Estimate for Your Country <br />
                                    <a href="#">Change address</a>
                                </td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr className="summary-total">
                                <td>Total:</td>
                                <td>{formatCurrency(getTotal())}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        onClick={handleProceedToCheckout}
                        className="btn btn-outline-primary-2 btn-order btn-block"
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>
                <Link href={PATHS.PRODUCTS} className="btn btn-outline-dark-2 btn-block mb-3">
                    <span>CONTINUE SHOPPING</span>
                    <i className="icon-refresh" />
                </Link>
            </aside>
        </>
    )
}