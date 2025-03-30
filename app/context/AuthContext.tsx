'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Use the same user interface as in UserContext
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

// Interface cho AuthContext
interface AuthContextType {
    isAuthenticated: boolean;
    user: UserType | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
    error: string | null;
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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Check if user is already logged in on component mount
    useEffect(() => {
        const checkAuthState = async () => {
            setLoading(true);
            try {
                // Check if there's user data in localStorage
                const userData = localStorage.getItem('user');
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    
                    // Verify the user data is still valid by fetching from API
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
                        // User not found in the API response
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
            // Call API to get all users
            const response = await fetch('https://fpl.timefortea.io.vn/api/users');
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            
            const users = await response.json();
            
            // Find user with matching email
            const user = users.find((u: UserType) => u.email === email);
            
            if (!user) {
                setError('Invalid email or password');
                return false;
            }
            
            // In a real app, you'd verify the password hash on the server
            // Here we're simplifying by just checking if password matches
            // This is not secure for production
            if (user.mat_khau !== password) {
                setError('Invalid email or password');
                return false;
            }
            
            // Save user to state and localStorage
            setUser(user);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(user));
            
            return true;
        } catch (err) {
            console.error('Login error:', err);
            setError(err instanceof Error ? err.message : 'Failed to login');
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