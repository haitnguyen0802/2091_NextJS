'use client';

import { useState } from 'react';

interface ForgotPasswordFormProps {
    onCancel: () => void;
    onSuccess: () => void;
}

export default function ForgotPasswordForm({ onCancel, onSuccess }: ForgotPasswordFormProps) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.trim()) {
            setError('Vui lòng nhập địa chỉ email của bạn');
            return;
        }
        
        setIsSubmitting(true);
        setError('');
        
        try {
            const response = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Đã xảy ra lỗi khi gửi yêu cầu');
            }
            
            setMessage(data.message || 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn nếu email tồn tại trong hệ thống.');
            setEmail('');
            
            // Call onSuccess after a delay to show the success message
            setTimeout(() => {
                onSuccess();
            }, 3000);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Đã xảy ra lỗi khi gửi yêu cầu');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-form">
            <h3 className="text-center mb-3">Quên mật khẩu</h3>
            <p className="text-center mb-4">Nhập địa chỉ email của bạn để nhận hướng dẫn đặt lại mật khẩu</p>
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            
            {message && (
                <div className="alert alert-success" role="alert">
                    {message}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="forgot-password-email">Email <span className="text-danger">*</span></label>
                    <input
                        type="email"
                        className="form-control"
                        id="forgot-password-email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-4">
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        <i className="icon-long-arrow-left"></i>
                        <span>Quay lại</span>
                    </button>
                    
                    <button
                        type="submit"
                        className="btn btn-primary btn-sm"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Đang xử lý...
                            </>
                        ) : 'Gửi yêu cầu'}
                    </button>
                </div>
            </form>
        </div>
    );
} 