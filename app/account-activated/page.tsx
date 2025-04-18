'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { PATHS } from '@/public/constants/paths';
import BreadCrumb from '../components/BreadCrumb';

export default function AccountActivated() {
    return (
        <div className="page-wrapper">
            <Header />
            
            <main className="main">
                <BreadCrumb title="Kích hoạt tài khoản thành công" />

                <div className="page-content">
                    <div className="container">
                        <div className="row justify-content-center mt-5 mb-5">
                            <div className="col-md-8 text-center">
                                <div className="card border-0 shadow-sm p-5">
                                    <div className="icon-box mb-4">
                                        <span className="icon-box-icon" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                                            <i className="icon-check-circle" style={{ fontSize: '70px', color: '#4CAF50' }}></i>
                                        </span>
                                        <div className="icon-box-content">
                                            <h2 className="icon-box-title">Tài khoản đã được kích hoạt thành công!</h2>
                                            <p className="lead">Cảm ơn bạn đã xác nhận địa chỉ email. Tài khoản của bạn đã được kích hoạt và sẵn sàng sử dụng.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="alert alert-info mt-3">
                                        <p>Bạn có thể đăng nhập ngay bây giờ để truy cập tài khoản của mình và sử dụng đầy đủ các tính năng của hệ thống.</p>
                                    </div>
                                    
                                    <div className="mt-4 d-flex justify-content-center">
                                        <Link href={PATHS.HOME} className="btn btn-outline-primary-2 mr-3">
                                            <span>Trang chủ</span>
                                            <i className="icon-long-arrow-right"></i>
                                        </Link>
                                        <Link href="#signin-modal" className="btn btn-primary" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.querySelector(".top-menu-login")?.dispatchEvent(
                                                    new MouseEvent("click", { bubbles: true })
                                                );
                                            }}>
                                            <span>Đăng nhập</span>
                                            <i className="icon-user"></i>
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