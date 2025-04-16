'use client';

import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Hash the password before sending to API
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(formData.mat_khau, salt);
            
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
            
            alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
            onSwitchToLogin();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
            console.error('Registration error:', error);
        } finally {
            setIsSubmitting(false);
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
                                        <a className="nav-link" id="signin-tab" data-toggle="tab" href="#signin" role="tab" aria-controls="signin" aria-selected="false" onClick={onSwitchToLogin}>Sign In</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">Register</a>
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