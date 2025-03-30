'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

// Mock order structure
interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface Order {
    id: number;
    date: string;
    total: number;
    status: string;
    items: OrderItem[];
}

export default function TabOrder() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // In a real app, you would fetch orders for the current user from an API
        // For this demo, we'll use mock data if the user is logged in
        if (user) {
            setLoading(true);
            // Simulate API call delay
            setTimeout(() => {
                // Create some mock orders for the user based on their ID
                // This is just for demo purposes
                const mockOrders: Order[] = [
                    {
                        id: 10000 + user.id,
                        date: new Date().toISOString().split('T')[0],  // Today's date
                        total: 160.00,
                        status: 'Completed',
                        items: [
                            {
                                id: 1,
                                name: 'Beige knitted elastic runner shoes',
                                price: 84.00,
                                quantity: 1,
                                image: 'assets/images/demos/demo-3/products/product-3.jpg'
                            },
                            {
                                id: 2,
                                name: 'Blue utility pinafore denim dress',
                                price: 76.00,
                                quantity: 1,
                                image: 'assets/images/demos/demo-3/products/product-2.jpg'
                            }
                        ]
                    },
                    {
                        id: 20000 + user.id,
                        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
                        total: 86.00,
                        status: 'Processing',
                        items: [
                            {
                                id: 3,
                                name: 'Orange saddle lock front chain cross body bag',
                                price: 52.00,
                                quantity: 1,
                                image: 'assets/images/demos/demo-3/products/product-6.jpg'
                            },
                            {
                                id: 4,
                                name: 'Yellow button front tea top',
                                price: 34.00,
                                quantity: 1,
                                image: 'assets/images/demos/demo-3/products/product-4.jpg'
                            }
                        ]
                    }
                ];
                
                setOrders(mockOrders);
                setLoading(false);
            }, 800);
        }
    }, [user]);

    if (!user) {
        return <div className="alert alert-warning">Please log in to view your orders.</div>;
    }

    if (loading) {
        return <div className="text-center py-4">Loading your orders...</div>;
    }

    return (
        <>
            <div className="tab-pane fade show active" id="tab-orders" role="tabpanel">
                <div className="order-history-header mb-4">
                    <h3>Order History</h3>
                    <p>Here you can track and manage your recent orders.</p>
                </div>
                
                {orders.length === 0 ? (
                    <div className="text-center py-4">
                        <div className="mb-3">
                            <i className="icon-shopping-cart" style={{ fontSize: '3rem' }}></i>
                        </div>
                        <p>No orders found. Start shopping to place your first order!</p>
                        <Link href="/products" className="btn btn-outline-primary-2">
                            <span>GO SHOP</span>
                            <i className="icon-long-arrow-right" />
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="orders-list mb-4">
                            {orders.map(order => (
                                <div key={order.id} className="card mb-3">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="mb-0">Order #{order.id}</h5>
                                            <small className="text-muted">Placed on: {order.date}</small>
                                        </div>
                                        <div className="text-right">
                                            <span className={`badge ${order.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                                                {order.status}
                                            </span>
                                            <div className="mt-1">
                                                <strong>Total: ${order.total.toFixed(2)}</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h6>Items</h6>
                                        <div className="table-responsive">
                                            <table className="table table-cart table-mobile">
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th className="text-center">Price</th>
                                                        <th className="text-center">Quantity</th>
                                                        <th className="text-center">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.items.map(item => (
                                                        <tr key={item.id}>
                                                            <td className="product-col">
                                                                <div className="product">
                                                                    <figure className="product-media">
                                                                        <img src={item.image} alt={item.name} />
                                                                    </figure>
                                                                    <h3 className="product-title">
                                                                        {item.name}
                                                                    </h3>
                                                                </div>
                                                            </td>
                                                            <td className="price-col text-center">${item.price.toFixed(2)}</td>
                                                            <td className="quantity-col text-center">{item.quantity}</td>
                                                            <td className="total-col text-center">${(item.price * item.quantity).toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}