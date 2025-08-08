'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/providers';
import { toast } from 'sonner';
import { Loader2, Info, User, Shield } from 'lucide-react';
import Image from 'next/image';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login berhasil!');
    } catch (error) {
      toast.error('Login gagal. Periksa kembali email dan password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo-telkom-schools.png"
              alt="Telkom Schools Logo"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
          <p className="text-gray-600 mt-2">Sistem Manajemen Kebijakan</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Masuk ke Akun Anda</CardTitle>
            <CardDescription>
              Masukkan email dan password untuk mengakses sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@telkomschools.sch.id"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  'Masuk'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Info className="h-4 w-4 mr-2" />
              Demo Credentials
            </CardTitle>
            <CardDescription>
              Gunakan credential berikut untuk testing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Admin Account</span>
                <Badge variant="secondary">Super User</Badge>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Email: admin@telkomschools.sch.id</div>
                <div>Password: admin123</div>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => handleDemoLogin('admin@telkomschools.sch.id', 'admin123')}
              >
                Login sebagai Admin
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">User Account</span>
                <Badge variant="outline">Regular User</Badge>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Email: user@telkomschools.sch.id</div>
                <div>Password: user123</div>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => handleDemoLogin('user@telkomschools.sch.id', 'user123')}
              >
                Login sebagai User
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}