'use client';

import { User } from "@/app/context/UserContext";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/app/context/AuthContext";
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

export default function TabAccount() {
    const { user, loading, error: authError } = useAuth();
    const [formData, setFormData] = useState<Partial<User>>({
        ho_ten: '',
        dien_thoai: '',
        dia_chi: '',
        email: '',
    });
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [administrativeData, setAdministrativeData] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    // Load user data when component mounts or user changes
    useEffect(() => {
        if (user) {
            setFormData({
                ho_ten: user.ho_ten || '',
                dien_thoai: user.dien_thoai || '',
                dia_chi: user.dia_chi || '',
                email: user.email || '',
            });
        }
    }, [user]);

    // Load administrative data
    useEffect(() => {
        const fetchAdministrativeData = async () => {
            try {
                const result = await axios.get<City[]>(
                    "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
                );
                setAdministrativeData(result.data);
            } catch (error) {
                console.error("Error fetching administrative data:", error);
            }
        };

        fetchAdministrativeData();
    }, []);

    // Handle city change
    const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const cityId = e.target.value;
        setSelectedCity(cityId);
        setSelectedDistrict('');
        setSelectedWard('');
        setWards([]);

        if (cityId && administrativeData.length > 0) {
            const cityData = administrativeData.find(city => city.Id === cityId);
            if (cityData) {
                setDistricts(cityData.Districts);
            }
        } else {
            setDistricts([]);
        }
    };

    // Handle district change
    const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
        setSelectedWard('');

        if (districtId && districts.length > 0) {
            const districtData = districts.find(district => district.Id === districtId);
            if (districtData) {
                setWards(districtData.Wards);
            }
        } else {
            setWards([]);
        }
    };

    // Handle ward change
    const handleWardChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedWard(e.target.value);
    };

    // Handle form input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!user) {
            toast.error('You must be logged in to update your information');
            return;
        }
        
        // Validate form
        if (!formData.ho_ten || !formData.dien_thoai) {
            toast.error('Name and phone number are required');
            return;
        }
        
        // Prepare address from selected administrative divisions
        let fullAddress = formData.dia_chi;
        if (selectedCity && selectedDistrict && selectedWard) {
            const cityName = administrativeData.find(city => city.Id === selectedCity)?.Name;
            const districtName = districts.find(district => district.Id === selectedDistrict)?.Name;
            const wardName = wards.find(ward => ward.Id === selectedWard)?.Name;
            
            if (cityName && districtName && wardName) {
                fullAddress = `${formData.dia_chi}, ${wardName}, ${districtName}, ${cityName}`;
            }
        }
        
        // Handle password change if provided
        const updateData: Partial<User> = { 
            ...formData,
            dia_chi: fullAddress
        };
        
        if (newPassword) {
            // Validate password
            if (newPassword !== confirmPassword) {
                setPasswordError('Passwords do not match');
                return;
            }
            
            // In a real app, you'd validate the old password on the server
            updateData.mat_khau = newPassword;
        }
        
        setSubmitting(true);
        
        try {
            // Make API call to update user
            const response = await fetch(`https://fpl.timefortea.io.vn/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });
            
            if (!response.ok) {
                throw new Error('Failed to update user information');
            }
            
            // Update localStorage with new user data
            const updatedUser = { ...user, ...updateData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            toast.success('User information updated successfully');
            
            // Clear password fields
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setPasswordError('');
            
            // Force page reload to refresh the auth context
            window.location.reload();
            
        } catch (err) {
            toast.error('An error occurred while updating user information');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    
    if (authError) return <div className="alert alert-danger">{authError}</div>;

    if (!user) return <div className="alert alert-warning">Please log in to view your account details.</div>;

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="tab-pane fade show active" id="tab-account" role="tabpanel">
                <form action="#" className="account-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-sm-6">
                            <label>Full Name *</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="ho_ten"
                                value={formData.ho_ten} 
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        <div className="col-sm-6">
                            <label>Email address *</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled
                                required 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label>Phone number *</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="dien_thoai"
                                value={formData.dien_thoai}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        <div className="col-sm-6">
                            <label>Date of birth</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                name="ngay_sinh"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <label>Province/City *</label>
                            <div className="select-custom">
                                <select 
                                    className="form-control form-select" 
                                    id="city" 
                                    value={selectedCity}
                                    onChange={handleCityChange}
                                >
                                    <option value="">Select Province/City</option>
                                    {administrativeData.map(city => (
                                        <option key={city.Id} value={city.Id}>
                                            {city.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <label>District/Town *</label>
                            <div className="select-custom">
                                <select 
                                    className="form-control form-select" 
                                    id="district"
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    disabled={!selectedCity}
                                >
                                    <option value="">Select District/Town</option>
                                    {districts.map(district => (
                                        <option key={district.Id} value={district.Id}>
                                            {district.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <label>Ward *</label>
                            <div className="select-custom">
                                <select 
                                    className="form-control form-select" 
                                    id="ward"
                                    value={selectedWard}
                                    onChange={handleWardChange}
                                    disabled={!selectedDistrict}
                                >
                                    <option value="">Select Ward</option>
                                    {wards.map(ward => (
                                        <option key={ward.Id} value={ward.Id}>
                                            {ward.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <label>Street address *</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="dia_chi"
                        value={formData.dia_chi}
                        onChange={handleInputChange}
                        placeholder="House number, street name, etc."
                    />
                    
                    <div className="password-section mt-4">
                        <h3>Change Password</h3>
                        <label>Current password (leave blank to leave unchanged)</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <label>New password (leave blank to leave unchanged)</label>
                        <input 
                            type="password" 
                            className={`form-control ${passwordError ? 'input-error' : ''}`} 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <label>Confirm new password</label>
                        <input 
                            type="password" 
                            className={`form-control mb-2 ${passwordError ? 'input-error' : ''}`}  
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {passwordError && <p className="form-error">{passwordError}</p>}
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn btn-outline-primary-2 mt-3"
                        disabled={submitting}
                    >
                        <span>{submitting ? 'SAVING...' : 'SAVE CHANGES'}</span>
                        <i className="icon-long-arrow-right" />
                    </button>
                </form>
            </div>
        </>
    )
}