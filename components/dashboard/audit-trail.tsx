'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Activity, Clock, User, Shield } from 'lucide-react';

export function AuditTrail() {
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

  return (
    <>
      {/* Hero Section - Audit Trail */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg p-3">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">Audit Trail</h1>
                <p className="text-red-100 text-sm md:text-base">Log aktivitas dan riwayat akses semua pengguna sistem</p>
                <div className="flex items-center space-x-4 mt-2 text-xs">
                  <span className="flex items-center">
                    <Activity className="h-3 w-3 mr-1" />
                    {auditLogs.length} aktivitas hari ini
                  </span>
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {new Set(auditLogs.map(log => log.user)).size} pengguna aktif
                  </span>
                  <span className="flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Sistem monitoring aktif
                  </span>
                </div>
              </div>
            </div>
            <Button 
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
            >
              <Search className="h-4 w-4 mr-2" />
              Export Log
            </Button>
          </div>
        </div>
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
}
