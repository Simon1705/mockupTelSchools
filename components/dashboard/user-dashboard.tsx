'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  X
} from 'lucide-react';

export function UserDashboard() {
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
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [showPolicyDetail, setShowPolicyDetail] = useState(false);
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

  const revokedPolicies = [
    {
      id: '1',
      title: 'Kebijakan Pembelajaran Tatap Muka 2023',
      category: 'Akademik',
      revokedDate: '2024-01-15',
      policyNumber: 'TEL/AKD/025/2023',
      reason: 'Digantikan dengan kebijakan pembelajaran hybrid yang lebih komprehensif'
    },
    {
      id: '2',
      title: 'Protokol COVID-19 Versi 2.0',
      category: 'Keselamatan',
      revokedDate: '2023-12-31',
      policyNumber: 'TEL/K3/018/2022',
      reason: 'Tidak relevan dengan kondisi terkini, digantikan dengan protokol kesehatan umum'
    },
    {
      id: '3',
      title: 'Panduan Sistem Lama SIA v1.0',
      category: 'Teknologi',
      revokedDate: '2023-12-01',
      policyNumber: 'TEL/TI/008/2022',
      reason: 'Sistem telah diupgrade ke versi terbaru'
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

  const handleProfileSave = () => {
    setIsEditingProfile(false);
    // Here you would typically save to backend
  };

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

  const renderDashboard = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang</h1>
        <p className="text-gray-600">Akses dan kelola kebijakan perusahaan dengan mudah</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kebijakan Aktif</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +2 dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Belum Dikonfirmasi</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Perlu konfirmasi pembacaan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kategori</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Kategori kebijakan
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Policies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Kebijakan Terbaru
            </CardTitle>
            <CardDescription>
              Kebijakan yang baru diterbitkan atau diperbarui
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPolicies.map((policy) => (
                <div key={policy.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {policy.title}
                    </h4>
                    <div className="flex items-center mt-1 space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {policy.category}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Hash className="h-3 w-3 mr-1" />
                        {policy.policyNumber}
                      </span>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      Berlaku: {new Date(policy.effectiveDate).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => handleViewPolicy(policy)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" onClick={() => setActiveMenuItem('policies')}>
              Lihat Semua Kebijakan
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notifikasi
            </CardTitle>
            <CardDescription>
              Pemberitahuan terkait kebijakan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="text-sm font-medium text-blue-900">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-blue-600 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(notification.date).toLocaleDateString('id-ID')}
                    </span>
                    <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-800">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Lihat Semua Notifikasi
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Search */}
      <Card className="mt-6">
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar Kebijakan</h1>
        <p className="text-gray-600">Temukan dan akses semua kebijakan perusahaan</p>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <div>
              <Label htmlFor="year">Tahun</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
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
        </CardContent>
      </Card>

      {/* Policies List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPolicies.map((policy) => (
          <Card key={policy.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary">{policy.category}</Badge>
                    <Badge variant="outline">{policy.status === 'active' ? 'Aktif' : 'Tidak Aktif'}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{policy.title}</h3>
                  <p className="text-gray-600 mb-3">{policy.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Hash className="h-4 w-4 mr-1" />
                      {policy.policyNumber}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Berlaku: {new Date(policy.effectiveDate).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleViewPolicy(policy)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Lihat
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Unduh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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

  const renderRevokedPolicies = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kebijakan yang Dicabut</h1>
        <p className="text-gray-600">Daftar kebijakan yang sudah tidak berlaku</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {revokedPolicies.map((policy) => (
          <Card key={policy.id} className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary">{policy.category}</Badge>
                    <Badge variant="destructive">Dicabut</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{policy.title}</h3>
                  <div className="bg-red-100 p-3 rounded-lg mb-3">
                    <p className="text-sm text-red-800">
                      <strong>Alasan pencabutan:</strong> {policy.reason}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Hash className="h-4 w-4 mr-1" />
                      {policy.policyNumber}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Dicabut: {new Date(policy.revokedDate).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" variant="outline" disabled>
                    <Eye className="h-4 w-4 mr-2" />
                    Lihat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );

  const renderContact = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kontak Admin Kebijakan</h1>
        <p className="text-gray-600">Hubungi tim pengelola kebijakan untuk bantuan dan informasi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminContacts.map((contact, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <Avatar className="h-16 w-16 mx-auto mb-3">
                  <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=100&h=100&fit=crop&crop=face`} />
                  <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                <p className="text-sm text-gray-600">{contact.position}</p>
                <Badge variant="outline" className="mt-1">{contact.department}</Badge>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{contact.phone}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button className="w-full" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Kirim Email
                </Button>
                <Button variant="outline" className="w-full" size="sm">
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

  const renderProfile = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil Saya</h1>
        <p className="text-gray-600">Kelola informasi profil dan pengaturan akun Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informasi Pribadi
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
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
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  {isEditingProfile ? (
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{profileData.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="employeeId">ID Pegawai</Label>
                  <p className="mt-1 text-sm text-gray-900">{profileData.employeeId}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <p className="mt-1 text-sm text-gray-900">{profileData.email}</p>
                </div>
                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  {isEditingProfile ? (
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{profileData.phone}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Departemen</Label>
                  <p className="mt-1 text-sm text-gray-900">{profileData.department}</p>
                </div>
                <div>
                  <Label htmlFor="position">Posisi</Label>
                  {isEditingProfile ? (
                    <Input
                      id="position"
                      value={profileData.position}
                      onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{profileData.position}</p>
                  )}
                </div>
              </div>
              {isEditingProfile && (
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleProfileSave}>
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

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Foto Profil</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                Ubah Foto
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistik Aktivitas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Kebijakan Dibaca</span>
                  <span className="text-sm font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Dokumen Diunduh</span>
                  <span className="text-sm font-medium">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Login Terakhir</span>
                  <span className="text-sm font-medium">Hari ini</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
                  <div className="text-sm text-gray-600">Dibuat Oleh</div>
                  <div className="font-medium">{selectedPolicy.createdBy || 'Tidak tersedia'}</div>
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
                  <div className="text-sm text-gray-600">Ukuran Dokumen</div>
                  <div className="font-medium">{selectedPolicy.documentSize || 'Tidak tersedia'}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">Status</div>
                  <Badge variant={selectedPolicy.status === 'active' ? 'default' : 'secondary'}>
                    {selectedPolicy.status === 'active' ? 'Aktif' : 'Draft'}
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
                    {selectedPolicy.attachments.map((attachment: any, index: number) => (
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
              <Card>
                <CardHeader>
                  <CardTitle>Kebijakan Terkait</CardTitle>
                  <CardDescription>Kebijakan lain yang mungkin relevan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedPolicy.relatedPolicies.map((relatedPolicy: any, index: number) => (
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

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-6 border-t">
              <Button className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Unduh Kebijakan
              </Button>
              <Button variant="outline" className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Konfirmasi Pembacaan
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
          {activeMenuItem === 'revoked' && renderRevokedPolicies()}
          {activeMenuItem === 'contact' && renderContact()}
          {activeMenuItem === 'profile' && renderProfile()}
        </div>
      </div>
      {showPolicyDetail && renderPolicyDetailModal()}
    </div>
  );
}