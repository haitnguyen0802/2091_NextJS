'use client';

import { useUser } from "@/app/context/UserContext";
import { useState } from "react";
import Link from "next/link";

// Mock wishlist data
const mockWishlist = [
    {
        id: 1,
        name: 'Beige knitted elastic runner shoes',
        price: 84.00,
        inStock: true,
        image: 'assets/images/demos/demo-3/products/product-4.jpg'
    },
    {
        id: 2,
        name: 'Blue utility pinafore denim dress',
        price: 76.00,
        inStock: true,
        image: 'assets/images/demos/demo-3/products/product-5.jpg'
    },
    {
        id: 3,
        name: 'Orange saddle lock front chain cross body bag',
        price: 52.00,
        inStock: false,
        image: 'assets/images/demos/demo-3/products/product-6.jpg'
    }
];

export default function TabWishlist() {
    const { currentUser } = useUser();
    const [wishlist, setWishlist] = useState(mockWishlist);

    const handleRemoveItem = (id: number) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    if (!currentUser) {
        return <div>Please select a user first</div>;
    }

    return (
        <>
            <div className="tab-pane fade show active" id="tab-wishlist" role="tabpanel">
                {wishlist.length === 0 ? (
                    <div className="text-center py-4">
                        <p>Your wishlist is empty.</p>
                        <Link href="/products" className="btn btn-outline-primary-2">
                            <span>GO SHOP</span>
                            <i className="icon-long-arrow-right" />
                        </Link>
                    </div>
                ) : (
                    <table className="table table-wishlist table-mobile">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Stock Status</th>
                                <th />
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {wishlist.map(item => (
                                <tr key={item.id}>
                                    <td className="product-col">
                                        <div className="product">
                                            <figure className="product-media">
                                                <Link href={`/product-detail/${item.id}`}>
                                                    <img src={item.image} alt={item.name} />
                                                </Link>
                                            </figure>
                                            <h3 className="product-title">
                                                <Link href={`/product-detail/${item.id}`}>{item.name}</Link>
                                            </h3>
                                        </div>
                                    </td>
                                    <td className="price-col text-center">${item.price.toFixed(2)}</td>
                                    <td className="stock-col text-center">
                                        <span className={item.inStock ? 'in-stock' : 'out-of-stock'}>
                                            {item.inStock ? 'In stock' : 'Out of stock'}
                                        </span>
                                    </td>
                                    <td className="action-col">
                                        <button 
                                            className={`btn btn-block ${item.inStock ? 'btn-outline-primary-2' : 'btn-outline-primary-2 disabled'}`}
                                            disabled={!item.inStock}
                                        >
                                            {item.inStock ? (
                                                <>
                                                    <i className="icon-cart-plus" />Add to Cart
                                                </>
                                            ) : 'Out of Stock'}
                                        </button>
                                    </td>
                                    <td className="remove-col">
                                        <button 
                                            className="btn-remove"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            <i className="icon-close" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}