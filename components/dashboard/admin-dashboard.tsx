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
      description: 'Revisi kebijakan evaluasi pembelajaran untuk meningkatkan kualitas penilaian siswa.',
      content: `Revisi Kebijakan Evaluasi Pembelajaran

1. PENDAHULUAN
Kebijakan ini merevisi sistem evaluasi pembelajaran yang ada untuk meningkatkan kualitas penilaian dan transparansi hasil belajar siswa.

2. PERUBAHAN UTAMA
2.1 Metode Penilaian
- Penambahan penilaian berbasis proyek
- Implementasi penilaian portofolio
- Evaluasi keterampilan praktis

2.2 Kriteria Penilaian
- Penilaian kognitif (40%)
- Penilaian afektif (30%)
- Penilaian psikomotorik (30%)

3. IMPLEMENTASI
- Pelatihan guru untuk metode baru
- Sosialisasi kepada orang tua
- Monitoring berkala

4. EVALUASI
- Review setiap semester
- Feedback dari stakeholder
- Penyesuaian berdasarkan hasil`,
      attachments: [
        { name: 'Draft_Revisi_Evaluasi.pdf', size: '1.5 MB', type: 'PDF' },
        { name: 'Template_Penilaian_Baru.xlsx', size: '0.8 MB', type: 'Excel' }
      ],
      relatedPolicies: [
        'Kebijakan Pembelajaran Hybrid 2024',
        'Panduan Penggunaan Sistem Informasi Akademik'
      ]
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
      content: `Kebijakan Remote Work

1. TUJUAN
Meningkatkan fleksibilitas kerja dan produktivitas pegawai melalui implementasi kerja jarak jauh.

2. RUANG LINGKUP
- Pegawai tetap dan kontrak
- Posisi yang memungkinkan remote work
- Maksimal 3 hari remote per minggu

3. KETENTUAN
3.1 Persyaratan
- Koneksi internet stabil
- Ruang kerja yang kondusif
- Ketersediaan untuk meeting online

3.2 Jam Kerja
- Sesuai jam kerja normal
- Laporan aktivitas harian
- Monitoring produktivitas

4. HAK DAN KEWAJIBAN
4.1 Hak Pegawai
- Fleksibilitas waktu kerja
- Penghematan biaya transportasi
- Work-life balance yang lebih baik

4.2 Kewajiban Pegawai
- Menjaga produktivitas
- Komunikasi yang efektif
- Kepatuhan terhadap kebijakan`,
      attachments: [
        { name: 'Remote_Work_Guidelines.pdf', size: '2.1 MB', type: 'PDF' },
        { name: 'Form_Permohonan_Remote.docx', size: '0.5 MB', type: 'Word' }
      ],
      relatedPolicies: [
        'Protokol Kesehatan dan Keselamatan Kerja',
        'Kebijakan Evaluasi Kinerja Pegawai'
      ]
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
      content: `Update Protokol Keamanan Data

1. LATAR BELAKANG
Peningkatan ancaman keamanan siber memerlukan update protokol keamanan data yang lebih ketat.

2. PERUBAHAN PROTOKOL
2.1 Autentikasi
- Two-factor authentication wajib
- Password policy yang lebih ketat
- Session timeout yang lebih pendek

2.2 Enkripsi Data
- Enkripsi end-to-end untuk komunikasi
- Enkripsi data sensitif
- Backup data terenkripsi

2.3 Monitoring
- Real-time threat detection
- Log monitoring 24/7
- Alert system otomatis

3. PELATIHAN
- Sosialisasi kepada semua pegawai
- Pelatihan keamanan berkala
- Simulasi serangan phishing

4. PENEGAKAN
- Audit keamanan rutin
- Sanksi untuk pelanggaran
- Review berkala protokol`,
      attachments: [
        { name: 'Security_Protocol_Update.pdf', size: '3.2 MB', type: 'PDF' },
        { name: 'Security_Checklist.xlsx', size: '1.1 MB', type: 'Excel' },
        { name: 'Incident_Response_Plan.docx', size: '0.9 MB', type: 'Word' }
      ],
      relatedPolicies: [
        'Panduan Penggunaan Sistem Informasi Akademik',
        'Protokol Kesehatan dan Keselamatan Kerja'
      ]
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

  const allPolicies = [
    {
      id: '1',
      title: 'Kebijakan Pembelajaran Hybrid 2024',
      category: 'Akademik',
      effectiveDate: '2024-01-15',
      policyNumber: 'TEL/AKD/001/2024',
      status: 'active',
      createdBy: 'Dr. Sarah Johnson',
      views: 1247,
      confirmations: 98,
      description: 'Panduan lengkap implementasi pembelajaran hybrid untuk meningkatkan efektivitas pendidikan.',
      lastUpdated: '2024-01-15',
      version: '2.1',
      documentSize: '2.5 MB',
      totalViews: 1247,
      totalDownloads: 892,
      content: `Kebijakan Pembelajaran Hybrid 2024

1. PENDAHULUAN
Kebijakan ini mengatur implementasi pembelajaran hybrid di Telkom Schools untuk meningkatkan efektivitas pendidikan dan adaptasi terhadap perkembangan teknologi.

2. TUJUAN
- Meningkatkan aksesibilitas pembelajaran
- Mengoptimalkan penggunaan teknologi pendidikan
- Memastikan kualitas pembelajaran tetap terjaga
- Meningkatkan fleksibilitas dalam metode pengajaran

3. RUANG LINGKUP
Kebijakan ini berlaku untuk seluruh civitas akademika Telkom Schools termasuk:
- Guru dan tenaga pengajar
- Siswa dan mahasiswa
- Staf administrasi
- Orang tua dan wali

4. DEFINISI
- Pembelajaran Hybrid: Kombinasi pembelajaran tatap muka dan daring
- Platform Digital: Sistem pembelajaran online yang digunakan
- Konten Digital: Materi pembelajaran dalam format digital

5. IMPLEMENTASI
5.1 Infrastruktur
- Penyediaan platform pembelajaran digital
- Pengadaan perangkat teknologi pendukung
- Pelatihan penggunaan teknologi

5.2 Metode Pembelajaran
- 60% tatap muka, 40% daring
- Fleksibilitas dalam penjadwalan
- Evaluasi berkelanjutan

6. MONITORING DAN EVALUASI
- Evaluasi berkala setiap semester
- Feedback dari semua stakeholder
- Penyesuaian berdasarkan kebutuhan

7. PENUTUP
Kebijakan ini mulai berlaku sejak tanggal ditetapkan dan akan dievaluasi secara berkala.`,
      attachments: [
        { name: 'Panduan_Implementasi_Hybrid.pdf', size: '1.2 MB', type: 'PDF' },
        { name: 'Template_Jadwal_Hybrid.xlsx', size: '0.8 MB', type: 'Excel' },
        { name: 'Checklist_Persiapan_Hybrid.docx', size: '0.5 MB', type: 'Word' }
      ],
      relatedPolicies: [
        'Protokol Kesehatan dan Keselamatan Kerja',
        'Panduan Penggunaan Sistem Informasi Akademik',
        'Kebijakan Evaluasi Kinerja Pegawai'
      ]
    },
    {
      id: '2',
      title: 'Protokol Kesehatan dan Keselamatan Kerja',
      category: 'Keselamatan',
      effectiveDate: '2024-01-10',
      policyNumber: 'TEL/K3/002/2024',
      status: 'active',
      createdBy: 'Ahmad Rizki',
      views: 892,
      confirmations: 87,
      description: 'Standar operasional prosedur untuk menjaga kesehatan dan keselamatan di lingkungan kerja.',
      lastUpdated: '2024-01-10',
      version: '1.3',
      documentSize: '1.8 MB',
      totalViews: 892,
      totalDownloads: 634,
      content: `Protokol Kesehatan dan Keselamatan Kerja

1. TUJUAN
Memastikan kesehatan dan keselamatan semua personel di lingkungan kerja Telkom Schools.

2. RUANG LINGKUP
- Semua area kerja di Telkom Schools
- Semua kegiatan yang melibatkan personel
- Semua peralatan dan fasilitas kerja

3. PROTOKOL DASAR
3.1 Kebersihan Lingkungan
- Pembersihan rutin setiap hari
- Sanitasi area kerja
- Ventilasi yang memadai

3.2 Protokol Kesehatan
- Pemeriksaan kesehatan berkala
- Vaksinasi wajib
- Protokol isolasi jika diperlukan

3.3 Keselamatan Kerja
- Penggunaan APD sesuai kebutuhan
- Prosedur evakuasi darurat
- Pelatihan keselamatan berkala

4. PROSEDUR DARURAT
4.1 Evakuasi
- Rute evakuasi yang jelas
- Titik kumpul yang ditentukan
- Koordinator evakuasi

4.2 Pertolongan Pertama
- Kotak P3K di setiap lantai
- Personel terlatih P3K
- Kontak darurat yang jelas

5. MONITORING
- Inspeksi rutin setiap minggu
- Laporan insiden
- Evaluasi berkala`,
      attachments: [
        { name: 'Prosedur_Evakuasi_Darurat.pdf', size: '0.9 MB', type: 'PDF' },
        { name: 'Checklist_Inspeksi_K3.xlsx', size: '0.6 MB', type: 'Excel' },
        { name: 'Form_Laporan_Insiden.docx', size: '0.3 MB', type: 'Word' }
      ],
      relatedPolicies: [
        'Kebijakan Pembelajaran Hybrid 2024',
        'Panduan Penggunaan Sistem Informasi Akademik'
      ]
    },
    {
      id: '3',
      title: 'Panduan Penggunaan Sistem Informasi Akademik',
      category: 'Teknologi',
      effectiveDate: '2024-01-05',
      policyNumber: 'TEL/TI/003/2024',
      status: 'draft',
      createdBy: 'Linda Wang',
      views: 0,
      confirmations: 0,
      description: 'Petunjuk teknis penggunaan sistem informasi akademik untuk seluruh civitas akademika.',
      lastUpdated: '2024-01-05',
      version: '2.0',
      documentSize: '3.2 MB',
      totalViews: 765,
      totalDownloads: 543,
      content: `Panduan Penggunaan Sistem Informasi Akademik

1. PENDAHULUAN
Sistem Informasi Akademik (SIA) adalah platform digital yang mengintegrasikan seluruh proses akademik di Telkom Schools.

2. FITUR UTAMA
2.1 Manajemen Siswa
- Pendaftaran siswa baru
- Update data siswa
- Riwayat akademik

2.2 Manajemen Guru
- Penjadwalan mengajar
- Input nilai dan absensi
- Laporan kinerja

2.3 Manajemen Kelas
- Pembagian kelas
- Jadwal pelajaran
- Monitoring kehadiran

2.4 Manajemen Akademik
- Kurikulum
- Silabus
- Evaluasi pembelajaran

3. PROSEDUR PENGGUNAAN
3.1 Login dan Keamanan
- Username dan password yang aman
- Two-factor authentication
- Logout otomatis setelah tidak aktif

3.2 Input Data
- Validasi data sebelum simpan
- Backup otomatis
- Version control

3.3 Laporan
- Laporan real-time
- Export ke berbagai format
- Dashboard analitik

4. TROUBLESHOOTING
4.1 Masalah Umum
- Lupa password
- Data tidak tersimpan
- Error sistem

4.2 Kontak Support
- IT Support: ext. 123
- Email: support@telkomschools.sch.id
- Jam kerja: 08:00-17:00 WIB`,
      attachments: [
        { name: 'Manual_Penggunaan_SIA.pdf', size: '2.1 MB', type: 'PDF' },
        { name: 'Video_Tutorial_SIA.mp4', size: '15.2 MB', type: 'Video' },
        { name: 'FAQ_SIA.pdf', size: '0.8 MB', type: 'PDF' }
      ],
      relatedPolicies: [
        'Kebijakan Pembelajaran Hybrid 2024',
        'Protokol Kesehatan dan Keselamatan Kerja'
      ]
    }
  ];

  const approvalWorkflow = [
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
      description: 'Revisi sistem evaluasi pembelajaran untuk meningkatkan kualitas penilaian siswa dengan penambahan metode penilaian berbasis proyek dan portofolio.',
      estimatedDuration: '5-7 hari kerja',
      deadline: '2024-01-22',
      approvers: [
        { 
          name: 'Dr. Michael Chen', 
          level: 1, 
          status: 'approved', 
          date: '2024-01-14',
          role: 'Kepala Bagian Akademik',
          department: 'Akademik',
          comment: 'Setuju dengan revisi, evaluasi lebih komprehensif',
          responseTime: '2 jam'
        },
        { 
          name: 'Prof. Lisa Anderson', 
          level: 2, 
          status: 'pending', 
          date: null,
          role: 'Wakil Kepala Sekolah',
          department: 'Manajemen',
          comment: null,
          responseTime: null
        },
        { 
          name: 'Dr. Robert Kim', 
          level: 3, 
          status: 'waiting', 
          date: null,
          role: 'Kepala Sekolah',
          department: 'Manajemen',
          comment: null,
          responseTime: null
        }
      ]
    },
    {
      id: '2',
      policyTitle: 'Kebijakan Baru: Remote Work Policy',
      submittedBy: 'Ahmad Rizki',
      submittedDate: '2024-01-14',
      currentLevel: 1,
      totalLevels: 2,
      status: 'pending',
      priority: 'medium',
      category: 'HR',
      description: 'Implementasi kebijakan kerja jarak jauh untuk meningkatkan fleksibilitas kerja pegawai dengan maksimal 3 hari remote per minggu.',
      estimatedDuration: '3-5 hari kerja',
      deadline: '2024-01-19',
      approvers: [
        { 
          name: 'Dr. Sarah Johnson', 
          level: 1, 
          status: 'pending', 
          date: null,
          role: 'Kepala Bagian HR',
          department: 'SDM',
          comment: null,
          responseTime: null
        },
        { 
          name: 'Prof. Lisa Anderson', 
          level: 2, 
          status: 'waiting', 
          date: null,
          role: 'Wakil Kepala Sekolah',
          department: 'Manajemen',
          comment: null,
          responseTime: null
        }
      ]
    },
    {
      id: '3',
      policyTitle: 'Update Protokol Keamanan Data',
      submittedBy: 'Linda Wang',
      submittedDate: '2024-01-13',
      currentLevel: 1,
      totalLevels: 3,
      status: 'pending',
      priority: 'high',
      category: 'IT Security',
      description: 'Update protokol keamanan data untuk mengatasi ancaman keamanan siber terbaru dengan implementasi two-factor authentication dan enkripsi end-to-end.',
      estimatedDuration: '7-10 hari kerja',
      deadline: '2024-01-23',
      approvers: [
        { 
          name: 'Ahmad Rizki', 
          level: 1, 
          status: 'pending', 
          date: null,
          role: 'Kepala IT',
          department: 'IT',
          comment: null,
          responseTime: null
        },
        { 
          name: 'Dr. Sarah Johnson', 
          level: 2, 
          status: 'waiting', 
          date: null,
          role: 'Kepala Bagian HR',
          department: 'SDM',
          comment: null,
          responseTime: null
        },
        { 
          name: 'Prof. Lisa Anderson', 
          level: 3, 
          status: 'waiting', 
          date: null,
          role: 'Wakil Kepala Sekolah',
          department: 'Manajemen',
          comment: null,
          responseTime: null
        }
      ]
    }
  ];

  const policyVersions = [
    {
      id: '1',
      policyTitle: 'Kebijakan Pembelajaran Hybrid 2024',
      version: '2.1',
      changes: 'Penambahan protokol untuk pembelajaran outdoor',
      createdBy: 'Dr. Sarah Johnson',
      createdDate: '2024-01-15',
      status: 'active',
      content: `Kebijakan Pembelajaran Hybrid 2024 v2.1

1. PENDAHULUAN
Kebijakan ini mengatur implementasi pembelajaran hybrid di Telkom Schools untuk meningkatkan efektivitas pendidikan dan adaptasi terhadap perkembangan teknologi.

2. TUJUAN
- Meningkatkan aksesibilitas pembelajaran
- Mengoptimalkan penggunaan teknologi pendidikan
- Memastikan kualitas pembelajaran tetap terjaga
- Meningkatkan fleksibilitas dalam metode pengajaran

3. RUANG LINGKUP
Kebijakan ini berlaku untuk seluruh civitas akademika Telkom Schools termasuk:
- Guru dan tenaga pengajar
- Siswa dan mahasiswa
- Staf administrasi
- Orang tua dan wali

4. DEFINISI
- Pembelajaran Hybrid: Kombinasi pembelajaran tatap muka dan daring
- Platform Digital: Sistem pembelajaran online yang digunakan
- Konten Digital: Materi pembelajaran dalam format digital

5. IMPLEMENTASI
5.1 Infrastruktur
- Penyediaan platform pembelajaran digital
- Pengadaan perangkat teknologi pendukung
- Pelatihan penggunaan teknologi

5.2 Metode Pembelajaran
- 60% tatap muka, 40% daring
- Fleksibilitas dalam penjadwalan
- Evaluasi berkelanjutan

5.3 Protokol Pembelajaran Outdoor
- Pembelajaran di luar ruangan dengan teknologi
- Protokol keselamatan outdoor
- Monitoring aktivitas outdoor

6. MONITORING DAN EVALUASI
- Evaluasi berkala setiap semester
- Feedback dari semua stakeholder
- Penyesuaian berdasarkan kebutuhan

7. PENUTUP
Kebijakan ini mulai berlaku sejak tanggal ditetapkan dan akan dievaluasi secara berkala.`,
      previousVersion: '2.0',
      previousContent: `Kebijakan Pembelajaran Hybrid 2024 v2.0

1. PENDAHULUAN
Kebijakan ini mengatur implementasi pembelajaran hybrid di Telkom Schools untuk meningkatkan efektivitas pendidikan dan adaptasi terhadap perkembangan teknologi.

2. TUJUAN
- Meningkatkan aksesibilitas pembelajaran
- Mengoptimalkan penggunaan teknologi pendidikan
- Memastikan kualitas pembelajaran tetap terjaga
- Meningkatkan fleksibilitas dalam metode pengajaran

3. RUANG LINGKUP
Kebijakan ini berlaku untuk seluruh civitas akademika Telkom Schools termasuk:
- Guru dan tenaga pengajar
- Siswa dan mahasiswa
- Staf administrasi
- Orang tua dan wali

4. DEFINISI
- Pembelajaran Hybrid: Kombinasi pembelajaran tatap muka dan daring
- Platform Digital: Sistem pembelajaran online yang digunakan
- Konten Digital: Materi pembelajaran dalam format digital

5. IMPLEMENTASI
5.1 Infrastruktur
- Penyediaan platform pembelajaran digital
- Pengadaan perangkat teknologi pendukung
- Pelatihan penggunaan teknologi

5.2 Metode Pembelajaran
- 60% tatap muka, 40% daring
- Fleksibilitas dalam penjadwalan
- Evaluasi berkelanjutan

6. MONITORING DAN EVALUASI
- Evaluasi berkala setiap semester
- Feedback dari semua stakeholder
- Penyesuaian berdasarkan kebutuhan

7. PENUTUP
Kebijakan ini mulai berlaku sejak tanggal ditetapkan dan akan dievaluasi secara berkala.`
    },
    {
      id: '2',
      policyTitle: 'Kebijakan Pembelajaran Hybrid 2024',
      version: '2.0',
      changes: 'Revisi major untuk adaptasi teknologi baru',
      createdBy: 'Dr. Sarah Johnson',
      createdDate: '2024-01-01',
      status: 'archived',
      content: `Kebijakan Pembelajaran Hybrid 2024 v2.0

1. PENDAHULUAN
Kebijakan ini mengatur implementasi pembelajaran hybrid di Telkom Schools untuk meningkatkan efektivitas pendidikan dan adaptasi terhadap perkembangan teknologi.

2. TUJUAN
- Meningkatkan aksesibilitas pembelajaran
- Mengoptimalkan penggunaan teknologi pendidikan
- Memastikan kualitas pembelajaran tetap terjaga
- Meningkatkan fleksibilitas dalam metode pengajaran

3. RUANG LINGKUP
Kebijakan ini berlaku untuk seluruh civitas akademika Telkom Schools termasuk:
- Guru dan tenaga pengajar
- Siswa dan mahasiswa
- Staf administrasi
- Orang tua dan wali

4. DEFINISI
- Pembelajaran Hybrid: Kombinasi pembelajaran tatap muka dan daring
- Platform Digital: Sistem pembelajaran online yang digunakan
- Konten Digital: Materi pembelajaran dalam format digital

5. IMPLEMENTASI
5.1 Infrastruktur
- Penyediaan platform pembelajaran digital
- Pengadaan perangkat teknologi pendukung
- Pelatihan penggunaan teknologi

5.2 Metode Pembelajaran
- 60% tatap muka, 40% daring
- Fleksibilitas dalam penjadwalan
- Evaluasi berkelanjutan

6. MONITORING DAN EVALUASI
- Evaluasi berkala setiap semester
- Feedback dari semua stakeholder
- Penyesuaian berdasarkan kebutuhan

7. PENUTUP
Kebijakan ini mulai berlaku sejak tanggal ditetapkan dan akan dievaluasi secara berkala.`,
      previousVersion: '1.0',
      previousContent: `Kebijakan Pembelajaran Hybrid 2024 v1.0

1. PENDAHULUAN
Kebijakan pembelajaran hybrid untuk Telkom Schools.

2. TUJUAN
- Meningkatkan aksesibilitas pembelajaran
- Mengoptimalkan penggunaan teknologi pendidikan

3. RUANG LINGKUP
Kebijakan ini berlaku untuk seluruh civitas akademika Telkom Schools.

4. IMPLEMENTASI
4.1 Infrastruktur
- Penyediaan platform pembelajaran digital
- Pengadaan perangkat teknologi pendukung

4.2 Metode Pembelajaran
- 50% tatap muka, 50% daring
- Evaluasi berkelanjutan

5. MONITORING DAN EVALUASI
- Evaluasi berkala setiap semester
- Feedback dari stakeholder

6. PENUTUP
Kebijakan ini mulai berlaku sejak tanggal ditetapkan.`
    },
    {
      id: '3',
      policyTitle: 'Protokol Kesehatan K3',
      version: '1.3',
      changes: 'Update prosedur emergency response',
      createdBy: 'Ahmad Rizki',
      createdDate: '2024-01-10',
      status: 'active',
      content: `Protokol Kesehatan K3 v1.3

1. TUJUAN
Memastikan kesehatan dan keselamatan semua personel di lingkungan kerja Telkom Schools.

2. RUANG LINGKUP
- Semua area kerja di Telkom Schools
- Semua kegiatan yang melibatkan personel
- Semua peralatan dan fasilitas kerja

3. PROTOKOL DASAR
3.1 Kebersihan Lingkungan
- Pembersihan rutin setiap hari
- Sanitasi area kerja
- Ventilasi yang memadai

3.2 Protokol Kesehatan
- Pemeriksaan kesehatan berkala
- Vaksinasi wajib
- Protokol isolasi jika diperlukan

3.3 Keselamatan Kerja
- Penggunaan APD sesuai kebutuhan
- Prosedur evakuasi darurat
- Pelatihan keselamatan berkala

4. PROSEDUR DARURAT
4.1 Evakuasi
- Rute evakuasi yang jelas
- Titik kumpul yang ditentukan
- Koordinator evakuasi

4.2 Pertolongan Pertama
- Kotak P3K di setiap lantai
- Personel terlatih P3K
- Kontak darurat yang jelas

4.3 Emergency Response
- Protokol tanggap darurat
- Tim emergency response
- Komunikasi darurat

5. MONITORING
- Inspeksi rutin setiap minggu
- Laporan insiden
- Evaluasi berkala`,
      previousVersion: '1.2',
      previousContent: `Protokol Kesehatan K3 v1.2

1. TUJUAN
Memastikan kesehatan dan keselamatan semua personel di lingkungan kerja Telkom Schools.

2. RUANG LINGKUP
- Semua area kerja di Telkom Schools
- Semua kegiatan yang melibatkan personel
- Semua peralatan dan fasilitas kerja

3. PROTOKOL DASAR
3.1 Kebersihan Lingkungan
- Pembersihan rutin setiap hari
- Sanitasi area kerja
- Ventilasi yang memadai

3.2 Protokol Kesehatan
- Pemeriksaan kesehatan berkala
- Vaksinasi wajib
- Protokol isolasi jika diperlukan

3.3 Keselamatan Kerja
- Penggunaan APD sesuai kebutuhan
- Prosedur evakuasi darurat
- Pelatihan keselamatan berkala

4. PROSEDUR DARURAT
4.1 Evakuasi
- Rute evakuasi yang jelas
- Titik kumpul yang ditentukan
- Koordinator evakuasi

4.2 Pertolongan Pertama
- Kotak P3K di setiap lantai
- Personel terlatih P3K
- Kontak darurat yang jelas

5. MONITORING
- Inspeksi rutin setiap minggu
- Laporan insiden
- Evaluasi berkala`
    }
  ];

  const systemUsers = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@telkomschools.sch.id',
      role: 'admin',
      department: 'Manajemen Kebijakan',
      lastLogin: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Ahmad Rizki',
      email: 'ahmad.rizki@telkomschools.sch.id',
      role: 'editor',
      department: 'IT Department',
      lastLogin: '2024-01-15',
      status: 'active'
    },
    {
      id: '3',
      name: 'Linda Wang',
      email: 'linda.wang@telkomschools.sch.id',
      role: 'approver',
      department: 'Akademik',
      lastLogin: '2024-01-14',
      status: 'active'
    },
    {
      id: '4',
      name: 'John Doe',
      email: 'john.doe@telkomschools.sch.id',
      role: 'user',
      department: 'IT Department',
      lastLogin: '2024-01-15',
      status: 'active'
    }
  ];

  const auditLogs = [
    {
      id: '1',
      user: 'Dr. Sarah Johnson',
      action: 'Membuat kebijakan baru',
      details: 'Kebijakan Pembelajaran Hybrid 2024',
      timestamp: '2024-01-15 10:30:00',
      type: 'create'
    },
    {
      id: '2',
      user: 'Ahmad Rizki',
      action: 'Mengupload dokumen',
      details: 'Protokol K3 v1.3.pdf',
      timestamp: '2024-01-15 09:15:00',
      type: 'upload'
    },
    {
      id: '3',
      user: 'Linda Wang',
      action: 'Menyetujui kebijakan',
      details: 'Kebijakan Evaluasi Pembelajaran',
      timestamp: '2024-01-14 16:45:00',
      type: 'approve'
    },
    {
      id: '4',
      user: 'John Doe',
      action: 'Mengunduh dokumen',
      details: 'Panduan SIA v2.0.pdf',
      timestamp: '2024-01-14 14:20:00',
      type: 'download'
    }
  ];

  const filteredPolicies = allPolicies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         policy.policyNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewPolicy = (policy: any) => {
    // Jika policy dari beranda (recentPolicies), cari data lengkap dari allPolicies
    if (!policy.content) {
      const fullPolicy = allPolicies.find(p => p.id === policy.id);
      if (fullPolicy) {
        setSelectedPolicy(fullPolicy);
      } else {
        setSelectedPolicy(policy);
      }
    } else {
      setSelectedPolicy(policy);
    }
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
    // Simulasi pengiriman email
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
                      <Button size="sm" variant="outline" onClick={() => handleViewPolicy(item)}>
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
            <Button className="w-full mt-4" variant="outline" onClick={() => setActiveMenuItem('approval')}>
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
            <Button className="w-full mt-4" variant="outline" onClick={() => setActiveMenuItem('audit')}>
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
      </div>
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
              <Label htmlFor="search">Pencarian</Label>
              <Input
                id="search"
                placeholder="Cari kebijakan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Kategori</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="Akademik">Akademik</SelectItem>
                  <SelectItem value="Keselamatan">Keselamatan</SelectItem>
                  <SelectItem value="Teknologi">Teknologi</SelectItem>
                  <SelectItem value="SDM">SDM</SelectItem>
                  <SelectItem value="Keuangan">Keuangan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Reset Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policies Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Kebijakan</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Nomor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dibuat Oleh</TableHead>
                <TableHead>Statistik</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{policy.title}</p>
                      <p className="text-sm text-gray-500">
                        Berlaku: {new Date(policy.effectiveDate).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{policy.category}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{policy.policyNumber}</TableCell>
                  <TableCell>
                    <Badge variant={policy.status === 'active' ? 'default' : 'secondary'}>
                      {policy.status === 'active' ? 'Aktif' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell>{policy.createdBy}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{policy.views} views</p>
                      <p>{policy.confirmations}% confirmed</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" onClick={() => handleViewPolicy(policy)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Policy Modal */}
      {isAddingPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Tambah Kebijakan Baru
                <Button variant="ghost" size="sm" onClick={() => setIsAddingPolicy(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Judul Kebijakan</Label>
                  <Input id="title" placeholder="Masukkan judul kebijakan" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Kategori</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="akademik">Akademik</SelectItem>
                        <SelectItem value="keselamatan">Keselamatan</SelectItem>
                        <SelectItem value="teknologi">Teknologi</SelectItem>
                        <SelectItem value="sdm">SDM</SelectItem>
                        <SelectItem value="keuangan">Keuangan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="effectiveDate">Tanggal Berlaku</Label>
                    <Input id="effectiveDate" type="date" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea id="description" placeholder="Masukkan deskripsi kebijakan" rows={3} />
                </div>
                <div>
                  <Label htmlFor="document">Upload Dokumen</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drag & drop file atau klik untuk browse</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOCX (Max 10MB)</p>
                  </div>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Simpan sebagai Draft
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Kirim untuk Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );

  const renderApprovalWorkflow = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Approval Workflow</h1>
        <p className="text-gray-600">Kelola proses persetujuan kebijakan dengan informasi detail</p>
      </div>

      <div className="space-y-6">
        {approvalWorkflow.map((workflow) => (
          <Card key={workflow.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                  <CardTitle className="text-lg">{workflow.policyTitle}</CardTitle>
                    <Badge variant={
                      workflow.priority === 'high' ? 'destructive' :
                      workflow.priority === 'medium' ? 'secondary' : 'outline'
                    }>
                      {workflow.priority === 'high' ? 'Prioritas Tinggi' :
                       workflow.priority === 'medium' ? 'Prioritas Sedang' : 'Prioritas Rendah'}
                    </Badge>
                    <Badge variant="outline">{workflow.category}</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    Diajukan oleh <strong>{workflow.submittedBy}</strong> pada {new Date(workflow.submittedDate).toLocaleDateString('id-ID')}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant={workflow.status === 'pending' ? 'secondary' : 'default'} className="mb-2">
                  Level {workflow.currentLevel} dari {workflow.totalLevels}
                </Badge>
                  <div className="text-xs text-gray-500">
                    Deadline: {new Date(workflow.deadline).toLocaleDateString('id-ID')}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Policy Description */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Deskripsi Kebijakan</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{workflow.description}</p>
              </div>

              {/* Progress and Timeline */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Progress Approval</h4>
                  <span className="text-sm text-gray-500">
                    {Math.round((workflow.currentLevel / workflow.totalLevels) * 100)}% Selesai
                  </span>
                </div>
                <div className="flex items-center space-x-4 mb-3">
                  <Progress value={(workflow.currentLevel / workflow.totalLevels) * 100} className="flex-1" />
                  <span className="text-sm text-gray-500">
                    {workflow.currentLevel}/{workflow.totalLevels} Level
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Estimasi: {workflow.estimatedDuration}</span>
                  <span>•</span>
                  <span>Deadline: {new Date(workflow.deadline).toLocaleDateString('id-ID')}</span>
                </div>
                </div>
                
              {/* Approvers Grid */}
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
                      </div>
                      <Badge variant={
                        approver.status === 'approved' ? 'default' :
                        approver.status === 'pending' ? 'secondary' : 'outline'
                      } className="text-xs">
                        {approver.status === 'approved' ? 'Disetujui' :
                         approver.status === 'pending' ? 'Menunggu' : 'Antrian'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{approver.name}</p>
                        <p className="text-xs text-gray-600">{approver.role}</p>
                        <p className="text-xs text-gray-500">{approver.department}</p>
                      </div>
                      
                      {approver.date && (
                        <div className="pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500">
                            Disetujui: {new Date(approver.date).toLocaleDateString('id-ID')}
                          </p>
                          {approver.responseTime && (
                            <p className="text-xs text-green-600">
                              Response time: {approver.responseTime}
                        </p>
                      )}
                        </div>
                      )}
                      
                      {approver.comment && (
                        <div className="pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-600 italic">
                            &ldquo;{approver.comment}&rdquo;
                          </p>
                        </div>
                      )}
                      
                      {approver.status === 'pending' && (
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
                    </div>
                    </div>
                  ))}
                </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <Button size="sm" variant="outline" onClick={() => handleViewWorkflowDetail(workflow)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );

  const renderVersionManagement = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Versi</h1>
        <p className="text-gray-600">Kelola riwayat perubahan dan versi kebijakan</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kebijakan</TableHead>
                <TableHead>Versi</TableHead>
                <TableHead>Perubahan</TableHead>
                <TableHead>Dibuat Oleh</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policyVersions.map((version) => (
                <TableRow key={version.id}>
                  <TableCell>
                    <p className="font-medium">{version.policyTitle}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      v{version.version}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600">{version.changes}</p>
                  </TableCell>
                  <TableCell>{version.createdBy}</TableCell>
                  <TableCell>{new Date(version.createdDate).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>
                    <Badge variant={version.status === 'active' ? 'default' : 'secondary'}>
                      {version.status === 'active' ? 'Aktif' : 'Arsip'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" onClick={() => handleViewVersionComparison(version)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <GitBranch className="h-4 w-4" />
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

  const renderAnalytics = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pelaporan & Analitik</h1>
        <p className="text-gray-600">Analisis komprehensif tingkat pembacaan, kepatuhan, dan performa kebijakan</p>
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
                <CheckCircle className="h-6 w-6 text-yellow-600" />
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
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">New Policies</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-xs text-green-600">+20% dari bulan lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                      <Button size="sm" variant="outline" onClick={() => handleViewPolicy(policy)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={policy.confirmations} className="flex-1" />
                    <span className="text-xs text-gray-500">{policy.confirmations}%</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Konfirmasi pembacaan: {policy.confirmations}% dari total pengguna
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
                  <Progress value={95} className="w-20" />
                  <span className="text-sm font-medium text-green-600">95%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                <span className="font-medium">Academic</span>
                  <p className="text-xs text-gray-500">78 pengguna aktif</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={89} className="w-20" />
                  <span className="text-sm font-medium text-blue-600">89%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                <span className="font-medium">HR</span>
                  <p className="text-xs text-gray-500">32 pengguna aktif</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={82} className="w-20" />
                  <span className="text-sm font-medium text-yellow-600">82%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                <span className="font-medium">Finance</span>
                  <p className="text-xs text-gray-500">28 pengguna aktif</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={78} className="w-20" />
                  <span className="text-sm font-medium text-red-600">78%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-purple-600" />
              Aktivitas Harian
            </CardTitle>
            <CardDescription>Trend aktivitas pengguna dalam 7 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div>
                  <span className="font-medium">Hari Ini</span>
                  <p className="text-xs text-gray-500">15 Januari 2024</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">234</div>
                  <p className="text-xs text-gray-500">aktivitas</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <span className="font-medium">Kemarin</span>
                  <p className="text-xs text-gray-500">14 Januari 2024</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">198</div>
                  <p className="text-xs text-gray-500">aktivitas</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <span className="font-medium">Rata-rata</span>
                  <p className="text-xs text-gray-500">7 hari terakhir</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">187</div>
                  <p className="text-xs text-gray-500">aktivitas/hari</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-orange-600" />
              Waktu Akses
            </CardTitle>
            <CardDescription>Analisis waktu akses paling populer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <span className="font-medium">Pukul 09:00-11:00</span>
                  <p className="text-xs text-gray-500">Waktu kerja pagi</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-orange-600">45%</div>
                  <p className="text-xs text-gray-500">dari total akses</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <span className="font-medium">Pukul 14:00-16:00</span>
                  <p className="text-xs text-gray-500">Waktu kerja siang</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">32%</div>
                  <p className="text-xs text-gray-500">dari total akses</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <span className="font-medium">Pukul 08:00-09:00</span>
                  <p className="text-xs text-gray-500">Waktu kerja awal</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">23%</div>
                  <p className="text-xs text-gray-500">dari total akses</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-indigo-600" />
            Metrik Performa Bulanan
          </CardTitle>
          <CardDescription>Perbandingan performa dengan bulan sebelumnya</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <p className="text-sm text-blue-800">Total Views</p>
              <p className="text-xs text-green-600">+12% dari Desember</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">892</div>
              <p className="text-sm text-green-800">Downloads</p>
              <p className="text-xs text-green-600">+8% dari Desember</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">156</div>
              <p className="text-sm text-yellow-800">Confirmations</p>
              <p className="text-xs text-green-600">+15% dari Desember</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">24</div>
              <p className="text-sm text-purple-800">New Policies</p>
              <p className="text-xs text-green-600">+20% dari Desember</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
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

  const renderUserManagement = () => (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Pengguna</h1>
          <p className="text-gray-600">Kelola pengguna dan hak akses sistem</p>
        </div>
        <Button onClick={() => setIsAddingUser(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pengguna</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead>Login Terakhir</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + parseInt(user.id)}?w=50&h=50&fit=crop&crop=face`} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={
                      user.role === 'admin' ? 'default' :
                      user.role === 'editor' ? 'secondary' :
                      user.role === 'approver' ? 'outline' : 'secondary'
                    }>
                      {user.role === 'admin' ? 'Admin' :
                       user.role === 'editor' ? 'Editor' :
                       user.role === 'approver' ? 'Approver' : 'User'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{new Date(user.lastLogin).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" onClick={() => handleViewUser(user)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditUser(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleSendEmail(user)}>
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteUser(user)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add User Modal */}
      {isAddingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Tambah Pengguna Baru
                <Button variant="ghost" size="sm" onClick={() => setIsAddingUser(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="userName">Nama Lengkap</Label>
                  <Input id="userName" placeholder="Masukkan nama lengkap" />
                </div>
                <div>
                  <Label htmlFor="userEmail">Email</Label>
                  <Input id="userEmail" type="email" placeholder="nama@telkomschools.sch.id" />
                </div>
                <div>
                  <Label htmlFor="userRole">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="approver">Approver</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="userDepartment">Departemen</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih departemen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT Department</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Simpan
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setIsAddingUser(false)}>
                    Batal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );

  const renderAuditTrail = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Trail</h1>
        <p className="text-gray-600">Log aktivitas semua pengguna sistem</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="dateFrom">Dari Tanggal</Label>
              <Input id="dateFrom" type="date" />
            </div>
            <div>
              <Label htmlFor="dateTo">Sampai Tanggal</Label>
              <Input id="dateTo" type="date" />
            </div>
            <div>
              <Label htmlFor="actionType">Tipe Aksi</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Semua aksi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Aksi</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="upload">Upload</SelectItem>
                  <SelectItem value="approve">Approve</SelectItem>
                  <SelectItem value="download">Download</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Aksi</TableHead>
                <TableHead>Detail</TableHead>
                <TableHead>Tipe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="text-sm text-gray-600">{log.details}</TableCell>
                  <TableCell>
                    <Badge variant={
                      log.type === 'create' ? 'default' :
                      log.type === 'upload' ? 'secondary' :
                      log.type === 'approve' ? 'outline' : 'secondary'
                    }>
                      {log.type}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );

  const renderSettings = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengaturan Sistem</h1>
        <p className="text-gray-600">Konfigurasi sistem dan branding</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>Atur logo dan warna sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Nama Perusahaan</Label>
                <Input id="companyName" defaultValue="Telkom Schools" />
              </div>
              <div>
                <Label htmlFor="primaryColor">Warna Utama</Label>
                <Input id="primaryColor" type="color" defaultValue="#0052CC" />
              </div>
              <div>
                <Label htmlFor="logo">Logo Perusahaan</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload logo (PNG, JPG)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifikasi</CardTitle>
            <CardDescription>Pengaturan notifikasi sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotif">Notifikasi Email</Label>
                  <p className="text-sm text-gray-500">Kirim notifikasi via email</p>
                </div>
                <Switch id="emailNotif" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoReminder">Pengingat Otomatis</Label>
                  <p className="text-sm text-gray-500">Kirim pengingat kebijakan baru</p>
                </div>
                <Switch id="autoReminder" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyReport">Laporan Mingguan</Label>
                  <p className="text-sm text-gray-500">Kirim laporan aktivitas mingguan</p>
                </div>
                <Switch id="weeklyReport" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keamanan</CardTitle>
            <CardDescription>Pengaturan keamanan sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (menit)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="60" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Wajibkan 2FA untuk admin</p>
                </div>
                <Switch id="twoFactor" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auditLog">Audit Logging</Label>
                  <p className="text-sm text-gray-500">Catat semua aktivitas pengguna</p>
                </div>
                <Switch id="auditLog" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrasi</CardTitle>
            <CardDescription>Integrasi dengan sistem eksternal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="hrisUrl">HRIS API URL</Label>
                <Input id="hrisUrl" placeholder="https://hris.telkomschools.sch.id/api" />
              </div>
              <div>
                <Label htmlFor="ssoProvider">SSO Provider</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih SSO provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Tidak ada</SelectItem>
                    <SelectItem value="google">Google Workspace</SelectItem>
                    <SelectItem value="azure">Azure AD</SelectItem>
                    <SelectItem value="okta">Okta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoSync">Auto Sync Users</Label>
                  <p className="text-sm text-gray-500">Sinkronisasi otomatis dengan HRIS</p>
                </div>
                <Switch id="autoSync" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex space-x-2">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Simpan Pengaturan
            </Button>
            <Button variant="outline">
              Reset ke Default
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderPolicyDetailModal = () => {
    if (!selectedPolicy) return null;

    return (
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
              <Button variant="ghost" size="sm" onClick={handleClosePolicyDetail}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Policy Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">
                    {selectedPolicy.status === 'pending' ? 'Diajukan Oleh' : 'Dibuat Oleh'}
                  </div>
                  <div className="font-medium">{selectedPolicy.submittedBy || selectedPolicy.createdBy || 'Tidak tersedia'}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">Versi</div>
                  <div className="font-medium">v{selectedPolicy.version || '1.0'}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">
                    {selectedPolicy.status === 'pending' ? 'Tanggal Pengajuan' : 'Ukuran Dokumen'}
                  </div>
                  <div className="font-medium">
                    {selectedPolicy.status === 'pending' 
                      ? new Date(selectedPolicy.submittedDate).toLocaleDateString('id-ID')
                      : selectedPolicy.documentSize || 'Tidak tersedia'
                    }
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">Status</div>
                  <Badge variant={
                    selectedPolicy.status === 'active' ? 'default' : 
                    selectedPolicy.status === 'pending' ? 'destructive' : 'secondary'
                  }>
                    {selectedPolicy.status === 'active' ? 'Aktif' : 
                     selectedPolicy.status === 'pending' ? 'Menunggu Approval' : 'Draft'}
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
                    <div className="text-2xl font-bold text-blue-600">{selectedPolicy.totalViews || 0}</div>
                    <div className="text-sm text-gray-600">Total Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedPolicy.totalDownloads || 0}</div>
                    <div className="text-sm text-gray-600">Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedPolicy.confirmations || 0}%</div>
                    <div className="text-sm text-gray-600">Konfirmasi Pembacaan</div>
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

            {/* Attachments */}
            {selectedPolicy.attachments && selectedPolicy.attachments.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Lampiran</CardTitle>
                  <CardDescription>Dokumen pendukung terkait kebijakan ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedPolicy.attachments.map((attachment: any, index: any) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{attachment.name}</div>
                            <div className="text-sm text-gray-500">{attachment.size} • {attachment.type}</div>
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

            {/* Related Policies */}
            {selectedPolicy.relatedPolicies && selectedPolicy.relatedPolicies.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Kebijakan Terkait</CardTitle>
                  <CardDescription>Kebijakan lain yang mungkin relevan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedPolicy.relatedPolicies?.map((relatedPolicy: any, index: any) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-400" />
                          <span className="font-medium">{relatedPolicy}</span>
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

            {/* Admin Actions */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Aksi Admin</CardTitle>
                <CardDescription>
                  {selectedPolicy.status === 'pending' ? 'Review dan approval kebijakan' : 'Kelola kebijakan ini'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedPolicy.status === 'pending' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">Approve</h4>
                      <p className="text-sm text-green-700 mb-3">Setujui dan terbitkan kebijakan ini</p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-medium text-red-900 mb-2">Reject</h4>
                      <p className="text-sm text-red-700 mb-3">Tolak kebijakan dengan alasan</p>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">Publish</h4>
                      <p className="text-sm text-green-700 mb-3">Terbitkan kebijakan ke semua pengguna</p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Publish
                      </Button>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Edit</h4>
                      <p className="text-sm text-blue-700 mb-3">Edit konten dan pengaturan kebijakan</p>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-medium text-red-900 mb-2">Archive</h4>
                      <p className="text-sm text-red-700 mb-3">Arsipkan kebijakan yang tidak aktif</p>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-6 border-t">
              <Button className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Unduh Kebijakan
              </Button>
              <Button variant="outline" className="flex-1">
                <BarChart3 className="h-4 w-4 mr-2" />
                Lihat Analitik
              </Button>
              <Button variant="outline" onClick={handleClosePolicyDetail}>
                Tutup
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVersionComparisonModal = () => {
    if (!selectedVersion) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Perbandingan Versi</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    {selectedVersion.policyTitle}
                  </span>
                  <span className="flex items-center">
                    <GitBranch className="h-4 w-4 mr-1" />
                    v{selectedVersion.previousVersion} → v{selectedVersion.version}
                  </span>
                  <Badge variant="secondary">{selectedVersion.changes}</Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCloseVersionComparison}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Version Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">Versi Sebelumnya</div>
                  <div className="font-medium">v{selectedVersion.previousVersion}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">Versi Saat Ini</div>
                  <div className="font-medium">v{selectedVersion.version}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">Perubahan</div>
                  <div className="font-medium">{selectedVersion.changes}</div>
                </CardContent>
              </Card>
            </div>

            {/* Content Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Previous Version */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GitBranch className="mr-2 h-5 w-5 text-gray-600" />
                    Versi {selectedVersion.previousVersion}
                  </CardTitle>
                  <CardDescription>Konten versi sebelumnya</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
                      {selectedVersion.previousContent}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Current Version */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-600" />
                    Versi {selectedVersion.version}
                  </CardTitle>
                  <CardDescription>Konten versi saat ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-blue-50 p-4 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
                      {selectedVersion.content}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Version Details */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Detail Versi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Informasi Versi {selectedVersion.version}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dibuat Oleh:</span>
                        <span>{selectedVersion.createdBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tanggal Dibuat:</span>
                        <span>{new Date(selectedVersion.createdDate).toLocaleDateString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge variant={selectedVersion.status === 'active' ? 'default' : 'secondary'}>
                          {selectedVersion.status === 'active' ? 'Aktif' : 'Arsip'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Ringkasan Perubahan</h4>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Perubahan Utama:</strong> {selectedVersion.changes}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-6 border-t">
              <Button className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Unduh Versi {selectedVersion.version}
              </Button>
              <Button variant="outline" className="flex-1">
                <GitBranch className="h-4 w-4 mr-2" />
                Buat Versi Baru
              </Button>
              <Button variant="outline" onClick={handleCloseVersionComparison}>
                Tutup
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderUserDetailModal = () => {
    if (!selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                                 <Avatar className="h-16 w-16">
                   <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + parseInt(selectedUser.id)}?w=100&h=100&fit=crop&crop=face`} />
                   <AvatarFallback>{selectedUser.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                 </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCloseUserDetail}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* User Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Informasi Pengguna</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600 block mb-1">Nama Lengkap</span>
                        <span className="font-medium text-gray-900">{selectedUser.name}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 block mb-1">Email</span>
                        <span className="font-medium text-gray-900 break-all">{selectedUser.email}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600 block mb-1">Role</span>
                        <Badge variant={
                          selectedUser.role === 'admin' ? 'default' :
                          selectedUser.role === 'editor' ? 'secondary' :
                          selectedUser.role === 'approver' ? 'outline' : 'secondary'
                        }>
                          {selectedUser.role === 'admin' ? 'Admin' :
                           selectedUser.role === 'editor' ? 'Editor' :
                           selectedUser.role === 'approver' ? 'Approver' : 'User'}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 block mb-1">Status</span>
                        <Badge variant={selectedUser.status === 'active' ? 'default' : 'secondary'}>
                          {selectedUser.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600 block mb-1">Departemen</span>
                        <span className="font-medium text-gray-900">{selectedUser.department}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 block mb-1">Login Terakhir</span>
                        <span className="font-medium text-gray-900">{new Date(selectedUser.lastLogin).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Login ke sistem</p>
                        <p className="text-xs text-gray-500">Hari ini, 09:30</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Mengunduh dokumen</p>
                        <p className="text-xs text-gray-500">Kemarin, 15:45</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Menyetujui kebijakan</p>
                        <p className="text-xs text-gray-500">2 hari lalu</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-6 border-t">
              <Button onClick={() => handleEditUser(selectedUser)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Pengguna
              </Button>
              <Button variant="outline" onClick={() => handleSendEmail(selectedUser)}>
                <Mail className="h-4 w-4 mr-2" />
                Kirim Email
              </Button>
              <Button variant="outline" onClick={() => handleDeleteUser(selectedUser)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus Pengguna
              </Button>
              <Button variant="outline" onClick={handleCloseUserDetail}>
                Tutup
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEditUserModal = () => {
    if (!selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Pengguna</h2>
              <Button variant="ghost" size="sm" onClick={handleCloseEditUser}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Edit Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="editUserName">Nama Lengkap</Label>
                <Input id="editUserName" defaultValue={selectedUser.name} />
              </div>
              <div>
                <Label htmlFor="editUserEmail">Email</Label>
                <Input id="editUserEmail" type="email" defaultValue={selectedUser.email} />
              </div>
              <div>
                <Label htmlFor="editUserRole">Role</Label>
                <Select defaultValue={selectedUser.role}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="approver">Approver</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="editUserDepartment">Departemen</Label>
                <Input id="editUserDepartment" defaultValue={selectedUser.department} />
              </div>
              <div>
                <Label htmlFor="editUserStatus">Status</Label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Nonaktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-6 border-t">
              <Button className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Simpan Perubahan
              </Button>
              <Button variant="outline" onClick={handleCloseEditUser}>
                Batal
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDeleteUserModal = () => {
    if (!selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Hapus Pengguna</h2>
              <Button variant="ghost" size="sm" onClick={handleCloseDeleteUser}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Warning Message */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Konfirmasi Penghapusan</h3>
                  <p className="text-sm text-gray-600">Tindakan ini tidak dapat dibatalkan</p>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-800">
                  Anda yakin ingin menghapus pengguna <strong>{selectedUser.name}</strong>?
                </p>
                <p className="text-sm text-red-700 mt-2">
                  Semua data pengguna akan dihapus secara permanen.
                </p>
              </div>
            </div>

            {/* User Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                                 <Avatar className="h-10 w-10">
                   <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + parseInt(selectedUser.id)}?w=50&h=50&fit=crop&crop=face`} />
                   <AvatarFallback>{selectedUser.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                 </Avatar>
                <div>
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                  <p className="text-sm text-gray-600">{selectedUser.department}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button variant="destructive" className="flex-1">
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus Pengguna
              </Button>
              <Button variant="outline" onClick={handleCloseDeleteUser}>
                Batal
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWorkflowDetailModal = () => {
    if (!selectedWorkflow) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
                  <Badge variant={
                    selectedWorkflow.priority === 'high' ? 'destructive' :
                    selectedWorkflow.priority === 'medium' ? 'secondary' : 'outline'
                  }>
                    {selectedWorkflow.priority === 'high' ? 'Prioritas Tinggi' :
                     selectedWorkflow.priority === 'medium' ? 'Prioritas Sedang' : 'Prioritas Rendah'}
                  </Badge>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Level {selectedWorkflow.currentLevel} dari {selectedWorkflow.totalLevels}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCloseWorkflowDetail}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Workflow Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">Diajukan Oleh</div>
                  <div className="font-medium">{selectedWorkflow.submittedBy}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">Tanggal Pengajuan</div>
                  <div className="font-medium">{new Date(selectedWorkflow.submittedDate).toLocaleDateString('id-ID')}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">Deadline</div>
                  <div className="font-medium">{new Date(selectedWorkflow.deadline).toLocaleDateString('id-ID')}</div>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Deskripsi Kebijakan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedWorkflow.description}</p>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Timeline Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress Approval</span>
                    <span className="text-sm text-gray-500">
                      {Math.round((selectedWorkflow.currentLevel / selectedWorkflow.totalLevels) * 100)}% Selesai
                    </span>
                  </div>
                  <Progress value={(selectedWorkflow.currentLevel / selectedWorkflow.totalLevels) * 100} className="mb-3" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Estimasi Waktu:</span> {selectedWorkflow.estimatedDuration}
                    </div>
                    <div>
                      <span className="font-medium">Sisa Waktu:</span> {Math.ceil((new Date(selectedWorkflow.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} hari
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Approvers Detail */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Approval</CardTitle>
                <CardDescription>Status dan komentar dari setiap level approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedWorkflow.approvers.map((approver: any, index: number) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      approver.status === 'approved' ? 'bg-green-50 border-green-200' :
                      approver.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            approver.status === 'approved' ? 'bg-green-100' :
                            approver.status === 'pending' ? 'bg-yellow-100' : 'bg-gray-100'
                          }`}>
                            {approver.status === 'approved' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                            {approver.status === 'pending' && <Clock className="h-4 w-4 text-yellow-600" />}
                            {approver.status === 'waiting' && <Clock className="h-4 w-4 text-gray-400" />}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Level {approver.level}</h4>
                            <p className="text-sm text-gray-600">{approver.name}</p>
                          </div>
                        </div>
                        <Badge variant={
                          approver.status === 'approved' ? 'default' :
                          approver.status === 'pending' ? 'secondary' : 'outline'
                        }>
                          {approver.status === 'approved' ? 'Disetujui' :
                           approver.status === 'pending' ? 'Menunggu' : 'Antrian'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Role:</span>
                          <p className="font-medium">{approver.role}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Departemen:</span>
                          <p className="font-medium">{approver.department}</p>
                        </div>
                      </div>
                      
                      {approver.date && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Tanggal Approval:</span>
                              <p className="font-medium">{new Date(approver.date).toLocaleDateString('id-ID')}</p>
                            </div>
                            {approver.responseTime && (
                              <div>
                                <span className="text-gray-600">Response Time:</span>
                                <p className="font-medium text-green-600">{approver.responseTime}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {approver.comment && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <span className="text-gray-600 text-sm">Komentar:</span>
                          <p className="text-sm text-gray-700 italic mt-1">&ldquo;{approver.comment}&rdquo;</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-6 border-t">
              <Button className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Unduh Dokumen
              </Button>
              <Button variant="outline" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Kirim Email
              </Button>
              <Button variant="outline" onClick={handleCloseWorkflowDetail}>
                Tutup
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        </div>
      </div>
      {showPolicyDetail && renderPolicyDetailModal()}
      {showVersionComparison && renderVersionComparisonModal()}
      {showUserDetail && renderUserDetailModal()}
      {showEditUser && renderEditUserModal()}
      {showDeleteUser && renderDeleteUserModal()}
      {showWorkflowDetail && renderWorkflowDetailModal()}
    </div>
  );
}