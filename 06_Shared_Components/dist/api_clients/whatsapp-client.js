/**
 * KPRFlow Enterprise - Shared WhatsApp Client
 * Adapted from bramsray2 whatsapp-engine for cross-platform use
 */
export class WhatsAppClient {
    constructor() {
        this.config = null;
    }
    /**
     * Initialize WhatsApp client with configuration
     */
    initialize(config) {
        this.config = config;
    }
    /**
     * Send WhatsApp notification
     */
    async sendNotification(notification) {
        if (!this.config) {
            return { success: false, error: 'WhatsApp client not initialized' };
        }
        try {
            // Format phone number (will be handled by getPhoneNumber method)
            const phoneNumber = this.getPhoneNumber(notification);
            if (!phoneNumber) {
                return { success: false, error: 'No phone number available' };
            }
            // Craft message based on notification type
            const message = this.craftMessage(notification);
            // Send WhatsApp message
            const waMessage = {
                to: this.formatPhoneNumber(phoneNumber),
                type: 'text',
                content: message
            };
            return await this.sendWhatsAppMessage(waMessage);
        }
        catch (error) {
            console.error('Error sending WhatsApp notification:', error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Send bulk WhatsApp notifications
     */
    async sendBulkNotifications(notifications) {
        const results = [];
        for (const notification of notifications) {
            const result = await this.sendNotification(notification);
            results.push({
                notificationId: notification.referenceId || notification.userId,
                ...result
            });
            // Add delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        return {
            success: true,
            total: notifications.length,
            results
        };
    }
    /**
     * Get phone number from notification data
     */
    getPhoneNumber(notification) {
        if (notification.data?.customer_phone) {
            return notification.data.customer_phone;
        }
        if (notification.data?.phone) {
            return notification.data.phone;
        }
        return null;
    }
    /**
     * Format phone number for WhatsApp
     */
    formatPhoneNumber(phone) {
        // Remove all non-digit characters
        let cleaned = phone.replace(/\D/g, '');
        // Add Indonesia country code if not present
        if (!cleaned.startsWith('62')) {
            if (cleaned.startsWith('0')) {
                cleaned = '62' + cleaned.substring(1);
            }
            else {
                cleaned = '62' + cleaned;
            }
        }
        return cleaned + '@c.us'; // WhatsApp format
    }
    /**
     * Craft message based on notification type
     */
    craftMessage(notification) {
        const { title, message, type, data } = notification;
        switch (type) {
            case 'lead_generated':
                return `🎉 *${title}*\n\n${message}\n\nUnit: ${data?.unit_block || '-'}\nCustomer: ${data?.customer_name || '-'}\n\nTerima kasih telah menggunakan KPRFlow Enterprise.\n\nHubungi kami untuk info lebih lanjut.`;
            case 'status_change':
                return `📋 *${title}*\n\n${message}\n\nStatus: ${data?.new_status || '-'}\n${data?.previous_status ? `Previous: ${data.previous_status}` : ''}\n\nLogin ke dashboard untuk detail lengkap.\n\nKPRFlow Enterprise`;
            case 'document_uploaded':
                return `📄 *${title}*\n\n${message}\n\nDocument: ${data?.document_type || '-'}\nUploaded: ${new Date().toLocaleString('id-ID')}\n\nDocument sedang diproses oleh tim kami.\n\nKPRFlow Enterprise`;
            case 'unit_cancelled':
                return `⚠️ *${title}*\n\n${message}\n\nUnit: ${data?.unit_block || '-'}\nReason: ${data?.cancellation_reason || '-'}\n\nHubungi marketing untuk informasi lebih lanjut.\n\nKPRFlow Enterprise`;
            case 'payment_reminder':
                return `💰 *${title}*\n\n${message}\n\nAmount: ${data?.amount || '-'}\nDue Date: ${data?.due_date || '-'}\n\nSegera lakukan pembayaran untuk menghindari keterlambatan.\n\nKPRFlow Enterprise`;
            default:
                return `*${title}*\n\n${message}\n\nKPRFlow Enterprise`;
        }
    }
    /**
     * Send WhatsApp message via gateway
     */
    async sendWhatsAppMessage(message) {
        if (!this.config) {
            return { success: false, error: 'WhatsApp client not initialized' };
        }
        try {
            const payload = {
                apikey: this.config.apiKey,
                target: message.to,
                message: message.content,
                type: message.type
            };
            if (message.type === 'document' && message.fileUrl) {
                payload.file_url = message.fileUrl;
                payload.file_name = message.fileName;
            }
            const response = await fetch(this.config.gatewayUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.status) {
                return {
                    success: true,
                    messageId: result.id || result.message_id,
                    response: result
                };
            }
            else {
                return {
                    success: false,
                    error: result.message || 'Failed to send WhatsApp message'
                };
            }
        }
        catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    /**
     * Handle webhook status update
     */
    async handleWebhookStatus(data) {
        try {
            const { messageId, status, timestamp } = data;
            console.log(`WhatsApp message ${messageId} status updated to ${status} at ${timestamp}`);
            // This would typically update the database
            // Implementation depends on your database client
            return { success: true };
        }
        catch (error) {
            console.error('Error handling webhook status:', error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Validate phone number format
     */
    validatePhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10 && cleaned.length <= 15;
    }
    /**
     * Get message templates
     */
    getMessageTemplates() {
        return {
            lead_generated: {
                title: 'Lead Baru Terdeteksi',
                message: 'Ada lead baru yang perlu diproses'
            },
            status_change: {
                title: 'Status Aplikasi Berubah',
                message: 'Status aplikasi KPR telah diperbarui'
            },
            document_uploaded: {
                title: 'Dokumen Terunggah',
                message: 'Dokumen baru telah diunggah'
            },
            unit_cancelled: {
                title: 'Unit Dibatalkan',
                message: 'Unit telah dibatalkan'
            },
            payment_reminder: {
                title: 'Pengingat Pembayaran',
                message: 'Ada pembayaran yang jatuh tempo'
            }
        };
    }
}
// Export singleton instance
export const whatsAppClient = new WhatsAppClient();
//# sourceMappingURL=whatsapp-client.js.map