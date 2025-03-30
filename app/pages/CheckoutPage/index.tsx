'use client';

import BreadCrumb from "@/app/components/BreadCrumb";
import CheckoutDiscount from "./CheckoutDiscount";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
    return (
        <>
            <main className="main">
                <div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
                    <div className="container">
                        <h1 className="page-title">Checkout</h1>
                    </div>
                </div>
                <BreadCrumb />
                <div className="page-content">
                    <div className="checkout">
                        <div className="container">
                            <CheckoutDiscount />
                            <CheckoutForm />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}