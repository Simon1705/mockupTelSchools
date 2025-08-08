'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Mail,
  X,
  Calendar,
  User,
  Shield,
  Building,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  MapPin,
  Send,
  Lock,
  Unlock
} from 'lucide-react';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'approver' | 'user';
  department: string;
  lastLogin: string;
  status: 'active' | 'inactive';
  phone?: string;
  address?: string;
  joinDate?: string;
  permissions?: string[];
  activityLog?: Array<{
    action: string;
    timestamp: string;
    details: string;
  }>;
}

export function UserManagement() {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isViewingUser, setIsViewingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    phone: '',
    address: ''
  });
  const [emailData, setEmailData] = useState({
    subject: '',
    message: ''
  });

  const systemUsers: SystemUser[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@telkomschools.sch.id',
      role: 'admin',
      department: 'Manajemen Kebijakan',
      lastLogin: '2024-01-15',
      status: 'active',
      phone: '+62 812-3456-7890',
      address: 'Jl. Telkom No. 1, Bandung',
      joinDate: '2023-01-15',
      permissions: ['manage_users', 'manage_policies', 'approve_policies', 'view_analytics'],
      activityLog: [
        {
          action: 'Login',
          timestamp: '2024-01-15 09:30:00',
          details: 'Login berhasil dari IP 192.168.1.100'
        },
        {
          action: 'Edit Policy',
          timestamp: '2024-01-15 10:15:00',
          details: 'Mengedit kebijakan "Kebijakan Pembelajaran Hybrid 2024"'
        },
        {
          action: 'Approve Policy',
          timestamp: '2024-01-15 11:00:00',
          details: 'Menyetujui kebijakan "Protokol Kesehatan K3"'
        }
      ]
    },
    {
      id: '2',
      name: 'Ahmad Rizki',
      email: 'ahmad.rizki@telkomschools.sch.id',
      role: 'editor',
      department: 'IT Department',
      lastLogin: '2024-01-15',
      status: 'active',
      phone: '+62 813-4567-8901',
      address: 'Jl. IT Center No. 5, Bandung',
      joinDate: '2023-03-20',
      permissions: ['edit_policies', 'view_policies', 'create_policies'],
      activityLog: [
        {
          action: 'Login',
          timestamp: '2024-01-15 08:45:00',
          details: 'Login berhasil dari IP 192.168.1.101'
        },
        {
          action: 'Create Policy',
          timestamp: '2024-01-15 09:30:00',
          details: 'Membuat kebijakan baru "Panduan Penggunaan Sistem"'
        }
      ]
    },
    {
      id: '3',
      name: 'Linda Wang',
      email: 'linda.wang@telkomschools.sch.id',
      role: 'approver',
      department: 'Akademik',
      lastLogin: '2024-01-14',
      status: 'active',
      phone: '+62 814-5678-9012',
      address: 'Jl. Akademik No. 10, Bandung',
      joinDate: '2023-06-10',
      permissions: ['approve_policies', 'view_policies', 'view_analytics'],
      activityLog: [
        {
          action: 'Login',
          timestamp: '2024-01-14 14:20:00',
          details: 'Login berhasil dari IP 192.168.1.102'
        },
        {
          action: 'Approve Policy',
          timestamp: '2024-01-14 15:00:00',
          details: 'Menyetujui kebijakan "Kebijakan Pembelajaran Hybrid 2024"'
        }
      ]
    },
    {
      id: '4',
      name: 'John Doe',
      email: 'john.doe@telkomschools.sch.id',
      role: 'user',
      department: 'IT Department',
      lastLogin: '2024-01-15',
      status: 'active',
      phone: '+62 815-6789-0123',
      address: 'Jl. IT Support No. 15, Bandung',
      joinDate: '2023-09-05',
      permissions: ['view_policies'],
      activityLog: [
        {
          action: 'Login',
          timestamp: '2024-01-15 07:30:00',
          details: 'Login berhasil dari IP 192.168.1.103'
        },
        {
          action: 'View Policy',
          timestamp: '2024-01-15 08:00:00',
          details: 'Melihat kebijakan "Protokol Kesehatan K3"'
        }
      ]
    }
  ];

  const handleViewUser = (user: SystemUser) => {
    setSelectedUser(user);
    setIsViewingUser(true);
  };

  const handleEditUser = (user: SystemUser) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      phone: user.phone || '',
      address: user.address || ''
    });
    setIsEditingUser(true);
  };

  const handleSendEmail = (user: SystemUser) => {
    setSelectedUser(user);
    setEmailData({
      subject: '',
      message: ''
    });
    setIsSendingEmail(true);
  };

  const handleDeleteUser = (user: SystemUser) => {
    setSelectedUser(user);
    setIsDeletingUser(true);
  };

  const handleSaveUser = () => {
    // In a real app, this would save to backend
    console.log('Saving user:', formData);
    setIsAddingUser(false);
    setIsEditingUser(false);
    setFormData({
      name: '',
      email: '',
      role: '',
      department: '',
      phone: '',
      address: ''
    });
  };

  const handleSendEmailSubmit = () => {
    // In a real app, this would send email
    console.log('Sending email to:', selectedUser?.email, emailData);
    setIsSendingEmail(false);
    setEmailData({
      subject: '',
      message: ''
    });
  };

  const handleConfirmDelete = () => {
    // In a real app, this would delete from backend
    console.log('Deleting user:', selectedUser?.id);
    setIsDeletingUser(false);
    setSelectedUser(null);
  };

  const handleCloseModal = () => {
    setIsAddingUser(false);
    setIsViewingUser(false);
    setIsEditingUser(false);
    setIsSendingEmail(false);
    setIsDeletingUser(false);
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      role: '',
      department: '',
      phone: '',
      address: ''
    });
    setEmailData({
      subject: '',
      message: ''
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'default';
      case 'editor': return 'secondary';
      case 'approver': return 'outline';
      default: return 'secondary';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'editor': return 'Editor';
      case 'approver': return 'Approver';
      default: return 'User';
    }
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Pengguna</h1>
          <p className="text-gray-600">Kelola pengguna dan hak akses sistem</p>
        </div>
        <Button onClick={() => setIsAddingUser(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pengguna</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead>Login Terakhir</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + parseInt(user.id)}?w=50&h=50&fit=crop&crop=face`} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleColor(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{new Date(user.lastLogin).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewUser(user)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSendEmail(user)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteUser(user)}
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

      {/* View User Modal */}
      {isViewingUser && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + parseInt(selectedUser.id)}?w=64&h=64&fit=crop&crop=face`} />
                    <AvatarFallback className="text-lg">{selectedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                    <p className="text-gray-600">{selectedUser.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant={getRoleColor(selectedUser.role)}>
                        {getRoleLabel(selectedUser.role)}
                      </Badge>
                      <Badge variant={selectedUser.status === 'active' ? 'default' : 'secondary'}>
                        {selectedUser.status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* User Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Departemen</span>
                    </div>
                    <div className="font-medium">{selectedUser.department}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Bergabung Sejak</span>
                    </div>
                    <div className="font-medium">
                      {selectedUser.joinDate ? new Date(selectedUser.joinDate).toLocaleDateString('id-ID') : 'N/A'}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Login Terakhir</span>
                    </div>
                    <div className="font-medium">{new Date(selectedUser.lastLogin).toLocaleDateString('id-ID')}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Telepon</span>
                    </div>
                    <div className="font-medium">{selectedUser.phone || 'N/A'}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              {selectedUser.address && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Alamat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{selectedUser.address}</p>
                  </CardContent>
                </Card>
              )}

              {/* Permissions */}
              {selectedUser.permissions && selectedUser.permissions.length > 0 && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Hak Akses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Activity Log */}
              {selectedUser.activityLog && selectedUser.activityLog.length > 0 && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Aktivitas Terakhir
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedUser.activityLog.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{activity.action}</span>
                              <span className="text-xs text-gray-500">{activity.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-6 border-t">
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Kirim Email
                </Button>
                <Button variant="outline" className="flex-1">
                  <Lock className="h-4 w-4 mr-2" />
                  Reset Password
                </Button>
                <Button variant="outline" onClick={handleCloseModal}>
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit User Modal */}
      {(isAddingUser || isEditingUser) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-2" />
                  {isAddingUser ? 'Tambah Pengguna Baru' : 'Edit Pengguna'}
                </div>
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="userName">Nama Lengkap</Label>
                  <Input 
                    id="userName" 
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="userEmail">Email</Label>
                  <Input 
                    id="userEmail" 
                    type="email" 
                    placeholder="nama@telkomschools.sch.id"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="userRole">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="approver">Approver</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="userDepartment">Departemen</Label>
                    <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih departemen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT Department">IT Department</SelectItem>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Manajemen Kebijakan">Manajemen Kebijakan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="userPhone">Telepon</Label>
                  <Input 
                    id="userPhone" 
                    placeholder="+62 812-3456-7890"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="userAddress">Alamat</Label>
                  <Textarea 
                    id="userAddress" 
                    placeholder="Masukkan alamat lengkap"
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="userStatus" defaultChecked />
                  <Label htmlFor="userStatus">Status Aktif</Label>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1" onClick={handleSaveUser}>
                    {isAddingUser ? 'Tambah Pengguna' : 'Simpan Perubahan'}
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

      {/* Send Email Modal */}
      {isSendingEmail && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Send className="h-5 w-5 mr-2" />
                  Kirim Email
                </div>
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Kirim email ke {selectedUser.name} ({selectedUser.email})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="emailSubject">Subjek</Label>
                  <Input 
                    id="emailSubject" 
                    placeholder="Masukkan subjek email"
                    value={emailData.subject}
                    onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="emailMessage">Pesan</Label>
                  <Textarea 
                    id="emailMessage" 
                    placeholder="Masukkan pesan email"
                    rows={6}
                    value={emailData.message}
                    onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1" onClick={handleSendEmailSubmit}>
                    <Send className="h-4 w-4 mr-2" />
                    Kirim Email
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

      {/* Delete User Modal */}
      {isDeletingUser && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                Konfirmasi Hapus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + parseInt(selectedUser.id)}?w=64&h=64&fit=crop&crop=face`} />
                    <AvatarFallback>{selectedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Apakah Anda yakin ingin menghapus pengguna <strong>"{selectedUser.name}"</strong>?
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Tindakan ini tidak dapat dibatalkan dan akan menghapus pengguna secara permanen.
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="destructive" className="flex-1" onClick={handleConfirmDelete}>
                    Hapus
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
