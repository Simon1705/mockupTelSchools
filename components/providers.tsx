'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'editor' | 'approver';
  department: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Always start with no user logged in
    // Remove any existing auth token to ensure fresh start
    localStorage.removeItem('authToken');
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, call backend API
    let mockUser: User;
    
    if (email === 'admin@telkomschools.sch.id' && password === 'admin123') {
      mockUser = {
        id: '1',
        name: 'Admin User',
        email: 'admin@telkomschools.sch.id',
        role: 'admin',
        department: 'IT Department'
      };
    } else if (email === 'user@telkomschools.sch.id' && password === 'user123') {
      mockUser = {
        id: '2',
        name: 'John Doe',
        email: 'user@telkomschools.sch.id',
        role: 'user',
        department: 'IT Department'
      };
    } else {
      // For any other email, create a user account
      mockUser = {
        id: '3',
        name: email.split('@')[0] || 'User',
        email,
        role: 'user',
        department: 'IT Department'
      };
    }
    
    localStorage.setItem('authToken', 'mock-jwt-token');
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}