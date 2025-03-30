'use client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATHS } from '../public/constants/paths';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.PRODUCTS} element={<ProductPage />} />
          <Route path={PATHS.PRODUCT_DETAIL} element={<ProductDetailPage />} />
          <Route path={PATHS.CART} element={<CartPage />} />
          <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
          <Route path={PATHS.CHECKOUT_SUCCESS} element={<CheckoutSuccess />} />
          <Route path={PATHS.DASHBOARD} element={<Dashboard/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
} 