'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { PATHS } from '@/public/constants/paths';
import BreadCrumb from '../components/BreadCrumb';
import { useSearchParams } from 'next/navigation';

export default function ActivationError() {
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState('Đã xảy ra lỗi khi kích hoạt tài khoản của bạn. Liên kết kích hoạt có thể đã hết hạn hoặc không hợp lệ.');
    
    useEffect(() => {
        const errorType = searchParams.get('error');
        
        if (errorType === 'missing-params') {
            setErrorMessage('Liên kết kích hoạt không hợp lệ. Thiếu các thông số cần thiết để kích hoạt tài khoản.');
        } else if (errorType === 'unexpected') {
            setErrorMessage('Đã xảy ra lỗi không mong muốn trong quá trình kích hoạt tài khoản. Vui lòng thử lại sau hoặc liên hệ bộ phận hỗ trợ.');
        } else if (errorType === 'invalid-id') {
            setErrorMessage('ID người dùng trong liên kết kích hoạt không hợp lệ. Vui lòng kiểm tra lại email kích hoạt.');
        } else if (errorType === 'user-not-found') {
            setErrorMessage('Không tìm thấy tài khoản người dùng. Tài khoản có thể đã bị xóa hoặc liên kết đã hết hạn.');
        }
    }, [searchParams]);

    return (
        <div className="page-wrapper">
            <Header />
            
            <main className="main">
                <BreadCrumb title="Kích hoạt tài khoản thất bại" />

                <div className="page-content">
                    <div className="container">
                        <div className="row justify-content-center mt-5 mb-5">
                            <div className="col-md-8 text-center">
                                <div className="card border-0 shadow-sm p-5">
                                    <div className="icon-box mb-4">
                                        <span className="icon-box-icon" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                                            <i className="icon-times-circle" style={{ fontSize: '70px', color: '#dc3545' }}></i>
                                        </span>
                                        <div className="icon-box-content">
                                            <h2 className="icon-box-title">Kích hoạt tài khoản thất bại</h2>
                                            <p className="lead">{errorMessage}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 d-flex justify-content-center">
                                        <Link href={PATHS.HOME} className="btn btn-outline-primary-2 mr-3">
                                            <span>Trang chủ</span>
                                            <i className="icon-long-arrow-right"></i>
                                        </Link>
                                        <Link href={PATHS.CONTACT} className="btn btn-primary">
                                            <span>Liên hệ hỗ trợ</span>
                                            <i className="icon-envelope"></i>
                                        </Link>
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