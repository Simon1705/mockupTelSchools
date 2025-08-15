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
  MessageSquare
} from 'lucide-react';

interface PolicyDetailProps {
  policyId?: string;
}

interface Policy {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  lastUpdated: string;
  effectiveDate: string;
  policyNumber: string;
  version: string;
  author: string;
  department: string;
  content: string;
  attachments: Array<{
    name: string;
    size: string;
    type: string;
    url?: string;
  }>;
  relatedPolicies: Array<{
    id: string;
    title: string;
    category: string;
  }>;
  statistics: {
    views: number;
    downloads: number;
    confirmations: number;
    rating: number;
  };
  history: Array<{
    date: string;
    action: string;
    user: string;
    description: string;
  }>;
  comments: Array<{
    id: string;
    user: string;
    date: string;
    comment: string;
    rating: number;
  }>;
}

export function PolicyDetail({ policyId }: PolicyDetailProps) {
  const router = useRouter();
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy data for policy detail
  const dummyPolicy: Policy = {
    id: '1',
    title: 'Kebijakan Penggunaan Teknologi Informasi',
    description: 'Kebijakan ini mengatur penggunaan teknologi informasi di lingkungan sekolah untuk mendukung proses pembelajaran dan administrasi.',
    category: 'Teknologi',
    status: 'Aktif',
    lastUpdated: '2024-01-15',
    effectiveDate: '2024-01-20',
    policyNumber: 'TEL/TI/001/2024',
    version: '2.1',
    author: 'Dr. Sarah Johnson',
    department: 'IT Department',
    content: `# Kebijakan Penggunaan Teknologi Informasi

## 1. PENDAHULUAN

Kebijakan ini mengatur penggunaan teknologi informasi di lingkungan Telkom Schools untuk mendukung proses pembelajaran dan administrasi yang efektif dan efisien.

## 2. TUJUAN

- Meningkatkan efektivitas penggunaan teknologi informasi
- Memastikan keamanan data dan sistem informasi
- Mengoptimalkan investasi teknologi
- Meningkatkan produktivitas kerja

## 3. RUANG LINGKUP

Kebijakan ini berlaku untuk:
- Semua karyawan Telkom Schools
- Siswa dan mahasiswa
- Vendor dan mitra kerja
- Pengunjung dan tamu

## 4. DEFINISI

- **Teknologi Informasi**: Semua perangkat keras, perangkat lunak, dan infrastruktur digital
- **Sistem Informasi**: Platform dan aplikasi yang digunakan untuk mengelola data
- **Pengguna**: Individu yang mengakses dan menggunakan teknologi informasi

## 5. KETENTUAN UMUM

### 5.1 Akses dan Penggunaan
- Setiap pengguna harus memiliki akun resmi
- Penggunaan harus sesuai dengan tujuan yang ditetapkan
- Dilarang menggunakan untuk kepentingan pribadi yang tidak terkait dengan tugas

### 5.2 Keamanan
- Password harus kuat dan diubah secara berkala
- Dilarang membagikan akun dengan pengguna lain
- Logout setelah selesai menggunakan sistem

### 5.3 Privasi dan Kerahasiaan
- Menjaga kerahasiaan data yang diakses
- Tidak menyebarkan informasi sensitif
- Melaporkan pelanggaran keamanan

## 6. PENGGUNAAN PERANGKAT

### 6.1 Komputer dan Laptop
- Penggunaan untuk tugas resmi
- Maintenance berkala
- Backup data secara rutin

### 6.2 Jaringan dan Internet
- Akses internet untuk keperluan kerja
- Tidak mengakses situs yang tidak relevan
- Monitoring penggunaan bandwidth

### 6.3 Aplikasi dan Software
- Menggunakan software yang disetujui
- Tidak menginstal software tanpa izin
- Update software secara berkala

## 7. PELANGGARAN DAN SANKSI

### 7.1 Pelanggaran Ringan
- Peringatan lisan
- Pembatasan akses sementara

### 7.2 Pelanggaran Sedang
- Peringatan tertulis
- Pembatasan akses jangka panjang

### 7.3 Pelanggaran Berat
- Suspensi akun
- Tindakan hukum jika diperlukan

## 8. MONITORING DAN EVALUASI

- Monitoring penggunaan sistem secara berkala
- Evaluasi efektivitas kebijakan setiap 6 bulan
- Penyesuaian kebijakan berdasarkan kebutuhan

## 9. PENUTUP

Kebijakan ini mulai berlaku sejak tanggal ditetapkan dan akan dievaluasi secara berkala untuk memastikan relevansi dan efektivitasnya.`,
    attachments: [
      {
        name: 'Manual_TI_v2.1.pdf',
        size: '2.5 MB',
        type: 'PDF'
      },
      {
        name: 'Prosedur_Keamanan_TI.pdf',
        size: '1.8 MB',
        type: 'PDF'
      },
      {
        name: 'Template_Laporan_TI.xlsx',
        size: '0.5 MB',
        type: 'Excel'
      }
    ],
    relatedPolicies: [
      {
        id: '2',
        title: 'Pedoman Keamanan Data Siswa',
        category: 'Keamanan'
      },
      {
        id: '3',
        title: 'Prosedur Pembelajaran Daring',
        category: 'Pendidikan'
      },
      {
        id: '4',
        title: 'Kebijakan Penggunaan Media Sosial',
        category: 'Komunikasi'
      }
    ],
    statistics: {
      views: 1247,
      downloads: 89,
      confirmations: 156,
      rating: 4.5
    },
    history: [
      {
        date: '2024-01-15',
        action: 'Diperbarui',
        user: 'Dr. Sarah Johnson',
        description: 'Update versi 2.1 dengan penambahan ketentuan keamanan'
      },
      {
        date: '2024-01-10',
        action: 'Disetujui',
        user: 'Prof. Michael Chen',
        description: 'Kebijakan disetujui oleh kepala sekolah'
      },
      {
        date: '2024-01-05',
        action: 'Dibuat',
        user: 'Dr. Sarah Johnson',
        description: 'Draft awal kebijakan dibuat'
      }
    ],
    comments: [
      {
        id: '1',
        user: 'Ahmad Rizki',
        date: '2024-01-16',
        comment: 'Kebijakan yang sangat informatif dan mudah dipahami. Sangat membantu untuk memahami penggunaan TI yang benar.',
        rating: 5
      },
      {
        id: '2',
        user: 'Linda Wang',
        date: '2024-01-15',
        comment: 'Bagus sekali! Terutama bagian keamanan yang sangat detail. Saya sudah mengkonfirmasi pembacaan.',
        rating: 4
      },
      {
        id: '3',
        user: 'Budi Santoso',
        date: '2024-01-14',
        comment: 'Kebijakan yang komprehensif. Saran saya mungkin bisa ditambahkan panduan troubleshooting untuk masalah umum.',
        rating: 4
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPolicy(dummyPolicy);
      setIsLoading(false);
    }, 1000);
  }, [policyId]);

  const handleBack = () => {
    router.back();
  };

  const handleDownload = (attachment: any) => {
    console.log('Downloading:', attachment.name);
    // Implement download functionality
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: policy?.title,
        text: policy?.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat detail kebijakan...</p>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Kebijakan Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-4">Kebijakan yang Anda cari tidak ditemukan atau telah dihapus.</p>
          <Button onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </div>
      </div>
    );
  }

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
                  {policy.title}
                </h1>
                <p className="text-sm text-gray-500">{policy.policyNumber}</p>
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
          <div className="lg:col-span-2 space-y-6">
            {/* Policy Header */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-blue-100 rounded-lg p-2">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">{policy.title}</h1>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="secondary">{policy.category}</Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {policy.status}
                          </Badge>
                          <Badge variant="outline">v{policy.version}</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">{policy.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Nomor:</span>
                    <span className="font-medium">{policy.policyNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Berlaku:</span>
                    <span className="font-medium">{policy.effectiveDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Penulis:</span>
                    <span className="font-medium">{policy.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Dept:</span>
                    <span className="font-medium">{policy.department}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Content */}
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 h-12">
                    <TabsTrigger value="overview" className="text-sm">Ringkasan</TabsTrigger>
                    <TabsTrigger value="content" className="text-sm">Konten</TabsTrigger>
                    <TabsTrigger value="history" className="text-sm">Riwayat</TabsTrigger>
                    <TabsTrigger value="comments" className="text-sm">Komentar</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="p-6">
                    <div className="space-y-6">
                      {/* Statistics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <Eye className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-blue-700">{policy.statistics.views.toLocaleString()}</div>
                          <div className="text-sm text-blue-600">Dilihat</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <Download className="h-6 w-6 text-green-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-green-700">{policy.statistics.downloads}</div>
                          <div className="text-sm text-green-600">Diunduh</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <FileCheck className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-purple-700">{policy.statistics.confirmations}</div>
                          <div className="text-sm text-purple-600">Dikonfirmasi</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <Star className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-orange-700">{policy.statistics.rating}</div>
                          <div className="text-sm text-orange-600">Rating</div>
                        </div>
                      </div>

                      {/* Related Policies */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Kebijakan Terkait</h3>
                        <div className="space-y-2">
                          {policy.relatedPolicies.map((related) => (
                            <div key={related.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                              <div>
                                <h4 className="font-medium">{related.title}</h4>
                                <p className="text-sm text-gray-500">{related.category}</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="p-6">
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-6 rounded-lg overflow-x-auto">
                        {policy.content}
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="p-6">
                    <div className="space-y-4">
                      {policy.history.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            {index < policy.history.length - 1 && (
                              <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium">{item.action}</h4>
                              <Badge variant="outline" className="text-xs">
                                {item.date}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                            <p className="text-xs text-gray-500">oleh {item.user}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="comments" className="p-6">
                    <div className="space-y-4">
                      {policy.comments.map((comment) => (
                        <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="font-medium">{comment.user}</span>
                              <Badge variant="outline" className="text-xs">
                                {comment.date}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{comment.comment}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Attachments */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Lampiran</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {policy.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm">{attachment.name}</p>
                          <p className="text-xs text-gray-500">{attachment.size} • {attachment.type}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(attachment)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Konfirmasi Pembacaan
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Unduh PDF
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Beri Komentar
                </Button>
                <Button variant="outline" className="w-full">
                  <Star className="h-4 w-4 mr-2" />
                  Beri Rating
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Butuh Bantuan?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">admin@telkomschools.sch.id</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span className="text-sm">+62 812-3456-7890</span>
                </div>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
