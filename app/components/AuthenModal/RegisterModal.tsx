'use client';

import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

// Define user data type
interface UserType {
    id: number;
    email: string;
    mat_khau: string;
    ho_ten: string;
    dia_chi: string | null;
    dien_thoai: string | null;
    vai_tro: number;
    khoa: number;
    hinh: string | null;
    email_verified_at: string | null;
    remember_token: string | null;
    created_at: string | null;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
    const [formData, setFormData] = useState({
        ho_ten: '',
        email: '',
        mat_khau: '',
        dia_chi: '',
        dien_thoai: '',
        hinh: 'avatar.jpg', // Default value
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Helper function to fetch user by email with retries
    const fetchUserByEmail = async (email: string, maxRetries = 3, delayMs = 1000): Promise<UserType> => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`Attempt ${attempt}/${maxRetries} to fetch user by email: ${email}`);
                
                const response = await fetch(`https://fpl.timefortea.io.vn/api/users/email/${encodeURIComponent(email)}`);
                
                if (response.ok) {
                    const userData: UserType = await response.json();
                    console.log('User data fetched successfully:', userData);
                    return userData;
                }
                
                const errorText = await response.text();
                console.log(`Attempt ${attempt} failed with status ${response.status}: ${errorText}`);
                
                // If we have more retries, wait before next attempt
                if (attempt < maxRetries) {
                    console.log(`Waiting ${delayMs}ms before next attempt...`);
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                }
            } catch (error) {
                console.error(`Attempt ${attempt} failed with error:`, error);
                
                // If we have more retries, wait before next attempt
                if (attempt < maxRetries) {
                    console.log(`Waiting ${delayMs}ms before next attempt...`);
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                }
            }
        }
        
        // If we get here, all attempts failed
        throw new Error('Không thể lấy thông tin người dùng sau nhiều lần thử');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Hash the password before sending to API
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(formData.mat_khau, salt);
            
            // Step 1: Register the user
            console.log('Sending registration request for email:', formData.email);
            
            const response = await fetch('https://fpl.timefortea.io.vn/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    mat_khau: hashedPassword, // Send the hashed password instead
                    vai_tro: 0, // Default user role
                    khoa: 0, // Default unlock status
                }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Đăng ký không thành công');
            }
            
            console.log('Registration successful. API response:', data);
            
            // Step 2: Fetch the user by email to get the ID (with retries)
            console.log('Fetching user by email with retries:', formData.email);
            const userData = await fetchUserByEmail(formData.email);
            
            if (!userData || !userData.id) {
                console.error('User ID not found in API response:', userData);
                throw new Error('Không thể xác định ID người dùng từ phản hồi API');
            }
            
            const userId = userData.id;
            console.log('Retrieved user ID:', userId);
            
            // Step 3: Generate activation token and send email
            const activationToken = await bcrypt.hash(formData.email + Date.now(), 10)
                .then(hash => hash.replace(/[^a-zA-Z0-9]/g, ''));
            
            console.log('Sending activation email with userId:', userId);
            
            // Send activation email
            await sendActivationEmail(userId, formData.email, formData.ho_ten, activationToken);
            
            alert('Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản của bạn.');
            onSwitchToLogin();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
            console.error('Registration error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Function to send activation email
    const sendActivationEmail = async (userId: number, email: string, name: string, token: string) => {
        try {
            // Validate required parameters
            if (!userId || !email || !token) {
                console.error('Missing required parameters for activation email:', { userId, email, token });
                throw new Error('Missing required parameters for activation email');
            }

            console.log('Sending activation email with params:', { userId, email, name, token });
            
            const response = await fetch('/api/send-activation-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    to: email,
                    subject: 'Kích hoạt tài khoản',
                    name: name,
                    token: token,
                }),
            });

            const responseData = await response.json();
            
            if (!response.ok) {
                console.error('Activation email API error:', responseData);
                throw new Error(responseData.error || 'Failed to send activation email');
            }
            
            console.log('Activation email sent successfully:', responseData);
        } catch (error) {
            console.error('Error sending activation email:', error);
            // We don't want to stop the registration process if email fails
            // So we just log the error and continue
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show" id="register-modal" style={{ display: 'block' }} tabIndex={-1} role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true"><i className="icon-close"></i></span>
                        </button>

                        <div className="form-box">
                            <div className="form-tab">
                                <ul className="nav nav-pills nav-fill" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link" id="signin-tab" data-toggle="tab" href="#signin" role="tab" aria-controls="signin" aria-selected="false" onClick={onSwitchToLogin}>Đăng nhập</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">Đăng ký</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="tab-content-5">
                                    <div className="tab-pane fade show active" id="register" role="tabpanel" aria-labelledby="register-tab">
                                        <form onSubmit={handleSubmit}>
                                            {error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {error}
                                                </div>
                                            )}
                                            <div className="form-group">
                                                <label htmlFor="ho_ten">Họ và tên *</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="ho_ten" 
                                                    name="ho_ten" 
                                                    required
                                                    value={formData.ho_ten}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="email">Địa chỉ email *</label>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="email" 
                                                    name="email" 
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="mat_khau">Mật khẩu *</label>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    id="mat_khau" 
                                                    name="mat_khau" 
                                                    required
                                                    value={formData.mat_khau}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="dia_chi">Địa chỉ</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="dia_chi" 
                                                    name="dia_chi" 
                                                    value={formData.dia_chi}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="dien_thoai">Số điện thoại</label>
                                                <input 
                                                    type="tel" 
                                                    className="form-control" 
                                                    id="dien_thoai" 
                                                    name="dien_thoai" 
                                                    value={formData.dien_thoai}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            <div className="form-footer">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-outline-primary-2"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                                            Đang đăng ký...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>ĐĂNG KÝ</span>
                                                            <i className="icon-long-arrow-right"></i>
                                                        </>
                                                    )}
                                                </button>

                                                <div className="custom-control custom-checkbox">
                                                    <input 
                                                        type="checkbox" 
                                                        className="custom-control-input" 
                                                        id="register-policy" 
                                                        required
                                                        disabled={isSubmitting}
                                                    />
                                                    <label className="custom-control-label" htmlFor="register-policy">Tôi đồng ý với <a href="#">chính sách bảo mật</a> *</label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 