# Role Permissions System

## Overview
Sistem manajemen kebijakan Telkom Schools menggunakan hierarki role yang jelas untuk mengatur akses dan permissions pengguna.

## Role Hierarchy
```
Admin (Super User)
├── Approver (Can approve/reject)
├── Editor (Can create/edit)
└── Viewer (Read-only)
```

## Role Definitions

### 1. **Admin (Administrator)**
**Capabilities:**
- ✅ **View** - Melihat semua data, laporan, dan dashboard
- ✅ **Edit** - Membuat, mengedit, dan menghapus kebijakan
- ✅ **Approve/Reject** - Dapat approve/reject di SEMUA level approval
- ✅ **User Management** - Menambah, mengedit, dan menghapus pengguna
- ✅ **System Settings** - Mengatur konfigurasi sistem
- ✅ **Audit Trail** - Melihat semua log aktivitas

**Access Level:** Super User (Bypass semua restrictions)

### 2. **Approver**
**Capabilities:**
- ✅ **View** - Melihat kebijakan dan laporan
- ✅ **Approve/Reject** - Dapat approve/reject di level yang sesuai
- ❌ **Edit** - Tidak dapat mengedit kebijakan
- ❌ **User Management** - Tidak dapat mengelola pengguna

**Access Level:** Level-specific approval

### 3. **Editor**
**Capabilities:**
- ✅ **View** - Melihat kebijakan dan laporan
- ✅ **Edit** - Membuat dan mengedit kebijakan
- ❌ **Approve/Reject** - Tidak dapat approve/reject
- ❌ **User Management** - Tidak dapat mengelola pengguna

**Access Level:** Content creation and editing

### 4. **Viewer (User)**
**Capabilities:**
- ✅ **View** - Melihat kebijakan yang dipublikasikan
- ❌ **Edit** - Tidak dapat mengedit
- ❌ **Approve/Reject** - Tidak dapat approve/reject
- ❌ **User Management** - Tidak dapat mengelola pengguna

**Access Level:** Read-only

## Implementation Details

### Approval Workflow Logic
```typescript
const canApprove = (approverLevel: number, currentLevel: number) => {
  if (user?.role === 'admin') return true; // Admin can approve at any level
  if (user?.role === 'approver') return approverLevel === currentLevel; // Approver can only approve at their level
  return false; // Editor and Viewer cannot approve
};
```

### Menu Access Control
```typescript
const isAdmin = user?.role === 'admin' || user?.role === 'editor' || user?.role === 'approver';
const menuItems = isAdmin ? adminMenuItems : userMenuItems;
```

## Key Features

### 1. **Admin Override Capability**
- Admin dapat approve/reject di level manapun
- Admin dapat bypass workflow normal jika diperlukan
- Admin memiliki akses penuh ke semua fitur

### 2. **Level-based Approval**
- Approver hanya dapat approve di level yang sesuai
- Workflow approval mengikuti hierarki yang ditentukan
- Progress tracking untuk setiap level

### 3. **Role-based UI**
- Interface menyesuaikan dengan role pengguna
- Informasi permission ditampilkan secara jelas
- Button approve/reject hanya muncul untuk role yang sesuai

## Security Considerations

### 1. **Permission Validation**
- Setiap aksi divalidasi berdasarkan role
- Tidak ada bypass permission di frontend
- Backend validation tetap diperlukan

### 2. **Audit Trail**
- Semua aksi approval/rejection dicatat
- Log aktivitas untuk compliance
- Tracking perubahan kebijakan

### 3. **Data Access Control**
- Pengguna hanya melihat data yang sesuai role
- Sensitive information protected
- Role-based data filtering

## Best Practices

### 1. **Role Assignment**
- Berikan role minimal yang diperlukan
- Review permissions secara berkala
- Implementasi principle of least privilege

### 2. **Approval Workflow**
- Tetapkan level approval yang jelas
- Definisikan escalation path
- Monitor approval timeframes

### 3. **User Management**
- Regular role review
- Proper onboarding process
- Clear role descriptions

## FAQ

### Q: Apakah admin bisa approve/reject?
**A: Ya, admin dapat approve/reject di SEMUA level approval. Ini adalah fitur penting untuk efisiensi operasional dan penanganan situasi darurat.**

### Q: Bagaimana jika approver tidak tersedia?
**A: Admin dapat bypass approval workflow jika diperlukan, dengan catatan di audit trail.**

### Q: Apakah editor bisa approve?
**A: Tidak, editor hanya dapat membuat dan mengedit konten, tidak dapat approve/reject.**

### Q: Bagaimana dengan viewer?
**A: Viewer hanya dapat melihat kebijakan yang sudah dipublikasikan, tidak dapat melakukan aksi apapun.**

## Technical Implementation

### Files Involved:
- `components/dashboard/approval-workflow.tsx` - Approval logic
- `components/layout/sidebar.tsx` - Menu access control
- `components/providers.tsx` - Authentication context
- `components/dashboard/user-management.tsx` - User role management

### Key Functions:
- `canApprove()` - Permission validation
- `canReject()` - Rejection permission
- Role-based UI rendering
- Menu item filtering

## Conclusion

Sistem role permissions ini memberikan fleksibilitas yang diperlukan sambil mempertahankan keamanan dan kontrol yang tepat. Admin memiliki kemampuan super user yang diperlukan untuk mengelola sistem secara efektif, sementara role lainnya memiliki akses yang sesuai dengan tanggung jawab mereka.
