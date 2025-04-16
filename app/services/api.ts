import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Quản lý API Đăng Nhập / Đăng Ký 
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),

  register: (userData: {
    email: string;
    password: string;
    ho_ten: string;
    dia_chi: string;
    dien_thoai: string;
  }) => apiClient.post('/auth/register', userData),

  logout: () => apiClient.post('/auth/logout'),

  getProfile: () => apiClient.get('/auth/profile'),

  updateProfile: (userData: {
    ho_ten?: string;
    dia_chi?: string;
    dien_thoai?: string;
    hinh?: string;
  }) => apiClient.put('/auth/profile', userData),

  changePassword: (data: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }) => apiClient.put('/auth/change-password', data),
};

// Quản lý API sản phẩm 
export const productAPI = {
  getProducts: (params?: {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
  }) => apiClient.get('/products', { params }),

  getProductById: (id: number) => apiClient.get(`/products/${id}`),

  getProductBySlug: (slug: string) => apiClient.get(`/products/slug/${slug}`),

  getProductsByCategory: (categoryId: number, params?: {
    page?: number;
    limit?: number;
    sort?: string;
  }) => apiClient.get(`/categories/${categoryId}/products`, { params }),

  searchProducts: (query: string) => apiClient.get(`/products/search?q=${query}`),
};

// Quản lý API danh mục sản phẩm 
export const categoryAPI = {
  getCategories: () => apiClient.get('/categories'),

  getCategoryById: (id: number) => apiClient.get(`/categories/${id}`),
};

// Quản lý Giỏ hàng & API Giỏ hàng 
export const cartAPI = {
  getCart: () => apiClient.get('/cart'),

  addToCart: (productId: number, quantity: number) =>
    apiClient.post('/cart/items', { product_id: productId, quantity }),

  updateCartItem: (itemId: number, quantity: number) =>
    apiClient.put(`/cart/items/${itemId}`, { quantity }),

  removeCartItem: (itemId: number) => apiClient.delete(`/cart/items/${itemId}`),

  clearCart: () => apiClient.delete('/cart'),
};

// Quản lý API Đơn hàng và liên quan đến Check Out
export const orderAPI = {
  createOrder: (orderData: {
    shipping_address: string;
    phone: string;
    items: Array<{ product_id: number; quantity: number }>;
    payment_method: string;
  }) => apiClient.post('/orders', orderData),

  getOrders: () => apiClient.get('/orders'),

  getOrderById: (id: number) => apiClient.get(`/orders/${id}`),
};

export default apiClient; 