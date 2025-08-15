'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sidebar } from '@/components/layout/sidebar';
import { useAuth } from '@/components/providers';
import {
  Bell,
  FileText,
  Download,
  Search,
  Calendar,
  Hash,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  User,
  Edit,
  Save,
  X,
  AlertCircle,
  GitBranch,
  Shield
} from 'lucide-react';

export function UserDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeMenuItem, setActiveMenuItem] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('activeMenuItem') || 'dashboard';
    }
    return 'dashboard';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // State untuk versi kebijakan
  const [versionSearchQuery, setVersionSearchQuery] = useState('');
  const [versionSelectedCategory, setVersionSelectedCategory] = useState('all');
  const [versionSelectedYear, setVersionSelectedYear] = useState('all');

  // State untuk filter lanjutan
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    category: 'all',
    year: 'all',
    status: 'all',
    department: 'all',
    dateRange: 'all',
    sortBy: 'relevance'
  });

  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@telkomschools.sch.id',
    department: user?.department || 'IT Department',
    phone: '+62 812-3456-7890',
    position: 'Senior Developer',
    employeeId: 'TEL-2024-001'
  });

  const recentPolicies = [
    {
      id: '1',
      title: 'Kebijakan Pembelajaran Hybrid 2024',
      category: 'Akademik',
      effectiveDate: '2024-01-15',
      policyNumber: 'TEL/AKD/001/2024',
      status: 'active'
    },
    {
      id: '2',
      title: 'Protokol Kesehatan dan Keselamatan Kerja',
      category: 'Keselamatan',
      effectiveDate: '2024-01-10',
      policyNumber: 'TEL/K3/002/2024',
      status: 'active'
    },
    {
      id: '3',
      title: 'Panduan Penggunaan Sistem Informasi Akademik',
      category: 'Teknologi',
      effectiveDate: '2024-01-05',
      policyNumber: 'TEL/TI/003/2024',
      status: 'active'
    }
  ];

  const notifications = [
    {
      id: '1',
      title: 'Kebijakan baru telah diterbitkan',
      message: 'Kebijakan Pembelajaran Hybrid 2024 telah aktif',
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Pengingat konfirmasi kebijakan',
      message: 'Harap konfirmasi pembacaan Protokol K3 terbaru',
      date: '2024-01-14'
    }
  ];

  const allPolicies = [
    {
      id: '1',
      title: 'Kebijakan Pembelajaran Hybrid 2024',
      category: 'Akademik',
      effectiveDate: '2024-01-15',
      policyNumber: 'TEL/AKD/001/2024',
      status: 'active',
      description: 'Panduan lengkap implementasi pembelajaran hybrid untuk meningkatkan efektivitas pendidikan.',
      year: '2024',
      createdBy: 'Dr. Sarah Johnson',
      lastUpdated: '2024-01-15',
      version: '2.1',
      documentSize: '2.5 MB',
      totalViews: 1247,
      totalDownloads: 892,
      confirmations: 98,
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
      description: 'Standar operasional prosedur untuk menjaga kesehatan dan keselamatan di lingkungan kerja.',
      year: '2024',
      createdBy: 'Ahmad Rizki, S.Kom',
      lastUpdated: '2024-01-10',
      version: '1.3',
      documentSize: '1.8 MB',
      totalViews: 892,
      totalDownloads: 634,
      confirmations: 87,
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
      status: 'active',
      description: 'Petunjuk teknis penggunaan sistem informasi akademik untuk seluruh civitas akademika.',
      year: '2024',
      createdBy: 'Linda Wang, M.Ed',
      lastUpdated: '2024-01-05',
      version: '2.0',
      documentSize: '3.2 MB',
      totalViews: 765,
      totalDownloads: 543,
      confirmations: 92,
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
    },
    {
      id: '4',
      title: 'Kebijakan Evaluasi Kinerja Pegawai',
      category: 'SDM',
      effectiveDate: '2023-12-01',
      policyNumber: 'TEL/SDM/015/2023',
      status: 'active',
      description: 'Prosedur dan kriteria evaluasi kinerja pegawai secara berkala.',
      year: '2023',
      createdBy: 'Dr. Michael Chen',
      lastUpdated: '2023-12-01',
      version: '1.5',
      documentSize: '1.5 MB',
      totalViews: 543,
      totalDownloads: 321,
      confirmations: 78,
      content: `Kebijakan Evaluasi Kinerja Pegawai

1. TUJUAN
Mengukur dan meningkatkan kinerja pegawai secara objektif dan berkelanjutan.

2. PRINSIP EVALUASI
- Objektif dan adil
- Berkelanjutan
- Berorientasi pada pengembangan
- Transparan

3. KRITERIA EVALUASI
3.1 Kinerja Utama
- Pencapaian target kerja
- Kualitas hasil kerja
- Ketepatan waktu

3.2 Kompetensi
- Pengetahuan teknis
- Keterampilan profesional
- Sikap kerja

3.3 Kepemimpinan
- Kemampuan memimpin tim
- Pengambilan keputusan
- Komunikasi efektif

4. PROSES EVALUASI
4.1 Persiapan
- Penetapan target
- Penjelasan kriteria
- Pelatihan evaluator

4.2 Pelaksanaan
- Evaluasi tengah tahun
- Evaluasi akhir tahun
- Feedback session

4.3 Tindak Lanjut
- Rencana pengembangan
- Pelatihan yang diperlukan
- Monitoring progress

5. HASIL EVALUASI
5.1 Kategori Kinerja
- Outstanding (A)
- Good (B)
- Satisfactory (C)
- Needs Improvement (D)

5.2 Tindak Lanjut
- Promosi untuk kinerja outstanding
- Pelatihan untuk yang perlu improvement
- Terminasi untuk kinerja sangat buruk`,
      attachments: [
        { name: 'Form_Evaluasi_Kinerja.pdf', size: '0.8 MB', type: 'PDF' },
        { name: 'Template_Feedback_Session.docx', size: '0.4 MB', type: 'Word' },
        { name: 'Kriteria_Penilaian.xlsx', size: '0.3 MB', type: 'Excel' }
      ],
      relatedPolicies: [
        'Kebijakan Pembelajaran Hybrid 2024',
        'Panduan Pengelolaan Keuangan Sekolah'
      ]
    },
    {
      id: '5',
      title: 'Panduan Pengelolaan Keuangan Sekolah',
      category: 'Keuangan',
      effectiveDate: '2023-11-15',
      policyNumber: 'TEL/KEU/012/2023',
      status: 'active',
      description: 'Aturan dan prosedur pengelolaan keuangan sekolah yang transparan dan akuntabel.',
      year: '2023',
      createdBy: 'Siti Nurhaliza, S.E',
      lastUpdated: '2023-11-15',
      version: '1.2',
      documentSize: '2.8 MB',
      totalViews: 456,
      totalDownloads: 234,
      confirmations: 82,
      content: `Panduan Pengelolaan Keuangan Sekolah

1. PRINSIP PENGELOLAAN
- Transparansi
- Akuntabilitas
- Efektivitas
- Efisiensi

2. STRUKTUR ORGANISASI
2.1 Kepala Sekolah
- Penanggung jawab utama
- Persetujuan anggaran
- Monitoring pelaksanaan

2.2 Bendahara
- Pengelolaan kas
- Pencatatan transaksi
- Penyusunan laporan

2.3 Komite Sekolah
- Pengawasan
- Persetujuan program
- Evaluasi kinerja

3. PROSEDUR PENGELOLAAN
3.1 Perencanaan Anggaran
- Penyusunan RAPBS
- Rapat koordinasi
- Persetujuan komite

3.2 Pelaksanaan
- Pencairan dana
- Penggunaan sesuai anggaran
- Pencatatan transaksi

3.3 Pelaporan
- Laporan bulanan
- Laporan semester
- Laporan tahunan

4. PENGENDALIAN INTERN
4.1 Pemisahan Tugas
- Pemisahan fungsi otorisasi
- Pemisahan fungsi pencatatan
- Pemisahan fungsi penyimpanan

4.2 Dokumentasi
- Bukti transaksi lengkap
- Arsip yang teratur
- Backup data

4.3 Monitoring
- Rekonsiliasi berkala
- Audit internal
- Evaluasi sistem

5. LAPORAN KEUANGAN
5.1 Laporan Realisasi
- Realisasi pendapatan
- Realisasi belanja
- Saldo kas

5.2 Analisis Kinerja
- Analisis varians
- Analisis trend
- Rekomendasi perbaikan`,
      attachments: [
        { name: 'Template_RAPBS.xlsx', size: '1.2 MB', type: 'Excel' },
        { name: 'Format_Laporan_Keuangan.pdf', size: '0.9 MB', type: 'PDF' },
        { name: 'Prosedur_Pencairan_Dana.docx', size: '0.7 MB', type: 'Word' }
      ],
      relatedPolicies: [
        'Kebijakan Evaluasi Kinerja Pegawai',
        'Protokol Kesehatan dan Keselamatan Kerja'
      ]
    }
  ];

  // Data untuk versi kebijakan
  const policyVersions = [
    {
      id: '1',
      title: 'Kebijakan Pembelajaran Hybrid 2024',
      description: 'Kebijakan ini mengatur pembelajaran hybrid yang menggabungkan tatap muka dan online untuk memastikan kelangsungan pendidikan.',
      category: 'Akademik',
      versionNumber: '2.1',
      status: 'active',
      policyNumber: 'TEL/AKD/001/2024',
      createdDate: '2024-01-15',
      lastUpdated: '2024-01-15',
      createdBy: 'Tim Akademik',
      totalViews: 156,
      totalDownloads: 89,
      confirmations: 95
    },
    {
      id: '2',
      title: 'Kebijakan Pembelajaran Hybrid 2023',
      description: 'Versi sebelumnya dari kebijakan pembelajaran hybrid yang telah diperbarui.',
      category: 'Akademik',
      versionNumber: '2.0',
      status: 'inactive',
      policyNumber: 'TEL/AKD/001/2023',
      createdDate: '2023-06-15',
      lastUpdated: '2023-12-20',
      createdBy: 'Tim Akademik',
      totalViews: 89,
      totalDownloads: 45,
      confirmations: 78
    },
    {
      id: '3',
      title: 'Protokol Kesehatan dan Keselamatan Kerja',
      description: 'Protokol ini mengatur standar kesehatan dan keselamatan kerja di lingkungan sekolah.',
      category: 'Keselamatan',
      versionNumber: '1.5',
      status: 'active',
      policyNumber: 'TEL/K3/002/2024',
      createdDate: '2024-01-10',
      lastUpdated: '2024-01-10',
      createdBy: 'Tim K3',
      totalViews: 203,
      totalDownloads: 145,
      confirmations: 98
    },
    {
      id: '4',
      title: 'Protokol Kesehatan dan Keselamatan Kerja',
      description: 'Versi sebelumnya dari protokol K3 yang telah diperbarui.',
      category: 'Keselamatan',
      versionNumber: '1.4',
      status: 'inactive',
      policyNumber: 'TEL/K3/002/2023',
      createdDate: '2023-08-10',
      lastUpdated: '2023-12-15',
      createdBy: 'Tim K3',
      totalViews: 134,
      totalDownloads: 89,
      confirmations: 76
    },
    {
      id: '5',
      title: 'Panduan Penggunaan Sistem Informasi Akademik',
      description: 'Panduan lengkap penggunaan SIA untuk staff dan siswa.',
      category: 'Teknologi',
      versionNumber: '3.0',
      status: 'active',
      policyNumber: 'TEL/TI/003/2024',
      createdDate: '2024-01-05',
      lastUpdated: '2024-01-05',
      createdBy: 'Tim IT',
      totalViews: 89,
      totalDownloads: 67,
      confirmations: 87
    },
    {
      id: '6',
      title: 'Panduan Penggunaan Sistem Informasi Akademik',
      description: 'Versi sebelumnya dari panduan SIA yang telah diperbarui.',
      category: 'Teknologi',
      versionNumber: '2.5',
      status: 'inactive',
      policyNumber: 'TEL/TI/003/2023',
      createdDate: '2023-09-05',
      lastUpdated: '2023-12-20',
      createdBy: 'Tim IT',
      totalViews: 67,
      totalDownloads: 45,
      confirmations: 72
    }
  ];

  const adminContacts = [
    {
      name: 'Dr. Sarah Johnson',
      position: 'Kepala Bagian Kebijakan',
      email: 'sarah.johnson@telkomschools.sch.id',
      phone: '+62 21-5555-0001',
      department: 'Manajemen Kebijakan'
    },
    {
      name: 'Ahmad Rizki, S.Kom',
      position: 'Admin Sistem Kebijakan',
      email: 'ahmad.rizki@telkomschools.sch.id',
      phone: '+62 21-5555-0002',
      department: 'IT Support'
    },
    {
      name: 'Linda Wang, M.Ed',
      position: 'Koordinator Kebijakan Akademik',
      email: 'linda.wang@telkomschools.sch.id',
      phone: '+62 21-5555-0003',
      department: 'Akademik'
    }
  ];

  const filteredPolicies = allPolicies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         policy.policyNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || policy.year === selectedYear;
    return matchesSearch && matchesCategory && matchesYear;
  });

  const filteredPolicyVersions = policyVersions.filter(version => {
    const matchesSearch = version.title.toLowerCase().includes(versionSearchQuery.toLowerCase()) ||
                         version.policyNumber.toLowerCase().includes(versionSearchQuery.toLowerCase());
    const matchesCategory = versionSelectedCategory === 'all' || version.category === versionSelectedCategory;
    const matchesYear = versionSelectedYear === 'all' || new Date(version.createdDate).getFullYear().toString() === versionSelectedYear;
    return matchesSearch && matchesCategory && matchesYear;
  });

  const handleProfileSave = () => {
    setIsEditingProfile(false);
    // Here you would typically save to backend
  };

  const handleViewPolicy = (policy: any) => {
    // Navigate ke halaman policy detail menggunakan router
    router.push(`/policy/${policy.id}`);
  };

  const handleViewVersion = (version: any) => {
    // Navigate ke halaman version comparison menggunakan router
    router.push(`/version/${version.id}`);
  };

  // Fungsi untuk filter lanjutan
  const handleAdvancedFilter = () => {
    setShowAdvancedFilter(true);
  };

  const handleApplyFilters = () => {
    // Apply filters logic here
    console.log('Applying filters:', advancedFilters);
    setShowAdvancedFilter(false);
    // You can add logic to filter the policies based on advancedFilters
  };

  const handleResetFilters = () => {
    setAdvancedFilters({
      category: 'all',
      year: 'all',
      status: 'all',
      department: 'all',
      dateRange: 'all',
      sortBy: 'relevance'
    });
  };



  const renderDashboard = () => (
    <>
      {/* Hero Section - Telkom Schools Theme */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-4 text-white shadow-lg mb-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Logo Telkom Schools */}
            <div className="mb-3">
              <img 
                src="/logo-telkom-schools.png" 
                alt="Telkom Schools Logo" 
                className="h-12 w-auto filter brightness-0 invert"
              />
            </div>
            
            {/* Professional Title */}
            <div className="mb-3">
              <h1 className="text-xl md:text-2xl font-bold mb-1 leading-tight">
                SISTEM INFORMASI KEBIJAKAN
              </h1>
              <h2 className="text-lg md:text-xl font-semibold text-red-100 mb-1">
                TELKOM SCHOOLS
              </h2>
              <div className="w-16 h-0.5 bg-white mx-auto rounded-full"></div>
            </div>
            
            <p className="text-sm md:text-base text-red-100 mb-0 max-w-2xl">
              Platform terpadu untuk mengakses, mengelola, dan mempelajari kebijakan institusi pendidikan Telkom Schools
            </p>
          </div>
        </div>
      </div>

      {/* Search & Advanced Filter Panel */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-gray-50 to-white mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-red-600" />
              <CardTitle className="text-xl">Pencarian Kebijakan</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari kebijakan, peraturan, atau dokumen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base border-2 focus:border-red-500 focus:ring-red-500 text-gray-900 placeholder-gray-400"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <Button onClick={() => setActiveMenuItem('policies')} className="bg-red-600 hover:bg-red-700 h-10 px-6">
                <Search className="h-4 w-4 mr-2" />
                Cari
              </Button>
              <Button 
                variant="outline" 
                className="h-10 px-6 bg-black border-black text-white hover:bg-gray-800"
                onClick={handleAdvancedFilter}
              >
                Filter Lanjutan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Policies Section - Mirip BPK */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Kebijakan Terpopuler 2 Minggu Terakhir</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentPolicies.slice(0, 3).map((policy, index) => (
            <Card key={policy.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{policy.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{policy.policyNumber}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">{policy.category}</Badge>
                  <Button size="sm" variant="outline" onClick={() => handleViewPolicy(policy)}>
                    <Eye className="h-3 w-3 mr-1" />
                    Lihat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Policy Categories - Sesuai Konteks Sekolah */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Klasifikasi Kebijakan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
                <Badge variant="outline" className="text-xs">Lihat Statistik</Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kebijakan Akademik</h3>
              <p className="text-sm text-gray-600 mb-4">Kumpulan kebijakan pembelajaran, kurikulum, dan evaluasi siswa</p>
              <Button className="w-full" variant="outline">
                Lihat Kebijakan
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kebijakan Keamanan & K3</h3>
              <p className="text-sm text-gray-600 mb-4">Kumpulan kebijakan keselamatan, kesehatan kerja, dan keamanan sekolah</p>
              <Button className="w-full" variant="outline">
                Lihat Kebijakan
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kebijakan Teknologi & IT</h3>
              <p className="text-sm text-gray-600 mb-4">Kumpulan kebijakan penggunaan teknologi, sistem informasi, dan digitalisasi</p>
              <Button className="w-full" variant="outline">
                Lihat Kebijakan
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kebijakan Administrasi & SDM</h3>
              <p className="text-sm text-gray-600 mb-4">Kumpulan kebijakan kepegawaian, administrasi, dan pengembangan SDM</p>
              <Button className="w-full" variant="outline">
                Lihat Kebijakan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Policies & Input - Mirip BPK 2 Kolom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Policies */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Kebijakan Terbaru
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                Lihat lebih →
              </Button>
            </div>
            <CardDescription>
              Kebijakan yang baru diundangkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPolicies.map((policy) => (
                <div key={policy.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <FileText className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {policy.title}
                    </h4>
                    <div className="flex items-center mt-1 space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {policy.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Diundangkan {Math.floor(Math.random() * 30) + 1} hari yang lalu
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => handleViewPolicy(policy)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Input */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Input Terbaru
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                Lihat lebih →
              </Button>
            </div>
            <CardDescription>
              Dokumen yang baru ditambahkan ke sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allPolicies.slice(0, 3).map((policy) => (
                <div key={policy.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <FileText className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {policy.title}
                    </h4>
                    <div className="flex items-center mt-1 space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {policy.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Diinput {Math.floor(Math.random() * 24) + 1} jam yang lalu
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => handleViewPolicy(policy)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Web Statistics - Mirip BPK */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-900">Statistik Web</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">77,78 ribu</div>
              <div className="text-sm text-gray-600">Pengunjung Kemarin</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">2,60 juta</div>
              <div className="text-sm text-gray-600">Pengunjung Sebulan Terakhir</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">28,95 juta</div>
              <div className="text-sm text-gray-600">Pengunjung Setahun Terakhir</div>
            </div>
          </div>
          <div className="text-center mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Update terakhir:</strong> 15 Agustus 2025 09.00
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Dalam 7 hari terakhir rata-rata jumlah pengunjung harian sebanyak 78,99 ribu.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Pencarian Cepat
          </CardTitle>
          <CardDescription>
            Cari kebijakan berdasarkan judul, nomor, atau kategori
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Masukkan kata kunci pencarian..."
              className="flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={() => setActiveMenuItem('policies')}>
              <Search className="h-4 w-4 mr-2" />
              Cari
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderPolicies = () => (
    <>
      {/* Hero Section - Telkom Red */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-8 text-white shadow-lg mb-8">
        <div className="">
          <h1 className="text-4xl font-bold mb-4">📋 DAFTAR KEBIJAKAN</h1>
          <p className="text-xl text-red-100 mb-6">Temukan dan akses semua kebijakan Telkom Schools</p>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>{filteredPolicies.length} kebijakan tersedia</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Semua kebijakan aktif</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search & Filters - Mirip BPK */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-gray-50 to-white mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl">Cari & Filter</CardTitle>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {filteredPolicies.length} hasil
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari kebijakan berdasarkan judul, kategori, atau nomor dokumen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg border-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            {/* Filter Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category" className="text-sm font-medium">Kategori</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="mt-1">
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
              <div>
                <Label htmlFor="year" className="text-sm font-medium">Tahun</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih tahun" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tahun</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
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
                    setSelectedYear('all');
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            </div>

            {/* Quick Filter Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">Semua Kategori</Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">Teknologi</Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">Keamanan</Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">Pendidikan</Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">Administrasi</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Policies List - Mirip BPK */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl">Semua Kebijakan</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {filteredPolicies.length} kebijakan
              </Badge>
            </div>
          </div>
          <CardDescription>Daftar lengkap kebijakan Telkom Schools yang dapat Anda akses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPolicies.map((policy, index) => (
              <div key={policy.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-blue-100 rounded-lg p-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{policy.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {policy.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            {policy.status === 'active' ? 'Aktif' : 'Draft'}
                          </Badge>
                          <span className="text-xs text-gray-500">#{index + 1}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{policy.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Hash className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Nomor:</span>
                        <span className="font-medium">{policy.policyNumber}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Berlaku:</span>
                        <span className="font-medium">{new Date(policy.effectiveDate).toLocaleDateString('id-ID')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Penulis:</span>
                        <span className="font-medium">{policy.createdBy || 'Tidak tersedia'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Update:</span>
                        <span className="font-medium">{new Date(policy.lastUpdated).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mt-3">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {policy.totalViews || 0} dilihat
                      </span>
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {policy.totalDownloads || 0} diunduh
                      </span>
                      <span className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {policy.confirmations || 0} konfirmasi
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleViewPolicy(policy)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Lihat Detail
                    </Button>
                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                      <Download className="h-4 w-4 mr-2" />
                      Unduh PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredPolicies.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada kebijakan ditemukan</h3>
            <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian Anda</p>
          </CardContent>
        </Card>
      )}
    </>
  );



  const renderContact = () => (
    <>
      {/* Hero Section - Telkom Red */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-8 text-white shadow-lg mb-8">
        <div className="">
          <h1 className="text-4xl font-bold mb-4">📞 KONTAK ADMIN KEBIJAKAN</h1>
          <p className="text-xl text-red-100 mb-6">Hubungi tim pengelola kebijakan untuk bantuan dan dukungan teknis</p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Dukungan 24/7</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email & Chat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Team Grid - Mirip BPK */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {adminContacts.map((contact, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <Avatar className="h-20 w-20 mx-auto mb-3">
                  <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=100&h=100&fit=crop&crop=face`} />
                  <AvatarFallback className="text-lg">{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                <p className="text-sm text-gray-600">{contact.position}</p>
                <Badge variant="outline" className="mt-2 bg-blue-50 text-blue-700 border-blue-200">
                  {contact.department}
                </Badge>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-700 font-medium">{contact.email}</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">{contact.phone}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Kirim Email
                </Button>
                <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Hubungi
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Informasi Kontak Umum
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Alamat Kantor</h4>
              <p className="text-gray-600 mb-2">
                Telkom Schools<br />
                Jl. Gegerkalong Hilir No. 47<br />
                Bandung, Jawa Barat 40152
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Jam Operasional</h4>
              <p className="text-gray-600">
                Senin - Jumat: 08:00 - 17:00 WIB<br />
                Sabtu: 08:00 - 12:00 WIB<br />
                Minggu: Tutup
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderVersions = () => (
    <>
      {/* Hero Section - Telkom Red */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-8 text-white shadow-lg mb-8">
        <div className="">
          <h1 className="text-4xl font-bold mb-4">🔄 VERSI KEBIJAKAN</h1>
          <p className="text-xl text-red-100 mb-6">Lihat dan bandingkan berbagai versi kebijakan Telkom Schools</p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Total Versi: 24</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Update Terakhir: 2 hari lalu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-gray-50 to-white mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-green-600" />
              <CardTitle className="text-xl">Cari & Filter Versi</CardTitle>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {policyVersions.length} versi tersedia
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari kebijakan berdasarkan judul, kategori, atau nomor dokumen..."
                value={versionSearchQuery}
                onChange={(e) => setVersionSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg border-2 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            
            {/* Filter Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="versionCategory" className="text-sm font-medium">Kategori</Label>
                <Select value={versionSelectedCategory} onValueChange={setVersionSelectedCategory}>
                  <SelectTrigger className="mt-1">
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
              <div>
                <Label htmlFor="versionYear" className="text-sm font-medium">Tahun</Label>
                <Select value={versionSelectedYear} onValueChange={setVersionSelectedYear}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Pilih tahun" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tahun</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setVersionSearchQuery('');
                    setVersionSelectedCategory('all');
                    setVersionSelectedYear('all');
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policy Versions List */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GitBranch className="h-5 w-5 text-green-600" />
              <CardTitle className="text-xl">Semua Versi Kebijakan</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {filteredPolicyVersions.length} versi
              </Badge>
            </div>
          </div>
          <CardDescription>Daftar lengkap versi kebijakan yang dapat Anda akses dan bandingkan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPolicyVersions.map((version, index) => (
              <div key={version.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-green-100 rounded-lg p-2">
                        <GitBranch className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{version.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {version.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            v{version.versionNumber}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            {version.status === 'active' ? 'Aktif' : 'Draft'}
                          </Badge>
                          <span className="text-xs text-gray-500">#{index + 1}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{version.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Hash className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Nomor:</span>
                        <span className="font-medium">{version.policyNumber}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Dibuat:</span>
                        <span className="font-medium">{new Date(version.createdDate).toLocaleDateString('id-ID')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Penulis:</span>
                        <span className="font-medium">{version.createdBy || 'Tidak tersedia'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Update:</span>
                        <span className="font-medium">{new Date(version.lastUpdated).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mt-3">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {version.totalViews || 0} dilihat
                      </span>
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {version.totalDownloads || 0} diunduh
                      </span>
                      <span className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {version.confirmations || 0} konfirmasi
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleViewVersion(version)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Lihat Detail
                    </Button>
                    <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                      <Download className="h-4 w-4 mr-2" />
                      Unduh PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredPolicyVersions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada versi kebijakan ditemukan</h3>
            <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian Anda</p>
          </CardContent>
        </Card>
      )}
    </>
  );

  const renderProfile = () => (
    <>
      {/* Hero Section - Mirip BPK */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-8 text-white shadow-lg mb-8">
        <div className="">
          <h1 className="text-4xl font-bold mb-4">👤 PROFIL SAYA</h1>
          <p className="text-xl text-blue-100 mb-6">Kelola informasi profil dan pengaturan akun Anda</p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Status: Aktif</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Login terakhir: Hari ini</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center text-blue-900">
                <User className="mr-2 h-5 w-5" />
                Informasi Pribadi
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                {isEditingProfile ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Simpan
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nama Lengkap</Label>
                  {isEditingProfile ? (
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="mt-2 border-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900 font-medium">{profileData.name}</p>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="employeeId" className="text-sm font-medium text-gray-700">ID Pegawai</Label>
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-900 font-medium">{profileData.employeeId}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-900 font-medium">{profileData.email}</p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Nomor Telepon</Label>
                  {isEditingProfile ? (
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="mt-2 border-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900 font-medium">{profileData.phone}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="department" className="text-sm font-medium text-gray-700">Departemen</Label>
                  <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-900 font-medium">{profileData.department}</p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="position" className="text-sm font-medium text-gray-700">Posisi</Label>
                  {isEditingProfile ? (
                    <Input
                      id="position"
                      value={profileData.position}
                      onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                      className="mt-2 border-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900 font-medium">{profileData.position}</p>
                    </div>
                  )}
                </div>
              </div>
              {isEditingProfile && (
                <div className="flex space-x-3 pt-6 border-t border-gray-200">
                  <Button onClick={handleProfileSave} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                    Batal
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          {/* Profile Photo */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
              <CardTitle className="text-purple-900">Foto Profil</CardTitle>
            </CardHeader>
            <CardContent className="text-center p-6">
              <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-purple-200">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback className="text-2xl bg-purple-100 text-purple-700">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                Ubah Foto
              </Button>
            </CardContent>
          </Card>

          {/* Activity Statistics */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
              <CardTitle className="text-green-900">Statistik Aktivitas</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-green-700">Kebijakan Dibaca</span>
                  <span className="text-lg font-bold text-green-800">24</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-700">Dokumen Diunduh</span>
                  <span className="text-lg font-bold text-blue-800">18</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-purple-700">Login Terakhir</span>
                  <span className="text-sm font-medium text-purple-800">Hari ini</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
              <CardTitle className="text-orange-900">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                  <FileText className="h-4 w-4 mr-2" />
                  Lihat Riwayat
                </Button>
                <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                  <Download className="h-4 w-4 mr-2" />
                  Unduh Laporan
                </Button>
                <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                  <Bell className="h-4 w-4 mr-2" />
                  Pengaturan Notif
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
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
          {activeMenuItem === 'policies' && renderPolicies()}
          {activeMenuItem === 'versions' && renderVersions()}
          {activeMenuItem === 'contact' && renderContact()}
          {activeMenuItem === 'profile' && renderProfile()}
        </div>
      </div>

      {/* Advanced Filter Modal */}
      <Dialog open={showAdvancedFilter} onOpenChange={setShowAdvancedFilter}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <span>Filter Lanjutan</span>
            </DialogTitle>
            <DialogDescription>
              Pilih kriteria pencarian yang lebih spesifik untuk menemukan kebijakan yang Anda cari
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Kategori */}
            <div className="space-y-2">
              <Label htmlFor="category">Kategori Kebijakan</Label>
              <Select 
                value={advancedFilters.category} 
                onValueChange={(value) => setAdvancedFilters({...advancedFilters, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="akademik">Akademik</SelectItem>
                  <SelectItem value="keselamatan">Keamanan & K3</SelectItem>
                  <SelectItem value="teknologi">Teknologi & IT</SelectItem>
                  <SelectItem value="administrasi">Administrasi & SDM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tahun */}
            <div className="space-y-2">
              <Label htmlFor="year">Tahun Terbit</Label>
              <Select 
                value={advancedFilters.year} 
                onValueChange={(value) => setAdvancedFilters({...advancedFilters, year: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tahun" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tahun</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status Kebijakan</Label>
              <Select 
                value={advancedFilters.status} 
                onValueChange={(value) => setAdvancedFilters({...advancedFilters, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Departemen */}
            <div className="space-y-2">
              <Label htmlFor="department">Departemen</Label>
              <Select 
                value={advancedFilters.department} 
                onValueChange={(value) => setAdvancedFilters({...advancedFilters, department: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih departemen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Departemen</SelectItem>
                  <SelectItem value="akademik">Akademik</SelectItem>
                  <SelectItem value="it">IT & Sistem</SelectItem>
                  <SelectItem value="hr">SDM</SelectItem>
                  <SelectItem value="finance">Keuangan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rentang Tanggal */}
            <div className="space-y-2">
              <Label htmlFor="dateRange">Rentang Tanggal</Label>
              <Select 
                value={advancedFilters.dateRange} 
                onValueChange={(value) => setAdvancedFilters({...advancedFilters, dateRange: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih rentang tanggal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Waktu</SelectItem>
                  <SelectItem value="today">Hari Ini</SelectItem>
                  <SelectItem value="week">Minggu Ini</SelectItem>
                  <SelectItem value="month">Bulan Ini</SelectItem>
                  <SelectItem value="quarter">3 Bulan Terakhir</SelectItem>
                  <SelectItem value="year">Tahun Ini</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Urutkan Berdasarkan */}
            <div className="space-y-2">
              <Label htmlFor="sortBy">Urutkan Berdasarkan</Label>
              <Select 
                value={advancedFilters.sortBy} 
                onValueChange={(value) => setAdvancedFilters({...advancedFilters, sortBy: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pengurutan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevansi</SelectItem>
                  <SelectItem value="date">Tanggal Terbaru</SelectItem>
                  <SelectItem value="title">Judul A-Z</SelectItem>
                  <SelectItem value="views">Paling Banyak Dilihat</SelectItem>
                  <SelectItem value="downloads">Paling Banyak Diunduh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={handleResetFilters}>
                Reset Filter
              </Button>
              <Button onClick={handleApplyFilters} className="bg-blue-600 hover:bg-blue-700">
                Terapkan Filter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}