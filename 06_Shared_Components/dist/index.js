/**
 * KPRFlow Enterprise - Shared Components Main Export
 * Fixed TypeScript implementation for cross-platform use
 */
// Import fixed controllers
import { applicationController } from './controllers/application-controller-fixed';
// Mock supabase client for now
const supabaseClient = {
    getClient: () => ({
        from: (table) => ({
            select: (columns) => ({
                eq: (column, value) => ({ then: (resolve) => resolve({ data: [], error: null }) }),
                in: (column, values) => ({ then: (resolve) => resolve({ data: [], error: null }) }),
                gte: (column, value) => ({ then: (resolve) => resolve({ data: [], error: null }) }),
                lte: (column, value) => ({ then: (resolve) => resolve({ data: [], error: null }) }),
                or: (filters) => ({ then: (resolve) => resolve({ data: [], error: null }) }),
                range: (start, end) => ({ then: (resolve) => resolve({ data: [], error: null }) })
            })
        })
    })
};
// Export fixed controllers
export { ApplicationController, applicationController } from './controllers/application-controller-fixed';
// Export API clients (with type fixes)
export { supabaseClient };
// Export services (mock implementations for now)
export const notificationService = {
    async sendNotification(message, channels) {
        return { success: true, messageId: 'mock-id', channels };
    },
    async sendBulkNotification(messages, channels) {
        return { success: true, results: messages.map(msg => ({ success: true, messageId: 'mock-id', channel: 'email' })) };
    }
};
// Export utilities
export const dateCalculator = {
    calculateDaysSince(date) {
        const created = new Date(date);
        const now = new Date();
        return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    },
    formatDate(date) {
        return new Date(date).toLocaleDateString();
    }
};
// Export main shared components object
export const KPRFlowShared = {
    controllers: {
        application: applicationController
    },
    apiClients: {
        supabase: supabaseClient
    },
    services: {
        notification: notificationService
    },
    utils: {
        date: dateCalculator
    }
};
// Default export
export default KPRFlowShared;
//# sourceMappingURL=index.js.map