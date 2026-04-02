/**
 * KPRFlow Enterprise - API Endpoints
 * Centralized API endpoint definitions for cross-platform use
 */
// Base URLs
export const API_BASE_URLS = {
    development: 'http://localhost:3000/api',
    staging: 'https://staging.kprflow.com/api',
    production: 'https://api.kprflow.com/api'
};
export const SUPABASE_URLS = {
    development: 'https://dev-kprflow.supabase.co',
    staging: 'https://staging-kprflow.supabase.co',
    production: 'https://kprflow.supabase.co'
};
// Authentication endpoints
export const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    ME: '/auth/me',
    UPDATE_PROFILE: '/auth/profile'
};
// User endpoints
export const USER_ENDPOINTS = {
    GET_ALL: '/users',
    GET_BY_ID: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    UPDATE_PROFILE: (id) => `/users/${id}/profile`,
    GET_PREFERENCES: (id) => `/users/${id}/preferences`,
    UPDATE_PREFERENCES: (id) => `/users/${id}/preferences`,
    GET_PERMISSIONS: (id) => `/users/${id}/permissions`,
    GET_ACTIVITY_LOG: (id) => `/users/${id}/activity`
};
// Application endpoints
export const APPLICATION_ENDPOINTS = {
    GET_ALL: '/applications',
    GET_BY_ID: (id) => `/applications/${id}`,
    CREATE: '/applications',
    UPDATE: (id) => `/applications/${id}`,
    DELETE: (id) => `/applications/${id}`,
    UPDATE_STATUS: (id) => `/applications/${id}/status`,
    GET_HISTORY: (id) => `/applications/${id}/history`,
    GET_DOCUMENTS: (id) => `/applications/${id}/documents`,
    UPLOAD_DOCUMENT: (id) => `/applications/${id}/documents`,
    DELETE_DOCUMENT: (id, docId) => `/applications/${id}/documents/${docId}`,
    GET_SLA_INFO: (id) => `/applications/${id}/sla`,
    GET_STATISTICS: '/applications/statistics',
    EXPORT: '/applications/export',
    BULK_UPDATE: '/applications/bulk'
};
// Customer endpoints
export const CUSTOMER_ENDPOINTS = {
    GET_ALL: '/customers',
    GET_BY_ID: (id) => `/customers/${id}`,
    CREATE: '/customers',
    UPDATE: (id) => `/customers/${id}`,
    DELETE: (id) => `/customers/${id}`,
    SEARCH: '/customers/search',
    GET_APPLICATIONS: (id) => `/customers/${id}/applications`,
    GET_DOCUMENTS: (id) => `/customers/${id}/documents`,
    VERIFY_NIK: '/customers/verify-nik',
    DUPLICATE_CHECK: '/customers/duplicate-check'
};
// Unit endpoints
export const UNIT_ENDPOINTS = {
    GET_ALL: '/units',
    GET_BY_ID: (id) => `/units/${id}`,
    CREATE: '/units',
    UPDATE: (id) => `/units/${id}`,
    DELETE: (id) => `/units/${id}`,
    GET_AVAILABLE: '/units/available',
    GET_BY_BLOCK: (block) => `/units/block/${block}`,
    GET_BY_TYPE: (type) => `/units/type/${type}`,
    GET_BY_STATUS: (status) => `/units/status/${status}`,
    SEARCH: '/units/search',
    CHECK_AVAILABILITY: (id) => `/units/${id}/availability`,
    RESERVE: (id) => `/units/${id}/reserve`,
    RELEASE: (id) => `/units/${id}/release`,
    GET_PRICING: (id) => `/units/${id}/pricing`
};
// Bank endpoints
export const BANK_ENDPOINTS = {
    GET_ALL: '/banks',
    GET_BY_ID: (id) => `/banks/${id}`,
    CREATE: '/banks',
    UPDATE: (id) => `/banks/${id}`,
    DELETE: (id) => `/banks/${id}`,
    GET_APPLICATIONS: (id) => `/banks/${id}/applications`,
    GET_STATISTICS: (id) => `/banks/${id}/statistics`,
    GET_REQUIREMENTS: (id) => `/banks/${id}/requirements`,
    SUBMIT_APPLICATION: (id) => `/banks/${id}/applications`,
    CHECK_ELIGIBILITY: (id) => `/banks/${id}/eligibility`
};
// Notification endpoints
export const NOTIFICATION_ENDPOINTS = {
    GET_ALL: '/notifications',
    GET_BY_ID: (id) => `/notifications/${id}`,
    CREATE: '/notifications',
    UPDATE: (id) => `/notifications/${id}`,
    DELETE: (id) => `/notifications/${id}`,
    MARK_READ: (id) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    GET_UNREAD_COUNT: '/notifications/unread-count',
    GET_SETTINGS: '/notifications/settings',
    UPDATE_SETTINGS: '/notifications/settings',
    SEND_WHATSAPP: '/notifications/whatsapp',
    SEND_EMAIL: '/notifications/email',
    SEND_PUSH: '/notifications/push',
    SEND_SMS: '/notifications/sms',
    GET_TEMPLATES: '/notifications/templates',
    CREATE_TEMPLATE: '/notifications/templates',
    UPDATE_TEMPLATE: (id) => `/notifications/templates/${id}`,
    DELETE_TEMPLATE: (id) => `/notifications/templates/${id}`,
    GET_STATISTICS: '/notifications/statistics',
    GET_LOGS: '/notifications/logs',
    WEBHOOK: '/notifications/webhook'
};
// Document endpoints
export const DOCUMENT_ENDPOINTS = {
    GET_ALL: '/documents',
    GET_BY_ID: (id) => `/documents/${id}`,
    UPLOAD: '/documents/upload',
    UPDATE: (id) => `/documents/${id}`,
    DELETE: (id) => `/documents/${id}`,
    DOWNLOAD: (id) => `/documents/${id}/download`,
    GET_THUMBNAIL: (id) => `/documents/${id}/thumbnail`,
    EXTRACT_TEXT: (id) => `/documents/${id}/extract-text`,
    VERIFY: (id) => `/documents/${id}/verify`,
    GET_TYPES: '/documents/types',
    BULK_UPLOAD: '/documents/bulk-upload',
    BULK_DELETE: '/documents/bulk-delete'
};
// Report endpoints
export const REPORT_ENDPOINTS = {
    GET_ALL: '/reports',
    GET_BY_ID: (id) => `/reports/${id}`,
    CREATE: '/reports',
    UPDATE: (id) => `/reports/${id}`,
    DELETE: (id) => `/reports/${id}`,
    GENERATE: '/reports/generate',
    DOWNLOAD: (id) => `/reports/${id}/download`,
    GET_TEMPLATES: '/reports/templates',
    CREATE_TEMPLATE: '/reports/templates',
    UPDATE_TEMPLATE: (id) => `/reports/templates/${id}`,
    DELETE_TEMPLATE: (id) => `/reports/templates/${id}`,
    SCHEDULE: '/reports/schedule',
    GET_SCHEDULED: '/reports/scheduled',
    CANCEL_SCHEDULED: (id) => `/reports/scheduled/${id}`
};
// Audit endpoints
export const AUDIT_ENDPOINTS = {
    GET_ALL: '/audit',
    GET_BY_ID: (id) => `/audit/${id}`,
    GET_BY_ENTITY: (type, id) => `/audit/${type}/${id}`,
    GET_BY_USER: (userId) => `/audit/user/${userId}`,
    EXPORT: '/audit/export',
    SEARCH: '/audit/search',
    GET_STATISTICS: '/audit/statistics'
};
// Settings endpoints
export const SETTINGS_ENDPOINTS = {
    GET_ALL: '/settings',
    GET_BY_KEY: (key) => `/settings/${key}`,
    UPDATE: (key) => `/settings/${key}`,
    BULK_UPDATE: '/settings/bulk',
    RESET: '/settings/reset',
    BACKUP: '/settings/backup',
    RESTORE: '/settings/restore'
};
// Integration endpoints
export const INTEGRATION_ENDPOINTS = {
    WHATSAPP: {
        SEND: '/integrations/whatsapp/send',
        WEBHOOK: '/integrations/whatsapp/webhook',
        STATUS: '/integrations/whatsapp/status',
        TEMPLATES: '/integrations/whatsapp/templates'
    },
    EMAIL: {
        SEND: '/integrations/email/send',
        TEMPLATES: '/integrations/email/templates',
        WEBHOOK: '/integrations/email/webhook'
    },
    SMS: {
        SEND: '/integrations/sms/send',
        STATUS: '/integrations/sms/status',
        WEBHOOK: '/integrations/sms/webhook'
    },
    PAYMENT: {
        CREATE: '/integrations/payment/create',
        VERIFY: '/integrations/payment/verify',
        CALLBACK: '/integrations/payment/callback',
        METHODS: '/integrations/payment/methods'
    },
    STORAGE: {
        UPLOAD: '/integrations/storage/upload',
        DOWNLOAD: (id) => `/integrations/storage/download/${id}`,
        DELETE: (id) => `/integrations/storage/delete/${id}`,
        PRESIGNED_URL: '/integrations/storage/presigned-url'
    }
};
// Utility endpoints
export const UTILITY_ENDPOINTS = {
    HEALTH_CHECK: '/health',
    VERSION: '/version',
    CONFIG: '/config',
    TIMEZONE: '/utility/timezone',
    CURRENCY: '/utility/currency',
    VALIDATE_PHONE: '/utility/validate-phone',
    VALIDATE_EMAIL: '/utility/validate-email',
    FORMAT_CURRENCY: '/utility/format-currency',
    FORMAT_DATE: '/utility/format-date',
    CALCULATE_SLA: '/utility/calculate-sla',
    GEOCODE: '/utility/geocode',
    REVERSE_GEOCODE: '/utility/reverse-geocode'
};
// WebSocket endpoints
export const WEBSOCKET_ENDPOINTS = {
    NOTIFICATIONS: '/ws/notifications',
    APPLICATIONS: '/ws/applications',
    CHAT: '/ws/chat',
    COLLABORATION: '/ws/collaboration',
    REAL_TIME: '/ws/real-time'
};
// External service endpoints
export const EXTERNAL_ENDPOINTS = {
    GOOGLE: {
        MAPS_API: 'https://maps.googleapis.com/maps/api',
        PLACES_API: 'https://places.googleapis.com',
        GEOCODING_API: 'https://maps.googleapis.com/maps/api/geocode',
        DIRECTIONS_API: 'https://maps.googleapis.com/maps/api/directions'
    },
    WHATSAPP: {
        API_URL: 'https://graph.facebook.com/v18.0',
        WEBHOOK_VERIFY: '/webhook/verify'
    },
    EMAIL: {
        SENDGRID_API: 'https://api.sendgrid.com/v3',
        MAILGUN_API: 'https://api.mailgun.net/v3'
    },
    SMS: {
        TWILIO_API: 'https://api.twilio.com/2010-04-01',
        WABLAS_API: 'https://console.wablas.com/api'
    },
    PAYMENT: {
        MIDTRANS_API: 'https://api.midtrans.com/v2',
        XENDIT_API: 'https://api.xendit.co'
    }
};
// Rate limiting endpoints
export const RATE_LIMIT_ENDPOINTS = {
    CHECK: '/rate-limit/check',
    RESET: '/rate-limit/reset',
    STATUS: '/rate-limit/status'
};
// Cache endpoints
export const CACHE_ENDPOINTS = {
    CLEAR: '/cache/clear',
    CLEAR_KEY: (key) => `/cache/clear/${key}`,
    STATUS: '/cache/status',
    STATS: '/cache/stats'
};
// Monitoring endpoints
export const MONITORING_ENDPOINTS = {
    METRICS: '/monitoring/metrics',
    LOGS: '/monitoring/logs',
    ERRORS: '/monitoring/errors',
    PERFORMANCE: '/monitoring/performance',
    UPTIME: '/monitoring/uptime',
    ALERTS: '/monitoring/alerts'
};
// Utility functions for building URLs
export class EndpointBuilder {
    constructor(baseUrl = API_BASE_URLS.development) {
        this.baseUrl = baseUrl;
    }
    build(endpoint) {
        return `${this.baseUrl}${endpoint}`;
    }
    withParams(endpoint, params) {
        const url = this.build(endpoint);
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, String(value));
            }
        });
        const queryString = searchParams.toString();
        return queryString ? `${url}?${queryString}` : url;
    }
    withPathParams(endpoint, params) {
        let url = endpoint;
        Object.entries(params).forEach(([key, value]) => {
            url = url.replace(`:${key}`, String(value));
        });
        return this.build(url);
    }
}
// Create endpoint builder instances
export const createApiEndpoint = (environment = 'development') => {
    return new EndpointBuilder(API_BASE_URLS[environment]);
};
export const createSupabaseEndpoint = (environment = 'development') => {
    return new EndpointBuilder(SUPABASE_URLS[environment]);
};
// Default endpoint builder
export const apiEndpoint = new EndpointBuilder();
// Export all endpoints as a single object for convenience
export const API_ENDPOINTS = {
    AUTH: AUTH_ENDPOINTS,
    USER: USER_ENDPOINTS,
    APPLICATION: APPLICATION_ENDPOINTS,
    CUSTOMER: CUSTOMER_ENDPOINTS,
    UNIT: UNIT_ENDPOINTS,
    BANK: BANK_ENDPOINTS,
    NOTIFICATION: NOTIFICATION_ENDPOINTS,
    DOCUMENT: DOCUMENT_ENDPOINTS,
    REPORT: REPORT_ENDPOINTS,
    AUDIT: AUDIT_ENDPOINTS,
    SETTINGS: SETTINGS_ENDPOINTS,
    INTEGRATION: INTEGRATION_ENDPOINTS,
    UTILITY: UTILITY_ENDPOINTS,
    WEBSOCKET: WEBSOCKET_ENDPOINTS,
    EXTERNAL: EXTERNAL_ENDPOINTS,
    RATE_LIMIT: RATE_LIMIT_ENDPOINTS,
    CACHE: CACHE_ENDPOINTS,
    MONITORING: MONITORING_ENDPOINTS
};
// HTTP method constants
export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    HEAD: 'HEAD',
    OPTIONS: 'OPTIONS'
};
// HTTP status codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
};
// Request timeout constants (in milliseconds)
export const REQUEST_TIMEOUTS = {
    DEFAULT: 30000,
    SHORT: 5000,
    LONG: 120000,
    UPLOAD: 300000,
    DOWNLOAD: 600000
};
// Retry configuration
export const RETRY_CONFIG = {
    MAX_ATTEMPTS: 3,
    INITIAL_DELAY: 1000,
    MAX_DELAY: 10000,
    BACKOFF_FACTOR: 2
};
//# sourceMappingURL=api-endpoints.js.map