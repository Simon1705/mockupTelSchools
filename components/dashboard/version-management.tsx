'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Eye,
  GitBranch,
  Download,
  Plus,
  X,
  Calendar,
  User,
  FileText,
  History,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowUpDown,
  Share2,
  Diff,
  Plus as PlusIcon,
  Minus as MinusIcon
} from 'lucide-react';

interface PolicyVersion {
  id: string;
  policyTitle: string;
  version: string;
  changes: string;
  createdBy: string;
  createdDate: string;
  status: 'active' | 'archived' | 'draft';
  content?: string;
  previousVersion?: string;
  approvalStatus?: 'approved' | 'pending' | 'rejected';
  attachments?: string[];
  changeLog?: string[];
  previousContent?: string;
  reviewers?: Array<{
    name: string;
    role: string;
    status: 'approved' | 'pending' | 'rejected';
    comment?: string;
  }>;
}

export function VersionManagement() {
  const [isViewingVersion, setIsViewingVersion] = useState(false);
  const [isCreatingVersion, setIsCreatingVersion] = useState(false);
  const [isDownloadingVersion, setIsDownloadingVersion] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<PolicyVersion | null>(null);
  const [formData, setFormData] = useState({
    baseVersion: '',
    newVersion: '',
    changes: '',
    description: '',
    content: ''
  });

  const policyVersions: PolicyVersion[] = [
    {
      id: '1',
      policyTitle: 'Kebijakan Pembelajaran Hybrid 2024',
      version: '2.1',
      changes: 'Penambahan protokol untuk pembelajaran outdoor',
      createdBy: 'Dr. Sarah Johnson',
      createdDate: '2024-01-15',
      status: 'active',
      previousVersion: '2.0',
      approvalStatus: 'approved',
      content: `# Kebijakan Pembelajaran Hybrid 2024 - Versi 2.1

## Latar Belakang
Kebijakan ini dibuat untuk mengoptimalkan pembelajaran di era digital dengan menggabungkan metode tatap muka dan online.

## Tujuan
1. Meningkatkan aksesibilitas pembelajaran
2. Mengoptimalkan penggunaan teknologi
3. Mempertahankan kualitas pendidikan

## Implementasi
- Kombinasi pembelajaran tatap muka dan online
- Penggunaan platform digital yang terintegrasi
- Evaluasi berkala untuk efektivitas
- **NEW**: Protokol pembelajaran outdoor yang aman

## Monitoring
Evaluasi dilakukan setiap semester untuk memastikan efektivitas implementasi.

## Perubahan dari Versi 2.0
- Penambahan protokol pembelajaran outdoor
- Update prosedur keselamatan
- Peningkatan monitoring aktivitas outdoor`,
      previousContent: `# Kebijakan Pembelajaran Hybrid 2024 - Versi 2.0

## Latar Belakang
Kebijakan ini dibuat untuk mengoptimalkan pembelajaran di era digital dengan menggabungkan metode tatap muka dan online.

## Tujuan
1. Meningkatkan aksesibilitas pembelajaran
2. Mengoptimalkan penggunaan teknologi
3. Mempertahankan kualitas pendidikan

## Implementasi
- Kombinasi pembelajaran tatap muka dan online
- Penggunaan platform digital yang terintegrasi
- Evaluasi berkala untuk efektivitas

## Monitoring
Evaluasi dilakukan setiap semester untuk memastikan efektivitas implementasi.`,
      attachments: ['Hybrid_Learning_v2.1.pdf', 'Outdoor_Protocol_v2.1.docx'],
      changeLog: [
        'Penambahan protokol pembelajaran outdoor',
        'Update prosedur keselamatan',
        'Peningkatan monitoring aktivitas outdoor',
        'Revisi format laporan evaluasi'
      ],
      reviewers: [
        {
          name: 'Prof. Dr. Ahmad Rizki',
          role: 'Kepala Sekolah',
          status: 'approved',
          comment: 'Sangat baik, implementasi dapat dilanjutkan'
        },
        {
          name: 'Linda Wang',
          role: 'Koordinator Akademik',
          status: 'approved',
          comment: 'Protokol outdoor sudah sesuai standar'
        }
      ]
    },
    {
      id: '2',
      policyTitle: 'Kebijakan Pembelajaran Hybrid 2024',
      version: '2.0',
      changes: 'Revisi major untuk adaptasi teknologi baru',
      createdBy: 'Dr. Sarah Johnson',
      createdDate: '2024-01-01',
      status: 'archived',
      previousVersion: '1.5',
      approvalStatus: 'approved',
      content: `# Kebijakan Pembelajaran Hybrid 2024 - Versi 2.0

## Latar Belakang
Kebijakan ini dibuat untuk mengoptimalkan pembelajaran di era digital dengan menggabungkan metode tatap muka dan online.

## Tujuan
1. Meningkatkan aksesibilitas pembelajaran
2. Mengoptimalkan penggunaan teknologi
3. Mempertahankan kualitas pendidikan

## Implementasi
- Kombinasi pembelajaran tatap muka dan online
- Penggunaan platform digital yang terintegrasi
- Evaluasi berkala untuk efektivitas

## Monitoring
Evaluasi dilakukan setiap semester untuk memastikan efektivitas implementasi.

## Perubahan dari Versi 1.5
- Revisi major untuk adaptasi teknologi baru
- Update platform pembelajaran
- Peningkatan sistem evaluasi`,
      previousContent: `# Kebijakan Pembelajaran Hybrid 2024 - Versi 1.5

## Latar Belakang
Kebijakan ini dibuat untuk mengoptimalkan pembelajaran di era digital.

## Tujuan
1. Meningkatkan aksesibilitas pembelajaran
2. Mengoptimalkan penggunaan teknologi

## Implementasi
- Kombinasi pembelajaran tatap muka dan online
- Penggunaan platform digital

## Monitoring
Evaluasi dilakukan setiap semester.`,
      attachments: ['Hybrid_Learning_v2.0.pdf'],
      changeLog: [
        'Revisi major untuk adaptasi teknologi baru',
        'Update platform pembelajaran',
        'Peningkatan sistem evaluasi',
        'Penambahan fitur monitoring real-time'
      ],
      reviewers: [
        {
          name: 'Prof. Dr. Ahmad Rizki',
          role: 'Kepala Sekolah',
          status: 'approved'
        }
      ]
    },
    {
      id: '3',
      policyTitle: 'Protokol Kesehatan K3',
      version: '1.3',
      changes: 'Update prosedur emergency response',
      createdBy: 'Ahmad Rizki',
      createdDate: '2024-01-10',
      status: 'active',
      previousVersion: '1.2',
      approvalStatus: 'approved',
      content: `# Protokol Kesehatan K3 - Versi 1.3

## Ruang Lingkup
Kebijakan ini berlaku untuk seluruh civitas akademika Telkom Schools.

## Standar K3
1. Penggunaan APD yang sesuai
2. Protokol sanitasi yang ketat
3. Pembatasan kapasitas ruangan
4. Monitoring kesehatan berkala
5. **NEW**: Prosedur emergency response yang diperbarui

## Implementasi
- Pelatihan K3 untuk semua pegawai
- Audit berkala untuk compliance
- Sistem pelaporan insiden
- **NEW**: Simulasi emergency response

## Compliance
Mengikuti standar K3 nasional dan internasional.

## Perubahan dari Versi 1.2
- Update prosedur emergency response
- Penambahan protokol evakuasi
- Peningkatan sistem pelaporan insiden`,
      previousContent: `# Protokol Kesehatan K3 - Versi 1.2

## Ruang Lingkup
Kebijakan ini berlaku untuk seluruh civitas akademika Telkom Schools.

## Standar K3
1. Penggunaan APD yang sesuai
2. Protokol sanitasi yang ketat
3. Pembatasan kapasitas ruangan
4. Monitoring kesehatan berkala

## Implementasi
- Pelatihan K3 untuk semua pegawai
- Audit berkala untuk compliance
- Sistem pelaporan insiden

## Compliance
Mengikuti standar K3 nasional dan internasional.`,
      attachments: ['K3_Protocol_v1.3.pdf', 'Emergency_Response_v1.3.docx'],
      changeLog: [
        'Update prosedur emergency response',
        'Penambahan protokol evakuasi',
        'Peningkatan sistem pelaporan insiden',
        'Revisi checklist compliance'
      ],
      reviewers: [
        {
          name: 'Dr. Sarah Johnson',
          role: 'Kepala K3',
          status: 'approved',
          comment: 'Prosedur emergency sudah sesuai standar'
        }
      ]
    }
  ];

  const handleViewVersion = (version: PolicyVersion) => {
    setSelectedVersion(version);
    setIsViewingVersion(true);
  };

  const handleCreateVersion = (baseVersion: PolicyVersion) => {
    setSelectedVersion(baseVersion);
    setFormData({
      baseVersion: baseVersion.version,
      newVersion: '',
      changes: '',
      description: '',
      content: baseVersion.content || ''
    });
    setIsCreatingVersion(true);
  };

  const handleDownloadVersion = (version: PolicyVersion) => {
    setSelectedVersion(version);
    setIsDownloadingVersion(true);
  };

  const handleSaveVersion = () => {
    // In a real app, this would save to backend
    console.log('Creating new version:', formData);
    setIsCreatingVersion(false);
    setFormData({
      baseVersion: '',
      newVersion: '',
      changes: '',
      description: '',
      content: ''
    });
  };

  const handleConfirmDownload = () => {
    // In a real app, this would trigger download
    console.log('Downloading version:', selectedVersion?.version);
    setIsDownloadingVersion(false);
    setSelectedVersion(null);
  };

  const handleCloseModal = () => {
    setIsViewingVersion(false);
    setIsCreatingVersion(false);
    setIsDownloadingVersion(false);
    setSelectedVersion(null);
    setFormData({
      baseVersion: '',
      newVersion: '',
      changes: '',
      description: '',
      content: ''
    });
  };

  // Simple diff function to highlight changes
  const renderDiff = (oldContent: string, newContent: string) => {
    const oldLines = oldContent.split('\n');
    const newLines = newContent.split('\n');
    const maxLines = Math.max(oldLines.length, newLines.length);
    
    const diffLines = [];
    
    for (let i = 0; i < maxLines; i++) {
      const oldLine = oldLines[i] || '';
      const newLine = newLines[i] || '';
      
      if (oldLine === newLine) {
        // No change
        diffLines.push(
          <div key={i} className="flex">
            <div className="w-8 text-gray-400 text-xs text-center"> </div>
            <div className="flex-1 bg-white text-gray-700">{oldLine}</div>
            <div className="flex-1 bg-white text-gray-700">{newLine}</div>
          </div>
        );
      } else {
        // Changed line
        diffLines.push(
          <div key={i} className="flex">
            <div className="w-8 text-gray-400 text-xs text-center">-</div>
            <div className="flex-1 bg-red-50 text-red-700 line-through">{oldLine}</div>
            <div className="flex-1 bg-green-50 text-green-700">{newLine}</div>
          </div>
        );
      }
    }
    
    return diffLines;
  };

  return (
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
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewVersion(version)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleCreateVersion(version)}
                      >
                        <GitBranch className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadVersion(version)}
                      >
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

      {/* View Version Modal */}
      {isViewingVersion && selectedVersion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVersion.policyTitle}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <GitBranch className="h-4 w-4 mr-1" />
                      Versi {selectedVersion.version}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Dibuat: {new Date(selectedVersion.createdDate).toLocaleDateString('id-ID')}
                    </span>
                    <Badge variant={selectedVersion.status === 'active' ? 'default' : 'secondary'}>
                      {selectedVersion.status === 'active' ? 'Aktif' : 'Arsip'}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Version Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Dibuat Oleh</div>
                    <div className="font-medium">{selectedVersion.createdBy}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Versi Sebelumnya</div>
                    <div className="font-medium">v{selectedVersion.previousVersion || 'N/A'}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Status Approval</div>
                    <Badge variant={
                      selectedVersion.approvalStatus === 'approved' ? 'default' :
                      selectedVersion.approvalStatus === 'rejected' ? 'destructive' : 'secondary'
                    }>
                      {selectedVersion.approvalStatus === 'approved' ? 'Disetujui' :
                       selectedVersion.approvalStatus === 'rejected' ? 'Ditolak' : 'Menunggu'}
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Perubahan</div>
                    <div className="font-medium">{selectedVersion.changes}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs for Content and Comparison */}
              <Tabs defaultValue="content" className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Konten Versi</TabsTrigger>
                  <TabsTrigger value="comparison">Perbandingan Versi</TabsTrigger>
                  <TabsTrigger value="details">Detail Lainnya</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Isi Versi {selectedVersion.version}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
                          {selectedVersion.content}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="comparison" className="mt-6">
                  {selectedVersion.previousContent ? (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Diff className="h-5 w-5 mr-2" />
                          Perbandingan v{selectedVersion.previousVersion} → v{selectedVersion.version}
                        </CardTitle>
                        <CardDescription>
                          Perbandingan konten antara versi {selectedVersion.previousVersion} dan {selectedVersion.version}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="border rounded-lg overflow-hidden">
                          {/* Header */}
                          <div className="flex bg-gray-100 border-b">
                            <div className="w-8 text-gray-500 text-xs text-center py-2"> </div>
                            <div className="flex-1 text-center py-2 text-sm font-medium text-gray-700">
                              v{selectedVersion.previousVersion} (Lama)
                            </div>
                            <div className="flex-1 text-center py-2 text-sm font-medium text-gray-700">
                              v{selectedVersion.version} (Baru)
                            </div>
                          </div>
                          
                          {/* Diff Content */}
                          <div className="max-h-96 overflow-y-auto">
                            <div className="font-mono text-xs">
                              {renderDiff(selectedVersion.previousContent, selectedVersion.content || '')}
                            </div>
                          </div>
                        </div>
                        
                        {/* Legend */}
                        <div className="mt-4 flex items-center space-x-4 text-xs text-gray-600">
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-red-50 border border-red-200"></div>
                            <span>Dihapus</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-green-50 border border-green-200"></div>
                            <span>Ditambahkan</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-white border border-gray-200"></div>
                            <span>Tidak berubah</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Versi Sebelumnya</h3>
                        <p className="text-gray-600">
                          Ini adalah versi pertama dari kebijakan ini, tidak ada perbandingan yang tersedia.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="details" className="mt-6">
                  <div className="space-y-6">
                    {/* Change Log */}
                    {selectedVersion.changeLog && selectedVersion.changeLog.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <History className="h-5 w-5 mr-2" />
                            Change Log
                          </CardTitle>
                          <CardDescription>Daftar perubahan dari versi sebelumnya</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedVersion.changeLog.map((change, index) => (
                              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                                <span className="text-sm">{change}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Reviewers */}
                    {selectedVersion.reviewers && selectedVersion.reviewers.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <User className="h-5 w-5 mr-2" />
                            Reviewers
                          </CardTitle>
                          <CardDescription>Status review dari tim yang terkait</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {selectedVersion.reviewers.map((reviewer, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                    <User className="h-4 w-4 text-gray-600" />
                                  </div>
                                  <div>
                                    <div className="font-medium">{reviewer.name}</div>
                                    <div className="text-sm text-gray-500">{reviewer.role}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <Badge variant={
                                    reviewer.status === 'approved' ? 'default' :
                                    reviewer.status === 'rejected' ? 'destructive' : 'secondary'
                                  }>
                                    {reviewer.status === 'approved' ? 'Disetujui' :
                                     reviewer.status === 'rejected' ? 'Ditolak' : 'Menunggu'}
                                  </Badge>
                                  {reviewer.comment && (
                                    <p className="text-xs text-gray-500 mt-1">{reviewer.comment}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Attachments */}
                    {selectedVersion.attachments && selectedVersion.attachments.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Lampiran</CardTitle>
                          <CardDescription>Dokumen pendukung versi ini</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedVersion.attachments.map((attachment, index) => (
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
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-6 border-t">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Unduh Versi
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" onClick={handleCloseModal}>
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create New Version Modal */}
      {isCreatingVersion && selectedVersion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <GitBranch className="h-5 w-5 mr-2" />
                  Buat Versi Baru
                </div>
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Membuat versi baru berdasarkan {selectedVersion?.policyTitle} v{selectedVersion?.version}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="baseVersion">Versi Dasar</Label>
                    <Input 
                      id="baseVersion" 
                      value={formData.baseVersion}
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="newVersion">Versi Baru</Label>
                    <Input 
                      id="newVersion" 
                      placeholder="Contoh: 2.2"
                      value={formData.newVersion}
                      onChange={(e) => setFormData({...formData, newVersion: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="changes">Ringkasan Perubahan</Label>
                  <Input 
                    id="changes" 
                    placeholder="Deskripsi singkat perubahan"
                    value={formData.changes}
                    onChange={(e) => setFormData({...formData, changes: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi Detail</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Penjelasan detail perubahan"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Konten Versi Baru</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Konten lengkap versi baru"
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1" onClick={handleSaveVersion}>
                    <GitBranch className="h-4 w-4 mr-2" />
                    Buat Versi Baru
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

      {/* Download Version Modal */}
      {isDownloadingVersion && selectedVersion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="h-5 w-5 text-blue-600 mr-2" />
                Download Versi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <h3 className="font-medium">{selectedVersion.policyTitle}</h3>
                  <p className="text-sm text-gray-600">Versi {selectedVersion.version}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Format:</span>
                    <span>PDF</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ukuran:</span>
                    <span>~2.5 MB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tanggal:</span>
                    <span>{new Date(selectedVersion.createdDate).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1" onClick={handleConfirmDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleCloseModal}>
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
}
