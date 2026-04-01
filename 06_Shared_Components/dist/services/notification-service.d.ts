/**
 * KPRFlow Enterprise - Shared Notification Service
 * Adapted from bramsray2 whatsapp-engine for cross-platform use
 */
import { NotificationData } from '../api_clients/whatsapp-client';
export interface NotificationChannel {
    type: 'whatsapp' | 'email' | 'push' | 'sms';
    enabled: boolean;
    config?: any;
}
export interface NotificationTemplate {
    id: string;
    name: string;
    type: NotificationData['type'];
    subject: string;
    body: string;
    variables: string[];
}
export interface NotificationLog {
    id: string;
    userId?: string;
    title: string;
    message: string;
    type: NotificationData['type'];
    channel: string;
    status: 'pending' | 'sent' | 'delivered' | 'failed';
    messageId?: string;
    data?: any;
    referenceId?: string;
    createdAt: string;
    deliveredAt?: string;
    error?: string;
}
export interface NotificationServiceConfig {
    channels: NotificationChannel[];
    templates: NotificationTemplate[];
    rateLimiting: {
        enabled: boolean;
        maxPerMinute: number;
        maxPerHour: number;
    };
    retryPolicy: {
        enabled: boolean;
        maxRetries: number;
        retryDelay: number;
    };
}
export declare class NotificationService {
    private static instance;
    private config;
    private notificationQueue;
    private isProcessing;
    private constructor();
    static getInstance(): NotificationService;
    /**
     * Initialize notification service
     */
    initialize(config: NotificationServiceConfig): void;
    /**
     * Send notification through configured channels
     */
    sendNotification(notification: NotificationData): Promise<{
        success: boolean;
        results: Array<{
            channel: string;
            success: boolean;
            messageId?: string;
            error?: string;
        }>;
    }>;
    /**
     * Send notification via specific channel
     */
    private sendViaChannel;
    /**
     * Send WhatsApp notification
     */
    private sendWhatsApp;
    /**
     * Send email notification
     */
    private sendEmail;
    /**
     * Send push notification
     */
    private sendPush;
    /**
     * Send SMS notification
     */
    private sendSMS;
    /**
     * Send bulk notifications
     */
    sendBulkNotifications(notifications: NotificationData[]): Promise<{
        success: boolean;
        total: number;
        results: Array<{
            notificationId?: string;
            success: boolean;
            results: Array<{
                channel: string;
                success: boolean;
                messageId?: string;
                error?: string;
            }>;
        }>;
    }>;
    /**
     * Queue notification for later processing
     */
    queueNotification(notification: NotificationData): void;
    /**
     * Process notification queue
     */
    private processQueue;
    /**
     * Get notification template
     */
    getTemplate(templateId: string): NotificationTemplate | null;
    /**
     * Create notification from template
     */
    createFromTemplate(templateId: string, variables: Record<string, any>, userId?: string, referenceId?: string): NotificationData | null;
    /**
     * Log notification
     */
    private logNotification;
    /**
     * Get notification logs
     */
    getNotificationLogs(userId?: string, limit?: number): Promise<NotificationLog[]>;
    /**
     * Handle webhook for delivery status
     */
    handleDeliveryWebhook(data: {
        messageId: string;
        status: 'delivered' | 'failed' | 'pending';
        timestamp: string;
        channel: string;
    }): Promise<void>;
    /**
     * Get notification statistics
     */
    getStatistics(startDate?: string, endDate?: string): Promise<{
        total: number;
        sent: number;
        delivered: number;
        failed: number;
        byChannel: Record<string, number>;
        byType: Record<string, number>;
    }>;
    /**
     * Test notification service
     */
    testNotification(): Promise<{
        success: boolean;
        results: Array<{
            channel: string;
            success: boolean;
            error?: string;
        }>;
    }>;
    /**
     * Get service status
     */
    getStatus(): {
        initialized: boolean;
        queueSize: number;
        isProcessing: boolean;
        channels: NotificationChannel[];
    };
}
export declare const notificationService: NotificationService;
//# sourceMappingURL=notification-service.d.ts.map