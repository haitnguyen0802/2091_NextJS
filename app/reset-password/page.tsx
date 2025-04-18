'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BreadCrumb from '../components/BreadCrumb';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    
    if (!emailParam) {
      setError('Thiếu thông tin email để đặt lại mật khẩu. Vui lòng kiểm tra lại liên kết.');
      return;
    }

    setEmail(emailParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp. Vui lòng kiểm tra lại.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (!email) {
      setError('Thiếu thông tin email để đặt lại mật khẩu');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Không thể đặt lại mật khẩu');
      }

      setSuccess(true);
      
      // Redirect to home page after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Đã xảy ra lỗi khi đặt lại mật khẩu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main">
        <div className="page-header text-center" style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}>
          <div className="container">
            <h1 className="page-title">Đặt lại mật khẩu</h1>
          </div>
        </div>
        <BreadCrumb title="Đặt lại mật khẩu" />

        <div className="page-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card">
                  <div className="card-body p-4">
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}

                    {success ? (
                      <div className="text-center py-4">
                        <div className="icon-box d-inline-flex justify-content-center align-items-center bg-success-light rounded-circle mb-4" style={{ width: '80px', height: '80px' }}>
                          <i className="icon-check text-success" style={{ fontSize: '2rem' }}></i>
                        </div>
                        <h2 className="title mb-3">Đặt lại mật khẩu thành công!</h2>
                        <p className="mb-4">Mật khẩu của bạn đã được cập nhật. Bạn sẽ được chuyển hướng đến trang chủ trong vài giây...</p>
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Đang chuyển hướng...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h2 className="title mb-3">Tạo mật khẩu mới</h2>
                        <p className="mb-4">Nhập mật khẩu mới cho tài khoản của bạn: <strong>{email}</strong></p>
                        
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label htmlFor="reset-password">Mật khẩu mới <span className="text-danger">*</span></label>
                            <input
                              type="password"
                              className="form-control"
                              id="reset-password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                              disabled={isSubmitting}
                              minLength={6}
                            />
                            <small className="form-text text-muted">Mật khẩu phải có ít nhất 6 ký tự</small>
                          </div>

                          <div className="form-group">
                            <label htmlFor="confirm-password">Xác nhận mật khẩu <span className="text-danger">*</span></label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirm-password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                              disabled={isSubmitting}
                            />
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Đang xử lý...
                              </>
                            ) : 'Đặt lại mật khẩu'}
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 