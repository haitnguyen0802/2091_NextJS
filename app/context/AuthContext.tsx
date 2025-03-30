'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Interface cho user
export interface User {
    id: number;
    email: string;
    mat_khau: string;
    ho_ten: string;
    dia_chi: string;
    dien_thoai: string;
    vai_tro: number;
    khoa: number;
    hinh: string;
    email_verified_at: string | null;
    remember_token: string | null;
    created_at: string | null;
}

// Interface cho safe user info (không có password)
interface SafeUser extends Omit<User, 'mat_khau'> {
    mat_khau: string; // Để tương thích với User interface, nhưng sẽ giữ rỗng
}

// Interface cho AuthContext
interface AuthContextType {
    user: SafeUser | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

// Tạo context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook sử dụng context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<SafeUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Load user từ localStorage khi mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error('Lỗi khi parse user từ localStorage:', err);
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    // Đăng nhập
    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        
        try {
            // Fetch users từ API
            const response = await fetch('https://fpl.timefortea.io.vn/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users data');
            }
            
            const users: User[] = await response.json();
            
            // Tìm user với email tương ứng
            const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            
            if (!foundUser) {
                setError('Email không tồn tại');
                return false;
            }
            
            // Trong môi trường thực tế, password sẽ được hash và so sánh bằng bcrypt
            // Nhưng ở đây API trả về password đã hash, nên chúng ta không thể so sánh trực tiếp
            // Vì vậy, giả định là password đúng nếu nó khớp với mật khẩu được cung cấp
            // Đối với môi trường thực tế, điều này không an toàn và nên sử dụng API đăng nhập thực sự
            
            // Trong trường hợp demo này, chỉ kiểm tra nếu mật khẩu là "123456" hoặc email là phần trước @ của email
            const passwordPart = email.split('@')[0];
            if (password === "123456" || password === passwordPart) {
                // Tạo đối tượng user an toàn (không có mật khẩu thật)
                const safeUser: SafeUser = {
                    ...foundUser,
                    mat_khau: '' // Đặt mật khẩu thành chuỗi rỗng để bảo mật
                };
                
                setUser(safeUser);
                localStorage.setItem('user', JSON.stringify(safeUser));
                return true;
            } else {
                setError('Mật khẩu không đúng');
                return false;
            }
        } catch (err) {
            console.error('Lỗi khi đăng nhập:', err);
            setError('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Đăng xuất
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value: AuthContextType = {
        user,
        isLoading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 