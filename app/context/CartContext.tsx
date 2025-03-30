'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// Kiểu dữ liệu cho sản phẩm
export interface Product {
  id: number;
  ten_sp: string;
  hinh: string;
  gia: number;
  gia_km: number | null;
  quantity?: number;
  slug?: string;
  mo_ta?: string;
  id_loai?: number;
  created_at?: string | null;
  updated_at?: string | null;
}

// Kiểu dữ liệu cho sản phẩm trong giỏ hàng
export interface CartItem {
  id: number;
  ten_sp: string;
  hinh: string;
  gia: number;
  gia_km: number | null;
  quantity: number;
  slug?: string;
}

// Kiểu context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

// Tạo context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook sử dụng context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load từ localStorage khi mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (err) {
        console.error('Lỗi khi parse giỏ hàng từ localStorage:', err);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Lưu vào localStorage khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Thêm sản phẩm
  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);
      const updatedItems = [...prevItems];

      if (existingIndex !== -1) {
        const item = updatedItems[existingIndex];
        updatedItems[existingIndex] = {
          ...item,
          quantity: (item.quantity || 0) + 1,
        };
        return updatedItems;
      }

      const newItem: CartItem = {
        id: product.id,
        ten_sp: product.ten_sp,
        hinh: product.hinh,
        gia: product.gia,
        gia_km: product.gia_km,
        quantity: 1,
        slug: product.slug,
      };
      return [...updatedItems, newItem];
    });
  };

  // Xóa sản phẩm
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Cập nhật số lượng
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  };

  // Tổng tiền
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.gia_km !== null ? item.gia_km : item.gia;
      return total + price * item.quantity;
    }, 0);
  };

  // Tổng số lượng
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
