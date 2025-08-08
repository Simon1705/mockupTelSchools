'use client';

import { useAuth } from '@/components/providers';
import { LoginForm } from '@/components/auth/login-form';
import { Dashboard } from '@/components/dashboard/dashboard';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <Dashboard />;
}