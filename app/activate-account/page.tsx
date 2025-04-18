'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BreadCrumb from '../components/BreadCrumb';

export default function ActivateAccount() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const userId = searchParams.get('userId');
        const token = searchParams.get('token');

        if (!userId || !token) {
          setStatus('error');
          setErrorMessage('Thiếu thông tin kích hoạt tài khoản. Vui lòng kiểm tra lại đường dẫn.');
          return;
        }

        console.log('Activating account with:', { userId, token });

        // Call the external API with PUT method
        const response = await fetch('http://fpl.timefortea.io.vn/api/users/activate-account/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: parseInt(userId),
            token: token
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Kích hoạt tài khoản thất bại');
        }

        setStatus('success');
      } catch (error) {
        console.error('Activation error:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định');
      }
    };

    activateAccount();
  }, [searchParams]);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main">
        <div className="page-header text-center" style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}>
          <div className="container">
            <h1 className="page-title">Kích hoạt tài khoản</h1>
          </div>
        </div>
        <BreadCrumb title="Kích hoạt tài khoản" />

        <div className="page-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card">
                  <div className="card-body text-center p-5">
                    {status === 'loading' && (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                          <span className="sr-only">Loading...</span>
                        </div>
                        <h3 className="mt-4">Đang kích hoạt tài khoản của bạn</h3>
                        <p className="text-muted">Vui lòng đợi trong giây lát...</p>
                      </div>
                    )}

                    {status === 'success' && (
                      <div className="text-center py-4">
                        <div className="icon-box d-inline-flex justify-content-center align-items-center bg-success-light rounded-circle mb-4" style={{ width: '80px', height: '80px' }}>
                          <i className="icon-check text-success" style={{ fontSize: '2rem' }}></i>
                        </div>
                        <h2 className="title mb-3">Kích hoạt tài khoản thành công!</h2>
                        <p className="mb-4">Chúc mừng! Tài khoản của bạn đã được kích hoạt thành công. Bây giờ bạn có thể đăng nhập và bắt đầu sử dụng dịch vụ của chúng tôi.</p>
                        <Link href="/login" className="btn btn-primary btn-rounded">
                          <span>Đăng nhập ngay</span>
                          <i className="icon-long-arrow-right"></i>
                        </Link>
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="text-center py-4">
                        <div className="icon-box d-inline-flex justify-content-center align-items-center bg-danger-light rounded-circle mb-4" style={{ width: '80px', height: '80px' }}>
                          <i className="icon-close text-danger" style={{ fontSize: '2rem' }}></i>
                        </div>
                        <h2 className="title mb-3">Kích hoạt tài khoản thất bại</h2>
                        <p className="mb-4">{errorMessage || 'Đã xảy ra lỗi khi kích hoạt tài khoản của bạn. Vui lòng thử lại sau hoặc liên hệ với bộ phận hỗ trợ.'}</p>
                        <div className="d-flex justify-content-center gap-2 flex-wrap">
                          <Link href="/" className="btn btn-outline-primary-2 btn-rounded">
                            <i className="icon-long-arrow-left"></i>
                            <span>Về trang chủ</span>
                          </Link>
                          <Link href="/contact" className="btn btn-outline-primary-2 btn-rounded">
                            <span>Liên hệ hỗ trợ</span>
                          </Link>
                        </div>
                      </div>
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