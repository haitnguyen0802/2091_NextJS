'use client';

import { useState } from 'react';

export default function CheckoutDiscount() {
    const [couponCode, setCouponCode] = useState('');

    const handleCouponSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý coupon code ở đây
        console.log('Applying coupon:', couponCode);
    };

    return (
        <>
            <div className="checkout-discount">
                <form action="#" onSubmit={handleCouponSubmit}>
                    <input 
                        type="text" 
                        className="form-control" 
                        required 
                        id="checkout-discount-input" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <label htmlFor="checkout-discount-input" className="text-truncate">
                        Have a coupon? <span>Click here to enter your code</span>
                    </label>
                </form>
            </div>
        </>
    )
}