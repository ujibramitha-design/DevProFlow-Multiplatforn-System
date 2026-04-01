/**
 * KPRFlow Enterprise - Notification Types
 * Adapted from bramsray2 whatsapp-engine for cross-platform use
 */
// Type guards
export function isValidNotificationType(type) {
    const validTypes = [
        'lead_generated', 'status_change', 'document_uploaded', 'unit_cancelled',
        'payment_reminder', 'system_updates', 'marketing', 'security_alert',
        'maintenance', 'custom'
    ];
    return validTypes.includes(type);
}
export function isValidNotificationChannel(channel) {
    const validChannels = ['whatsapp', 'email', 'push', 'sms', 'in_app'];
    return validChannels.includes(channel);
}
export function isValidNotificationStatus(status) {
    const validStatuses = [
        'pending', 'processing', 'sent', 'delivered', 'read', 'failed', 'cancelled', 'expired'
    ];
    return validStatuses.includes(status);
}
export function isValidNotificationPriority(priority) {
    const validPriorities = ['low', 'normal', 'high', 'urgent'];
    return validPriorities.includes(priority);
}
// Default values
export const DEFAULT_NOTIFICATION_PRIORITY = 'normal';
export const DEFAULT_NOTIFICATION_STATUS = 'pending';
export const DEFAULT_NOTIFICATION_CHANNEL = 'in_app';
// Configuration constants
export const NOTIFICATION_LIMITS = {
    MAX_TITLE_LENGTH: 200,
    MAX_MESSAGE_LENGTH: 2000,
    MAX_BATCH_SIZE: 1000,
    MAX_RETRY_ATTEMPTS: 5,
    DEFAULT_RETRY_DELAY: 60000, // 1 minute
    MAX_RETRY_DELAY: 3600000, // 1 hour
    QUIET_HOURS_START: '22:00',
    QUIET_HOURS_END: '08:00'
};
export const NOTIFICATION_TEMPLATES = {
    LEAD_GENERATED: {
        subject: '🎉 Lead Baru Terdeteksi',
        body: 'Ada lead baru yang perlu diproses. Customer: {{customer_name}} | Unit: {{unit_block}} | Phone: {{customer_phone}}'
    },
    STATUS_CHANGE: {
        subject: '📋 Status Aplikasi Berubah',
        body: 'Status aplikasi KPR Anda telah berubah menjadi {{new_status}}. {{previous_status ? `Status sebelumnya: {{previous_status}}` : ""}}'
    },
    DOCUMENT_UPLOADED: {
        subject: '📄 Dokumen Terunggah',
        body: 'Dokumen {{document_type}} telah berhasil diunggah. Dokumen sedang diproses oleh tim kami.'
    },
    UNIT_CANCELLED: {
        subject: '⚠️ Unit Dibatalkan',
        body: 'Unit {{unit_block}} telah dibatalkan. Alasan: {{cancellation_reason}}. Hubungi marketing untuk info lebih lanjut.'
    },
    PAYMENT_REMINDER: {
        subject: '💰 Pengingat Pembayaran',
        body: 'Pembayaran sebesar {{amount}} jatuh tempo pada {{due_date}}. Segera lakukan pembayaran.'
    }
};
export const NOTIFICATION_COLORS = {
    'pending': 'gray',
    'processing': 'blue',
    'sent': 'yellow',
    'delivered': 'green',
    'read': 'emerald',
    'failed': 'red',
    'cancelled': 'gray',
    'expired': 'orange'
};
export const NOTIFICATION_ICONS = {
    'lead_generated': '🎉',
    'status_change': '📋',
    'document_uploaded': '📄',
    'unit_cancelled': '⚠️',
    'payment_reminder': '💰',
    'system_updates': '🔧',
    'marketing': '📢',
    'security_alert': '🚨',
    'maintenance': '🔧',
    'custom': '📌'
};
//# sourceMappingURL=notification-types.js.map