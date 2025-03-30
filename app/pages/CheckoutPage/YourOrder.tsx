'use client';

import { useCart } from '@/app/context/CartContext';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/public/constants/paths';
import { BillingFormData, isBillingFormValid } from './BillingDetail';

interface YourOrderProps {
    billingDetails: BillingFormData | null;
}

export default function YourOrder({ billingDetails }: YourOrderProps) {
    const router = useRouter()
    const { cartItems, getCartTotal, clearCart } = useCart();

    // Tính tổng giá trị đơn hàng
    const subtotal = getCartTotal();
    const shipping = 0; // Miễn phí vận chuyển
    const total = subtotal + shipping;

    // State cho phương thức thanh toán và lỗi
    const [paymentMethod, setPaymentMethod] = useState<string>('bank');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [validationAttempted, setValidationAttempted] = useState<boolean>(false);
    
    // Hàm xử lý khi thay đổi phương thức thanh toán
    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
    };

    // Hàm đặt hàng
    const handlePlaceOrder = () => {
        setErrorMessage('');
        setValidationAttempted(true);

        // Kiểm tra giỏ hàng có trống không
        if (cartItems.length === 0) {
            setErrorMessage('Your cart is empty. Please add products before placing an order.');
            return;
        }

        // Kiểm tra thông tin người dùng
        if (!billingDetails || !isBillingFormValid(billingDetails)) {
            setErrorMessage('Please fill in all required fields in the billing details form.');
            return;
        }

        // Nếu mọi thứ hợp lệ, tạo đơn hàng
        const order = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            items: cartItems,
            customer: billingDetails,
            subtotal,
            shipping,
            total,
            paymentMethod,
            status: 'pending'
        };

        // Lưu đơn hàng vào localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('lastOrder', JSON.stringify(order));

        // Xóa giỏ hàng
        clearCart();

        // Chuyển đến trang cảm ơn
        router.push(PATHS.CHECKOUT_SUCCESS);
    };

    return (
        <div className="col-lg-3">
            <div className="summary summary-cart">
                <h3 className="summary-title">Your Order</h3>

                <table className="table table-summary">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.ten_sp} <span>x{item.quantity}</span></td>
                                <td>{formatCurrency((item.gia_km !== null ? item.gia_km : item.gia) * item.quantity)}</td>
                            </tr>
                        ))}
                        <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>{formatCurrency(subtotal)}</td>
                        </tr>
                        <tr>
                            <td>Shipping:</td>
                            <td>Free shipping</td>
                        </tr>
                        <tr className="summary-total">
                            <td>Total:</td>
                            <td>{formatCurrency(total)}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="accordion-summary" id="accordion-payment">
                    <div className="card">
                        <div className="card-header" id="heading-1">
                            <h2 className="card-title">
                                <label className="custom-control custom-radio">
                                    <input 
                                        type="radio" 
                                        className="custom-control-input" 
                                        name="payment-method" 
                                        value="bank"
                                        checked={paymentMethod === 'bank'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <span className="custom-control-label">Direct bank transfer</span>
                                </label>
                            </h2>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="heading-2">
                            <h2 className="card-title">
                                <label className="custom-control custom-radio">
                                    <input 
                                        type="radio" 
                                        className="custom-control-input" 
                                        name="payment-method" 
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <span className="custom-control-label">Cash on delivery</span>
                                </label>
                            </h2>
                        </div>
                    </div>
                </div>

                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                
                {validationAttempted && cartItems.length === 0 && (
                    <div className="alert alert-warning" role="alert">
                        Your cart is empty. Please add products before placing an order.
                    </div>
                )}

                <button 
                    type="button" 
                    className="btn btn-outline-primary-2 btn-order btn-block"
                    onClick={handlePlaceOrder}
                >
                    <span className="btn-text">Place Order</span>
                    <span className="btn-hover-text">Proceed to Checkout</span>
                </button>
            </div>
        </div>
    );
}