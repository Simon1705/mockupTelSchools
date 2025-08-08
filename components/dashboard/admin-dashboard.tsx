'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sidebar } from '@/components/layout/sidebar';
import { useAuth } from '@/components/providers';
import {
  FileText,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  BarChart3,
  Activity,
  Shield,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  Hash,
  Upload,
  Save,
  X,
  CheckCircle2,
  XCircle,
  GitBranch,
  Settings,
  UserPlus,
  Mail,
  Archive
} from 'lucide-react';

export function AdminDashboard() {
  const { user } = useAuth();
  const [activeMenuItem, setActiveMenuItem] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('activeMenuItem') || 'dashboard';
    }
    return 'dashboard';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddingPolicy, setIsAddingPolicy] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [showPolicyDetail, setShowPolicyDetail] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<any>(null);
  const [showVersionComparison, setShowVersionComparison] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [showWorkflowDetail, setShowWorkflowDetail] = useState(false);

  const stats = [
    {
      title: 'Total Kebijakan',
      value: '124',
      change: '+8%',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Kebijakan Aktif',
      value: '98',
      change: '+5%',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Menunggu Approval',
      value: '12',
      change: '+3',
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      title: 'Total Pengguna',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  const pendingApprovals = [
    {
      id: '1',
      title: 'Revisi Kebijakan Evaluasi Pembelajaran',
      category: 'Akademik',
      submittedBy: 'Dr. Sarah Johnson',
      submittedDate: '2024-01-15',
      level: 'Level 2',
      priority: 'high',
      policyNumber: 'TEL/AKD/002/2024',
      effectiveDate: '2024-01-20',
      status: 'pending',
      description: 'Revisi kebijakan evaluasi pembelajaran untuk meningkatkan kualitas penilaian siswa.'
    },
    {
      id: '2',
      title: 'Kebijakan Baru: Remote Work Policy',
      category: 'HR',
      submittedBy: 'Ahmad Rizki',
      submittedDate: '2024-01-14',
      level: 'Level 1',
      priority: 'medium',
      policyNumber: 'TEL/HR/001/2024',
      effectiveDate: '2024-02-01',
      status: 'pending',
      description: 'Kebijakan kerja jarak jauh untuk meningkatkan fleksibilitas kerja pegawai.'
    },
    {
      id: '3',
      title: 'Update Protokol Keamanan Data',
      category: 'IT Security',
      submittedBy: 'Linda Wang',
      submittedDate: '2024-01-13',
      level: 'Level 3',
      priority: 'high',
      policyNumber: 'TEL/IT/003/2024',
      effectiveDate: '2024-01-25',
      status: 'pending',
      description: 'Update protokol keamanan data untuk mengatasi ancaman keamanan siber terbaru.'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      action: 'Kebijakan baru diterbitkan',
      details: 'Panduan Pembelajaran Digital v2.0',
      user: 'Admin System',
      timestamp: '2 jam lalu'
    },
    {
      id: '2',
      action: 'Approval diberikan',
      details: 'Kebijakan Evaluasi Semester',
      user: 'Dr. Michael Chen',
      timestamp: '4 jam lalu'
    },
    {
      id: '3',
      action: 'Dokumen diunduh',
      details: 'Protokol Kesehatan K3',
      user: '45 pengguna',
      timestamp: '6 jam lalu'
    }
  ];

  const topPolicies = [
    { id: '1', title: 'Kebijakan Pembelajaran Hybrid 2024', views: 1247, confirmations: 98 },
    { id: '2', title: 'Protokol Kesehatan dan Keselamatan Kerja', views: 892, confirmations: 87 },
    { id: '3', title: 'Panduan Penggunaan Sistem Informasi Akademik', views: 765, confirmations: 92 },
    { id: '4', title: 'Kebijakan Evaluasi Kinerja Pegawai', views: 634, confirmations: 78 }
  ];

  const handleViewPolicy = (policy: any) => {
    setSelectedPolicy(policy);
    setShowPolicyDetail(true);
  };

  const handleClosePolicyDetail = () => {
    setShowPolicyDetail(false);
    setSelectedPolicy(null);
  };

  const handleViewVersionComparison = (version: any) => {
    setSelectedVersion(version);
    setShowVersionComparison(true);
  };

  const handleCloseVersionComparison = () => {
    setShowVersionComparison(false);
    setSelectedVersion(null);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowEditUser(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setShowDeleteUser(true);
  };

  const handleCloseUserDetail = () => {
    setShowUserDetail(false);
    setSelectedUser(null);
  };

  const handleCloseEditUser = () => {
    setShowEditUser(false);
    setSelectedUser(null);
  };

  const handleCloseDeleteUser = () => {
    setShowDeleteUser(false);
    setSelectedUser(null);
  };

  const handleSendEmail = (user: any) => {
    alert(`Email akan dikirim ke ${user.email}`);
  };

  const handleViewWorkflowDetail = (workflow: any) => {
    setSelectedWorkflow(workflow);
    setShowWorkflowDetail(true);
  };

  const handleCloseWorkflowDetail = () => {
    setShowWorkflowDetail(false);
    setSelectedWorkflow(null);
  };

  const renderDashboard = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
        <p className="text-gray-600">Selamat datang kembali, {user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-yellow-600" />
              Menunggu Approval
            </CardTitle>
            <CardDescription>
              Kebijakan yang memerlukan persetujuan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{approval.title}</h4>
                    <Badge variant={approval.priority === 'high' ? 'destructive' : 'secondary'}>
                      {approval.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{approval.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{approval.submittedBy}</span>
                    <span>{approval.submittedDate}</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Lihat
                    </Button>
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-600" />
              Aktivitas Terbaru
            </CardTitle>
            <CardDescription>
              Aktivitas terbaru dalam sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">{activity.user}</span>
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Policies */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
            Kebijakan Terpopuler
          </CardTitle>
          <CardDescription>
            Kebijakan dengan tingkat konfirmasi tertinggi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPolicies.map((policy, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">{policy.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{policy.views} views</Badge>
                    <Button size="sm" variant="outline" onClick={() => handleViewPolicy(policy)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={policy.confirmations} className="flex-1" />
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
            <BarChart3 className="mr-2 h-5 w-5 text-purple-600" />
            Ringkasan Kepatuhan
          </CardTitle>
          <CardDescription>
            Tingkat konfirmasi pembacaan kebijakan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
              <p className="text-sm text-gray-600">Rata-rata tingkat kepatuhan</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">IT Department</span>
                <div className="flex items-center space-x-2">
                  <Progress value={95} className="w-20" />
                  <span className="text-xs text-gray-500">95%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Academic</span>
                <div className="flex items-center space-x-2">
                  <Progress value={89} className="w-20" />
                  <span className="text-xs text-gray-500">89%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">HR</span>
                <div className="flex items-center space-x-2">
                  <Progress value={82} className="w-20" />
                  <span className="text-xs text-gray-500">82%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Finance</span>
                <div className="flex items-center space-x-2">
                  <Progress value={78} className="w-20" />
                  <span className="text-xs text-gray-500">78%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderPolicyManagement = () => (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Kebijakan</h1>
          <p className="text-gray-600">Kelola semua kebijakan perusahaan</p>
        </div>
        <Button onClick={() => setIsAddingPolicy(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Kebijakan
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Cari Kebijakan</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Cari kebijakan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Kategori</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="akademik">Akademik</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="keuangan">Keuangan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Arsip</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Kebijakan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Efektif</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.title}</TableCell>
                  <TableCell>Akademik</TableCell>
                  <TableCell>
                    <Badge variant="default">Aktif</Badge>
                  </TableCell>
                  <TableCell>2024-01-15</TableCell>
                  <TableCell>{policy.views}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewPolicy(policy)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );

  const renderApprovalWorkflow = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Workflow Approval</h1>
        <p className="text-gray-600">Kelola proses approval kebijakan</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Approval</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kebijakan</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingApprovals.map((approval) => (
                <TableRow key={approval.id}>
                  <TableCell className="font-medium">{approval.title}</TableCell>
                  <TableCell>{approval.level}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Menunggu</Badge>
                  </TableCell>
                  <TableCell>{approval.effectiveDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewWorkflowDetail(approval)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );

  const renderVersionManagement = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Versi</h1>
        <p className="text-gray-600">Kelola versi kebijakan</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Versi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kebijakan</TableHead>
                <TableHead>Versi</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Perubahan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Kebijakan Pembelajaran Hybrid</TableCell>
                <TableCell>v2.1</TableCell>
                <TableCell>2024-01-15</TableCell>
                <TableCell>Revisi major</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => handleViewVersionComparison({})}>
                    <GitBranch className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );

  const renderAnalytics = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Analisis data kebijakan</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Statistik Kebijakan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Kebijakan</span>
                <span className="font-bold">124</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Kebijakan Aktif</span>
                <span className="font-bold text-green-600">98</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Menunggu Approval</span>
                <span className="font-bold text-yellow-600">12</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kepatuhan Departemen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>IT Department</span>
                <Progress value={95} className="w-20" />
              </div>
              <div className="flex justify-between items-center">
                <span>Academic</span>
                <Progress value={89} className="w-20" />
              </div>
              <div className="flex justify-between items-center">
                <span>HR</span>
                <Progress value={82} className="w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderUserManagement = () => (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Pengguna</h1>
          <p className="text-gray-600">Kelola pengguna sistem</p>
        </div>
        <Button onClick={() => setIsAddingUser(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Dr. Sarah Johnson</TableCell>
                <TableCell>sarah.johnson@telkomschools.sch.id</TableCell>
                <TableCell>
                  <Badge variant="default">Admin</Badge>
                </TableCell>
                <TableCell>Manajemen Kebijakan</TableCell>
                <TableCell>
                  <Badge variant="default">Aktif</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewUser({})}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditUser({})}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteUser({})}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );

  const renderAuditTrail = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Trail</h1>
        <p className="text-gray-600">Riwayat aktivitas sistem</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log Aktivitas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Aktivitas</TableHead>
                <TableHead>Detail</TableHead>
                <TableHead>Tipe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2024-01-15 10:30:00</TableCell>
                <TableCell>Dr. Sarah Johnson</TableCell>
                <TableCell>Membuat kebijakan baru</TableCell>
                <TableCell>Kebijakan Pembelajaran Hybrid 2024</TableCell>
                <TableCell>
                  <Badge variant="default">Create</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );

  const renderSettings = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengaturan</h1>
        <p className="text-gray-600">Konfigurasi sistem</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Umum</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications">Notifikasi Email</Label>
                <p className="text-sm text-gray-600">Kirim notifikasi via email</p>
              </div>
              <Switch id="notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-approval">Auto Approval</Label>
                <p className="text-sm text-gray-600">Otomatis approve kebijakan level rendah</p>
              </div>
              <Switch id="auto-approval" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keamanan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Wajib 2FA untuk admin</p>
              </div>
              <Switch id="two-factor" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="session-timeout">Session Timeout</Label>
                <p className="text-sm text-gray-600">Auto logout setelah 30 menit</p>
              </div>
              <Switch id="session-timeout" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeMenuItem={activeMenuItem}
        onMenuItemChange={setActiveMenuItem}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeMenuItem === 'dashboard' && renderDashboard()}
          {activeMenuItem === 'policies' && renderPolicyManagement()}
          {activeMenuItem === 'approval' && renderApprovalWorkflow()}
          {activeMenuItem === 'versions' && renderVersionManagement()}
          {activeMenuItem === 'analytics' && renderAnalytics()}
          {activeMenuItem === 'users' && renderUserManagement()}
          {activeMenuItem === 'audit' && renderAuditTrail()}
          {activeMenuItem === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
}