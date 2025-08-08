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
    // Check for stored auth token and validate
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, validate token with backend
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@telkomschools.sch.id',
        role: 'user',
        department: 'IT Department'
      };
      setUser(mockUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, call backend API
    const mockUser: User = {
      id: '1',
      name: email === 'admin@telkomschools.sch.id' ? 'Admin User' : 'John Doe',
      email,
      role: email === 'admin@telkomschools.sch.id' ? 'admin' : 'user',
      department: 'IT Department'
    };
    
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