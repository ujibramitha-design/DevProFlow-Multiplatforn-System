-- =====================================================
-- DevProFlow Enterprise - Supabase Database Schema
-- KPR Management System
-- Version: 1.0.0
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: nasabah (Customers)
-- =====================================================
CREATE TABLE IF NOT EXISTS nasabah (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Personal Information
  nama_nasabah VARCHAR(255) NOT NULL,
  nik VARCHAR(16) UNIQUE NOT NULL,
  tempat_lahir VARCHAR(100),
  tanggal_lahir DATE,
  alamat TEXT NOT NULL,
  no_telp VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  
  -- Employment Information
  pekerjaan VARCHAR(100),
  status_pekerjaan VARCHAR(50), -- 'Karyawan', 'Wiraswasta', 'Professional'
  penghasilan_bulanan DECIMAL(15,2),
  penghasilan_bersih DECIMAL(15,2),
  
  -- Family Information
  status_pernikahan VARCHAR(20), -- 'Menikah', 'Belum Menikah', 'Cerai'
  nama_pasangan VARCHAR(255),
  nik_pasangan VARCHAR(16),
  
  -- Document Profile
  document_profile VARCHAR(50) DEFAULT 'fixed-income', -- 'fixed-income', 'non-fixed-income', 'professional'
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  
  -- Indexes
  CONSTRAINT valid_nik CHECK (LENGTH(nik) = 16),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX idx_nasabah_nik ON nasabah(nik);
CREATE INDEX idx_nasabah_nama ON nasabah(nama_nasabah);
CREATE INDEX idx_nasabah_created_at ON nasabah(created_at DESC);

-- =====================================================
-- TABLE: properti (Properties/Developments)
-- =====================================================
CREATE TABLE IF NOT EXISTS properti (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Property Information
  nama_properti VARCHAR(255) NOT NULL,
  lokasi_properti TEXT NOT NULL,
  developer VARCHAR(255),
  
  -- Address
  alamat_lengkap TEXT,
  kota VARCHAR(100),
  provinsi VARCHAR(100),
  kode_pos VARCHAR(10),
  
  -- Status
  status VARCHAR(50) DEFAULT 'Active', -- 'Active', 'Sold Out', 'Coming Soon'
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_properti_nama ON properti(nama_properti);
CREATE INDEX idx_properti_status ON properti(status);

-- =====================================================
-- TABLE: unit (Property Units)
-- =====================================================
CREATE TABLE IF NOT EXISTS unit (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Property Reference
  properti_id UUID REFERENCES properti(id) ON DELETE CASCADE,
  
  -- Unit Information
  tipe_unit VARCHAR(50) NOT NULL, -- '36/72', '45/90', etc.
  blok VARCHAR(10) NOT NULL,
  nomor_unit VARCHAR(10) NOT NULL,
  
  -- Specifications
  luas_tanah DECIMAL(10,2) NOT NULL, -- in m²
  luas_bangunan DECIMAL(10,2) NOT NULL, -- in m²
  jumlah_lantai INTEGER DEFAULT 1,
  jumlah_kamar_tidur INTEGER,
  jumlah_kamar_mandi INTEGER,
  
  -- Pricing
  harga_properti DECIMAL(15,2) NOT NULL,
  harga_jual DECIMAL(15,2) NOT NULL,
  
  -- Status
  status_unit VARCHAR(50) DEFAULT 'Available', -- 'Available', 'Reserved', 'Sold', 'Blocked'
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(properti_id, blok, nomor_unit)
);

CREATE INDEX idx_unit_properti ON unit(properti_id);
CREATE INDEX idx_unit_status ON unit(status_unit);
CREATE INDEX idx_unit_blok_nomor ON unit(blok, nomor_unit);

-- =====================================================
-- TABLE: aplikasi_kpr (KPR Applications)
-- =====================================================
CREATE TABLE IF NOT EXISTS aplikasi_kpr (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- References
  nasabah_id UUID REFERENCES nasabah(id) ON DELETE CASCADE,
  unit_id UUID REFERENCES unit(id) ON DELETE CASCADE,
  
  -- Application Number
  nomor_aplikasi VARCHAR(50) UNIQUE NOT NULL,
  
  -- Financial Details
  dp DECIMAL(15,2) NOT NULL, -- Down Payment
  persentase_dp DECIMAL(5,2), -- DP percentage
  plafon_kredit DECIMAL(15,2) NOT NULL,
  tenor INTEGER NOT NULL, -- in months
  suku_bunga DECIMAL(5,2) NOT NULL, -- interest rate
  cicilan DECIMAL(15,2) NOT NULL, -- monthly installment
  
  -- Bank Information
  bank VARCHAR(100), -- 'BTN', 'Mandiri', 'BCA', 'BNI', 'BRI'
  bank_id UUID REFERENCES bank(id),
  
  -- Notary Information
  notaris VARCHAR(255),
  notaris_id UUID REFERENCES notaris(id),
  
  -- Stage Tracking
  stage VARCHAR(50) DEFAULT 'PRA_AKAD', -- 'PRA_AKAD', 'AKAD', 'PASCA_AKAD'
  status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED', 'COMPLETED'
  
  -- Risk Assessment
  risk_level VARCHAR(20), -- 'LOW', 'MEDIUM', 'HIGH'
  dsr_percentage DECIMAL(5,2), -- Debt Service Ratio
  ltv_percentage DECIMAL(5,2), -- Loan to Value
  kolektibilitas VARCHAR(10), -- 'Kol 1', 'Kol 2', etc.
  skor_kredit INTEGER,
  
  -- Important Dates
  tanggal_aplikasi DATE DEFAULT CURRENT_DATE,
  tanggal_akad DATE,
  tanggal_serah_terima DATE,
  
  -- Days Tracking
  days_stuck INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  
  CONSTRAINT valid_tenor CHECK (tenor > 0 AND tenor <= 360),
  CONSTRAINT valid_suku_bunga CHECK (suku_bunga >= 0 AND suku_bunga <= 100)
);

CREATE INDEX idx_aplikasi_nasabah ON aplikasi_kpr(nasabah_id);
CREATE INDEX idx_aplikasi_unit ON aplikasi_kpr(unit_id);
CREATE INDEX idx_aplikasi_stage ON aplikasi_kpr(stage);
CREATE INDEX idx_aplikasi_status ON aplikasi_kpr(status);
CREATE INDEX idx_aplikasi_bank ON aplikasi_kpr(bank);
CREATE INDEX idx_aplikasi_nomor ON aplikasi_kpr(nomor_aplikasi);

-- =====================================================
-- TABLE: dokumen (Documents)
-- =====================================================
CREATE TABLE IF NOT EXISTS dokumen (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- References
  aplikasi_id UUID REFERENCES aplikasi_kpr(id) ON DELETE CASCADE,
  nasabah_id UUID REFERENCES nasabah(id) ON DELETE CASCADE,
  
  -- Document Information
  nama_dokumen VARCHAR(255) NOT NULL,
  kategori VARCHAR(50), -- 'Personal', 'Income', 'Collateral', 'Additional'
  jenis_dokumen VARCHAR(50), -- 'KTP', 'KK', 'NPWP', 'Slip Gaji', etc.
  
  -- File Information
  file_url TEXT,
  file_name VARCHAR(255),
  file_size INTEGER, -- in bytes
  file_type VARCHAR(50), -- 'application/pdf', 'image/jpeg', etc.
  
  -- Status
  status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'SUBMITTED', 'VERIFIED', 'REJECTED'
  is_uploaded BOOLEAN DEFAULT FALSE,
  verification_status VARCHAR(50), -- 'Pending', 'Verified', 'Rejected'
  
  -- Validation
  is_required BOOLEAN DEFAULT TRUE,
  expiry_date DATE,
  requires_legalization BOOLEAN DEFAULT FALSE,
  requires_original BOOLEAN DEFAULT FALSE,
  
  -- Notes
  catatan TEXT,
  rejection_reason TEXT,
  
  -- Metadata
  uploaded_at TIMESTAMP WITH TIME ZONE,
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_dokumen_aplikasi ON dokumen(aplikasi_id);
CREATE INDEX idx_dokumen_nasabah ON dokumen(nasabah_id);
CREATE INDEX idx_dokumen_status ON dokumen(status);
CREATE INDEX idx_dokumen_kategori ON dokumen(kategori);

-- =====================================================
-- TABLE: bank (Bank Information)
-- =====================================================
CREATE TABLE IF NOT EXISTS bank (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Bank Information
  nama_bank VARCHAR(100) NOT NULL,
  kode_bank VARCHAR(10),
  
  -- Contact Information
  alamat TEXT,
  no_telp VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  
  -- PIC (Person In Charge)
  pic_nama VARCHAR(255),
  pic_jabatan VARCHAR(100),
  pic_telp VARCHAR(20),
  pic_email VARCHAR(255),
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_bank_nama ON bank(nama_bank);
CREATE INDEX idx_bank_active ON bank(is_active);

-- =====================================================
-- TABLE: notaris (Notary Information)
-- =====================================================
CREATE TABLE IF NOT EXISTS notaris (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Notary Information
  nama_notaris VARCHAR(255) NOT NULL,
  nomor_sk VARCHAR(50), -- Nomor SK Pengangkatan
  
  -- Contact Information
  alamat_kantor TEXT,
  no_telp VARCHAR(20),
  email VARCHAR(255),
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notaris_nama ON notaris(nama_notaris);
CREATE INDEX idx_notaris_active ON notaris(is_active);

-- =====================================================
-- TABLE: timeline (Activity Timeline)
-- =====================================================
CREATE TABLE IF NOT EXISTS timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- References
  aplikasi_id UUID REFERENCES aplikasi_kpr(id) ON DELETE CASCADE,
  
  -- Activity Information
  activity_type VARCHAR(50) NOT NULL, -- 'STATUS_CHANGE', 'DOCUMENT_UPLOAD', 'APPROVAL', 'NOTE'
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Old and New Values (for tracking changes)
  old_value TEXT,
  new_value TEXT,
  
  -- User Information
  user_id UUID REFERENCES auth.users(id),
  user_name VARCHAR(255),
  user_role VARCHAR(50),
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_timeline_aplikasi ON timeline(aplikasi_id);
CREATE INDEX idx_timeline_created_at ON timeline(created_at DESC);
CREATE INDEX idx_timeline_activity_type ON timeline(activity_type);

-- =====================================================
-- TABLE: audit_log (Audit Trail)
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- User Information
  user_id UUID REFERENCES auth.users(id),
  user_email VARCHAR(255),
  user_role VARCHAR(50),
  
  -- Action Information
  action VARCHAR(50) NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE', 'VIEW'
  table_name VARCHAR(100) NOT NULL,
  record_id UUID,
  
  -- Details
  description TEXT,
  old_data JSONB,
  new_data JSONB,
  
  -- Request Information
  ip_address INET,
  user_agent TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_table ON audit_log(table_name);
CREATE INDEX idx_audit_action ON audit_log(action);
CREATE INDEX idx_audit_created_at ON audit_log(created_at DESC);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_nasabah_updated_at BEFORE UPDATE ON nasabah
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properti_updated_at BEFORE UPDATE ON properti
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_unit_updated_at BEFORE UPDATE ON unit
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_aplikasi_kpr_updated_at BEFORE UPDATE ON aplikasi_kpr
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dokumen_updated_at BEFORE UPDATE ON dokumen
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bank_updated_at BEFORE UPDATE ON bank
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notaris_updated_at BEFORE UPDATE ON notaris
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-generate nomor_aplikasi
CREATE OR REPLACE FUNCTION generate_nomor_aplikasi()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.nomor_aplikasi IS NULL THEN
    NEW.nomor_aplikasi := 'KPR-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('aplikasi_seq')::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS aplikasi_seq START 1;

CREATE TRIGGER generate_aplikasi_nomor BEFORE INSERT ON aplikasi_kpr
  FOR EACH ROW EXECUTE FUNCTION generate_nomor_aplikasi();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE nasabah ENABLE ROW LEVEL SECURITY;
ALTER TABLE properti ENABLE ROW LEVEL SECURITY;
ALTER TABLE unit ENABLE ROW LEVEL SECURITY;
ALTER TABLE aplikasi_kpr ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokumen ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE notaris ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users (basic read access)
CREATE POLICY "Allow authenticated read access" ON nasabah
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access" ON properti
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access" ON unit
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access" ON aplikasi_kpr
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access" ON dokumen
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access" ON bank
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access" ON notaris
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access" ON timeline
  FOR SELECT USING (auth.role() = 'authenticated');

-- Admin policies (full access)
CREATE POLICY "Allow admin full access" ON nasabah
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admin full access" ON aplikasi_kpr
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample banks
INSERT INTO bank (nama_bank, kode_bank, pic_nama, pic_jabatan) VALUES
  ('Bank BTN', 'BTN', 'Budi Santoso', 'Account Officer KPR'),
  ('Bank Mandiri', 'MANDIRI', 'Siti Nurhaliza', 'Relationship Manager'),
  ('Bank BCA', 'BCA', 'Ahmad Fauzi', 'Personal Banking Officer'),
  ('Bank BNI', 'BNI', 'Dewi Lestari', 'Consumer Banking Officer'),
  ('Bank BRI', 'BRI', 'Rendra Wijaya', 'Micro Banking Officer')
ON CONFLICT DO NOTHING;

-- Insert sample notaris
INSERT INTO notaris (nama_notaris, nomor_sk) VALUES
  ('Notaris Bambang Irawan, S.H., M.Kn', 'SK-001/2020'),
  ('Notaris Eka Putri, S.H.', 'SK-002/2020'),
  ('Notaris Fahri Rahman, S.H., M.H.', 'SK-003/2020')
ON CONFLICT DO NOTHING;

-- =====================================================
-- VIEWS (Helpful queries)
-- =====================================================

-- View: Complete KPR Application with all details
CREATE OR REPLACE VIEW v_aplikasi_lengkap AS
SELECT 
  a.id,
  a.nomor_aplikasi,
  a.stage,
  a.status,
  a.risk_level,
  
  -- Nasabah
  n.nama_nasabah,
  n.nik,
  n.no_telp,
  n.email,
  n.pekerjaan,
  n.penghasilan_bulanan,
  n.document_profile,
  
  -- Unit
  p.nama_properti,
  u.tipe_unit,
  u.blok,
  u.nomor_unit,
  u.luas_tanah,
  u.luas_bangunan,
  u.harga_jual,
  
  -- Financial
  a.dp,
  a.plafon_kredit,
  a.tenor,
  a.suku_bunga,
  a.cicilan,
  
  -- Bank & Notary
  a.bank,
  a.notaris,
  
  -- Dates
  a.tanggal_aplikasi,
  a.tanggal_akad,
  a.tanggal_serah_terima,
  a.days_stuck,
  
  -- Timestamps
  a.created_at,
  a.updated_at
FROM aplikasi_kpr a
LEFT JOIN nasabah n ON a.nasabah_id = n.id
LEFT JOIN unit u ON a.unit_id = u.id
LEFT JOIN properti p ON u.properti_id = p.id;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

-- Database schema created successfully!
-- Next steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Configure RLS policies based on your needs
-- 3. Set up authentication
-- 4. Connect from your application
