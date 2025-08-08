'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Upload, Save } from 'lucide-react';

export function Settings() {
  return (
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
}
