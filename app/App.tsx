'use client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATHS } from '../public/constants/paths';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductPage from './pages/ProductPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.PRODUCTS} element={<ProductPage />} />
          <Route path={PATHS.PRODUCTS_DETAIL} element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
} 