'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, Users, Activity, Clock, BarChart3 } from 'lucide-react';

export function Analytics() {
  const topPolicies = [
    { id: '1', title: 'Kebijakan Pembelajaran Hybrid 2024', views: 1247, confirmations: 98 },
    { id: '2', title: 'Protokol Kesehatan dan Keselamatan Kerja', views: 892, confirmations: 87 },
    { id: '3', title: 'Panduan Penggunaan Sistem Informasi Akademik', views: 765, confirmations: 92 },
    { id: '4', title: 'Kebijakan Evaluasi Kinerja Pegawai', views: 634, confirmations: 78 }
  ];

  return (
    <>
      {/* Hero Section - Analytics */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg p-3">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">Pelaporan & Analitik</h1>
                <p className="text-red-100 text-sm md:text-base">Analisis komprehensif tingkat pembacaan, kepatuhan, dan performa kebijakan</p>
                <div className="flex items-center space-x-4 mt-2 text-xs">
                  <span className="flex items-center">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    1,247 total views
                  </span>
                  <span className="flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    892 downloads
                  </span>
                  <span className="flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% pertumbuhan
                  </span>
                </div>
              </div>
            </div>
            <Button 
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Laporan
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-xs text-green-600">+12% dari bulan lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Downloads</p>
                <p className="text-2xl font-bold text-gray-900">892</p>
                <p className="text-xs text-green-600">+8% dari bulan lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Confirmations</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-xs text-green-600">+15% dari bulan lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-xs text-green-600">+12% dari bulan lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
              Tingkat Pembacaan Kebijakan
            </CardTitle>
            <CardDescription>Kebijakan dengan tingkat akses tertinggi bulan ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPolicies.map((policy, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">{policy.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{policy.views} views</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${policy.confirmations}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{policy.confirmations}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              Kepatuhan per Departemen
            </CardTitle>
            <CardDescription>Analisis tingkat kepatuhan berdasarkan departemen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <span className="font-medium">IT Department</span>
                  <p className="text-xs text-gray-500">45 pengguna aktif</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }} />
                  </div>
                  <span className="text-sm font-medium text-green-600">95%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <span className="font-medium">Academic</span>
                  <p className="text-xs text-gray-500">78 pengguna aktif</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '89%' }} />
                  </div>
                  <span className="text-sm font-medium text-blue-600">89%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <span className="font-medium">HR</span>
                  <p className="text-xs text-gray-500">32 pengguna aktif</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '82%' }} />
                  </div>
                  <span className="text-sm font-medium text-yellow-600">82%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Export Laporan</CardTitle>
          <CardDescription>Unduh laporan dalam berbagai format</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
