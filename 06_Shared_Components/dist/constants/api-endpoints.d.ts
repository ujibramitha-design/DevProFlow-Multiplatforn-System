/**
 * KPRFlow Enterprise - API Endpoints
 * Centralized API endpoint definitions for cross-platform use
 */
export declare const API_BASE_URLS: {
    development: string;
    staging: string;
    production: string;
};
export declare const SUPABASE_URLS: {
    development: string;
    staging: string;
    production: string;
};
export declare const AUTH_ENDPOINTS: {
    LOGIN: string;
    LOGOUT: string;
    REGISTER: string;
    REFRESH: string;
    VERIFY_EMAIL: string;
    FORGOT_PASSWORD: string;
    RESET_PASSWORD: string;
    CHANGE_PASSWORD: string;
    ME: string;
    UPDATE_PROFILE: string;
};
export declare const USER_ENDPOINTS: {
    GET_ALL: string;
    GET_BY_ID: (id: string) => string;
    CREATE: string;
    UPDATE: (id: string) => string;
    DELETE: (id: string) => string;
    UPDATE_PROFILE: (id: string) => string;
    GET_PREFERENCES: (id: string) => string;
    UPDATE_PREFERENCES: (id: string) => string;
    GET_PERMISSIONS: (id: string) => string;
    GET_ACTIVITY_LOG: (id: string) => string;
};
export declare const APPLICATION_ENDPOINTS: {
    GET_ALL: string;
    GET_BY_ID: (id: string) => string;
    CREATE: string;
    UPDATE: (id: string) => string;
    DELETE: (id: string) => string;
    UPDATE_STATUS: (id: string) => string;
    GET_HISTORY: (id: string) => string;
    GET_DOCUMENTS: (id: string) => string;
    UPLOAD_DOCUMENT: (id: string) => string;
    DELETE_DOCUMENT: (id: string, docId: string) => string;
    GET_SLA_INFO: (id: string) => string;
    GET_STATISTICS: string;
    EXPORT: string;
    BULK_UPDATE: string;
};
export declare const CUSTOMER_ENDPOINTS: {
    GET_ALL: string;
    GET_BY_ID: (id: string) => string;
    CREATE: string;
    UPDATE: (id: string) => string;
    DELETE: (id: string) => string;
    SEARCH: string;
    GET_APPLICATIONS: (id: string) => string;
    GET_DOCUMENTS: (id: string) => string;
    VERIFY_NIK: string;
    DUPLICATE_CHECK: string;
};
export declare const UNIT_ENDPOINTS: {
    GET_ALL: string;
    GET_BY_ID: (id: string) => string;
    CREATE: string;
    UPDATE: (id: string) => string;
    DELETE: (id: string) => string;
    GET_AVAILABLE: string;
    GET_BY_BLOCK: (block: string) => string;
    GET_BY_TYPE: (type: string) => string;
    GET_BY_STATUS: (status: string) => string;
    SEARCH: string;
    CHECK_AVAILABILITY: (id: string) => string;
    RESERVE: (id: string) => string;
    RELEASE: (id: string) => string;
    GET_PRICING: (id: string) => string;
};
export declare const BANK_ENDPOINTS: {
    GET_ALL: string;
    GET_BY_ID: (id: string) => string;
    CREATE: string;
    UPDATE: (id: string) => string;
    DELETE: (id: string) => string;
    GET_APPLICATIONS: (id: string) => string;
    GET_STATISTICS: (id: string) => string;
    GET_REQUIREMENTS: (id: string) => string;
    SUBMIT_APPLICATION: (id: string) => string;
    CHECK_ELIGIBILITY: (id: string) => string;
};
export declare const NOTIFICATION_ENDPOINTS: {
    GET_ALL: string;
    GET_BY_ID: (id: string) => string;
    CREATE: string;
    UPDATE: (id: string) => string;
    DELETE: (id: string) => string;
    MARK_READ: (id: string) => string;
    MARK_ALL_READ: string;
    GET_UNREAD_COUNT: string;
    GET_SETTINGS: string;
    UPDATE_SETTINGS: string;
    SEND_WHATSAPP: string;
    SEND_EMAIL: string;
    SEND_PUSH: string;
    SEND_SMS: string;
    GET_TEMPLATES: string;
    CREATE_TEMPLATE: string;
    UPDATE_TEMPLATE: (id: string) => string;
    DELETE_TEMPLATE: (id: string) => string;
    GET_STATISTICS: string;
    GET_LOGS: string;
    WEBHOOK: string;
};
export declare const DOCUMENT_ENDPOINTS: {
    GET_ALL: string;
    GET_BY_ID: (id: string) => string;
    UPLOAD: string;
    UPDATE: (id: string) => string;
    DELETE: (id: string) => string;
    DOWNLOAD: (id: string) => string;
    GET_THUMBNAIL: (id: string) => string;
    EXTRACT_TEXT: (id: string) => string;
    VERIFY: (id: string) => string;
    GET_TYPES: string;
    BULK_UPLOAD: string;
    BULK_DELETE: string;
};
export declare const REPORT_ENDPOINTS: {
    GET_ALL: string;
    GET_BY_ID: (id: string) => string;
    CREATE: string;
    UPDATE: (id: string) => string;
    DELETE: (id: string) => string;
    GENERATE: string;
    DOWNLOAD: (id: string) => string;
    GET_TEMPLATES: string;
    CREATE_TEMPLATE: string;
    UPDATE_TEMPLATE: (id: string) => string;
    DELETE_TEMPLATE: (id: string) => string;
    SCHEDULE: string;
    GET_SCHEDULED: string;
    CANCEL_SCHEDULED: (id: string) => string;
};
export declare const AUDIT_ENDPOINTS: {
    GET_ALL: string;
    GET_BY_ID: (id: string) => string;
    GET_BY_ENTITY: (type: string, id: string) => string;
    GET_BY_USER: (userId: string) => string;
    EXPORT: string;
    SEARCH: string;
    GET_STATISTICS: string;
};
export declare const SETTINGS_ENDPOINTS: {
    GET_ALL: string;
    GET_BY_KEY: (key: string) => string;
    UPDATE: (key: string) => string;
    BULK_UPDATE: string;
    RESET: string;
    BACKUP: string;
    RESTORE: string;
};
export declare const INTEGRATION_ENDPOINTS: {
    WHATSAPP: {
        SEND: string;
        WEBHOOK: string;
        STATUS: string;
        TEMPLATES: string;
    };
    EMAIL: {
        SEND: string;
        TEMPLATES: string;
        WEBHOOK: string;
    };
    SMS: {
        SEND: string;
        STATUS: string;
        WEBHOOK: string;
    };
    PAYMENT: {
        CREATE: string;
        VERIFY: string;
        CALLBACK: string;
        METHODS: string;
    };
    STORAGE: {
        UPLOAD: string;
        DOWNLOAD: (id: string) => string;
        DELETE: (id: string) => string;
        PRESIGNED_URL: string;
    };
};
export declare const UTILITY_ENDPOINTS: {
    HEALTH_CHECK: string;
    VERSION: string;
    CONFIG: string;
    TIMEZONE: string;
    CURRENCY: string;
    VALIDATE_PHONE: string;
    VALIDATE_EMAIL: string;
    FORMAT_CURRENCY: string;
    FORMAT_DATE: string;
    CALCULATE_SLA: string;
    GEOCODE: string;
    REVERSE_GEOCODE: string;
};
export declare const WEBSOCKET_ENDPOINTS: {
    NOTIFICATIONS: string;
    APPLICATIONS: string;
    CHAT: string;
    COLLABORATION: string;
    REAL_TIME: string;
};
export declare const EXTERNAL_ENDPOINTS: {
    GOOGLE: {
        MAPS_API: string;
        PLACES_API: string;
        GEOCODING_API: string;
        DIRECTIONS_API: string;
    };
    WHATSAPP: {
        API_URL: string;
        WEBHOOK_VERIFY: string;
    };
    EMAIL: {
        SENDGRID_API: string;
        MAILGUN_API: string;
    };
    SMS: {
        TWILIO_API: string;
        WABLAS_API: string;
    };
    PAYMENT: {
        MIDTRANS_API: string;
        XENDIT_API: string;
    };
};
export declare const RATE_LIMIT_ENDPOINTS: {
    CHECK: string;
    RESET: string;
    STATUS: string;
};
export declare const CACHE_ENDPOINTS: {
    CLEAR: string;
    CLEAR_KEY: (key: string) => string;
    STATUS: string;
    STATS: string;
};
export declare const MONITORING_ENDPOINTS: {
    METRICS: string;
    LOGS: string;
    ERRORS: string;
    PERFORMANCE: string;
    UPTIME: string;
    ALERTS: string;
};
export declare class EndpointBuilder {
    private baseUrl;
    constructor(baseUrl?: string);
    build(endpoint: string): string;
    withParams(endpoint: string, params: Record<string, any>): string;
    withPathParams(endpoint: string, params: Record<string, string | number>): string;
}
export declare const createApiEndpoint: (environment?: keyof typeof API_BASE_URLS) => EndpointBuilder;
export declare const createSupabaseEndpoint: (environment?: keyof typeof SUPABASE_URLS) => EndpointBuilder;
export declare const apiEndpoint: EndpointBuilder;
export declare const API_ENDPOINTS: {
    AUTH: {
        LOGIN: string;
        LOGOUT: string;
        REGISTER: string;
        REFRESH: string;
        VERIFY_EMAIL: string;
        FORGOT_PASSWORD: string;
        RESET_PASSWORD: string;
        CHANGE_PASSWORD: string;
        ME: string;
        UPDATE_PROFILE: string;
    };
    USER: {
        GET_ALL: string;
        GET_BY_ID: (id: string) => string;
        CREATE: string;
        UPDATE: (id: string) => string;
        DELETE: (id: string) => string;
        UPDATE_PROFILE: (id: string) => string;
        GET_PREFERENCES: (id: string) => string;
        UPDATE_PREFERENCES: (id: string) => string;
        GET_PERMISSIONS: (id: string) => string;
        GET_ACTIVITY_LOG: (id: string) => string;
    };
    APPLICATION: {
        GET_ALL: string;
        GET_BY_ID: (id: string) => string;
        CREATE: string;
        UPDATE: (id: string) => string;
        DELETE: (id: string) => string;
        UPDATE_STATUS: (id: string) => string;
        GET_HISTORY: (id: string) => string;
        GET_DOCUMENTS: (id: string) => string;
        UPLOAD_DOCUMENT: (id: string) => string;
        DELETE_DOCUMENT: (id: string, docId: string) => string;
        GET_SLA_INFO: (id: string) => string;
        GET_STATISTICS: string;
        EXPORT: string;
        BULK_UPDATE: string;
    };
    CUSTOMER: {
        GET_ALL: string;
        GET_BY_ID: (id: string) => string;
        CREATE: string;
        UPDATE: (id: string) => string;
        DELETE: (id: string) => string;
        SEARCH: string;
        GET_APPLICATIONS: (id: string) => string;
        GET_DOCUMENTS: (id: string) => string;
        VERIFY_NIK: string;
        DUPLICATE_CHECK: string;
    };
    UNIT: {
        GET_ALL: string;
        GET_BY_ID: (id: string) => string;
        CREATE: string;
        UPDATE: (id: string) => string;
        DELETE: (id: string) => string;
        GET_AVAILABLE: string;
        GET_BY_BLOCK: (block: string) => string;
        GET_BY_TYPE: (type: string) => string;
        GET_BY_STATUS: (status: string) => string;
        SEARCH: string;
        CHECK_AVAILABILITY: (id: string) => string;
        RESERVE: (id: string) => string;
        RELEASE: (id: string) => string;
        GET_PRICING: (id: string) => string;
    };
    BANK: {
        GET_ALL: string;
        GET_BY_ID: (id: string) => string;
        CREATE: string;
        UPDATE: (id: string) => string;
        DELETE: (id: string) => string;
        GET_APPLICATIONS: (id: string) => string;
        GET_STATISTICS: (id: string) => string;
        GET_REQUIREMENTS: (id: string) => string;
        SUBMIT_APPLICATION: (id: string) => string;
        CHECK_ELIGIBILITY: (id: string) => string;
    };
    NOTIFICATION: {
        GET_ALL: string;
        GET_BY_ID: (id: string) => string;
        CREATE: string;
        UPDATE: (id: string) => string;
        DELETE: (id: string) => string;
        MARK_READ: (id: string) => string;
        MARK_ALL_READ: string;
        GET_UNREAD_COUNT: string;
        GET_SETTINGS: string;
        UPDATE_SETTINGS: string;
        SEND_WHATSAPP: string;
        SEND_EMAIL: string;
        SEND_PUSH: string;
        SEND_SMS: string;
        GET_TEMPLATES: string;
        CREATE_TEMPLATE: string;
        UPDATE_TEMPLATE: (id: string) => string;
        DELETE_TEMPLATE: (id: string) => string;
        GET_STATISTICS: string;
        GET_LOGS: string;
        WEBHOOK: string;
    };
    DOCUMENT: {
        GET_ALL: string;
        GET_BY_ID: (id: string) => string;
        UPLOAD: string;
        UPDATE: (id: string) => string;
        DELETE: (id: string) => string;
        DOWNLOAD: (id: string) => string;
        GET_THUMBNAIL: (id: string) => string;
        EXTRACT_TEXT: (id: string) => string;
        VERIFY: (id: string) => string;
        GET_TYPES: string;
        BULK_UPLOAD: string;
        BULK_DELETE: string;
    };
    REPORT: {
        GET_ALL: string;
        GET_BY_ID: (id: string) => string;
        CREATE: string;
        UPDATE: (id: string) => string;
        DELETE: (id: string) => string;
        GENERATE: string;
        DOWNLOAD: (id: string) => string;
        GET_TEMPLATES: string;
        CREATE_TEMPLATE: string;
        UPDATE_TEMPLATE: (id: string) => string;
        DELETE_TEMPLATE: (id: string) => string;
        SCHEDULE: string;
        GET_SCHEDULED: string;
        CANCEL_SCHEDULED: (id: string) => string;
    };
    AUDIT: {
        GET_ALL: string;
        GET_BY_ID: (id: string) => string;
        GET_BY_ENTITY: (type: string, id: string) => string;
        GET_BY_USER: (userId: string) => string;
        EXPORT: string;
        SEARCH: string;
        GET_STATISTICS: string;
    };
    SETTINGS: {
        GET_ALL: string;
        GET_BY_KEY: (key: string) => string;
        UPDATE: (key: string) => string;
        BULK_UPDATE: string;
        RESET: string;
        BACKUP: string;
        RESTORE: string;
    };
    INTEGRATION: {
        WHATSAPP: {
            SEND: string;
            WEBHOOK: string;
            STATUS: string;
            TEMPLATES: string;
        };
        EMAIL: {
            SEND: string;
            TEMPLATES: string;
            WEBHOOK: string;
        };
        SMS: {
            SEND: string;
            STATUS: string;
            WEBHOOK: string;
        };
        PAYMENT: {
            CREATE: string;
            VERIFY: string;
            CALLBACK: string;
            METHODS: string;
        };
        STORAGE: {
            UPLOAD: string;
            DOWNLOAD: (id: string) => string;
            DELETE: (id: string) => string;
            PRESIGNED_URL: string;
        };
    };
    UTILITY: {
        HEALTH_CHECK: string;
        VERSION: string;
        CONFIG: string;
        TIMEZONE: string;
        CURRENCY: string;
        VALIDATE_PHONE: string;
        VALIDATE_EMAIL: string;
        FORMAT_CURRENCY: string;
        FORMAT_DATE: string;
        CALCULATE_SLA: string;
        GEOCODE: string;
        REVERSE_GEOCODE: string;
    };
    WEBSOCKET: {
        NOTIFICATIONS: string;
        APPLICATIONS: string;
        CHAT: string;
        COLLABORATION: string;
        REAL_TIME: string;
    };
    EXTERNAL: {
        GOOGLE: {
            MAPS_API: string;
            PLACES_API: string;
            GEOCODING_API: string;
            DIRECTIONS_API: string;
        };
        WHATSAPP: {
            API_URL: string;
            WEBHOOK_VERIFY: string;
        };
        EMAIL: {
            SENDGRID_API: string;
            MAILGUN_API: string;
        };
        SMS: {
            TWILIO_API: string;
            WABLAS_API: string;
        };
        PAYMENT: {
            MIDTRANS_API: string;
            XENDIT_API: string;
        };
    };
    RATE_LIMIT: {
        CHECK: string;
        RESET: string;
        STATUS: string;
    };
    CACHE: {
        CLEAR: string;
        CLEAR_KEY: (key: string) => string;
        STATUS: string;
        STATS: string;
    };
    MONITORING: {
        METRICS: string;
        LOGS: string;
        ERRORS: string;
        PERFORMANCE: string;
        UPTIME: string;
        ALERTS: string;
    };
};
export declare const HTTP_METHODS: {
    GET: string;
    POST: string;
    PUT: string;
    PATCH: string;
    DELETE: string;
    HEAD: string;
    OPTIONS: string;
};
export declare const HTTP_STATUS: {
    OK: number;
    CREATED: number;
    NO_CONTENT: number;
    BAD_REQUEST: number;
    UNAUTHORIZED: number;
    FORBIDDEN: number;
    NOT_FOUND: number;
    METHOD_NOT_ALLOWED: number;
    CONFLICT: number;
    UNPROCESSABLE_ENTITY: number;
    TOO_MANY_REQUESTS: number;
    INTERNAL_SERVER_ERROR: number;
    BAD_GATEWAY: number;
    SERVICE_UNAVAILABLE: number;
};
export declare const REQUEST_TIMEOUTS: {
    DEFAULT: number;
    SHORT: number;
    LONG: number;
    UPLOAD: number;
    DOWNLOAD: number;
};
export declare const RETRY_CONFIG: {
    MAX_ATTEMPTS: number;
    INITIAL_DELAY: number;
    MAX_DELAY: number;
    BACKOFF_FACTOR: number;
};
//# sourceMappingURL=api-endpoints.d.ts.map