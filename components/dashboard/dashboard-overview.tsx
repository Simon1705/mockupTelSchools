'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Activity,
  BarChart3,
  X,
  Calendar,
  User,
  FileCheck,
  Download,
  Share2,
  Hash
} from 'lucide-react';

interface PolicyDetail {
  id: string;
  title: string;
  category: string;
  submittedBy: string;
  submittedDate: string;
  level: string;
  priority: string;
  policyNumber: string;
  effectiveDate: string;
  status: string;
  description: string;
  content: string;
  attachments: string[];
  approvers: {
    name: string;
    role: string;
    department: string;
    status: 'approved' | 'pending' | 'rejected';
    date?: string;
    comment?: string;
  }[];
  version: string;
  lastModified: string;
  views: number;
  confirmations: number;
}

interface DashboardOverviewProps {
  onMenuItemChange?: (menuItem: string) => void;
}

export function DashboardOverview({ onMenuItemChange }: DashboardOverviewProps) {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyDetail | null>(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

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

  // Dummy data untuk detail kebijakan
  const policyDetails: PolicyDetail[] = [
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
      description: 'Revisi kebijakan evaluasi pembelajaran untuk meningkatkan kualitas penilaian siswa.',
      content: `# Revisi Kebijakan Evaluasi Pembelajaran

## Latar Belakang
Kebijakan ini dibuat untuk meningkatkan kualitas evaluasi pembelajaran di Telkom Schools dengan mengadopsi metode penilaian yang lebih komprehensif dan objektif.

## Tujuan
1. Meningkatkan akurasi penilaian siswa
2. Memberikan feedback yang lebih konstruktif
3. Mengembangkan sistem evaluasi yang berkelanjutan

## Ruang Lingkup
Kebijakan ini berlaku untuk semua guru dan staf akademik di Telkom Schools.

## Implementasi
- Evaluasi formatif dan sumatif
- Penilaian berbasis proyek
- Sistem feedback berkelanjutan
- Pelatihan guru untuk implementasi

## Monitoring dan Evaluasi
Evaluasi kebijakan akan dilakukan setiap semester untuk memastikan efektivitas implementasi.`,
      attachments: [
        'Lampiran_A_Panduan_Evaluasi.pdf',
        'Lampiran_B_Format_Penilaian.docx',
        'Lampiran_C_Contoh_Rubrik.xlsx'
      ],
      approvers: [
        {
          name: 'Dr. Michael Chen',
          role: 'Kepala Bagian Akademik',
          department: 'Akademik',
          status: 'approved',
          date: '2024-01-14',
          comment: 'Setuju dengan revisi, evaluasi lebih komprehensif'
        },
        {
          name: 'Prof. Lisa Anderson',
          role: 'Wakil Kepala Sekolah',
          department: 'Manajemen',
          status: 'pending'
        },
        {
          name: 'Dr. Robert Kim',
          role: 'Kepala Sekolah',
          department: 'Manajemen',
          status: 'pending'
        }
      ],
      version: '2.1',
      lastModified: '2024-01-15',
      views: 1247,
      confirmations: 98
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
      description: 'Kebijakan kerja jarak jauh untuk meningkatkan fleksibilitas kerja pegawai.',
      content: `# Remote Work Policy

## Tujuan
Memberikan fleksibilitas kerja sambil mempertahankan produktivitas dan kolaborasi tim.

## Kriteria Remote Work
- Pekerjaan yang dapat dilakukan dari jarak jauh
- Ketersediaan infrastruktur teknologi
- Kesepakatan dengan atasan langsung

## Hak dan Tanggung Jawab
### Karyawan
- Menjaga produktivitas kerja
- Tersedia untuk komunikasi virtual
- Mengikuti jadwal kerja yang disepakati

### Perusahaan
- Menyediakan infrastruktur teknologi
- Memberikan dukungan teknis
- Memastikan keamanan data

## Implementasi
- Pilot program 3 bulan
- Evaluasi berkala
- Penyesuaian berdasarkan feedback`,
      attachments: [
        'Remote_Work_Guidelines.pdf',
        'Technology_Requirements.docx',
        'Communication_Protocol.pdf'
      ],
      approvers: [
        {
          name: 'Linda Wang',
          role: 'HR Manager',
          department: 'HR',
          status: 'pending'
        }
      ],
      version: '1.0',
      lastModified: '2024-01-14',
      views: 892,
      confirmations: 87
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
      description: 'Update protokol keamanan data untuk mengatasi ancaman keamanan siber terbaru.',
      content: `# Update Protokol Keamanan Data

## Latar Belakang
Peningkatan ancaman keamanan siber memerlukan update protokol keamanan data yang lebih ketat.

## Perubahan Utama
1. Implementasi Multi-Factor Authentication (MFA)
2. Enkripsi data end-to-end
3. Regular security audit
4. Employee security training

## Implementasi
- Phase 1: MFA Implementation (2 minggu)
- Phase 2: Data Encryption (1 bulan)
- Phase 3: Security Training (2 bulan)
- Phase 4: Audit & Monitoring (Ongoing)

## Compliance
- ISO 27001 standards
- GDPR compliance
- Local data protection laws`,
      attachments: [
        'Security_Protocol_v2.1.pdf',
        'MFA_Implementation_Guide.pdf',
        'Security_Training_Materials.zip'
      ],
      approvers: [
        {
          name: 'John Smith',
          role: 'IT Security Manager',
          department: 'IT',
          status: 'approved',
          date: '2024-01-12',
          comment: 'Protocol sudah sesuai standar keamanan terbaru'
        },
        {
          name: 'Dr. Robert Kim',
          role: 'Kepala Sekolah',
          department: 'Manajemen',
          status: 'pending'
        }
      ],
      version: '2.1',
      lastModified: '2024-01-13',
      views: 765,
      confirmations: 92
    }
  ];

  const handleViewPolicy = (policyId: string) => {
    const policy = policyDetails.find(p => p.id === policyId);
    if (policy) {
      setSelectedPolicy(policy);
      setShowPolicyModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowPolicyModal(false);
    setSelectedPolicy(null);
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

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
        <p className="text-gray-600">Kelola dan monitor kebijakan perusahaan</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} dari bulan lalu
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-yellow-600" />
              Menunggu Persetujuan
            </CardTitle>
            <CardDescription>
              Kebijakan yang memerlukan review dan approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        {item.title}
                      </h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary">{item.category}</Badge>
                        <Badge variant={item.priority === 'high' ? 'destructive' : 'default'}>
                          {item.level}
                        </Badge>
                        {item.priority === 'high' && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600">
                        Oleh: {item.submittedBy} • {new Date(item.submittedDate).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div className="flex space-x-1 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewPolicy(item.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" onClick={handleViewAllApprovals}>
              Lihat Semua Approval
            </Button>
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
              Log aktivitas sistem terbaru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.details}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.user} • {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" onClick={handleViewAuditTrail}>
              Lihat Audit Trail
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Top Policies and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
              Kebijakan Populer
            </CardTitle>
            <CardDescription>
              Kebijakan dengan tingkat akses tertinggi
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
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewPolicy(policy.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
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
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }} />
                    </div>
                    <span className="text-xs text-gray-500">95%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Academic</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '89%' }} />
                    </div>
                    <span className="text-xs text-gray-500">89%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">HR</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '82%' }} />
                    </div>
                    <span className="text-xs text-gray-500">82%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Finance</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '78%' }} />
                    </div>
                    <span className="text-xs text-gray-500">78%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policy Detail Modal */}
      {showPolicyModal && selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPolicy.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Hash className="h-4 w-4 mr-1" />
                      {selectedPolicy.policyNumber}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Berlaku: {new Date(selectedPolicy.effectiveDate).toLocaleDateString('id-ID')}
                    </span>
                    <Badge variant="secondary">{selectedPolicy.category}</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Policy Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Diajukan Oleh</div>
                    <div className="font-medium">{selectedPolicy.submittedBy}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Versi</div>
                    <div className="font-medium">v{selectedPolicy.version}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Level Approval</div>
                    <div className="font-medium">{selectedPolicy.level}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Status</div>
                    <Badge variant={selectedPolicy.status === 'pending' ? 'secondary' : 'default'}>
                      {selectedPolicy.status === 'pending' ? 'Menunggu Approval' : 'Aktif'}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Statistics */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Statistik Penggunaan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedPolicy.views.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedPolicy.confirmations}%</div>
                      <div className="text-sm text-gray-600">Konfirmasi Pembacaan</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedPolicy.approvers.length}</div>
                      <div className="text-sm text-gray-600">Total Approver</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Isi Kebijakan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      {selectedPolicy.content}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Approval Status */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Status Approval</CardTitle>
                  <CardDescription>Progress approval workflow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedPolicy.approvers.map((approver, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium">{approver.name}</div>
                            <div className="text-sm text-gray-500">{approver.role} • {approver.department}</div>
                          </div>
                        </div>
                        <Badge variant={
                          approver.status === 'approved' ? 'default' :
                          approver.status === 'rejected' ? 'destructive' : 'secondary'
                        }>
                          {approver.status === 'approved' ? 'Disetujui' :
                           approver.status === 'rejected' ? 'Ditolak' : 'Menunggu'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              {selectedPolicy.attachments && selectedPolicy.attachments.length > 0 && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Lampiran</CardTitle>
                    <CardDescription>Dokumen pendukung terkait kebijakan ini</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedPolicy.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <div className="font-medium">{attachment}</div>
                              <div className="text-sm text-gray-500">PDF • ~2.5 MB</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Unduh
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-6 border-t">
                <Button className="flex-1">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button variant="destructive" className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Unduh Kebijakan
                </Button>
                <Button variant="outline" onClick={handleCloseModal}>
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
