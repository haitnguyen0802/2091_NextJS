'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

interface UserType {
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

interface AuthContextType {
    isAuthenticated: boolean;
    user: UserType | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Custome lại hook để kiểm tra đăng nhập từ AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuthState = async () => {
            setLoading(true);
            try {
                const userData = localStorage.getItem('user');
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    
                    const response = await fetch('https://fpl.timefortea.io.vn/api/users');
                    if (!response.ok) {
                        throw new Error('Failed to validate user session');
                    }
                    
                    const users = await response.json();
                    const currentUser = users.find((u: UserType) => u.email === parsedUser.email);
                    
                    if (currentUser) {
                        setUser(currentUser);
                        setIsAuthenticated(true);
                    } else {
                        localStorage.removeItem('user');
                        setIsAuthenticated(false);
                        setUser(null);
                    }
                }
            } catch (err) {
                console.error('Error checking auth state:', err);
                setError(err instanceof Error ? err.message : 'Authentication error');
                localStorage.removeItem('user');
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthState();
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch('https://fpl.timefortea.io.vn/api/users');
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            
            const users = await response.json();
            
            const user = users.find((u: UserType) => u.email === email);
            
            if (!user) {
                setError('Email hoặc mật khẩu không đúng');
                return false;
            }
            
            // Check if email is verified
            if (!user.email_verified_at) {
                setError('Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản.');
                return false;
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.mat_khau);
            
            if (!isPasswordValid) {
                setError('Email hoặc mật khẩu không đúng');
                return false;
            }
            
            setUser(user);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(user));
            
            return true;
        } catch (err) {
            console.error('Login error:', err);
            setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        router.push('/');
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
        loading,
        error
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 