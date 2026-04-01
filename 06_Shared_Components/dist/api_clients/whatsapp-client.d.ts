/**
 * KPRFlow Enterprise - Shared WhatsApp Client
 * Adapted from bramsray2 whatsapp-engine for cross-platform use
 */
export interface WhatsAppMessage {
    to: string;
    type: 'text' | 'document' | 'image';
    content: string;
    fileName?: string;
    fileUrl?: string;
}
export interface NotificationData {
    userId?: string;
    title: string;
    message: string;
    type: 'lead_generated' | 'status_change' | 'document_uploaded' | 'unit_cancelled' | 'payment_reminder';
    data?: Record<string, any>;
    referenceId?: string;
}
export interface WhatsAppConfig {
    apiKey: string;
    gatewayUrl: string;
}
export interface WhatsAppResponse {
    success: boolean;
    messageId?: string;
    error?: string;
    response?: any;
}
export declare class WhatsAppClient {
    private config;
    /**
     * Initialize WhatsApp client with configuration
     */
    initialize(config: WhatsAppConfig): void;
    /**
     * Send WhatsApp notification
     */
    sendNotification(notification: NotificationData): Promise<WhatsAppResponse>;
    /**
     * Send bulk WhatsApp notifications
     */
    sendBulkNotifications(notifications: NotificationData[]): Promise<{
        success: boolean;
        total: number;
        results: Array<{
            notificationId?: string;
            success: boolean;
            messageId?: string;
            error?: string;
        }>;
    }>;
    /**
     * Get phone number from notification data
     */
    private getPhoneNumber;
    /**
     * Format phone number for WhatsApp
     */
    private formatPhoneNumber;
    /**
     * Craft message based on notification type
     */
    private craftMessage;
    /**
     * Send WhatsApp message via gateway
     */
    private sendWhatsAppMessage;
    /**
     * Handle webhook status update
     */
    handleWebhookStatus(data: {
        messageId: string;
        status: string;
        timestamp: string;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    /**
     * Validate phone number format
     */
    validatePhoneNumber(phone: string): boolean;
    /**
     * Get message templates
     */
    getMessageTemplates(): {
        lead_generated: {
            title: string;
            message: string;
        };
        status_change: {
            title: string;
            message: string;
        };
        document_uploaded: {
            title: string;
            message: string;
        };
        unit_cancelled: {
            title: string;
            message: string;
        };
        payment_reminder: {
            title: string;
            message: string;
        };
    };
}
export declare const whatsAppClient: WhatsAppClient;
//# sourceMappingURL=whatsapp-client.d.ts.map