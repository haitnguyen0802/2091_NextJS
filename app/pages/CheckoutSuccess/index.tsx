'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PATHS } from '@/public/constants/paths';

// Interface cho dữ liệu đơn hàng
interface OrderItem {
    id: number;
    ten_sp: string;
    gia: number;
    gia_km: number | null;
    quantity: number;
}

interface OrderDetails {
    items: OrderItem[];
    total: number;
    shippingCost: number;
    paymentMethod: string;
    orderDate: string;
    orderStatus: string;
}

export default function CheckoutSuccess() {
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Lấy thông tin đơn hàng cuối cùng từ localStorage
        try {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            if (orders.length > 0) {
                setOrderDetails(orders[orders.length - 1]);
            } else {
                // Nếu không có đơn hàng, chuyển về trang chủ
                setTimeout(() => {
                    router.push(PATHS.HOME);
                }, 3000);
            }
        } catch (error) {
            console.error('Error getting order details:', error);
        }
    }, [router]);

    return (
        <div className="page-content">
            <div className="checkout-success">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 mx-auto text-center">
                            <div className="success-icon mb-4">
                                <i className="icon-check" style={{ fontSize: '5rem', color: 'green' }}></i>
                            </div>
                            <h2 className="title">Thank you for your order!</h2>
                            <p className="lead">Your order has been placed successfully.</p>
                            
                            {orderDetails && (
                                <div className="order-details mt-4 mb-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Order Details</h4>
                                        </div>
                                        <div className="card-body">
                                            <p><strong>Order Date:</strong> {new Date(orderDetails.orderDate).toLocaleString()}</p>
                                            <p><strong>Order Status:</strong> <span className="badge badge-info">Processing</span></p>
                                            <p><strong>Payment Method:</strong> {orderDetails.paymentMethod === 'direct-bank' ? 'Direct Bank Transfer' : 'Cash on Delivery'}</p>
                                            <p><strong>Total Amount:</strong> ${orderDetails.total.toFixed(2)}</p>
                                            
                                            {orderDetails.paymentMethod === 'direct-bank' && (
                                                <div className="alert alert-info mt-3">
                                                    <p><strong>Bank Account Details:</strong></p>
                                                    <p>Bank: Example Bank</p>
                                                    <p>Account Name: My Shop</p>
                                                    <p>Account Number: 123456789</p>
                                                    <p>Reference: YOUR-ORDER-{Math.floor(Math.random() * 10000)}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div className="button-container">
                                <Link href={PATHS.HOME} className="btn btn-outline-primary-2 btn-minwidth-lg">
                                    <span>CONTINUE SHOPPING</span>
                                    <i className="icon-long-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 