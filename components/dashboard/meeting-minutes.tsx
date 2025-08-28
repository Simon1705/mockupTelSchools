'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Upload, 
  FileText, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  X,
  Eye,
  Download,
  Trash2,
  Edit,
  Search,
  User
} from 'lucide-react';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  position?: string;
}

interface MeetingMinutes {
  id: string;
  meetingTitle: string;
  meetingDate: string;
  meetingTime: string;
  meetingLocation: string;
  meetingType: 'internal' | 'external' | 'stakeholder' | 'board';
  materiTinjauan?: string;
  participants: string[];
  agenda: string[];
  decisions: string[];
  actionItems: Array<{
    task: string;
    assignee: string;
    deadline: string;
    status: 'pending' | 'completed' | 'in-progress';
  }>;
  dasarPembahasan?: string[];
  arahanInformasi?: string[];
  masukanSaran?: string[];
  nextMeeting?: string;
  attachments: Array<{
    name: string;
    size: number;
    type: string;
    url?: string;
  }>;
  createdBy: string;
  createdAt: string;
  isTemplate: boolean;
}

export function MeetingMinutes() {
  const [isCreating, setIsCreating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState<MeetingMinutes | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Dummy data pengguna dari manajemen pengguna
  const [systemUsers] = useState<SystemUser[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@telkomschools.sch.id',
      role: 'admin',
      department: 'Akademik',
      position: 'Kepala Bagian Akademik'
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@telkomschools.sch.id',
      role: 'approver',
      department: 'Manajemen',
      position: 'Wakil Kepala Sekolah'
    },
    {
      id: '3',
      name: 'Dr. Lisa Anderson',
      email: 'lisa.anderson@telkomschools.sch.id',
      role: 'editor',
      department: 'Akademik',
      position: 'Koordinator Kurikulum'
    },
    {
      id: '4',
      name: 'Mr. Robert Kim',
      email: 'robert.kim@telkomschools.sch.id',
      role: 'admin',
      department: 'Manajemen',
      position: 'Kepala Sekolah'
    },
    {
      id: '5',
      name: 'Ms. Emily Davis',
      email: 'emily.davis@telkomschools.sch.id',
      role: 'editor',
      department: 'Keuangan',
      position: 'Kepala Bagian Keuangan'
    },
    {
      id: '6',
      name: 'Mr. David Wilson',
      email: 'david.wilson@telkomschools.sch.id',
      role: 'viewer',
      department: 'IT',
      position: 'Staff IT'
    },
    {
      id: '7',
      name: 'Dr. Maria Garcia',
      email: 'maria.garcia@telkomschools.sch.id',
      role: 'approver',
      department: 'Akademik',
      position: 'Koordinator Program Studi'
    },
    {
      id: '8',
      name: 'Mr. James Brown',
      email: 'james.brown@telkomschools.sch.id',
      role: 'editor',
      department: 'Umum',
      position: 'Kepala Bagian Umum'
    }
  ]);

  const [createForm, setCreateForm] = useState({
    meetingTitle: '',
    meetingDate: '',
    meetingTime: '',
    meetingLocation: '',
    meetingType: 'internal' as 'internal' | 'external' | 'stakeholder' | 'board',
    materiTinjauan: '',
    selectedParticipants: [] as string[],
    agenda: '',
    decisions: '',
    actionItems: '',
    dasarPembahasan: '',
    arahanInformasi: '',
    masukanSaran: '',
    nextMeeting: '',
    attachments: [] as File[]
  });

  const [uploadForm, setUploadForm] = useState({
    meetingTitle: '',
    meetingDate: '',
    meetingType: 'internal' as 'internal' | 'external' | 'stakeholder' | 'board',
    description: '',
    fileName: ''
  });

  // Search state untuk peserta
  const [participantSearchTerm, setParticipantSearchTerm] = useState('');

  const [meetingMinutes, setMeetingMinutes] = useState<MeetingMinutes[]>([
    {
      id: '1',
      meetingTitle: 'Rapat Koordinasi Kebijakan Akademik 2024',
      meetingDate: '2024-01-15',
      meetingTime: '09:00',
      meetingLocation: 'Ruang Rapat Utama',
      meetingType: 'internal',
      materiTinjauan: 'Evaluasi pembelajaran semester lalu',
      participants: [
        'Dr. Sarah Johnson - Kepala Bagian Akademik',
        'Prof. Michael Chen - Wakil Kepala Sekolah',
        'Dr. Lisa Anderson - Koordinator Kurikulum',
        'Mr. Robert Kim - Kepala Sekolah'
      ],
      agenda: [
        'Review kebijakan evaluasi pembelajaran semester lalu',
        'Diskusi implementasi sistem penilaian baru',
        'Perencanaan pelatihan guru untuk metode penilaian',
        'Penetapan timeline implementasi'
      ],
      decisions: [
        'Menyetujui revisi kebijakan evaluasi pembelajaran',
        'Implementasi sistem penilaian baru akan dimulai semester depan',
        'Pelatihan guru akan dilaksanakan dalam 2 bulan ke depan',
        'Tim evaluasi akan dibentuk untuk monitoring implementasi'
      ],
      dasarPembahasan: [
        'Hasil evaluasi pembelajaran semester lalu',
        'Masukan dari tim kurikulum dan wali kelas'
      ],
      actionItems: [
        {
          task: 'Menyusun draft kebijakan revisi evaluasi',
          assignee: 'Dr. Sarah Johnson',
          deadline: '2024-01-22',
          status: 'completed'
        },
        {
          task: 'Menyiapkan materi pelatihan guru',
          assignee: 'Dr. Lisa Anderson',
          deadline: '2024-02-15',
          status: 'in-progress'
        },
        {
          task: 'Membentuk tim evaluasi implementasi',
          assignee: 'Prof. Michael Chen',
          deadline: '2024-01-30',
          status: 'pending'
        }
      ],
      arahanInformasi: [
        'Segera siapkan draft kebijakan revisi',
        'Jadwalkan pelatihan guru dalam 2 bulan'
      ],
      masukanSaran: [
        'Libatkan perwakilan siswa dalam evaluasi',
        'Pertimbangkan penggunaan platform digital untuk penilaian'
      ],
      nextMeeting: '2024-02-15',
             attachments: [
         {
           name: 'Presentasi_Kebijakan_Akademik.pdf',
           size: 2048576,
           type: 'application/pdf'
         },
         {
           name: 'Draft_Evaluasi_Pembelajaran.docx',
           size: 1048576,
           type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
         },
         {
           name: 'Daftar_Hadir_Rapat.pdf',
           size: 512000,
           type: 'application/pdf'
         }
       ],
      createdBy: 'Dr. Sarah Johnson',
      createdAt: '2024-01-15',
      isTemplate: false
    },
    {
      id: '2',
      meetingTitle: 'Template Rapat Koordinasi Bulanan',
      meetingDate: '2024-01-01',
      meetingTime: '10:00',
      meetingLocation: 'Ruang Rapat',
      meetingType: 'internal',
      materiTinjauan: 'Topik koordinasi bulanan',
      participants: ['Tim Manajemen', 'Kepala Bagian', 'Koordinator'],
      agenda: ['Review bulan lalu', 'Perencanaan bulan depan', 'Diskusi isu terkini'],
      decisions: ['Keputusan akan diisi sesuai rapat'],
      dasarPembahasan: [],
      actionItems: [
        {
          task: 'Action item akan diisi sesuai rapat',
          assignee: 'TBD',
          deadline: 'TBD',
          status: 'pending'
        }
      ],
      arahanInformasi: [],
      masukanSaran: [],
      attachments: [],
      createdBy: 'System',
      createdAt: '2024-01-01',
      isTemplate: true
    }
  ]);

  const openCreateModal = () => setIsCreating(true);
  const closeCreateModal = () => setIsCreating(false);
  const openUploadModal = () => setIsUploading(true);
  const closeUploadModal = () => setIsUploading(false);
  const openViewModal = (minutes: MeetingMinutes) => {
    setSelectedMinutes(minutes);
    setIsViewing(true);
  };
  const closeViewModal = () => {
    setIsViewing(false);
    setSelectedMinutes(null);
  };

  const parseLines = (text: string) => text.split('\n').map(l => l.trim()).filter(Boolean);

  const handleParticipantToggle = (userId: string) => {
    setCreateForm(prev => ({
      ...prev,
      selectedParticipants: prev.selectedParticipants.includes(userId)
        ? prev.selectedParticipants.filter(id => id !== userId)
        : [...prev.selectedParticipants, userId]
    }));
  };

  const getSelectedParticipantsDisplay = () => {
    return createForm.selectedParticipants.map(userId => {
      const user = systemUsers.find(u => u.id === userId);
      return user ? `${user.name} - ${user.position || user.role}` : '';
    }).filter(Boolean);
  };

  // Filter peserta berdasarkan search term
  const filteredParticipants = systemUsers.filter(user => 
    user.name.toLowerCase().includes(participantSearchTerm.toLowerCase()) ||
    (user.position && user.position.toLowerCase().includes(participantSearchTerm.toLowerCase())) ||
    user.department.toLowerCase().includes(participantSearchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(participantSearchTerm.toLowerCase())
  );

  const saveCreate = () => {
    const participants = getSelectedParticipantsDisplay();
    const agenda = parseLines(createForm.agenda);
    const dasarPembahasan = parseLines(createForm.dasarPembahasan);
    const arahanInformasi = parseLines(createForm.arahanInformasi);
    const masukanSaran = parseLines(createForm.masukanSaran);
    // Kompatibilitas lama: simpan juga pada decisions/actionItems
    const decisions = dasarPembahasan;
    const actionItems = arahanInformasi.map(item => ({
      task: item,
      assignee: 'TBD',
      deadline: 'TBD',
      status: 'pending' as const
    }));
    
    // Convert File objects to attachment objects
    const attachments = createForm.attachments.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }));

    const newMinutes: MeetingMinutes = {
      id: String(Date.now()),
      meetingTitle: createForm.meetingTitle,
      meetingDate: createForm.meetingDate,
      meetingTime: createForm.meetingTime,
      meetingLocation: createForm.meetingLocation,
      meetingType: createForm.meetingType,
      materiTinjauan: createForm.materiTinjauan,
      participants,
      agenda,
      decisions,
      actionItems,
      dasarPembahasan,
      arahanInformasi,
      masukanSaran,
      nextMeeting: createForm.nextMeeting || undefined,
      attachments,
      createdBy: 'Admin User',
      createdAt: new Date().toISOString().slice(0, 10),
      isTemplate: false
    };

    setMeetingMinutes(prev => [newMinutes, ...prev]);
    setIsCreating(false);
    setCreateForm({
      meetingTitle: '', meetingDate: '', meetingTime: '', meetingLocation: '',
      meetingType: 'internal', materiTinjauan: '', selectedParticipants: [], agenda: '', decisions: '',
      actionItems: '', dasarPembahasan: '', arahanInformasi: '', masukanSaran: '', nextMeeting: '', attachments: []
    });
  };

  const saveUpload = () => {
    const newMinutes: MeetingMinutes = {
      id: String(Date.now()),
      meetingTitle: uploadForm.meetingTitle,
      meetingDate: uploadForm.meetingDate,
      meetingTime: 'TBD',
      meetingLocation: 'TBD',
      meetingType: uploadForm.meetingType,
      participants: [],
      agenda: [],
      decisions: [],
      actionItems: [],
      attachments: [{
        name: uploadForm.fileName,
        size: 0,
        type: 'application/pdf'
      }],
      createdBy: 'Admin User',
      createdAt: new Date().toISOString().slice(0, 10),
      isTemplate: false
    };

    setMeetingMinutes(prev => [newMinutes, ...prev]);
    setIsUploading(false);
    setUploadForm({
      meetingTitle: '', meetingDate: '', meetingType: 'internal',
      description: '', fileName: ''
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'internal': return 'default';
      case 'external': return 'secondary';
      case 'stakeholder': return 'outline';
      case 'board': return 'destructive';
      default: return 'outline';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'internal': return 'Internal';
      case 'external': return 'Eksternal';
      case 'stakeholder': return 'Stakeholder';
      case 'board': return 'Board';
      default: return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in-progress': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const filteredMinutes = meetingMinutes.filter(minutes => {
    const matchesSearch = minutes.meetingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         minutes.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || minutes.meetingType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      {/* Hero Section - Meeting Minutes */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg p-3">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">Notulen Rapat</h1>
                <p className="text-red-100 text-sm md:text-base">Kelola hasil rapat dan template notulen institusi</p>
                <div className="flex items-center space-x-4 mt-2 text-xs">
                  <span className="flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    {filteredMinutes.length} notulen
                  </span>
                  <span className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {filteredMinutes.reduce((acc, m) => acc + m.participants.length, 0)} peserta
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {filteredMinutes.filter(m => new Date(m.meetingDate) >= new Date(Date.now() - 30*24*60*60*1000)).length} bulan ini
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={openCreateModal}
                className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Buat Notulen
              </Button>
              <Button 
                variant="outline" 
                onClick={openUploadModal}
                className="bg-transparent border-white text-white hover:bg-white/20"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Cari notulen rapat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter tipe rapat" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tipe</SelectItem>
            <SelectItem value="internal">Internal</SelectItem>
            <SelectItem value="external">Eksternal</SelectItem>
            <SelectItem value="stakeholder">Stakeholder</SelectItem>
            <SelectItem value="board">Board</SelectItem>
          </SelectContent>
        </Select>
        
      </div>

      {/* Meeting Minutes List */}
      <div className="space-y-4">
        {filteredMinutes.map((minutes) => (
          <Card key={minutes.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-lg">{minutes.meetingTitle}</CardTitle>
                    {minutes.isTemplate && (
                      <Badge variant="secondary">Template</Badge>
                    )}
                    <Badge variant={getTypeColor(minutes.meetingType)}>
                      {getTypeLabel(minutes.meetingType)}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    <span className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(minutes.meetingDate).toLocaleDateString('id-ID')}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {minutes.meetingTime}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {minutes.meetingLocation}
                      </span>
                    </span>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">
                    Dibuat oleh: {minutes.createdBy}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(minutes.createdAt).toLocaleDateString('id-ID')}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Peserta ({minutes.participants.length})</h4>
                  <div className="text-sm text-gray-600">
                    {minutes.participants.slice(0, 3).map((p, i) => (
                      <div key={i} className="truncate">{p}</div>
                    ))}
                    {minutes.participants.length > 3 && (
                      <div className="text-gray-500">+{minutes.participants.length - 3} lainnya</div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Agenda ({minutes.agenda.length})</h4>
                  <div className="text-sm text-gray-600">
                    {minutes.agenda.slice(0, 3).map((a, i) => (
                      <div key={i} className="truncate">{a}</div>
                    ))}
                    {minutes.agenda.length > 3 && (
                      <div className="text-gray-500">+{minutes.agenda.length - 3} lainnya</div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Action Items ({minutes.actionItems.length})</h4>
                  <div className="text-sm text-gray-600">
                    {minutes.actionItems.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="truncate">{item.task}</span>
                        <Badge variant={getStatusColor(item.status)} className="ml-2 text-xs">
                          {item.status === 'completed' ? 'Selesai' :
                           item.status === 'in-progress' ? 'Proses' : 'Pending'}
                        </Badge>
                      </div>
                    ))}
                    {minutes.actionItems.length > 3 && (
                      <div className="text-gray-500">+{minutes.actionItems.length - 3} lainnya</div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => openViewModal(minutes)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Detail
                </Button>
                {!minutes.isTemplate && (
                  <>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
                {minutes.isTemplate && (
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Gunakan Template
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Meeting Minutes Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Buat Notulen Rapat</h2>
                <Button variant="ghost" size="sm" onClick={closeCreateModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                   <div>
                     <Label htmlFor="meetingTitle">Judul Rapat *</Label>
                     <Input 
                       id="meetingTitle" 
                       value={createForm.meetingTitle} 
                       onChange={(e) => setCreateForm({ ...createForm, meetingTitle: e.target.value })} 
                       placeholder="Rapat Koordinasi..." 
                     />
                   </div>
                    <div>
                      <Label htmlFor="meetingDate">Tanggal Pelaksanaan *</Label>
                     <Input 
                       id="meetingDate" 
                       type="date" 
                       value={createForm.meetingDate} 
                       onChange={(e) => setCreateForm({ ...createForm, meetingDate: e.target.value })} 
                     />
                   </div>
                   <div>
                      <Label htmlFor="meetingTime">Waktu *</Label>
                     <Input 
                       id="meetingTime" 
                       type="time" 
                       value={createForm.meetingTime} 
                       onChange={(e) => setCreateForm({ ...createForm, meetingTime: e.target.value })} 
                     />
                   </div>
                   <div>
                      <Label htmlFor="meetingLocation">Tempat *</Label>
                     <Input 
                       id="meetingLocation" 
                       value={createForm.meetingLocation} 
                       onChange={(e) => setCreateForm({ ...createForm, meetingLocation: e.target.value })} 
                       placeholder="Ruang Rapat..." 
                     />
                   </div>
                    <div>
                      <Label htmlFor="materiTinjauan">Materi Tinjauan *</Label>
                      <Input 
                        id="materiTinjauan" 
                        value={createForm.materiTinjauan} 
                        onChange={(e) => setCreateForm({ ...createForm, materiTinjauan: e.target.value })} 
                        placeholder="Materi yang ditinjau..." 
                      />
                    </div>
                   <div>
                     <Label>Tipe Rapat</Label>
                     <Select value={createForm.meetingType} onValueChange={(v) => setCreateForm({ ...createForm, meetingType: v as any })}>
                       <SelectTrigger>
                         <SelectValue placeholder="Pilih tipe rapat" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="internal">Internal</SelectItem>
                         <SelectItem value="external">Eksternal</SelectItem>
                         <SelectItem value="stakeholder">Stakeholder</SelectItem>
                         <SelectItem value="board">Board</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div>
                     <Label htmlFor="nextMeeting">Rapat Berikutnya (opsional)</Label>
                     <Input 
                       id="nextMeeting" 
                       type="date" 
                       value={createForm.nextMeeting} 
                       onChange={(e) => setCreateForm({ ...createForm, nextMeeting: e.target.value })} 
                     />
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
                 <div className="space-y-4">
                   <div>
                     <Label>Pilih Peserta Rapat *</Label>
                     
                     {/* Search Bar untuk Peserta */}
                     <div className="relative mb-3">
                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                       <Input
                         placeholder="Cari peserta berdasarkan nama, jabatan, atau department..."
                         value={participantSearchTerm}
                         onChange={(e) => setParticipantSearchTerm(e.target.value)}
                         className="pl-10"
                       />
                     </div>

                     {/* Info jumlah peserta */}
                     <div className="text-xs text-gray-500 mb-2">
                       Menampilkan {filteredParticipants.length} dari {systemUsers.length} pengguna
                       {participantSearchTerm && ` (hasil pencarian: "${participantSearchTerm}")`}
                     </div>

                     {/* List Peserta dengan Scroll */}
                     <div className="border rounded-lg p-3 max-h-80 overflow-y-auto bg-gray-50">
                       {filteredParticipants.length > 0 ? (
                         <div className="space-y-2">
                           {filteredParticipants.map((user) => (
                             <div key={user.id} className="flex items-center space-x-2 p-2 hover:bg-white rounded transition-colors">
                               <Checkbox
                                 id={`user-${user.id}`}
                                 checked={createForm.selectedParticipants.includes(user.id)}
                                 onCheckedChange={() => handleParticipantToggle(user.id)}
                               />
                               <Label 
                                 htmlFor={`user-${user.id}`} 
                                 className="text-sm cursor-pointer flex-1"
                               >
                                 <div className="flex items-center space-x-2">
                                   <User className="h-4 w-4 text-gray-500" />
                                   <span className="font-medium">{user.name}</span>
                                   <span className="text-gray-500">-</span>
                                   <span className="text-gray-600">{user.position || user.role}</span>
                                   <span className="text-gray-400">({user.department})</span>
                                 </div>
                               </Label>
                             </div>
                           ))}
                         </div>
                       ) : (
                         <div className="text-center py-4 text-gray-500">
                           <Search className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                           <p>Tidak ada peserta yang cocok dengan pencarian</p>
                           <p className="text-xs">Coba kata kunci lain atau hapus filter</p>
                         </div>
                       )}
                     </div>

                     {/* Peserta Terpilih */}
                     {createForm.selectedParticipants.length > 0 && (
                       <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                         <div className="flex items-center justify-between mb-2">
                           <strong className="text-sm text-blue-800">
                             Peserta Terpilih ({createForm.selectedParticipants.length})
                           </strong>
                           <Button
                             type="button"
                             variant="ghost"
                             size="sm"
                             onClick={() => setCreateForm(prev => ({ ...prev, selectedParticipants: [] }))}
                             className="text-blue-600 hover:text-blue-800 text-xs"
                           >
                             Hapus Semua
                           </Button>
                         </div>
                         <div className="space-y-1 max-h-32 overflow-y-auto">
                           {getSelectedParticipantsDisplay().map((participant, index) => (
                             <div key={index} className="flex items-center justify-between p-2 bg-white rounded border border-blue-200">
                               <span className="text-blue-700 text-sm">• {participant}</span>
                               <Button
                                 type="button"
                                 variant="ghost"
                                 size="sm"
                                 onClick={() => {
                                   const userId = systemUsers.find(u => 
                                     `${u.name} - ${u.position || u.role}` === participant
                                   )?.id;
                                   if (userId) {
                                     handleParticipantToggle(userId);
                                   }
                                 }}
                                 className="text-red-500 hover:text-red-700 text-xs p-1 h-6 w-6"
                               >
                                 <X className="h-3 w-3" />
                               </Button>
                             </div>
                           ))}
                         </div>
                       </div>
                     )}

                     {/* Quick Actions */}
                     <div className="mt-2 flex flex-wrap gap-1">
                       <Button
                         type="button"
                         variant="outline"
                         size="sm"
                                                  onClick={() => {
                           const adminUsers = systemUsers.filter(u => u.role === 'admin');
                           const adminIds = adminUsers.map(u => u.id);
                           setCreateForm(prev => ({ 
                             ...prev, 
                             selectedParticipants: Array.from(new Set([...prev.selectedParticipants, ...adminIds]))
                           }));
                         }}
                         className="text-xs"
                       >
                         + Semua Admin
                       </Button>
                       <Button
                         type="button"
                         variant="outline"
                         size="sm"
                                                  onClick={() => {
                           const approverUsers = systemUsers.filter(u => u.role === 'approver');
                           const approverIds = approverUsers.map(u => u.id);
                           setCreateForm(prev => ({ 
                             ...prev, 
                             selectedParticipants: Array.from(new Set([...prev.selectedParticipants, ...approverIds]))
                           }));
                         }}
                         className="text-xs"
                       >
                         + Semua Approver
                       </Button>
                       <Button
                         type="button"
                         variant="outline"
                         size="sm"
                                                  onClick={() => {
                           const academicUsers = systemUsers.filter(u => u.department === 'Akademik');
                           const academicIds = academicUsers.map(u => u.id);
                           setCreateForm(prev => ({ 
                             ...prev, 
                             selectedParticipants: Array.from(new Set([...prev.selectedParticipants, ...academicIds]))
                           }));
                         }}
                         className="text-xs"
                       >
                         + Semua Akademik
                       </Button>
                     </div>
                   </div>
                 </div>
               </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <Label htmlFor="agenda">Agenda Rapat (satu per baris)</Label>
                  <Textarea 
                    id="agenda" 
                    rows={6} 
                    value={createForm.agenda} 
                    onChange={(e) => setCreateForm({ ...createForm, agenda: e.target.value })} 
                    placeholder={`1. Pembukaan\n2. Review agenda...`} 
                  />
                </div>
                <div>
                  <Label htmlFor="dasarPembahasan">Dasar Pembahasan (satu per baris)</Label>
                  <Textarea 
                    id="dasarPembahasan" 
                    rows={6} 
                    value={createForm.dasarPembahasan} 
                    onChange={(e) => setCreateForm({ ...createForm, dasarPembahasan: e.target.value })} 
                    placeholder={`1. Dasar pertama\n2. Dasar kedua...`} 
                  />
                </div>
                <div>
                  <Label htmlFor="arahanInformasi">Arahan/Informasi (satu per baris)</Label>
                  <Textarea 
                    id="arahanInformasi" 
                    rows={6} 
                    value={createForm.arahanInformasi} 
                    onChange={(e) => setCreateForm({ ...createForm, arahanInformasi: e.target.value })} 
                    placeholder={`1. Arahan pertama\n2. Informasi kedua...`} 
                  />
                </div>
                <div>
                  <Label htmlFor="masukanSaran">Masukan dan Saran (satu per baris)</Label>
                  <Textarea 
                    id="masukanSaran" 
                    rows={6} 
                    value={createForm.masukanSaran} 
                    onChange={(e) => setCreateForm({ ...createForm, masukanSaran: e.target.value })} 
                    placeholder={`1. Masukan pertama\n2. Saran kedua...`} 
                  />
                </div>
              </div>

              <div className="flex space-x-2 pt-6 border-t mt-6">
                <Button variant="outline" onClick={closeCreateModal}>Batal</Button>
                <Button 
                  onClick={saveCreate}
                  disabled={createForm.selectedParticipants.length === 0}
                >
                  Simpan Notulen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload PDF Modal */}
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upload Notulen PDF</h2>
                <Button variant="ghost" size="sm" onClick={closeUploadModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="uploadTitle">Judul Rapat *</Label>
                  <Input 
                    id="uploadTitle" 
                    value={uploadForm.meetingTitle} 
                    onChange={(e) => setUploadForm({ ...uploadForm, meetingTitle: e.target.value })} 
                    placeholder="Rapat..." 
                  />
                </div>
                <div>
                  <Label htmlFor="uploadDate">Tanggal Rapat *</Label>
                  <Input 
                    id="uploadDate" 
                    type="date" 
                    value={uploadForm.meetingDate} 
                    onChange={(e) => setUploadForm({ ...uploadForm, meetingDate: e.target.value })} 
                  />
                </div>
                <div>
                  <Label>Tipe Rapat</Label>
                  <Select value={uploadForm.meetingType} onValueChange={(v) => setUploadForm({ ...uploadForm, meetingType: v as any })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe rapat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal">Internal</SelectItem>
                      <SelectItem value="external">Eksternal</SelectItem>
                      <SelectItem value="stakeholder">Stakeholder</SelectItem>
                      <SelectItem value="board">Board</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="uploadDescription">Deskripsi Singkat</Label>
                  <Textarea 
                    id="uploadDescription" 
                    rows={3} 
                    value={uploadForm.description} 
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })} 
                    placeholder="Deskripsi singkat tentang rapat..." 
                  />
                </div>
                <div>
                  <Label htmlFor="uploadFile">Upload File PDF</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="text-sm text-gray-600 mb-2">
                      Klik untuk upload atau drag & drop file PDF
                    </div>
                    <Input 
                      id="uploadFile" 
                      type="file" 
                      accept=".pdf" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadForm({ ...uploadForm, fileName: file.name });
                        }
                      }} 
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-6 border-t mt-6">
                <Button variant="outline" onClick={closeUploadModal}>Batal</Button>
                <Button onClick={saveUpload}>Upload & Simpan</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Meeting Minutes Modal */}
      {isViewing && selectedMinutes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMinutes.meetingTitle}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(selectedMinutes.meetingDate).toLocaleDateString('id-ID')}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedMinutes.meetingTime}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedMinutes.meetingLocation}
                    </span>
                    <Badge variant={getTypeColor(selectedMinutes.meetingType)}>
                      {getTypeLabel(selectedMinutes.meetingType)}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={closeViewModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Peserta Rapat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Header Table to match photo */}
                    <div className="mb-4 border rounded">
                      <div className="grid grid-cols-2 divide-x divide-gray-200">
                        <div className="p-2 border-b font-medium">Tanggal Pelaksanaan</div>
                        <div className="p-2 border-b">{new Date(selectedMinutes.meetingDate).toLocaleDateString('id-ID')}</div>
                        <div className="p-2 border-b font-medium">Materi Tinjauan</div>
                        <div className="p-2 border-b">{selectedMinutes.materiTinjauan || '-'}</div>
                        <div className="p-2 border-b font-medium">Tempat</div>
                        <div className="p-2 border-b">{selectedMinutes.meetingLocation}</div>
                        <div className="p-2 font-medium">Waktu</div>
                        <div className="p-2">{selectedMinutes.meetingTime}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {selectedMinutes.participants.map((participant, index) => (
                        <div key={index} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                          {participant}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Agenda Rapat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedMinutes.agenda.map((item, index) => (
                        <div key={index} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                          {index + 1}. {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      II. Dasar Pembahasan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {(selectedMinutes.dasarPembahasan || selectedMinutes.decisions).map((decision, index) => (
                        <div key={index} className="text-sm text-gray-700 p-2 bg-green-50 rounded border-l-4 border-green-200">
                          {index + 1}. {decision}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      III. Arahan/Informasi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {(selectedMinutes.arahanInformasi && selectedMinutes.arahanInformasi.length > 0
                        ? selectedMinutes.arahanInformasi.map((text, index) => ({ task: text, assignee: 'TBD', deadline: 'TBD', status: 'pending' as const }))
                        : selectedMinutes.actionItems).map((item, index) => (
                          <div key={index} className="text-sm text-gray-700 p-3 bg-blue-50 rounded border-l-4 border-blue-200">
                            <div className="font-medium">{item.task}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              Assignee: {item.assignee} | Deadline: {item.deadline}
                            </div>
                            <Badge variant={getStatusColor(item.status)} className="mt-2">
                              {item.status === 'completed' ? 'Selesai' :
                               item.status === 'in-progress' ? 'Proses' : 'Pending'}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* IV. Masukan dan Saran */}
              {selectedMinutes.masukanSaran && selectedMinutes.masukanSaran.length > 0 && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      IV. Masukan dan Saran
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedMinutes.masukanSaran.map((item, index) => (
                        <div key={index} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                          {index + 1}. {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedMinutes.nextMeeting && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Rapat Berikutnya
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-medium text-blue-600">
                      {new Date(selectedMinutes.nextMeeting).toLocaleDateString('id-ID')}
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedMinutes.attachments.length > 0 && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Lampiran
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedMinutes.attachments.map((attachment, index) => (
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
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex space-x-2 pt-6 border-t">
                <Button variant="outline" onClick={closeViewModal}>Tutup</Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
