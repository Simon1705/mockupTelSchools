'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Info,
  Plus,
  Upload
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
  attachments?: Array<{
    name: string;
    size: number;
    type: string;
    url?: string;
  }>;
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
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'skdp'>('skdp');
  const [createForm, setCreateForm] = useState({
    number: '',
    title: '',
    subject: '',
    category: 'Administrasi',
    priority: 'medium' as 'high' | 'medium' | 'low',
    background: '',
    legalBasis: '',
    decisions: '',
    effectiveDate: '',
    signerName: '',
    signerPosition: '',
    recipients: '',
    attachments: [] as File[]
  });

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

  const [workflows, setWorkflows] = useState<ApprovalWorkflowItem[]>([
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
        {
          name: 'Revisi_Evaluasi_Pembelajaran_v2.1.pdf',
          size: 2048576,
          type: 'application/pdf'
        },
        {
          name: 'Kriteria_Penilaian_Baru.docx',
          size: 1048576,
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        {
          name: 'Sistem_Pelaporan_v2.0.xlsx',
          size: 1536000,
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
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
  ]);

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

  const parseLines = (text: string) => text.split('\n').map(l => l.trim()).filter(Boolean);

  const generateSkdpContent = () => {
    const backgrounds = parseLines(createForm.background);
    const legalBases = parseLines(createForm.legalBasis);
    const decisions = parseLines(createForm.decisions);

    const menimbang = backgrounds.map((b, i) => `${String.fromCharCode(97 + i)}. ${b}`).join('\n');
    const mengingat = legalBases.map((b, i) => `${i + 1}. ${b}`).join('\n');
    const memutuskan = decisions.map((d, i) => `${i + 1}. ${d}`).join('\n');

    const effective = createForm.effectiveDate ? new Date(createForm.effectiveDate).toLocaleDateString('id-ID') : '-';

    return `SURAT KEPUTUSAN\nNomor: ${createForm.number || '......'}\n\nTENTANG\n${(createForm.title || createForm.subject || '.........').toUpperCase()}\n\nMENIMBANG:\n${menimbang || '-'}\n\nMENGINGAT:\n${mengingat || '-'}\n\nMEMUTUSKAN:\nMenetapkan:\n${memutuskan || '-'}\n\nBerlaku sejak: ${effective}\n\nDitetapkan di: ........\nPada tanggal: ${effective}\n\n${createForm.signerPosition || 'Pejabat Berwenang'}\n\n${createForm.signerName || '(...................)'}`;
  };

  const openCreateModal = () => setIsCreating(true);
  const closeCreateModal = () => setIsCreating(false);

  const saveCreate = () => {
    const recipients = parseLines(createForm.recipients);
    const content = generateSkdpContent();

    // Convert File objects to attachment objects
    const attachments = createForm.attachments.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }));

    const now = new Date();
    const deadline = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const newItem: ApprovalWorkflowItem = {
      id: String(Date.now()),
      policyTitle: createForm.title || `SK: ${createForm.subject || 'Surat Keputusan Baru'}`,
      submittedBy: user?.name || 'Administrator',
      submittedDate: now.toISOString().slice(0, 10),
      currentLevel: 1,
      totalLevels: 3,
      status: 'pending',
      priority: createForm.priority,
      category: createForm.category,
      description: createForm.subject || 'Pengajuan Surat Keputusan (SKDP)',
      deadline: deadline.toISOString().slice(0, 10),
      policyContent: content + (recipients.length ? `\n\nTembusan:\n- ${recipients.join('\n- ')}` : ''),
      attachments,
      changeLog: [
        { action: 'Draft Created', timestamp: now.toISOString(), user: user?.name || 'Administrator', details: 'Draft SKDP dibuat dari template' },
        { action: 'Submitted for Approval', timestamp: now.toISOString(), user: user?.name || 'Administrator', details: 'Pengajuan dikirim untuk approval' }
      ],
      timeline: [
        { event: 'Draft Created', timestamp: now.toISOString(), user: user?.name || 'Administrator', status: 'completed' },
        { event: 'Level 1 Approval', timestamp: now.toISOString(), user: 'Approver Level 1', status: 'pending' },
        { event: 'Level 2 Approval', timestamp: now.toISOString(), user: 'Approver Level 2', status: 'waiting' }
      ],
      approvers: [
        { name: 'Approver Level 1', level: 1, status: 'pending', date: null, role: 'Kepala Bagian', department: 'Administrasi', comment: null, responseTime: null },
        { name: 'Approver Level 2', level: 2, status: 'waiting', date: null, role: 'Wakil Kepala', department: 'Manajemen', comment: null, responseTime: null },
        { name: 'Approver Level 3', level: 3, status: 'waiting', date: null, role: 'Kepala Sekolah', department: 'Manajemen', comment: null, responseTime: null }
      ]
    };

    setWorkflows(prev => [newItem, ...prev]);
    setIsCreating(false);
    setSelectedWorkflow(newItem);
    setIsViewingDetail(true);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Approval Workflow</h1>
        <p className="text-gray-600">Kelola proses persetujuan kebijakan</p>
        
        {/* Role Information */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
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
            <Button size="sm" onClick={openCreateModal}>
              <Plus className="h-4 w-4 mr-2" />
              Buat Pengajuan
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {user?.role === 'admin' ? 'Anda dapat approve/reject di semua level' :
             user?.role === 'approver' ? 'Anda dapat approve/reject di level yang sesuai' :
             'Anda hanya dapat melihat status approval'}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {workflows.map((workflow) => (
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
                                    <div className="font-medium">{attachment.name}</div>
                                    <div className="text-sm text-gray-500">
                                      {attachment.type.split('/')[1]?.toUpperCase() || 'FILE'} • {(attachment.size / 1024 / 1024).toFixed(2)} MB
                                    </div>
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

      {/* Create (SKDP) Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Buat Pengajuan</h2>
                  <p className="text-sm text-gray-600">Template: SKDP (Surat Keputusan)</p>
                </div>
                <Button variant="ghost" size="sm" onClick={closeCreateModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Tabs defaultValue="form">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="form">Form</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="form" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="number">Nomor Surat</Label>
                        <Input id="number" value={createForm.number} onChange={(e) => setCreateForm({ ...createForm, number: e.target.value })} placeholder="001/SK/TS/2024" />
                      </div>
                      <div>
                        <Label htmlFor="title">Judul (Opsional)</Label>
                        <Input id="title" value={createForm.title} onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })} placeholder="Penetapan ..." />
                      </div>
                      <div>
                        <Label htmlFor="subject">Perihal / Ringkasan</Label>
                        <Input id="subject" value={createForm.subject} onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })} placeholder="Penetapan kriteria evaluasi baru" />
                      </div>
                      <div>
                        <Label>Kategori</Label>
                        <Select value={createForm.category} onValueChange={(v) => setCreateForm({ ...createForm, category: v })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Administrasi">Administrasi</SelectItem>
                            <SelectItem value="Akademik">Akademik</SelectItem>
                            <SelectItem value="Keuangan">Keuangan</SelectItem>
                            <SelectItem value="Umum">Umum</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Prioritas</Label>
                        <Select value={createForm.priority} onValueChange={(v) => setCreateForm({ ...createForm, priority: v as 'high' | 'medium' | 'low' })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih prioritas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">Tinggi</SelectItem>
                            <SelectItem value="medium">Sedang</SelectItem>
                            <SelectItem value="low">Rendah</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="effectiveDate">Tanggal Berlaku</Label>
                        <Input id="effectiveDate" type="date" value={createForm.effectiveDate} onChange={(e) => setCreateForm({ ...createForm, effectiveDate: e.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="signerName">Nama Penandatangan</Label>
                        <Input id="signerName" value={createForm.signerName} onChange={(e) => setCreateForm({ ...createForm, signerName: e.target.value })} placeholder="Nama Pejabat" />
                      </div>
                      <div>
                        <Label htmlFor="signerPosition">Jabatan Penandatangan</Label>
                        <Input id="signerPosition" value={createForm.signerPosition} onChange={(e) => setCreateForm({ ...createForm, signerPosition: e.target.value })} placeholder="Kepala Sekolah / Direktur" />
                      </div>
                      <div>
                        <Label htmlFor="recipients">Tembusan (satu per baris)</Label>
                        <Textarea id="recipients" rows={3} value={createForm.recipients} onChange={(e) => setCreateForm({ ...createForm, recipients: e.target.value })} placeholder={'Contoh:\n- Arsip\n- Bagian Kepegawaian'} />
                      </div>
                      <div>
                        <Label htmlFor="attachments">Upload Lampiran</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <div className="text-sm text-gray-600 mb-2">
                            Klik untuk upload atau drag & drop file
                          </div>
                          <Input 
                            id="attachments" 
                            type="file" 
                            multiple
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              setCreateForm(prev => ({ ...prev, attachments: files }));
                            }} 
                            className="cursor-pointer"
                          />
                        </div>
                        
                        {/* Display uploaded files */}
                        {createForm.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <div className="text-sm font-medium text-gray-700">File yang diupload:</div>
                            {createForm.attachments.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                                <div className="flex items-center space-x-2">
                                  <FileText className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-700">{file.name}</span>
                                  <span className="text-xs text-gray-500">
                                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                  </span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setCreateForm(prev => ({
                                      ...prev,
                                      attachments: prev.attachments.filter((_, i) => i !== index)
                                    }));
                                  }}
                                  className="text-red-500 hover:text-red-700 text-xs p-1 h-6 w-6"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="md:col-span-1">
                      <Label>Menimbang (satu per baris)</Label>
                      <Textarea rows={6} value={createForm.background} onChange={(e) => setCreateForm({ ...createForm, background: e.target.value })} placeholder={'a. Pentingnya ...\nb. Untuk meningkatkan ...'} />
                    </div>
                    <div className="md:col-span-1">
                      <Label>Mengingat (satu per baris)</Label>
                      <Textarea rows={6} value={createForm.legalBasis} onChange={(e) => setCreateForm({ ...createForm, legalBasis: e.target.value })} placeholder={'1. UU No ...\n2. Peraturan Menteri ...'} />
                    </div>
                    <div className="md:col-span-1">
                      <Label>Memutuskan (satu per baris)</Label>
                      <Textarea rows={6} value={createForm.decisions} onChange={(e) => setCreateForm({ ...createForm, decisions: e.target.value })} placeholder={'1. Menetapkan ...\n2. Menginstruksikan ...'} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preview SKDP</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 p-4 rounded-lg overflow-x-auto">{generateSkdpContent()}</pre>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex space-x-2 pt-6 border-t mt-6">
                <Button variant="outline" onClick={closeCreateModal}>Batal</Button>
                <Button onClick={saveCreate}>Simpan & Ajukan</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
