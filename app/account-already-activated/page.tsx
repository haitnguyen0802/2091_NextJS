'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { PATHS } from '@/public/constants/paths';
import BreadCrumb from '../components/BreadCrumb';

export default function AccountAlreadyActivated() {
    return (
        <div className="page-wrapper">
            <Header />
            
            <main className="main">
                <BreadCrumb title="Tài khoản đã được kích hoạt" />

                <div className="page-content">
                    <div className="container">
                        <div className="row justify-content-center mt-5 mb-5">
                            <div className="col-md-8 text-center">
                                <div className="card border-0 shadow-sm p-5">
                                    <div className="icon-box mb-4">
                                        <span className="icon-box-icon" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                                            <i className="icon-info-circle" style={{ fontSize: '70px', color: '#17a2b8' }}></i>
                                        </span>
                                        <div className="icon-box-content">
                                            <h2 className="icon-box-title">Tài khoản đã được kích hoạt trước đó!</h2>
                                            <p className="lead">Tài khoản của bạn đã được kích hoạt rồi. Bạn có thể đăng nhập ngay bây giờ.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="alert alert-info mt-3">
                                        <p>Vui lòng đăng nhập để tiếp tục sử dụng tài khoản của bạn.</p>
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