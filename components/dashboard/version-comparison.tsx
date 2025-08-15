'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  User,
  Building,
  Clock,
  CheckCircle,
  AlertCircle,
  Share2,
  Bookmark,
  Printer,
  Mail,
  Phone,
  MapPin,
  Hash,
  Tag,
  FileCheck,
  History,
  Users,
  TrendingUp,
  Star,
  MessageSquare,
  GitBranch,
  GitCompare,
  Diff
} from 'lucide-react';
import { Label } from '@/components/ui/label';

interface VersionComparisonProps {
  versionId?: string;
}

interface PolicyVersion {
  id: string;
  title: string;
  description: string;
  category: string;
  versionNumber: string;
  status: 'active' | 'inactive';
  policyNumber: string;
  createdDate: string;
  lastUpdated: string;
  createdBy: string;
  totalViews: number;
  totalDownloads: number;
  confirmations: number;
  content: string;
  changeLog: string[];
  previousVersion?: PolicyVersion;
}

export function VersionComparison({ versionId }: VersionComparisonProps) {
  const router = useRouter();
  const [version, setVersion] = useState<PolicyVersion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy data untuk version comparison
  const dummyVersion: PolicyVersion = {
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
    confirmations: 95,
    content: `Kebijakan Pembelajaran Hybrid 2024

1. TUJUAN
Mengatur pembelajaran hybrid yang menggabungkan tatap muka dan online untuk memastikan kelangsungan pendidikan.

2. RUANG LINGKUP
- Semua jenjang pendidikan di Telkom Schools
- Semua mata pelajaran dan kegiatan akademik
- Semua personel pengajar dan siswa

3. IMPLEMENTASI HYBRID
3.1 Model Pembelajaran
- Tatap muka 60% dan online 40%
- Rotasi kelompok siswa setiap minggu
- Penggunaan platform digital terintegrasi

3.2 Teknologi Pendukung
- Learning Management System (LMS)
- Video conference tools
- Digital assessment platform

4. EVALUASI DAN MONITORING
4.1 Penilaian Siswa
- Kombinasi penilaian offline dan online
- Project-based learning
- Continuous assessment

4.2 Monitoring Kinerja
- Dashboard real-time untuk guru dan orang tua
- Laporan progress mingguan
- Feedback session berkala

5. PENYESUAIAN DAN UPDATES
5.1 Review Berkala
- Evaluasi setiap 3 bulan
- Feedback dari semua stakeholder
- Penyesuaian berdasarkan kondisi terkini

5.2 Version Control
- Dokumentasi perubahan setiap versi
- Approval process untuk update
- Training untuk implementasi perubahan`,
    changeLog: [
      'Menambahkan model pembelajaran 60-40 (tatap muka-online)',
      'Mengintegrasikan platform digital assessment',
      'Menambahkan monitoring real-time untuk orang tua',
      'Memperbaiki protokol evaluasi berkala',
      'Menambahkan training untuk implementasi perubahan'
    ],
    previousVersion: {
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
      confirmations: 78,
      content: `Kebijakan Pembelajaran Hybrid 2023

1. TUJUAN
Mengatur pembelajaran hybrid untuk memastikan kelangsungan pendidikan.

2. RUANG LINGKUP
- Semua jenjang pendidikan di Telkom Schools
- Semua mata pelajaran dan kegiatan akademik

3. IMPLEMENTASI HYBRID
3.1 Model Pembelajaran
- Tatap muka 70% dan online 30%
- Rotasi kelompok siswa setiap 2 minggu
- Penggunaan platform digital dasar

3.2 Teknologi Pendukung
- Learning Management System (LMS)
- Video conference tools

4. EVALUASI DAN MONITORING
4.1 Penilaian Siswa
- Kombinasi penilaian offline dan online
- Project-based learning

4.2 Monitoring Kinerja
- Laporan progress bulanan
- Feedback session berkala

5. PENYESUAIAN DAN UPDATES
5.1 Review Berkala
- Evaluasi setiap 6 bulan
- Feedback dari stakeholder
- Penyesuaian berdasarkan kondisi`,
      changeLog: []
    }
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setVersion(dummyVersion);
      setIsLoading(false);
    }, 1000);
  }, [versionId]);

  const handleBack = () => {
    router.back();
  };

  const handleDownload = () => {
    console.log('Downloading version:', version?.versionNumber);
    // Implement download functionality
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: version?.title,
        text: `Versi ${version?.versionNumber} dari ${version?.title}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const renderDiff = (currentContent: string, previousContent: string) => {
    const currentLines = currentContent.split('\n');
    const previousLines = previousContent.split('\n');
    
    const maxLines = Math.max(currentLines.length, previousLines.length);
    const diffLines = [];

    for (let i = 0; i < maxLines; i++) {
      const currentLine = currentLines[i] || '';
      const previousLine = previousLines[i] || '';
      
      if (currentLine === previousLine) {
        diffLines.push({
          type: 'unchanged',
          current: currentLine,
          previous: previousLine,
          lineNumber: i + 1
        });
      } else if (currentLine && !previousLine) {
        diffLines.push({
          type: 'added',
          current: currentLine,
          previous: '',
          lineNumber: i + 1
        });
      } else if (!currentLine && previousLine) {
        diffLines.push({
          type: 'removed',
          current: '',
          previous: previousLine,
          lineNumber: i + 1
        });
      } else {
        diffLines.push({
          type: 'modified',
          current: currentLine,
          previous: previousLine,
          lineNumber: i + 1
        });
      }
    }

    return diffLines;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat detail versi kebijakan...</p>
        </div>
      </div>
    );
  }

  if (!version) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <GitBranch className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Versi Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-4">Versi kebijakan yang Anda cari tidak ditemukan atau telah dihapus.</p>
          <Button onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  const diffLines = version.previousVersion ? renderDiff(version.content, version.previousVersion.content) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 truncate max-w-md">
                  {version.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    v{version.versionNumber}
                  </Badge>
                  <Badge variant={version.status === 'active' ? 'default' : 'secondary'}>
                    {version.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                  </Badge>
                  <span className="text-sm text-gray-500">{version.policyNumber}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Cetak
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Simpan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Konten Versi</TabsTrigger>
                <TabsTrigger value="comparison">Perbandingan</TabsTrigger>
                <TabsTrigger value="changes">Perubahan</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GitBranch className="mr-2 h-5 w-5 text-green-600" />
                      Informasi Versi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Judul Kebijakan</Label>
                          <p className="text-gray-900 font-medium">{version.title}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Deskripsi</Label>
                          <p className="text-gray-700">{version.description}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Kategori</Label>
                          <Badge variant="secondary">{version.category}</Badge>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Nomor Dokumen</Label>
                          <p className="text-gray-900 font-medium">{version.policyNumber}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Dibuat Oleh</Label>
                          <p className="text-gray-700">{version.createdBy}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Status</Label>
                          <Badge variant={version.status === 'active' ? 'default' : 'secondary'}>
                            {version.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                      Statistik Penggunaan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{version.totalViews}</div>
                        <div className="text-sm text-gray-600">Total Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{version.totalDownloads}</div>
                        <div className="text-sm text-gray-600">Downloads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{version.confirmations}</div>
                        <div className="text-sm text-gray-600">Konfirmasi</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <History className="mr-2 h-5 w-5 text-orange-600" />
                      Timeline Versi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 rounded-full p-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Versi {version.versionNumber} Diterbitkan</p>
                          <p className="text-xs text-gray-500">{new Date(version.createdDate).toLocaleDateString('id-ID')}</p>
                        </div>
                      </div>
                      {version.previousVersion && (
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 rounded-full p-2">
                            <GitBranch className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Versi {version.previousVersion.versionNumber} Digantikan</p>
                            <p className="text-xs text-gray-500">{new Date(version.previousVersion.createdDate).toLocaleDateString('id-ID')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-blue-600" />
                      Konten Versi {version.versionNumber}
                    </CardTitle>
                    <CardDescription>
                      Isi lengkap kebijakan versi ini
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
                        {version.content}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

                             {/* Comparison Tab */}
               <TabsContent value="comparison" className="space-y-6">
                 {version.previousVersion ? (
                   <Card>
                     <CardHeader>
                       <CardTitle className="flex items-center">
                         <GitCompare className="mr-2 h-5 w-5 text-purple-600" />
                         Perbandingan dengan Versi {version.previousVersion.versionNumber}
                       </CardTitle>
                       <CardDescription>
                         Perbandingan side-by-side antara versi {version.versionNumber} dan {version.previousVersion.versionNumber}
                       </CardDescription>
                     </CardHeader>
                     <CardContent>
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         {/* Versi Sebelumnya */}
                         <div className="space-y-4">
                           <div className="flex items-center justify-between">
                             <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                               <History className="mr-2 h-5 w-5 text-blue-600" />
                               Versi {version.previousVersion.versionNumber}
                             </h4>
                             <Badge variant="secondary" className="text-xs">
                               {new Date(version.previousVersion.createdDate).toLocaleDateString('id-ID')}
                             </Badge>
                           </div>
                           <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                             <div className="space-y-1">
                               {version.previousVersion.content.split('\n').map((line, index) => (
                                 <div key={index} className="flex items-start space-x-2">
                                   <span className="text-xs text-gray-500 w-8 flex-shrink-0 mt-1">
                                     {index + 1}
                                   </span>
                                   <span className={`text-sm font-mono ${
                                     diffLines[index]?.type === 'removed' ? 'bg-red-100 text-red-800 px-1 rounded' :
                                     diffLines[index]?.type === 'modified' ? 'bg-yellow-100 text-yellow-800 px-1 rounded' :
                                     'text-gray-700'
                                   }`}>
                                     {line}
                                   </span>
                                 </div>
                               ))}
                             </div>
                           </div>
                         </div>

                         {/* Versi Saat Ini */}
                         <div className="space-y-4">
                           <div className="flex items-center justify-between">
                             <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                               <GitBranch className="mr-2 h-5 w-5 text-green-600" />
                               Versi {version.versionNumber}
                             </h4>
                             <Badge variant="default" className="text-xs">
                               {new Date(version.createdDate).toLocaleDateString('id-ID')}
                             </Badge>
                           </div>
                           <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                             <div className="space-y-1">
                               {version.content.split('\n').map((line, index) => (
                                 <div key={index} className="flex items-start space-x-2">
                                   <span className="text-xs text-gray-500 w-8 flex-shrink-0 mt-1">
                                     {index + 1}
                                   </span>
                                   <span className={`text-sm font-mono ${
                                     diffLines[index]?.type === 'added' ? 'bg-green-100 text-green-800 px-1 rounded' :
                                     diffLines[index]?.type === 'modified' ? 'bg-yellow-100 text-yellow-800 px-1 rounded' :
                                     'text-gray-700'
                                   }`}>
                                     {line}
                                   </span>
                                 </div>
                               ))}
                             </div>
                           </div>
                         </div>
                       </div>

                       {/* Legend */}
                       <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                         <h5 className="text-sm font-medium text-gray-900 mb-3">Keterangan Perubahan:</h5>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                           <div className="flex items-center space-x-2">
                             <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                             <span className="text-green-800">Baris yang ditambahkan</span>
                           </div>
                           <div className="flex items-center space-x-2">
                             <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
                             <span className="text-red-800">Baris yang dihapus</span>
                           </div>
                           <div className="flex items-center space-x-2">
                             <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
                             <span className="text-yellow-800">Baris yang dimodifikasi</span>
                           </div>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 ) : (
                   <Card>
                     <CardContent className="p-8 text-center">
                       <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                       <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Versi Sebelumnya</h3>
                       <p className="text-gray-600">Ini adalah versi pertama dari kebijakan ini</p>
                     </CardContent>
                   </Card>
                 )}
               </TabsContent>

              {/* Changes Tab */}
              <TabsContent value="changes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Diff className="mr-2 h-5 w-5 text-orange-600" />
                      Log Perubahan (Changelog)
                    </CardTitle>
                    <CardDescription>
                      Daftar perubahan yang dilakukan pada versi {version.versionNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {version.changeLog.length > 0 ? (
                      <div className="space-y-3">
                        {version.changeLog.map((change, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-green-800">{change}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Diff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Tidak ada log perubahan yang tersedia</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Version Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GitBranch className="mr-2 h-5 w-5 text-green-600" />
                  Info Versi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Nomor Versi</Label>
                  <div className="mt-1 p-2 bg-green-50 rounded-lg">
                    <span className="text-lg font-bold text-green-700">v{version.versionNumber}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Tanggal Dibuat</Label>
                  <p className="text-gray-900">{new Date(version.createdDate).toLocaleDateString('id-ID')}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Terakhir Diupdate</Label>
                  <p className="text-gray-900">{new Date(version.lastUpdated).toLocaleDateString('id-ID')}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Status</Label>
                  <Badge variant={version.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                    {version.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Previous Version Card */}
            {version.previousVersion && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <History className="mr-2 h-5 w-5 text-blue-600" />
                    Versi Sebelumnya
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Versi</Label>
                    <p className="text-gray-900 font-medium">v{version.previousVersion.versionNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Tanggal</Label>
                    <p className="text-gray-700">{new Date(version.previousVersion.createdDate).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Status</Label>
                    <Badge variant="secondary" className="mt-1">
                      {version.previousVersion.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCheck className="mr-2 h-5 w-5 text-purple-600" />
                  Aksi Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Unduh Versi Ini
                </Button>
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Versi Sebelumnya
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Bagikan Versi
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
