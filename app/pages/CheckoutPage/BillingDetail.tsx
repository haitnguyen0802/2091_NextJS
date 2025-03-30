'use client';

import React, { useState, useRef, useEffect } from 'react';

// Định nghĩa interface cho dữ liệu form
export interface BillingFormData {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    district: string;
    ward: string;
    address: string;
    orderNotes: string;
    createAccount: boolean;
}

interface BillingDetailProps {
    formRef?: React.RefObject<HTMLDivElement | null>;
    onFormChange?: (formData: BillingFormData) => void;
}

// Hàm kiểm tra xem form có hợp lệ hay không
export const isBillingFormValid = (form: BillingFormData): boolean => {
    return !!(
        form.fullName.trim() &&
        form.phone.trim() &&
        form.email.trim() &&
        form.city &&
        form.district &&
        form.ward &&
        form.address.trim()
    );
};

export default function BillingDetail({ formRef: externalFormRef, onFormChange }: BillingDetailProps) {
    const [form, setForm] = useState<BillingFormData>({
        fullName: '',
        phone: '',
        email: '',
        city: '',
        district: '',
        ward: '',
        address: '',
        orderNotes: '',
        createAccount: false
    });

    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const internalFormRef = useRef<HTMLDivElement>(null);
    const formRef = externalFormRef || internalFormRef;

    // Chia sẻ dữ liệu form khi có thay đổi
    useEffect(() => {
        if (onFormChange) {
            onFormChange(form);
        }
    }, [form, onFormChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setForm(prev => ({ ...prev, [name]: checked }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
        
        setErrors(prev => ({ ...prev, [name]: false }));
    };

    return (
        <div className="col-lg-9" ref={formRef}>
            <h2 className="checkout-title">Billing Details</h2>

            <div className="row">
                <div className="col-sm-4">
                    <label>Full Name *</label>
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className={`form-control${errors.fullName ? ' input-error' : ''}`}
                        required
                    />
                    {errors.fullName && <p className="form-error">Please fill in this field</p>}
                </div>
                <div className="col-sm-4">
                    <label>Phone number *</label>
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className={`form-control${errors.phone ? ' input-error' : ''}`}
                        required
                    />
                    {errors.phone && <p className="form-error">Please fill in this field</p>}
                </div>
                <div className="col-sm-4">
                    <label>Email address *</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`form-control${errors.email ? ' input-error' : ''}`}
                        required
                    />
                    {errors.email && <p className="form-error">Please fill in this field</p>}
                </div>
            </div>

            <div className="row">
                <div className="col-sm-4">
                    <label>Province/City *</label>
                    <div className="select-custom">
                        <select
                            name="city"
                            id="city"
                            className={`form-control form-select${errors.city ? ' input-error' : ''}`}
                            aria-label="Default select example"
                            value={form.city}
                            onChange={handleChange}
                        >
                            <option value="">Select City</option>
                            <option value="hn">Hà Nội</option>
                            <option value="hcm">Hồ Chí Minh</option>
                        </select>
                    </div>
                    {errors.city && <p className="form-error">Please fill in this field</p>}
                </div>
                <div className="col-sm-4">
                    <label>District/Town *</label>
                    <div className="select-custom">
                        <select
                            name="district"
                            id="district"
                            className={`form-control form-select${errors.district ? ' input-error' : ''}`}
                            value={form.district}
                            onChange={handleChange}
                        >
                            <option value="">Select District</option>
                            <option value="q1">Quận 1</option>
                        </select>
                    </div>
                    {errors.district && <p className="form-error">Please fill in this field</p>}
                </div>
                <div className="col-sm-4">
                    <label>Ward *</label>
                    <div className="select-custom">
                        <select
                            name="ward"
                            id="ward"
                            className={`form-control form-select${errors.ward ? ' input-error' : ''}`}
                            value={form.ward}
                            onChange={handleChange}
                        >
                            <option value="">Select Ward</option>
                            <option value="p1">Phường 1</option>
                        </select>
                    </div>
                    {errors.ward && <p className="form-error">Please fill in this field</p>}
                </div>
            </div>

            <label>Street address *</label>
            <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className={`form-control${errors.address ? ' input-error' : ''}`}
                placeholder="House number and Street name"
                required
            />
            {errors.address && <p className="form-error">Please fill in this field</p>}

            <label>Order notes (optional)</label>
            <textarea
                name="orderNotes"
                className="form-control"
                cols={30}
                rows={4}
                placeholder="Notes about your order, e.g. special notes for delivery"
                value={form.orderNotes}
                onChange={handleChange}
            />

            <div className="custom-control custom-checkbox">
                <input 
                    type="checkbox" 
                    className="custom-control-input" 
                    id="checkout-create-acc"
                    name="createAccount"
                    checked={form.createAccount}
                    onChange={handleChange}
                />
                <label className="custom-control-label" htmlFor="checkout-create-acc">Create an account?</label>
            </div>
        </div>
    );
}
