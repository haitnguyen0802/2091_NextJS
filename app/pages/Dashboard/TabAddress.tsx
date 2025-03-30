'use client';

import { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/app/context/AuthContext";

export default function TabAddress() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [address, setAddress] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setAddress(user.dia_chi || '');
        }
    }, [user]);

    const handleSaveAddress = async () => {
        if (!user) {
            toast.error('You must be logged in to update your address');
            return;
        }

        setSubmitting(true);
        
        try {
            // Make API call to update user address
            const response = await fetch(`https://fpl.timefortea.io.vn/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dia_chi: address }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to update address');
            }
            
            // Update localStorage with new user data
            const updatedUser = { ...user, dia_chi: address };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            toast.success('Address updated successfully');
            setIsEditing(false);
            
            // Force page reload to refresh the auth context
            window.location.reload();
            
        } catch (err) {
            toast.error('An error occurred while updating address');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (!user) {
        return <div className="alert alert-warning">Please log in to view your address information.</div>;
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="tab-pane fade show active" id="tab-address" role="tabpanel">
                <p>
                    The following addresses will be used on the checkout
                    page by default.
                </p>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card card-dashboard">
                            <div className="card-body">
                                <h3 className="card-title">Billing Address</h3>
                                {isEditing ? (
                                    <div>
                                        <textarea 
                                            className="form-control mb-2" 
                                            rows={4}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter your address"
                                        />
                                        <button 
                                            className="btn btn-sm btn-primary mr-2"
                                            onClick={handleSaveAddress}
                                            disabled={submitting}
                                        >
                                            {submitting ? 'Saving...' : 'Save'}
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => {
                                                setIsEditing(false);
                                                if (user) {
                                                    setAddress(user.dia_chi || '');
                                                }
                                            }}
                                            disabled={submitting}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <p>
                                        <strong>Fullname:</strong> {user.ho_ten} <br />
                                        <strong>Email:</strong> {user.email} <br />
                                        <strong>Phone number:</strong> {user.dien_thoai} <br />
                                        <strong>Address:</strong> {user.dia_chi || 'Not provided'} <br />
                                        <br />
                                        <a href="#" onClick={(e) => { 
                                            e.preventDefault(); 
                                            setIsEditing(true); 
                                        }}>
                                            Edit <i className="icon-edit" />
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card card-dashboard">
                            <div className="card-body">
                                <h3 className="card-title">Shipping Address</h3>
                                <p>
                                    Same as billing address
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}