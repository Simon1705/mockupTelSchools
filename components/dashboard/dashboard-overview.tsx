'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { 
  Eye, 
  FileText, 
  Users, 
  CheckSquare, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Activity,
  BarChart3
} from 'lucide-react';

interface DashboardOverviewProps {
  onMenuItemChange?: (menuItem: string) => void;
}

interface PolicyDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  lastUpdated: string;
  views: number;
  downloads: number;
  content: string;
  attachments: string[];
}

export function DashboardOverview({ onMenuItemChange }: DashboardOverviewProps) {
  const router = useRouter();

  // Statistics data
  const stats = [
    {
      title: 'Total Kebijakan',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Menunggu Persetujuan',
      value: '23',
      change: '+5',
      changeType: 'negative',
      icon: CheckSquare,
      color: 'bg-yellow-500'
    },
    {
      title: 'Pengguna Aktif',
      value: '892',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Aktivitas Hari Ini',
      value: '156',
      change: '+15%',
      changeType: 'positive',
      icon: Activity,
      color: 'bg-purple-500'
    }
  ];

  // Popular policies
  const topPolicies = [
    {
      id: '1',
      title: 'Kebijakan Penggunaan Teknologi Informasi',
      category: 'Teknologi',
      views: 1247,
      status: 'Aktif'
    },
    {
      id: '2',
      title: 'Pedoman Keamanan Data Siswa',
      category: 'Keamanan',
      views: 892,
      status: 'Aktif'
    },
    {
      id: '3',
      title: 'Prosedur Pembelajaran Daring',
      category: 'Pendidikan',
      views: 756,
      status: 'Aktif'
    },
    {
      id: '4',
      title: 'Kebijakan Penggunaan Media Sosial',
      category: 'Komunikasi',
      views: 634,
      status: 'Aktif'
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: '1',
      action: 'Kebijakan baru ditambahkan',
      title: 'Pedoman Pembelajaran Hybrid',
      user: 'Admin Sistem',
      time: '2 jam yang lalu',
      type: 'create'
    },
    {
      id: '2',
      action: 'Kebijakan diperbarui',
      title: 'Prosedur Keamanan Kampus',
      user: 'Editor IT',
      time: '4 jam yang lalu',
      type: 'update'
    },
    {
      id: '3',
      action: 'Persetujuan disetujui',
      title: 'Kebijakan Penggunaan Lab Komputer',
      user: 'Approver Senior',
      time: '6 jam yang lalu',
      type: 'approve'
    },
    {
      id: '4',
      action: 'Dokumen diunduh',
      title: 'Manual Prosedur Administrasi',
      user: 'Guru Matematika',
      time: '8 jam yang lalu',
      type: 'download'
    }
  ];

  // Policy details for modal
  const policyDetails: PolicyDetail[] = [
    {
      id: '1',
      title: 'Kebijakan Penggunaan Teknologi Informasi',
      description: 'Kebijakan ini mengatur penggunaan teknologi informasi di lingkungan sekolah untuk mendukung proses pembelajaran dan administrasi.',
      category: 'Teknologi',
      status: 'Aktif',
      lastUpdated: '2024-01-15',
      views: 1247,
      downloads: 89,
      content: 'Kebijakan ini mengatur penggunaan teknologi informasi di lingkungan sekolah untuk mendukung proses pembelajaran dan administrasi. Semua pengguna teknologi informasi di sekolah harus mematuhi kebijakan ini.',
      attachments: ['Manual_TI.pdf', 'Prosedur_Keamanan.pdf']
    }
  ];

  const handleViewPolicy = (policyId: string) => {
    router.push(`/policy/${policyId}`);
  };

  const handleViewAllApprovals = () => {
    if (onMenuItemChange) {
      onMenuItemChange('approval');
    }
  };

  const handleViewAuditTrail = () => {
    if (onMenuItemChange) {
      onMenuItemChange('audit');
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create':
        return <FileText className="h-4 w-4 text-green-600" />;
      case 'update':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'approve':
        return <CheckSquare className="h-4 w-4 text-green-600" />;
      case 'download':
        return <TrendingUp className="h-4 w-4 text-purple-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Selamat Datang di Sistem Manajemen Kebijakan</h1>
        <p className="text-blue-100">Kelola dan pantau kebijakan sekolah dengan mudah dan efisien</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">dari bulan lalu</span>
                  </div>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Unified Dashboard Content */}
      <div className="space-y-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Menunggu Persetujuan</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleViewAllApprovals}>
                  Lihat Semua
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPolicies.slice(0, 3).map((policy) => (
                  <div key={policy.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{policy.title}</h4>
                      <p className="text-xs text-gray-500">{policy.category}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{policy.status}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewPolicy(policy.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleViewAuditTrail}>
                  Lihat Semua
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600 truncate">{activity.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.user}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan Cepat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 rounded-lg p-2">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Total Kebijakan</p>
                      <p className="text-xs text-gray-500">Aktif hari ini</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">1,247</p>
                    <p className="text-xs text-green-600">+12%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-500 rounded-lg p-2">
                      <CheckSquare className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Pending Approval</p>
                      <p className="text-xs text-gray-500">Menunggu review</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-yellow-600">23</p>
                    <p className="text-xs text-red-600">+5</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500 rounded-lg p-2">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Pengguna Aktif</p>
                      <p className="text-xs text-gray-500">Hari ini</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">892</p>
                    <p className="text-xs text-green-600">+8%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Policies Section */}
        <Card>
          <CardHeader>
            <CardTitle>Kebijakan Terpopuler</CardTitle>
            <CardDescription>Kebijakan yang paling sering diakses dalam 30 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topPolicies.map((policy, index) => (
                <div key={policy.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 rounded-lg p-2">
                      <span className="text-lg font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{policy.title}</h4>
                      <p className="text-sm text-gray-500">{policy.category}</p>
                      <p className="text-xs text-gray-400">{policy.views} kali dilihat</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{policy.status}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewPolicy(policy.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline Activities Section */}
        <Card>
          <CardHeader>
            <CardTitle>Timeline Aktivitas</CardTitle>
            <CardDescription>Riwayat aktivitas terbaru dalam sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivities.map((activity, index) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    {index < recentActivities.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {getActivityIcon(activity.type)}
                      <h4 className="font-medium">{activity.action}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.title}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-gray-500">{activity.user}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>


    </div>
  );
}
