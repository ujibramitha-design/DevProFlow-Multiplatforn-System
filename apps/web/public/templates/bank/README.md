# Bank Document Templates - BTN Pra-Akad KPR

Folder ini berisi template dokumen resmi Bank BTN untuk proses Pra-Akad Kredit Pemilikan Rumah (KPR).

## 📋 Daftar Template

### 1. **BTN Pra-Akad V1 - Verifikasi Data Debitur**
**File:** `btn-pra-akad-v1.html`

**Fungsi:** Formulir verifikasi data lengkap debitur dan properti

**Variabel yang Digunakan:**
- `{{NAMA_NASABAH}}` - Nama lengkap pemohon
- `{{NIK}}` - Nomor Induk Kependudukan
- `{{ALAMAT}}` - Alamat lengkap
- `{{NO_TELP}}` - Nomor telepon
- `{{EMAIL}}` - Email
- `{{STATUS_PEKERJAAN}}` - Status pekerjaan (Karyawan/Wiraswasta/Professional)
- `{{PENGHASILAN_BULANAN}}` - Penghasilan per bulan
- `{{NAMA_PROPERTI}}` - Nama perumahan/properti
- `{{TIPE_UNIT}}` - Tipe unit (contoh: 45/90)
- `{{BLOK}}` - Blok unit
- `{{NOMOR_UNIT}}` - Nomor unit
- `{{LUAS_TANAH}}` - Luas tanah (m²)
- `{{LUAS_BANGUNAN}}` - Luas bangunan (m²)
- `{{HARGA_PROPERTI}}` - Harga properti
- `{{HARGA_JUAL}}` - Harga jual
- `{{DP}}` - Uang muka (Down Payment)
- `{{PLAFON_KREDIT}}` - Plafon kredit yang diajukan
- `{{TENOR}}` - Jangka waktu (bulan)
- `{{CICILAN}}` - Estimasi cicilan per bulan
- `{{SUKU_BUNGA}}` - Suku bunga per tahun
- `{{TANGGAL}}` - Tanggal dokumen

**Checklist Dokumen:**
- KTP Suami & Istri
- Kartu Keluarga
- NPWP
- Slip Gaji 3 Bulan
- Surat Keterangan Kerja
- Rekening Koran 3 Bulan
- Akta Nikah/Cerai
- PBB (jika ada properti lain)

---

### 2. **BTN Pra-Akad V2 - Dokumen Jaminan**
**File:** `btn-pra-akad-v2.html`

**Fungsi:** Dokumen jaminan properti dan hasil penilaian appraisal

**Variabel Tambahan:**
- `{{LOKASI_PROPERTI}}` - Lokasi lengkap properti
- `{{NILAI_PASAR}}` - Nilai pasar properti
- `{{NILAI_TAKSASI}}` - Nilai taksasi bank
- `{{LTV}}` - Loan to Value ratio

**Dokumen Jaminan yang Harus Diserahkan:**
- Sertifikat Asli Properti (SHM/SHGB)
- IMB (Izin Mendirikan Bangunan)
- PBB 5 Tahun Terakhir
- Surat Keterangan Tidak Sengketa
- Surat Pernyataan Tidak Dijaminkan
- Akta Jual Beli (jika ada)
- Surat Ukur Tanah
- Denah Lokasi Properti
- Foto Properti (minimal 6 foto)

---

### 3. **BTN Pra-Akad V3 - Surat Pernyataan Debitur**
**File:** `btn-pra-akad-v3.html`

**Fungsi:** Surat pernyataan resmi dari debitur dengan materai

**Variabel Tambahan:**
- `{{TEMPAT_LAHIR}}` - Tempat lahir
- `{{TANGGAL_LAHIR}}` - Tanggal lahir
- `{{PEKERJAAN}}` - Pekerjaan
- `{{KOTA}}` - Kota pembuatan surat

**Isi Pernyataan:**
1. Kebenaran data yang diberikan
2. Tidak ada pengajuan kredit ganda
3. Tidak ada tunggakan kredit
4. Bersedia verifikasi data
5. Properti dijadikan jaminan
6. Sanggup membayar DP dan cicilan
7. Mengikuti ketentuan bank
8. Memahami persetujuan adalah kewenangan bank
9. Sanksi jika data tidak benar
10. Dibuat tanpa paksaan

**Catatan:** Memerlukan materai Rp 10.000 dan 2 saksi

---

### 4. **BTN Pra-Akad V4 - Memo Internal Bank**
**File:** `btn-pra-akad-v4.html`

**Fungsi:** Memo internal untuk analisis kelayakan kredit

**Variabel Tambahan:**
- `{{KANTOR_CABANG}}` - Nama kantor cabang
- `{{ALAMAT_CABANG}}` - Alamat cabang
- `{{NOMOR_MEMO}}` - Nomor memo internal
- `{{STATUS_PERNIKAHAN}}` - Status pernikahan
- `{{PERSENTASE_DP}}` - Persentase DP
- `{{TAHUN_TENOR}}` - Tenor dalam tahun
- `{{PENGHASILAN_BERSIH}}` - Penghasilan bersih per bulan
- `{{CICILAN_LAIN}}` - Cicilan kredit lain
- `{{TOTAL_CICILAN}}` - Total cicilan per bulan
- `{{DSR_PERCENTAGE}}` - Debt Service Ratio (%)
- `{{DSR_STATUS}}` - Status DSR (Low/Medium/High Risk)
- `{{DSR_STATUS_CLASS}}` - CSS class untuk DSR
- `{{DSR_KETERANGAN}}` - Keterangan DSR
- `{{LTV_PERCENTAGE}}` - Loan to Value (%)
- `{{LTV_STATUS}}` - Status LTV
- `{{LTV_STATUS_CLASS}}` - CSS class untuk LTV
- `{{LTV_KETERANGAN}}` - Keterangan LTV
- `{{SKOR_KREDIT}}` - Skor kredit
- `{{KOLEKTIBILITAS}}` - Kolektibilitas (Kol 1-5)
- `{{KOLEKTIBILITAS_CLASS}}` - CSS class untuk kolektibilitas
- `{{KOLEKTIBILITAS_KETERANGAN}}` - Keterangan kolektibilitas
- `{{RIWAYAT_MACET}}` - Riwayat kredit macet
- `{{TOTAL_KREDIT_BERJALAN}}` - Total kredit yang sedang berjalan
- `{{KELENGKAPAN_DOKUMEN}}` - Status kelengkapan dokumen
- `{{RISK_LEVEL}}` - Tingkat risiko (Low/Medium/High)
- `{{RISK_LEVEL_CLASS}}` - CSS class untuk risk level
- `{{REKOMENDASI_AO}}` - Rekomendasi Account Officer
- `{{PLAFON_REKOMENDASI}}` - Plafon yang direkomendasikan
- `{{TENOR_REKOMENDASI}}` - Tenor yang direkomendasikan
- `{{NAMA_AO}}` - Nama Account Officer

**Analisis yang Dilakukan:**
1. **Debt Service Ratio (DSR)** - Kemampuan bayar
2. **Loan to Value (LTV)** - Rasio kredit terhadap nilai properti
3. **BI Checking / SLIK OJK** - Riwayat kredit

**Persetujuan:**
- Account Officer KPR
- Supervisor KPR
- Kepala Cabang
- Komite Kredit

---

### 5. **BTN Pra-Akad V5 - Checklist Berkas**
**File:** `btn-pra-akad-v5.html`

**Fungsi:** Checklist kelengkapan berkas dengan tracking status

**Variabel Tambahan:**
- `{{TELP_CABANG}}` - Telepon kantor cabang

**Kategori Dokumen:**

#### I. Dokumen Identitas & Keluarga (5 dokumen)
- KTP Pemohon & Pasangan
- Kartu Keluarga
- Akta Nikah/Cerai
- NPWP

#### II. Dokumen Penghasilan (13 dokumen)
**A. Untuk Karyawan (Fixed Income):**
- Slip Gaji 3 Bulan
- Surat Keterangan Kerja
- SPT Tahunan PPh 21

**B. Untuk Wiraswasta (Non-Fixed Income):**
- NIB/SIUP/TDP
- Laporan Keuangan 6 Bulan
- SPT Tahunan Badan/Pribadi

**C. Untuk Profesional:**
- Surat Izin Praktik (SIP)
- Sertifikat Keahlian

#### III. Dokumen Keuangan (3 dokumen)
- Rekening Koran 3 Bulan
- Bukti Pembayaran DP
- Daftar Aset & Kewajiban

#### IV. Dokumen Properti & Jaminan (6 dokumen)
- Sertifikat Asli Properti
- IMB
- PBB 5 Tahun
- Surat Ukur Tanah
- Akta Jual Beli
- Foto Properti

#### V. Dokumen Pendukung (3 dokumen)
- Surat Pernyataan Debitur
- Formulir Aplikasi KPR
- Surat Kuasa (jika ada)

**Total: 25 dokumen**

**Ringkasan Kelengkapan:**
- Total Dokumen
- Sudah Lengkap
- Belum Lengkap
- Persentase Kelengkapan

---

### 6. **BTN Pra-Akad V6 - Berita Acara Serah Terima Dokumen**
**File:** `btn-pra-akad-v6.html`

**Fungsi:** Berita acara resmi serah terima dokumen dengan kekuatan hukum

**Variabel Tambahan:**
- `{{HARI}}` - Hari serah terima (Senin, Selasa, dst)
- `{{LOKASI_SERAH_TERIMA}}` - Lokasi serah terima
- `{{NAMA_PETUGAS_BANK}}` - Nama petugas bank
- `{{JABATAN_PETUGAS}}` - Jabatan petugas
- `{{TELP_CABANG}}` - Telepon cabang

**Daftar Dokumen yang Diserahkan:**
1. KTP Pemohon
2. KTP Pasangan
3. Kartu Keluarga (KK)
4. Akta Nikah/Cerai
5. NPWP
6. Slip Gaji 3 Bulan
7. Surat Keterangan Kerja
8. Rekening Koran 3 Bulan
9. **Sertifikat Properti (ASLI)** - Diserahkan ke bank
10. IMB
11. PBB 5 Tahun
12. Surat Ukur Tanah
13. Akta Jual Beli
14. Foto Properti
15. Surat Pernyataan Debitur

**Pernyataan dan Kesepakatan:**
1. Dokumen asli dan sah
2. Kuasa verifikasi kepada bank
3. Bank menjaga kerahasiaan
4. Pengembalian dokumen setelah verifikasi
5. Sertifikat disimpan sebagai jaminan
6. Hak meminta tanda terima
7. Kewajiban melengkapi dokumen
8. Dibuat dalam rangkap 2

**Catatan:** Memerlukan materai Rp 10.000 dan 2 saksi

---

## 🎯 Cara Penggunaan

### 1. **Integrasi dengan Document Engine**

```typescript
import { DocumentEngine } from '@/lib/doc-engine'

const engine = new DocumentEngine()

// Generate BTN V1
const result = await engine.generateDocument({
  templateId: 'btn-pra-akad-v1',
  data: {
    NAMA_NASABAH: 'Ahmad Fauzi',
    NIK: '3201234567890123',
    // ... data lainnya
  },
  outputFormat: 'pdf'
})
```

### 2. **Mapping Database ke Template**

```typescript
import { mapDatabaseToTemplate } from '@/lib/doc-engine/mapping-data'

// Auto-map dari database
const templateData = await mapDatabaseToTemplate('customer_id_123')

// Generate semua dokumen BTN
const templates = [
  'btn-pra-akad-v1',
  'btn-pra-akad-v2',
  'btn-pra-akad-v3',
  'btn-pra-akad-v4',
  'btn-pra-akad-v5',
  'btn-pra-akad-v6'
]

for (const templateId of templates) {
  await engine.generateDocument({
    templateId,
    data: templateData,
    outputFormat: 'pdf'
  })
}
```

### 3. **Bulk Generation**

```typescript
// Generate untuk multiple customers
const bulkResult = await engine.generateBulk({
  templates: ['btn-pra-akad-v1', 'btn-pra-akad-v2'],
  dataSource: 'database',
  recordIds: ['cust_001', 'cust_002', 'cust_003'],
  outputFormat: 'pdf',
  zipOutput: true
})
```

---

## 📊 Document Profile Integration

Template ini terintegrasi dengan **Document Profile System** yang mendukung 3 profil:

### Profile A: Fixed Income (Karyawan)
- Template V5 akan menampilkan checklist untuk karyawan
- Fokus pada: Slip Gaji, SKK, SPT 21

### Profile B: Non-Fixed Income (Wiraswasta)
- Template V5 akan menampilkan checklist untuk pengusaha
- Fokus pada: NIB/SIUP, Laporan Keuangan, SPT Badan

### Profile C: Professional (Dokter, Lawyer, dll)
- Template V5 akan menampilkan checklist untuk profesional
- Fokus pada: SIP, Sertifikat Keahlian, Catatan Penghasilan

---

## 🎨 Styling & Format

Semua template menggunakan:
- **Font:** Times New Roman (formal & profesional)
- **Page Size:** A4
- **Margin:** 2-2.5cm
- **Color Scheme:** Bank BTN Blue (#003d82)
- **Print-Ready:** Optimized untuk cetak langsung

---

## ✅ Quality Standards

### High-Fidelity Preservation:
- ✅ Layout tetap identik dengan master
- ✅ Margin presisi (2-2.5cm)
- ✅ Font size & style konsisten
- ✅ Border & spacing akurat
- ✅ Print-ready quality

### Professional Features:
- ✅ Checkbox untuk tracking
- ✅ Signature areas dengan border
- ✅ Materai placeholder
- ✅ Table formatting rapi
- ✅ Color-coded sections

---

## 🔒 Security & Compliance

- Dokumen bersifat **RAHASIA** dan **INTERNAL**
- Hanya untuk proses Pra-Akad KPR resmi
- Memerlukan **materai Rp 10.000** untuk dokumen tertentu
- Memerlukan **saksi** untuk berita acara
- Memiliki **kekuatan hukum** sesuai peraturan perbankan

---

## 📝 Notes

1. Semua variabel menggunakan format `{{VARIABLE_NAME}}`
2. Variabel yang tidak diisi akan tetap menampilkan placeholder
3. Format currency otomatis: `Rp 850.000.000`
4. Format date otomatis: `01 Januari 2026`
5. Checklist dapat di-print dan diisi manual atau digital

---

## 🚀 Updates & Maintenance

**Version:** 1.0.0  
**Last Updated:** April 2026  
**Maintained By:** DevProFlow Enterprise Team

**Changelog:**
- v1.0.0 (Apr 2026): Initial release dengan 6 template BTN Pra-Akad

---

**© 2026 DevProFlow Enterprise - Bank Document Templates**
