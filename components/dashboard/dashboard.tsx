'use client';

import { useAuth } from '@/components/providers';
import { AdminDashboard } from './admin-dashboard';
import { UserDashboard } from './user-dashboard';

export function Dashboard() {
  const { user } = useAuth();

  if (user?.role === 'admin' || user?.role === 'editor' || user?.role === 'approver') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}