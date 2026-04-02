/**
 * KPRFlow Enterprise - Common Types
 * Shared types used across the application
 */
// Type guards
export function isValidUserRole(role) {
    const validRoles = ['super_admin', 'admin', 'manager', 'supervisor', 'agent', 'customer', 'guest'];
    return validRoles.includes(role);
}
export function isValidUserStatus(status) {
    const validStatuses = ['active', 'inactive', 'suspended', 'pending', 'deleted'];
    return validStatuses.includes(status);
}
export function isValidPaymentMethod(method) {
    const validMethods = ['cash', 'transfer', 'check', 'credit_card', 'debit_card', 'digital_wallet', 'installment', 'other'];
    return validMethods.includes(method);
}
export function isValidPaymentStatus(status) {
    const validStatuses = ['pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded', 'partial'];
    return validStatuses.includes(status);
}
// Default values
export const DEFAULT_USER_ROLE = 'customer';
export const DEFAULT_USER_STATUS = 'active';
export const DEFAULT_PAGINATION = {
    page: 1,
    limit: 20
};
export const DEFAULT_CURRENCY = 'IDR';
export const DEFAULT_TIMEZONE = 'Asia/Jakarta';
export const DEFAULT_LANGUAGE = 'id';
// Constants
export const USER_ROLES = ['super_admin', 'admin', 'manager', 'supervisor', 'agent', 'customer', 'guest'];
export const USER_STATUSES = ['active', 'inactive', 'suspended', 'pending', 'deleted'];
export const PAYMENT_METHODS = ['cash', 'transfer', 'check', 'credit_card', 'debit_card', 'digital_wallet', 'installment', 'other'];
export const PAYMENT_STATUSES = ['pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded', 'partial'];
export const ROLE_PERMISSIONS = {
    'super_admin': ['*'],
    'admin': ['users.*', 'applications.*', 'units.*', 'reports.*', 'settings.*'],
    'manager': ['applications.*', 'units.read', 'customers.*', 'reports.read'],
    'supervisor': ['applications.*', 'customers.read', 'reports.read'],
    'agent': ['applications.create', 'applications.read', 'customers.create', 'customers.read'],
    'customer': ['applications.own', 'profile.own'],
    'guest': ['applications.read', 'customers.read']
};
export const FILE_SIZE_LIMITS = {
    IMAGE: 10 * 1024 * 1024, // 10MB
    DOCUMENT: 50 * 1024 * 1024, // 50MB
    VIDEO: 100 * 1024 * 1024, // 100MB
    AUDIO: 20 * 1024 * 1024 // 20MB
};
export const SUPPORTED_FILE_TYPES = {
    IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    SPREADSHEET: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    PRESENTATION: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']
};
//# sourceMappingURL=common-types.js.map