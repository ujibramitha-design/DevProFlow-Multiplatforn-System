/**
 * KPRFlow Enterprise - Application Types
 * Adapted from bramsray2 backend for cross-platform use
 */
// Export type guards
export function isValidApplicationStatus(status) {
    const validStatuses = [
        'PENDING', 'DOCUMENT_COLLECTION', 'BANK_SUBMISSION', 'BANK_VERIFICATION',
        'BANK_APPROVAL', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED', 'BAST_COMPLETED'
    ];
    return validStatuses.includes(status);
}
export function isValidDocumentType(type) {
    const validTypes = [
        'KTP', 'KK', 'NPWP', 'AKTA_NIKAH', 'AKTA_CERAI', 'SURAT_KERJA',
        'SLIP_GAJI', 'REKENING_KORAN', 'SKU', 'SERTIFIKAT', 'IMB', 'PBB', 'LAINNYA'
    ];
    return validTypes.includes(type);
}
export function isValidUnitStatus(status) {
    const validStatuses = [
        'AVAILABLE', 'RESERVED', 'SOLD', 'CANCELLED', 'UNDER_CONSTRUCTION', 'READY'
    ];
    return validStatuses.includes(status);
}
// Default values
export const DEFAULT_APPLICATION_STATUS = 'PENDING';
export const DEFAULT_UNIT_STATUS = 'AVAILABLE';
export const DEFAULT_SLA_DAYS = 30;
// Status mappings for UI
export const APPLICATION_STATUS_LABELS = {
    'PENDING': 'Menunggu',
    'DOCUMENT_COLLECTION': 'Pengumpulan Dokumen',
    'BANK_SUBMISSION': 'Pengajuan ke Bank',
    'BANK_VERIFICATION': 'Verifikasi Bank',
    'BANK_APPROVAL': 'Persetujuan Bank',
    'APPROVED': 'Disetujui',
    'REJECTED': 'Ditolak',
    'CANCELLED': 'Dibatalkan',
    'COMPLETED': 'Selesai',
    'BAST_COMPLETED': 'BAST Selesai'
};
export const APPLICATION_STATUS_COLORS = {
    'PENDING': 'gray',
    'DOCUMENT_COLLECTION': 'blue',
    'BANK_SUBMISSION': 'yellow',
    'BANK_VERIFICATION': 'orange',
    'BANK_APPROVAL': 'purple',
    'APPROVED': 'green',
    'REJECTED': 'red',
    'CANCELLED': 'gray',
    'COMPLETED': 'green',
    'BAST_COMPLETED': 'emerald'
};
export const DOCUMENT_TYPE_LABELS = {
    'KTP': 'KTP',
    'KK': 'Kartu Keluarga',
    'NPWP': 'NPWP',
    'AKTA_NIKAH': 'Akta Nikah',
    'AKTA_CERAI': 'Akta Cerai',
    'SURAT_KERJA': 'Surat Kerja',
    'SLIP_GAJI': 'Slip Gaji',
    'REKENING_KORAN': 'Rekening Koran',
    'SKU': 'Surat Keterangan Usaha',
    'SERTIFIKAT': 'Sertifikat',
    'IMB': 'IMB',
    'PBB': 'PBB',
    'LAINNYA': 'Lainnya'
};
//# sourceMappingURL=application-types.js.map