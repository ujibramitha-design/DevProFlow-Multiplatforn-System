# 🚀 Supabase Setup Guide - DevProFlow Enterprise

Panduan lengkap untuk setup Supabase database untuk sistem KPR Management.

---

## 📋 **Table of Contents**

1. [Prerequisites](#prerequisites)
2. [Create Supabase Project](#create-supabase-project)
3. [Run Database Schema](#run-database-schema)
4. [Configure Environment Variables](#configure-environment-variables)
5. [Setup Row Level Security](#setup-row-level-security)
6. [Test Connection](#test-connection)
7. [Seed Sample Data](#seed-sample-data)
8. [Troubleshooting](#troubleshooting)

---

## 1️⃣ **Prerequisites**

Sebelum memulai, pastikan Anda memiliki:

- ✅ Akun Supabase (gratis di [supabase.com](https://supabase.com))
- ✅ Node.js 18+ terinstall
- ✅ Git terinstall
- ✅ Text editor (VS Code recommended)

---

## 2️⃣ **Create Supabase Project**

### **Step 1: Sign Up / Login**

1. Buka [https://app.supabase.com](https://app.supabase.com)
2. Sign up atau login dengan akun GitHub/Google
3. Klik **"New Project"**

### **Step 2: Create New Project**

Isi form berikut:

```
Project Name: DevProFlow-Enterprise
Database Password: [buat password kuat, simpan dengan aman]
Region: Southeast Asia (Singapore) - untuk Indonesia
Pricing Plan: Free (atau Pro jika butuh lebih)
```

4. Klik **"Create new project"**
5. Tunggu ~2 menit sampai project selesai dibuat

### **Step 3: Get API Keys**

1. Setelah project ready, buka **Settings** → **API**
2. Copy informasi berikut:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **PENTING:** 
- `anon key` → Aman untuk client-side
- `service_role key` → RAHASIA! Hanya untuk server-side

---

## 3️⃣ **Run Database Schema**

### **Step 1: Open SQL Editor**

1. Di Supabase Dashboard, buka **SQL Editor**
2. Klik **"New Query"**

### **Step 2: Copy & Run Schema**

1. Buka file: `apps/web/lib/supabase/schema.sql`
2. Copy **SEMUA ISI** file tersebut
3. Paste ke SQL Editor di Supabase
4. Klik **"Run"** atau tekan `Ctrl+Enter`

### **Step 3: Verify Tables Created**

1. Buka **Table Editor** di sidebar
2. Anda harus melihat 9 tables:
   - ✅ `nasabah`
   - ✅ `properti`
   - ✅ `unit`
   - ✅ `aplikasi_kpr`
   - ✅ `dokumen`
   - ✅ `bank`
   - ✅ `notaris`
   - ✅ `timeline`
   - ✅ `audit_log`

### **Step 4: Verify Sample Data**

1. Klik table **`bank`**
2. Anda harus melihat 5 bank (BTN, Mandiri, BCA, BNI, BRI)
3. Klik table **`notaris`**
4. Anda harus melihat 3 notaris

✅ **Jika semua table dan data ada, schema berhasil!**

---

## 4️⃣ **Configure Environment Variables**

### **Step 1: Create .env.local**

Di folder `apps/web/`, buat file `.env.local`:

```bash
cd apps/web
cp .env.example .env.local
```

### **Step 2: Fill Supabase Credentials**

Edit `.env.local` dan isi:

```env
# =====================================================
# SUPABASE CONFIGURATION
# =====================================================

NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Ganti dengan credentials dari **Step 2.3** di atas.

### **Step 3: Configure Other Settings**

```env
# Database
DATABASE_TABLE_NASABAH=nasabah
DATABASE_SCHEMA=public

# App Settings
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Features
ENABLE_REALTIME=true
ENABLE_DOC_GENERATION=true
```

---

## 5️⃣ **Setup Row Level Security (RLS)**

RLS sudah di-enable otomatis oleh schema. Untuk customize:

### **Basic Policies (Already Applied)**

```sql
-- Allow authenticated users to read
CREATE POLICY "Allow authenticated read access" ON nasabah
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admin full access
CREATE POLICY "Allow admin full access" ON nasabah
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

### **Custom Policies (Optional)**

Jika ingin user hanya bisa lihat data mereka sendiri:

```sql
-- User can only see their own applications
CREATE POLICY "Users can view own applications" ON aplikasi_kpr
  FOR SELECT USING (auth.uid() = created_by);
```

Run di SQL Editor jika diperlukan.

---

## 6️⃣ **Test Connection**

### **Step 1: Install Dependencies**

```bash
cd apps/web
pnpm install @supabase/supabase-js
```

### **Step 2: Test Connection**

Buat file test: `apps/web/test-supabase.ts`

```typescript
import { supabase } from './lib/supabase/client'

async function testConnection() {
  console.log('🔍 Testing Supabase connection...')
  
  try {
    // Test 1: Fetch banks
    const { data: banks, error } = await supabase
      .from('bank')
      .select('*')
      .limit(5)
    
    if (error) throw error
    
    console.log('✅ Connection successful!')
    console.log('📊 Banks found:', banks?.length)
    console.log('🏦 Banks:', banks)
    
    // Test 2: Count nasabah
    const { count } = await supabase
      .from('nasabah')
      .select('*', { count: 'exact', head: true })
    
    console.log('👥 Total nasabah:', count)
    
    return true
  } catch (error) {
    console.error('❌ Connection failed:', error)
    return false
  }
}

testConnection()
```

Run test:

```bash
npx tsx test-supabase.ts
```

**Expected Output:**
```
🔍 Testing Supabase connection...
✅ Connection successful!
📊 Banks found: 5
🏦 Banks: [{ nama_bank: 'Bank BTN', ... }, ...]
👥 Total nasabah: 0
```

---

## 7️⃣ **Seed Sample Data**

### **Option 1: Via SQL Editor**

Buka SQL Editor dan run:

```sql
-- Insert sample properti
INSERT INTO properti (nama_properti, lokasi_properti, developer, kota, provinsi) VALUES
  ('Griya Asri Residence', 'Jl. Raya Bogor KM 25', 'PT Griya Asri', 'Depok', 'Jawa Barat'),
  ('Taman Indah Permai', 'Jl. Raya Jakarta-Tangerang', 'PT Taman Indah', 'Tangerang', 'Banten'),
  ('Puri Harmoni Estate', 'Jl. Raya Bekasi KM 18', 'PT Puri Harmoni', 'Bekasi', 'Jawa Barat');

-- Insert sample units
INSERT INTO unit (properti_id, tipe_unit, blok, nomor_unit, luas_tanah, luas_bangunan, harga_properti, harga_jual, status_unit)
SELECT 
  p.id,
  '45/90',
  'A',
  '15',
  90,
  45,
  500000000,
  500000000,
  'Available'
FROM properti p WHERE p.nama_properti = 'Griya Asri Residence' LIMIT 1;

-- Insert sample nasabah
INSERT INTO nasabah (
  nama_nasabah, nik, alamat, no_telp, email, 
  pekerjaan, status_pekerjaan, penghasilan_bulanan, 
  status_pernikahan, document_profile
) VALUES
  ('Ahmad Fauzi', '3201234567890123', 'Jl. Merdeka No. 123, Jakarta', '081234567890', 'ahmad.fauzi@email.com', 
   'Karyawan Swasta', 'Karyawan', 15000000, 'Menikah', 'fixed-income'),
  ('Siti Nurhaliza', '3301234567890124', 'Jl. Sudirman No. 45, Bandung', '081234567891', 'siti.nur@email.com',
   'Pengusaha', 'Wiraswasta', 20000000, 'Menikah', 'non-fixed-income'),
  ('Budi Santoso', '3101234567890125', 'Jl. Gatot Subroto No. 78, Surabaya', '081234567892', 'budi.santoso@email.com',
   'Dokter', 'Professional', 25000000, 'Menikah', 'professional');
```

### **Option 2: Via Application**

Gunakan API atau UI untuk insert data setelah aplikasi running.

---

## 8️⃣ **Troubleshooting**

### **Problem: "relation does not exist"**

**Solution:**
- Pastikan schema SQL sudah di-run dengan benar
- Check di Table Editor apakah tables sudah ada
- Coba run schema lagi (DROP tables dulu jika perlu)

### **Problem: "Invalid API key"**

**Solution:**
- Double-check `.env.local` credentials
- Pastikan tidak ada spasi atau newline di API key
- Regenerate API key di Supabase Settings → API

### **Problem: "Row Level Security policy violation"**

**Solution:**
- Pastikan user sudah authenticated
- Check RLS policies di Supabase → Authentication → Policies
- Untuk testing, bisa temporary disable RLS:
  ```sql
  ALTER TABLE nasabah DISABLE ROW LEVEL SECURITY;
  ```

### **Problem: Connection timeout**

**Solution:**
- Check internet connection
- Verify Supabase project URL correct
- Check firewall/proxy settings
- Try different network

### **Problem: "Too many connections"**

**Solution:**
- Free tier limit: 60 concurrent connections
- Upgrade to Pro plan
- Optimize queries untuk reduce connections
- Use connection pooling

---

## 📊 **Database Schema Overview**

### **Tables & Relationships**

```
nasabah (Customers)
  ↓
aplikasi_kpr (KPR Applications)
  ↓
  ├─→ unit (Property Units)
  │     ↓
  │   properti (Properties)
  │
  ├─→ bank (Banks)
  ├─→ notaris (Notaries)
  ├─→ dokumen (Documents)
  └─→ timeline (Activity Timeline)

audit_log (Audit Trail) - standalone
```

### **Key Tables**

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `nasabah` | Customer data | nama, NIK, penghasilan, document_profile |
| `aplikasi_kpr` | KPR applications | nomor_aplikasi, stage, status, plafon, tenor |
| `unit` | Property units | tipe_unit, blok, nomor, harga_jual |
| `dokumen` | Document tracking | nama_dokumen, status, is_uploaded |
| `timeline` | Activity log | activity_type, description |

---

## 🔐 **Security Best Practices**

### **1. Never Expose Service Role Key**

```typescript
// ❌ WRONG - Never use in client-side
const supabase = createClient(url, SERVICE_ROLE_KEY)

// ✅ CORRECT - Use anon key in client
const supabase = createClient(url, ANON_KEY)
```

### **2. Always Use RLS**

```sql
-- Enable RLS on all tables
ALTER TABLE nasabah ENABLE ROW LEVEL SECURITY;

-- Create specific policies
CREATE POLICY "policy_name" ON table_name
  FOR operation USING (condition);
```

### **3. Validate Input**

```typescript
// Use Zod or similar for validation
import { z } from 'zod'

const NasabahSchema = z.object({
  nama_nasabah: z.string().min(3),
  nik: z.string().length(16),
  email: z.string().email()
})
```

### **4. Use Prepared Statements**

Supabase automatically uses prepared statements, tapi tetap validate:

```typescript
// ✅ Safe - Supabase handles escaping
const { data } = await supabase
  .from('nasabah')
  .select('*')
  .eq('nik', userInput) // Safe from SQL injection
```

---

## 📈 **Performance Tips**

### **1. Use Indexes**

Schema sudah include indexes untuk:
- `nasabah.nik`
- `aplikasi_kpr.nomor_aplikasi`
- `aplikasi_kpr.stage`
- `aplikasi_kpr.status`

### **2. Limit Results**

```typescript
// Always use limit for large tables
const { data } = await supabase
  .from('nasabah')
  .select('*')
  .limit(100) // Don't fetch all
```

### **3. Select Only Needed Columns**

```typescript
// ❌ Fetches all columns
.select('*')

// ✅ Only fetch what you need
.select('id, nama_nasabah, nik, email')
```

### **4. Use Views for Complex Queries**

Schema includes `v_aplikasi_lengkap` view:

```typescript
const { data } = await supabase
  .from('v_aplikasi_lengkap')
  .select('*')
  .eq('stage', 'PRA_AKAD')
```

---

## 🎯 **Next Steps**

Setelah Supabase setup selesai:

1. ✅ **Test connection** - Pastikan semua working
2. ✅ **Seed data** - Insert sample data untuk testing
3. ✅ **Setup authentication** - Configure Supabase Auth
4. ✅ **Build UI** - Connect frontend ke database
5. ✅ **Test CRUD operations** - Create, Read, Update, Delete
6. ✅ **Enable real-time** - Setup real-time subscriptions
7. ✅ **Deploy** - Deploy ke production

---

## 📚 **Resources**

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

---

## ✅ **Checklist**

Gunakan checklist ini untuk memastikan setup complete:

- [ ] Supabase project created
- [ ] API keys copied
- [ ] Database schema executed
- [ ] All 9 tables created
- [ ] Sample banks & notaris inserted
- [ ] `.env.local` configured
- [ ] Dependencies installed (`@supabase/supabase-js`)
- [ ] Connection tested successfully
- [ ] RLS policies reviewed
- [ ] Sample data seeded (optional)
- [ ] Documentation read

---

**🎉 Supabase setup complete! Ready untuk development!**

---

**Last Updated:** April 2, 2026  
**Version:** 1.0.0  
**Maintained By:** DevProFlow Enterprise Team
