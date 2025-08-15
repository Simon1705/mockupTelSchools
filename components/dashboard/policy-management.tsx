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
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Upload,
  Save,
  X,
  Calendar,
  User,
  FileText,
  Download,
  Share2,
  AlertTriangle
} from 'lucide-react';

interface Policy {
  id: string;
  title: string;
  category: string;
  effectiveDate: string;
  policyNumber: string;
  status: 'active' | 'draft' | 'pending';
  createdBy: string;
  views: number;
  confirmations: number;
  description: string;
  content?: string;
  attachments?: string[];
  version?: string;
  lastModified?: string;
}

export function PolicyManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddingPolicy, setIsAddingPolicy] = useState(false);
  const [isViewingPolicy, setIsViewingPolicy] = useState(false);
  const [isEditingPolicy, setIsEditingPolicy] = useState(false);
  const [isDeletingPolicy, setIsDeletingPolicy] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    effectiveDate: '',
    description: '',
    content: ''
  });

  const allPolicies: Policy[] = [
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
      content: `# Kebijakan Pembelajaran Hybrid 2024

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
      attachments: ['Panduan_Hybrid_Learning.pdf', 'SOP_Implementasi.docx'],
      version: '1.0',
      lastModified: '2024-01-15'
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
      content: `# Protokol Kesehatan dan Keselamatan Kerja

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
      attachments: ['SOP_K3.pdf', 'Checklist_Compliance.xlsx'],
      version: '2.1',
      lastModified: '2024-01-10'
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
      content: `# Panduan Penggunaan Sistem Informasi Akademik

## Tujuan
Memberikan panduan lengkap penggunaan sistem informasi akademik.

## Fitur Utama
1. Manajemen data siswa
2. Sistem penilaian digital
3. Pelaporan akademik
4. Komunikasi dengan orang tua

## Implementasi
- Pelatihan pengguna
- Dokumentasi lengkap
- Support teknis

## Monitoring
Evaluasi penggunaan dan feedback pengguna.`,
      attachments: ['User_Manual.pdf', 'Training_Materials.zip'],
      version: '1.0',
      lastModified: '2024-01-05'
    }
  ];

  const filteredPolicies = allPolicies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         policy.policyNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewPolicy = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsViewingPolicy(true);
  };

  const handleEditPolicy = (policy: Policy) => {
    setSelectedPolicy(policy);
    setFormData({
      title: policy.title,
      category: policy.category,
      effectiveDate: policy.effectiveDate,
      description: policy.description,
      content: policy.content || ''
    });
    setIsEditingPolicy(true);
  };

  const handleDeletePolicy = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsDeletingPolicy(true);
  };

  const handleAddPolicy = () => {
    setFormData({
      title: '',
      category: '',
      effectiveDate: '',
      description: '',
      content: ''
    });
    setIsAddingPolicy(true);
  };

  const handleSavePolicy = () => {
    // In a real app, this would save to backend
    console.log('Saving policy:', formData);
    setIsAddingPolicy(false);
    setIsEditingPolicy(false);
    setFormData({
      title: '',
      category: '',
      effectiveDate: '',
      description: '',
      content: ''
    });
  };

  const handleConfirmDelete = () => {
    // In a real app, this would delete from backend
    console.log('Deleting policy:', selectedPolicy?.id);
    setIsDeletingPolicy(false);
    setSelectedPolicy(null);
  };

  const handleCloseModal = () => {
    setIsAddingPolicy(false);
    setIsViewingPolicy(false);
    setIsEditingPolicy(false);
    setIsDeletingPolicy(false);
    setSelectedPolicy(null);
    setFormData({
      title: '',
      category: '',
      effectiveDate: '',
      description: '',
      content: ''
    });
  };

  return (
    <>
      {/* Hero Section - Policy Management */}
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
                <h1 className="text-2xl md:text-3xl font-bold mb-1">Manajemen Kebijakan</h1>
                <p className="text-red-100 text-sm md:text-base">Kelola dan administrasi kebijakan institusi Telkom Schools</p>
                <div className="flex items-center space-x-4 mt-2 text-xs">
                  <span className="flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    {filteredPolicies.length} kebijakan aktif
                  </span>
                  <span className="flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {filteredPolicies.filter(p => p.status === 'draft').length} draft
                  </span>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleAddPolicy}
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Kebijakan
            </Button>
          </div>
        </div>
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
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewPolicy(policy)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditPolicy(policy)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeletePolicy(policy)}
                      >
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

      {/* View Policy Modal */}
      {isViewingPolicy && selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPolicy.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
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
                    <div className="text-sm text-gray-600">Dibuat Oleh</div>
                    <div className="font-medium">{selectedPolicy.createdBy}</div>
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
                    <div className="text-sm text-gray-600">Views</div>
                    <div className="font-medium">{selectedPolicy.views.toLocaleString()}</div>
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
                  <Download className="h-4 w-4 mr-2" />
                  Unduh Kebijakan
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

      {/* Add/Edit Policy Modal */}
      {(isAddingPolicy || isEditingPolicy) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {isAddingPolicy ? 'Tambah Kebijakan Baru' : 'Edit Kebijakan'}
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Judul Kebijakan</Label>
                  <Input 
                    id="title" 
                    placeholder="Masukkan judul kebijakan"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Kategori</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Akademik">Akademik</SelectItem>
                        <SelectItem value="Keselamatan">Keselamatan</SelectItem>
                        <SelectItem value="Teknologi">Teknologi</SelectItem>
                        <SelectItem value="SDM">SDM</SelectItem>
                        <SelectItem value="Keuangan">Keuangan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="effectiveDate">Tanggal Berlaku</Label>
                    <Input 
                      id="effectiveDate" 
                      type="date"
                      value={formData.effectiveDate}
                      onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Masukkan deskripsi kebijakan" 
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Konten Kebijakan</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Masukkan konten lengkap kebijakan" 
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                  />
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
                  <Button className="flex-1" onClick={handleSavePolicy}>
                    <Save className="h-4 w-4 mr-2" />
                    {isAddingPolicy ? 'Simpan sebagai Draft' : 'Simpan Perubahan'}
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

      {/* Delete Confirmation Modal */}
      {isDeletingPolicy && selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                Konfirmasi Hapus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Apakah Anda yakin ingin menghapus kebijakan <strong>"{selectedPolicy.title}"</strong>?
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Tindakan ini tidak dapat dibatalkan dan akan menghapus kebijakan secara permanen.
              </p>
              <div className="flex space-x-2">
                <Button variant="destructive" className="flex-1" onClick={handleConfirmDelete}>
                  Hapus
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleCloseModal}>
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
