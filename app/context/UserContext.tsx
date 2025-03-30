'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface UserContextType {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<User | null>;
  updateUser: (id: number, userData: Partial<User>) => Promise<boolean>;
  deleteUser: (id: number) => Promise<boolean>;
  setCurrentUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://fpl.timefortea.io.vn/api/users');
      if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
      }
      const data = await response.json();
      setUsers(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching users:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id: number): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      // First check if we have the user in our state
      const existingUser = users.find(user => user.id === id);
      if (existingUser) {
        return existingUser;
      }
      
      // If not, fetch from API
      const response = await fetch(`https://fpl.timefortea.io.vn/api/users/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching user: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching user:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: number, userData: Partial<User>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://fpl.timefortea.io.vn/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`Error updating user: ${response.statusText}`);
      }
      
      // Update users list
      await fetchUsers();
      
      // Update current user if it's the same
      if (currentUser && currentUser.id === id) {
        setCurrentUser({ ...currentUser, ...userData });
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error updating user:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://fpl.timefortea.io.vn/api/users/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error deleting user: ${response.statusText}`);
      }
      
      // Update users list
      setUsers(users.filter(user => user.id !== id));
      
      // Clear current user if it's the same
      if (currentUser && currentUser.id === id) {
        setCurrentUser(null);
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error deleting user:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Initialize data
  useEffect(() => {
    fetchUsers();
  }, []);

  const value = {
    users,
    currentUser,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 