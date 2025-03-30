'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../components/AuthLogin/LoginForm';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BreadCrumb from '../components/BreadCrumb';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div className="container text-center py-5">Loading...</div>;
  }

  return (
    <>
      <div className="page-wrapper">
        <Header />
        <main className="main">
          <div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
            <div className="container">
              <h1 className="page-title">Login</h1>
            </div>
          </div>
          <BreadCrumb />

          <div className="page-content">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h2 className="title mb-3">Sign In</h2>
                      <LoginForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
} 