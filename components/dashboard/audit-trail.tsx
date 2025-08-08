'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';

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
}
