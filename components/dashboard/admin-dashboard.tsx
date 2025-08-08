'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { useAuth } from '@/components/providers';
import { DashboardOverview } from './dashboard-overview';
import { PolicyManagement } from './policy-management';
import { ApprovalWorkflow } from './approval-workflow';
import { VersionManagement } from './version-management';
import { Analytics } from './analytics';
import { UserManagement } from './user-management';
import { AuditTrail } from './audit-trail';
import { Settings } from './settings';

export function AdminDashboard() {
  const { user } = useAuth();
  const [activeMenuItem, setActiveMenuItem] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('activeMenuItem') || 'dashboard';
    }
    return 'dashboard';
  });

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'dashboard':
        return <DashboardOverview onMenuItemChange={setActiveMenuItem} />;
      case 'policies':
        return <PolicyManagement />;
      case 'approval':
        return <ApprovalWorkflow />;
      case 'versions':
        return <VersionManagement />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <UserManagement />;
      case 'audit':
        return <AuditTrail />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview onMenuItemChange={setActiveMenuItem} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeMenuItem={activeMenuItem}
        onMenuItemChange={setActiveMenuItem}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}