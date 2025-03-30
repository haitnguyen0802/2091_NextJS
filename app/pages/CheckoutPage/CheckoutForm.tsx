"use client";

import React, { useRef, useState } from 'react';
import BillingDetail, { BillingFormData } from "./BillingDetail";
import YourOrder from "./YourOrder";

export default function CheckoutForm() {
    const billingFormRef = useRef<HTMLDivElement>(null);
    const [billingDetails, setBillingDetails] = useState<BillingFormData | null>(null);

    const handleBillingFormChange = (formData: BillingFormData) => {
        setBillingDetails(formData);
    };

    return (
        <div className="checkout-form">
            <div className="row">
                <BillingDetail 
                    formRef={billingFormRef} 
                    onFormChange={handleBillingFormChange} 
                />
                <YourOrder billingDetails={billingDetails} />
            </div>
        </div>
    );
}