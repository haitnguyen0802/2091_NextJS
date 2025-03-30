'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// Define interfaces for administrative data
interface Ward {
    Id: string;
    Name: string;
    Level: string;
}

interface District {
    Id: string;
    Name: string;
    Level: string;
    Wards: Ward[];
}

interface City {
    Id: string;
    Name: string;
    Level: string;
    Districts: District[];
}

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
    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [loading, setLoading] = useState(false);

    const internalFormRef = useRef<HTMLDivElement>(null);
    const formRef = externalFormRef || internalFormRef;

    // Fetch administrative divisions data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<City[]>(
                    'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
                );
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching administrative data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle city change
    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cityId = e.target.value;
        
        // Update form with selected city
        setForm(prev => ({
            ...prev,
            city: cityId,
            district: '',
            ward: ''
        }));
        
        // Clear errors
        setErrors(prev => ({
            ...prev,
            city: false
        }));
        
        // Reset districts and wards
        setWards([]);
        
        // Find districts for the selected city
        if (cityId && cities.length > 0) {
            const cityData = cities.find(city => city.Id === cityId);
            if (cityData) {
                setDistricts(cityData.Districts);
            } else {
                setDistricts([]);
            }
        } else {
            setDistricts([]);
        }
    };

    // Handle district change
    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const districtId = e.target.value;
        
        // Update form with selected district
        setForm(prev => ({
            ...prev,
            district: districtId,
            ward: ''
        }));
        
        // Clear errors
        setErrors(prev => ({
            ...prev,
            district: false
        }));
        
        // Find wards for the selected district
        if (districtId && districts.length > 0) {
            const districtData = districts.find(district => district.Id === districtId);
            if (districtData) {
                setWards(districtData.Wards);
            } else {
                setWards([]);
            }
        } else {
            setWards([]);
        }
    };

    // Handle ward change
    const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const wardId = e.target.value;
        
        // Update form with selected ward
        setForm(prev => ({
            ...prev,
            ward: wardId
        }));
        
        // Clear errors
        setErrors(prev => ({
            ...prev,
            ward: false
        }));
    };

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
                            onChange={handleCityChange}
                            disabled={loading}
                        >
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city.Id} value={city.Id}>
                                    {city.Name}
                                </option>
                            ))}
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
                            onChange={handleDistrictChange}
                            disabled={!form.city || loading}
                        >
                            <option value="">Select District</option>
                            {districts.map(district => (
                                <option key={district.Id} value={district.Id}>
                                    {district.Name}
                                </option>
                            ))}
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
                            onChange={handleWardChange}
                            disabled={!form.district || loading}
                        >
                            <option value="">Select Ward</option>
                            {wards.map(ward => (
                                <option key={ward.Id} value={ward.Id}>
                                    {ward.Name}
                                </option>
                            ))}
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
