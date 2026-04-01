/**
 * KPRFlow Enterprise - Phone Formatter Utility
 * Adapted from bramsray2 whatsapp-engine for cross-platform use
 */
export interface PhoneValidationResult {
    isValid: boolean;
    formatted: string;
    original: string;
    country: string;
    type: 'mobile' | 'landline' | 'tollfree' | 'unknown';
    error?: string;
}
export declare class PhoneFormatter {
    private static readonly INDONESIA_COUNTRY_CODE;
    private static readonly WHATSAPP_SUFFIX;
    private static readonly PHONE_PATTERNS;
    /**
     * Format phone number for WhatsApp
     */
    static formatForWhatsApp(phone: string): string;
    /**
     * Clean phone number (remove non-digits)
     */
    static cleanPhoneNumber(phone: string): string;
    /**
     * Add Indonesia country code if not present
     */
    static addIndonesiaCountryCode(phone: string): string;
    /**
     * Remove country code for display
     */
    static removeCountryCode(phone: string): string;
    /**
     * Format phone number for display
     */
    static formatForDisplay(phone: string): string;
    /**
     * Validate phone number
     */
    static validatePhone(phone: string): PhoneValidationResult;
    /**
     * Format phone number with international format
     */
    static formatInternational(phone: string): string;
    /**
     * Format phone number with local format (with leading 0)
     */
    static formatLocal(phone: string): string;
    /**
     * Check if phone number is mobile
     */
    static isMobile(phone: string): boolean;
    /**
     * Check if phone number is landline
     */
    static isLandline(phone: string): boolean;
    /**
     * Extract area code from landline number
     */
    static getAreaCode(phone: string): string | null;
    /**
     * Mask phone number for privacy
     */
    static maskPhone(phone: string, visibleDigits?: number): string;
    /**
     * Generate phone number examples for testing
     */
    static generateExamples(): {
        mobile: string[];
        landline: string[];
        tollfree: string[];
        international: string[];
    };
    /**
     * Normalize phone number from various formats
     */
    static normalize(phone: string): string;
    /**
     * Compare two phone numbers (ignores formatting)
     */
    static compare(phone1: string, phone2: string): boolean;
    /**
     * Extract phone numbers from text
     */
    static extractFromText(text: string): string[];
    /**
     * Format phone number for SMS gateway
     */
    static formatForSMS(phone: string): string;
    /**
     * Get phone number metadata
     */
    static getMetadata(phone: string): {
        isValid: boolean;
        type: string;
        country: string;
        areaCode?: string;
        carrier?: string;
        isWhatsAppCompatible: boolean;
    };
    /**
     * Get mobile carrier based on prefix
     */
    private static getCarrier;
}
export declare const formatPhoneForWhatsApp: typeof PhoneFormatter.formatForWhatsApp;
export declare const validatePhoneNumber: typeof PhoneFormatter.validatePhone;
export declare const formatPhoneForDisplay: typeof PhoneFormatter.formatForDisplay;
export declare const maskPhoneNumber: typeof PhoneFormatter.maskPhone;
//# sourceMappingURL=phone-formatter.d.ts.map