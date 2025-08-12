'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers';
import {
  Home,
  FileText,
  Shield,
  Users,
  BarChart3,
  LogOut,
  School,
  Bell,
  Archive,
  Phone,
  User,
  FolderOpen,
  Clock,
  CheckSquare,
  GitBranch,
  Activity
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  activeMenuItem: string;
  onMenuItemChange: (menuItem: string) => void;
}

export function Sidebar({ className, activeMenuItem, onMenuItemChange }: SidebarProps) {
  const { user, logout } = useAuth();

  const userMenuItems = [
    { id: 'dashboard', label: 'Beranda', icon: Home },
    { id: 'policies', label: 'Daftar Kebijakan', icon: FileText },
    { id: 'revoked', label: 'Kebijakan Dicabut', icon: Archive },
    { id: 'contact', label: 'Kontak Admin', icon: Phone },
    { id: 'profile', label: 'Profil Saya', icon: User },
  ];

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'policies', label: 'Manajemen Kebijakan', icon: FileText },
    { id: 'approval', label: 'Approval Workflow', icon: CheckSquare },
    { id: 'versions', label: 'Manajemen Versi', icon: GitBranch },
    { id: 'meetings', label: 'Notulen Rapat', icon: Clock },
    { id: 'analytics', label: 'Pelaporan & Analitik', icon: BarChart3 },
    { id: 'users', label: 'Manajemen Pengguna', icon: Users },
    { id: 'audit', label: 'Audit Trail', icon: Activity },
  ];

  const isAdmin = user?.role === 'admin' || user?.role === 'editor' || user?.role === 'approver';
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const handleItemClick = (itemId: string) => {
    onMenuItemChange(itemId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeMenuItem', itemId);
    }
  };

  return (
    <div className={cn("pb-12 w-64 bg-white border-r border-gray-200", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6">
            <div className="bg-primary rounded-lg p-2 mr-3">
              <School className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Telkom Schools</h2>
              <p className="text-xs text-gray-500">Policy Management</p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3 mb-6">
            <div className="flex items-center">
              <div className="bg-primary rounded-full p-1 mr-2">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {user?.role === 'admin' ? 'Administrator' : 
                   user?.role === 'editor' ? 'Editor' :
                   user?.role === 'approver' ? 'Approver' : 'Pegawai'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeMenuItem === item.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleItemClick(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-3 right-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-gray-900"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Keluar
        </Button>
      </div>
    </div>
  );
}