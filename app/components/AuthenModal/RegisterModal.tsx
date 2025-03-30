'use client';

import React, { useState } from 'react';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Trong môi trường thực tế, đây sẽ gọi API đăng ký
            // Nhưng vì bài tập này chỉ demo, ta chỉ giả lập thành công
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
            onSwitchToLogin();
        } catch (error) {
            setError('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
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
                                                <label htmlFor="register-name">Your name *</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="register-name" 
                                                    name="register-name" 
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-email">Your email address *</label>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="register-email" 
                                                    name="register-email" 
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-password">Password *</label>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    id="register-password" 
                                                    name="register-password" 
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
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
                                                            Registering...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>SIGN UP</span>
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
                                                    <label className="custom-control-label" htmlFor="register-policy">I agree to the <a href="#">privacy policy</a> *</label>
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