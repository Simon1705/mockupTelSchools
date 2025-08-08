'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Eye, 
  Crown, 
  X,
  Calendar,
  User,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock as ClockIcon,
  Building,
  Mail,
  Phone,
  MapPin,
  Activity,
  History,
  ArrowRight,
  ArrowLeft,
  Timer,
  Target,
  Info
} from 'lucide-react';
import { useAuth } from '@/components/providers';

interface Approver {
  name: string;
  level: number;
  status: 'approved' | 'pending' | 'waiting' | 'rejected';
  date: string | null;
  role: string;
  department: string;
  comment: string | null;
  responseTime: string | null;
  email?: string;
  phone?: string;
  avatar?: string;
}

interface ApprovalWorkflowItem {
  id: string;
  policyTitle: string;
  submittedBy: string;
  submittedDate: string;
  currentLevel: number;
  totalLevels: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  priority: 'high' | 'medium' | 'low';
  category: string;
  description: string;
  deadline: string;
  approvers: Approver[];
  policyContent?: string;
  attachments?: string[];
  changeLog?: Array<{
    action: string;
    timestamp: string;
    user: string;
    details: string;
  }>;
  timeline?: Array<{
    event: string;
    timestamp: string;
    user: string;
    status: string;
  }>;
}

export function ApprovalWorkflow() {
  const { user } = useAuth();
  const [isViewingDetail, setIsViewingDetail] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<ApprovalWorkflowItem | null>(null);

  // Role-based permission logic
  const canApprove = (approverLevel: number, currentLevel: number) => {
    if (user?.role === 'admin') return true; // Admin can approve at any level
    if (user?.role === 'approver') return approverLevel === currentLevel; // Approver can only approve at their level
    return false; // Editor and Viewer cannot approve
  };

  const canReject = (approverLevel: number, currentLevel: number) => {
    if (user?.role === 'admin') return true; // Admin can reject at any level
    if (user?.role === 'approver') return approverLevel === currentLevel; // Approver can only reject at their level
    return false; // Editor and Viewer cannot reject
  };

  const approvalWorkflow: ApprovalWorkflowItem[] = [
    {
      id: '1',
      policyTitle: 'Revisi Kebijakan Evaluasi Pembelajaran',
      submittedBy: 'Dr. Sarah Johnson',
      submittedDate: '2024-01-15',
      currentLevel: 2,
      totalLevels: 3,
      status: 'pending',
      priority: 'high',
      category: 'Akademik',
      description: 'Revisi sistem evaluasi pembelajaran untuk meningkatkan kualitas penilaian siswa. Kebijakan ini mencakup perubahan dalam metode penilaian, kriteria evaluasi, dan sistem pelaporan yang lebih komprehensif.',
      deadline: '2024-01-22',
      policyContent: `# Revisi Kebijakan Evaluasi Pembelajaran

## Latar Belakang
Sistem evaluasi pembelajaran saat ini memerlukan perbaikan untuk meningkatkan kualitas penilaian siswa dan memberikan feedback yang lebih akurat.

## Tujuan
1. Meningkatkan akurasi penilaian
2. Memberikan feedback yang lebih komprehensif
3. Menstandarisasi proses evaluasi
4. Meningkatkan transparansi penilaian

## Perubahan Utama
- Implementasi sistem penilaian berbasis kompetensi
- Penambahan kriteria evaluasi yang lebih detail
- Peningkatan sistem pelaporan hasil evaluasi
- Pelatihan untuk guru dalam metode penilaian baru

## Implementasi
- Fase 1: Sosialisasi dan pelatihan (2 bulan)
- Fase 2: Implementasi bertahap (3 bulan)
- Fase 3: Evaluasi dan penyesuaian (1 bulan)

## Monitoring
Evaluasi berkala setiap semester untuk memastikan efektivitas implementasi.`,
      attachments: [
        'Revisi_Evaluasi_Pembelajaran_v2.1.pdf',
        'Kriteria_Penilaian_Baru.docx',
        'Sistem_Pelaporan_v2.0.xlsx'
      ],
      changeLog: [
        {
          action: 'Draft Created',
          timestamp: '2024-01-10 09:00:00',
          user: 'Dr. Sarah Johnson',
          details: 'Draft awal kebijakan dibuat'
        },
        {
          action: 'Internal Review',
          timestamp: '2024-01-12 14:30:00',
          user: 'Tim Akademik',
          details: 'Review internal selesai dengan beberapa perbaikan'
        },
        {
          action: 'Submitted for Approval',
          timestamp: '2024-01-15 10:00:00',
          user: 'Dr. Sarah Johnson',
          details: 'Kebijakan diajukan untuk approval'
        }
      ],
      timeline: [
        {
          event: 'Draft Created',
          timestamp: '2024-01-10 09:00:00',
          user: 'Dr. Sarah Johnson',
          status: 'completed'
        },
        {
          event: 'Internal Review',
          timestamp: '2024-01-12 14:30:00',
          user: 'Tim Akademik',
          status: 'completed'
        },
        {
          event: 'Level 1 Approval',
          timestamp: '2024-01-14 16:00:00',
          user: 'Dr. Michael Chen',
          status: 'completed'
        },
        {
          event: 'Level 2 Approval',
          timestamp: '2024-01-15 10:00:00',
          user: 'Prof. Lisa Anderson',
          status: 'pending'
        },
        {
          event: 'Level 3 Approval',
          timestamp: '2024-01-15 10:00:00',
          user: 'Dr. Robert Kim',
          status: 'waiting'
        }
      ],
      approvers: [
        { 
          name: 'Dr. Michael Chen', 
          level: 1, 
          status: 'approved', 
          date: '2024-01-14',
          role: 'Kepala Bagian Akademik',
          department: 'Akademik',
          comment: 'Setuju dengan revisi, evaluasi lebih komprehensif dan sesuai dengan standar pendidikan terkini. Implementasi bertahap sangat tepat untuk memastikan transisi yang lancar.',
          responseTime: '2 jam',
          email: 'michael.chen@telkomschools.sch.id',
          phone: '+62 812-3456-7890',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
        },
        { 
          name: 'Prof. Lisa Anderson', 
          level: 2, 
          status: 'pending', 
          date: null,
          role: 'Wakil Kepala Sekolah',
          department: 'Manajemen',
          comment: null,
          responseTime: null,
          email: 'lisa.anderson@telkomschools.sch.id',
          phone: '+62 813-4567-8901',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
        },
        { 
          name: 'Dr. Robert Kim', 
          level: 3, 
          status: 'waiting', 
          date: null,
          role: 'Kepala Sekolah',
          department: 'Manajemen',
          comment: null,
          responseTime: null,
          email: 'robert.kim@telkomschools.sch.id',
          phone: '+62 814-5678-9012',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
        }
      ]
    }
  ];

  const handleViewDetail = (workflow: ApprovalWorkflowItem) => {
    setSelectedWorkflow(workflow);
    setIsViewingDetail(true);
  };

  const handleCloseModal = () => {
    setIsViewingDetail(false);
    setSelectedWorkflow(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'waiting': return 'bg-gray-400';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Disetujui';
      case 'pending': return 'Menunggu';
      case 'waiting': return 'Antrian';
      case 'rejected': return 'Ditolak';
      default: return 'Unknown';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Prioritas Tinggi';
      case 'medium': return 'Prioritas Sedang';
      case 'low': return 'Prioritas Rendah';
      default: return 'Unknown';
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Approval Workflow</h1>
        <p className="text-gray-600">Kelola proses persetujuan kebijakan</p>
        
        {/* Role Information */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            {user?.role === 'admin' && <Crown className="h-4 w-4 text-yellow-600" />}
            <span className="text-sm font-medium text-gray-700">
              Role Anda: <span className="font-semibold">
                {user?.role === 'admin' ? 'Administrator' :
                 user?.role === 'approver' ? 'Approver' :
                 user?.role === 'editor' ? 'Editor' : 'Viewer'}
              </span>
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {user?.role === 'admin' ? 'Anda dapat approve/reject di semua level' :
             user?.role === 'approver' ? 'Anda dapat approve/reject di level yang sesuai' :
             'Anda hanya dapat melihat status approval'}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {approvalWorkflow.map((workflow) => (
          <Card key={workflow.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-lg">{workflow.policyTitle}</CardTitle>
                    <Badge variant={getPriorityColor(workflow.priority)}>
                      {getPriorityLabel(workflow.priority)}
                    </Badge>
                    <Badge variant="outline">{workflow.category}</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    Diajukan oleh <strong>{workflow.submittedBy}</strong> pada {new Date(workflow.submittedDate).toLocaleDateString('id-ID')}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-2">
                    Level {workflow.currentLevel} dari {workflow.totalLevels}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    Deadline: {new Date(workflow.deadline).toLocaleDateString('id-ID')}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Deskripsi Kebijakan</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{workflow.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Progress Approval</h4>
                  <span className="text-sm text-gray-500">
                    {Math.round((workflow.currentLevel / workflow.totalLevels) * 100)}% Selesai
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(workflow.currentLevel / workflow.totalLevels) * 100}%` }}
                  />
                </div>
              </div>
                
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {workflow.approvers.map((approver, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    approver.status === 'approved' ? 'bg-green-50 border-green-200' :
                    approver.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {approver.status === 'approved' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                        {approver.status === 'pending' && <Clock className="h-4 w-4 text-yellow-600" />}
                        {approver.status === 'waiting' && <Clock className="h-4 w-4 text-gray-400" />}
                        <span className="text-sm font-medium">Level {approver.level}</span>
                        {user?.role === 'admin' && approver.status === 'pending' && (
                          <Crown className="h-3 w-3 text-yellow-600" />
                        )}
                      </div>
                      <Badge variant={
                        approver.status === 'approved' ? 'default' :
                        approver.status === 'pending' ? 'secondary' : 'outline'
                      } className="text-xs">
                        {getStatusLabel(approver.status)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{approver.name}</p>
                        <p className="text-xs text-gray-600">{approver.role}</p>
                        <p className="text-xs text-gray-500">{approver.department}</p>
                      </div>
                      
                      {approver.status === 'pending' && canApprove(approver.level, workflow.currentLevel) && (
                        <div className="flex space-x-1 mt-3 pt-2 border-t border-gray-200">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Setujui
                          </Button>
                          <Button size="sm" variant="destructive" className="text-xs">
                            <XCircle className="h-3 w-3 mr-1" />
                            Tolak
                          </Button>
                        </div>
                      )}
                      
                      {approver.status === 'pending' && !canApprove(approver.level, workflow.currentLevel) && (
                        <div className="mt-3 pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500">
                            {user?.role === 'admin' ? 'Menunggu approval dari level ini' :
                             user?.role === 'approver' ? 'Bukan level Anda untuk approve' :
                             'Anda tidak memiliki permission untuk approve'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleViewDetail(workflow)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Detail Modal */}
      {isViewingDetail && selectedWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedWorkflow.policyTitle}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {selectedWorkflow.category}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Diajukan: {new Date(selectedWorkflow.submittedDate).toLocaleDateString('id-ID')}
                    </span>
                    <Badge variant={getPriorityColor(selectedWorkflow.priority)}>
                      {getPriorityLabel(selectedWorkflow.priority)}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Workflow Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Diajukan Oleh</span>
                    </div>
                    <div className="font-medium">{selectedWorkflow.submittedBy}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Progress</span>
                    </div>
                    <div className="font-medium">Level {selectedWorkflow.currentLevel} dari {selectedWorkflow.totalLevels}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Timer className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Deadline</span>
                    </div>
                    <div className="font-medium">{new Date(selectedWorkflow.deadline).toLocaleDateString('id-ID')}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Status</span>
                    </div>
                    <Badge variant={
                      selectedWorkflow.status === 'approved' ? 'default' :
                      selectedWorkflow.status === 'pending' ? 'secondary' :
                      selectedWorkflow.status === 'rejected' ? 'destructive' : 'outline'
                    }>
                      {getStatusLabel(selectedWorkflow.status)}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs for Content */}
              <Tabs defaultValue="overview" className="mb-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="approvers">Approvers</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="documents">Dokumen</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    {/* Description */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Info className="h-5 w-5 mr-2" />
                          Deskripsi Kebijakan
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">{selectedWorkflow.description}</p>
                      </CardContent>
                    </Card>

                    {/* Policy Content */}
                    {selectedWorkflow.policyContent && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <FileText className="h-5 w-5 mr-2" />
                            Konten Kebijakan
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="prose max-w-none">
                            <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
                              {selectedWorkflow.policyContent}
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Change Log */}
                    {selectedWorkflow.changeLog && selectedWorkflow.changeLog.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <History className="h-5 w-5 mr-2" />
                            Change Log
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {selectedWorkflow.changeLog.map((change, index) => (
                              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-sm">{change.action}</span>
                                    <span className="text-xs text-gray-500">{change.timestamp}</span>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">{change.details}</p>
                                  <p className="text-xs text-gray-500 mt-1">Oleh: {change.user}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="approvers" className="mt-6">
                  <div className="space-y-4">
                    {selectedWorkflow.approvers.map((approver, index) => (
                      <Card key={index} className={`${
                        approver.status === 'approved' ? 'border-green-200 bg-green-50' :
                        approver.status === 'pending' ? 'border-yellow-200 bg-yellow-50' :
                        'border-gray-200 bg-gray-50'
                      }`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="relative">
                                <div className={`w-12 h-12 rounded-full ${getStatusColor(approver.status)} flex items-center justify-center`}>
                                  {approver.status === 'approved' && <CheckCircle2 className="h-6 w-6 text-white" />}
                                  {approver.status === 'pending' && <Clock className="h-6 w-6 text-white" />}
                                  {approver.status === 'waiting' && <Clock className="h-6 w-6 text-white" />}
                                </div>
                                <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  {approver.level}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{approver.name}</h4>
                                <p className="text-sm text-gray-600">{approver.role}</p>
                                <p className="text-xs text-gray-500">{approver.department}</p>
                                {approver.email && (
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Mail className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{approver.email}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={
                                approver.status === 'approved' ? 'default' :
                                approver.status === 'pending' ? 'secondary' : 'outline'
                              }>
                                {getStatusLabel(approver.status)}
                              </Badge>
                              {approver.responseTime && (
                                <p className="text-xs text-gray-500 mt-1">Response: {approver.responseTime}</p>
                              )}
                            </div>
                          </div>
                          
                          {approver.comment && (
                            <div className="mt-4 p-3 bg-white rounded-lg border">
                              <p className="text-sm text-gray-700">{approver.comment}</p>
                            </div>
                          )}
                          
                          {approver.status === 'pending' && canApprove(approver.level, selectedWorkflow.currentLevel) && (
                            <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Setujui
                              </Button>
                              <Button size="sm" variant="destructive">
                                <XCircle className="h-4 w-4 mr-2" />
                                Tolak
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="mt-6">
                  {selectedWorkflow.timeline && selectedWorkflow.timeline.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <History className="h-5 w-5 mr-2" />
                          Timeline Approval
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedWorkflow.timeline.map((event, index) => (
                            <div key={index} className="relative">
                              <div className="flex items-start space-x-4">
                                <div className="relative">
                                  <div className={`w-4 h-4 rounded-full ${getStatusColor(event.status)}`}></div>
                                  {index < selectedWorkflow.timeline!.length - 1 && (
                                    <div className="absolute top-4 left-2 w-0.5 h-8 bg-gray-200"></div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-gray-900">{event.event}</h4>
                                    <span className="text-sm text-gray-500">{event.timestamp}</span>
                                  </div>
                                  <p className="text-sm text-gray-600">Oleh: {event.user}</p>
                                  <Badge variant={
                                    event.status === 'completed' ? 'default' :
                                    event.status === 'pending' ? 'secondary' : 'outline'
                                  } className="mt-1">
                                    {getStatusLabel(event.status)}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="documents" className="mt-6">
                  <div className="space-y-4">
                    {/* Attachments */}
                    {selectedWorkflow.attachments && selectedWorkflow.attachments.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <FileText className="h-5 w-5 mr-2" />
                            Lampiran
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedWorkflow.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <FileText className="h-5 w-5 text-gray-400" />
                                  <div>
                                    <div className="font-medium">{attachment}</div>
                                    <div className="text-sm text-gray-500">PDF • ~2.5 MB</div>
                                  </div>
                                </div>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Lihat
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-6 border-t">
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Kirim Reminder
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Report
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
