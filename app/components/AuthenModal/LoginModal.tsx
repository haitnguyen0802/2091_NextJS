'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login, loading, error } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            onClose();
            // Reset form
            setEmail('');
            setPassword('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show" id="signin-modal" style={{ display: 'block' }} tabIndex={-1} role="dialog" aria-modal="true">
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
                                        <a className="nav-link active" id="signin-tab" data-toggle="tab" href="#signin" role="tab" aria-controls="signin" aria-selected="true">Đăng nhập</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false" onClick={onSwitchToRegister}>Đăng ký</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="tab-content-5">
                                    <div className="tab-pane fade show active" id="signin" role="tabpanel" aria-labelledby="signin-tab">
                                        <form onSubmit={handleSubmit}>
                                            {error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {error}
                                                </div>
                                            )}
                                            <div className="form-group">
                                                <label htmlFor="singin-email">Địa chỉ email *</label>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="singin-email" 
                                                    name="singin-email" 
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    disabled={loading}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="singin-password">Mật khẩu *</label>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    id="singin-password" 
                                                    name="singin-password" 
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    disabled={loading}
                                                />
                                            </div>

                                            <div className="form-footer">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-outline-primary-2"
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                                            Đang đăng nhập...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>ĐĂNG NHẬP</span>
                                                            <i className="icon-long-arrow-right"></i>
                                                        </>
                                                    )}
                                                </button>

                                                <div className="custom-control custom-checkbox">
                                                    <input 
                                                        type="checkbox" 
                                                        className="custom-control-input" 
                                                        id="signin-remember"
                                                        checked={rememberMe}
                                                        onChange={(e) => setRememberMe(e.target.checked)}
                                                        disabled={loading}
                                                    />
                                                    <label className="custom-control-label" htmlFor="signin-remember">Ghi nhớ đăng nhập</label>
                                                </div>

                                                <a href="#" className="forgot-link">Quên mật khẩu?</a>
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