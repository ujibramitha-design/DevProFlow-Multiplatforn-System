/**
 * KPRFlow Enterprise - Shared Security Service
 * Adapted from bramsray2 backend securityService.js for cross-platform use
 */
export interface SecurityConfig {
    supabase: {
        url: string;
        anonKey: string;
        serviceKey?: string;
    };
    google: {
        geminiKey?: string;
        mapsKey?: string;
        visionKey?: string;
    };
    openai: {
        apiKey?: string;
    };
    cloudflare: {
        accountId?: string;
        accessKey?: string;
        secretKey?: string;
    };
    github: {
        token?: string;
    };
    firebase: {
        apiKey?: string;
        databaseUrl?: string;
    };
    communication: {
        telegramBotToken?: string;
        twilioKey?: string;
        wablasToken?: string;
    };
}
export interface SecurityValidationResult {
    isValid: boolean;
    missingKeys: string[];
    invalidKeys: string[];
    warnings: string[];
}
export declare class SecurityService {
    private static instance;
    private config;
    private isProductionMode;
    private constructor();
    static getInstance(): SecurityService;
    /**
     * Initialize security service with configuration
     */
    initialize(config: SecurityConfig, isProduction?: boolean): void;
    /**
     * Validate that required environment variables are set
     */
    validateConfig(requiredKeys?: string[]): SecurityValidationResult;
    /**
     * Get environment variable value
     */
    private getEnvironmentVariable;
    /**
     * Get secure value from storage (platform-specific implementation)
     */
    private getSecureValue;
    /**
     * Get API key by service (secure)
     */
    getApiKey(service: string): string | null;
    /**
     * Validate API key format
     */
    validateApiKey(key: string, service: string): boolean;
    /**
     * Mask API key for logging
     */
    maskApiKey(key: string): string;
    /**
     * Check if environment is production
     */
    isProduction(): boolean;
    /**
     * Get security headers for web requests
     */
    getSecurityHeaders(): Record<string, string>;
    /**
     * Validate input data against common threats
     */
    sanitizeInput(input: string): string;
    /**
     * Validate email format
     */
    validateEmail(email: string): boolean;
    /**
     * Validate phone number (Indonesia format)
     */
    validatePhoneNumber(phone: string): boolean;
    /**
     * Generate secure random token
     */
    generateSecureToken(length?: number): string;
    /**
     * Hash password (platform-specific implementation)
     */
    hashPassword(password: string): Promise<string>;
    /**
     * Verify password
     */
    verifyPassword(password: string, hash: string): Promise<boolean>;
    /**
     * Rate limiting implementation
     */
    private rateLimitMap;
    isRateLimited(identifier: string, maxRequests?: number, windowMs?: number): boolean;
    /**
     * Clear rate limit for identifier
     */
    clearRateLimit(identifier: string): void;
    /**
     * Get security audit log
     */
    getSecurityAudit(): {
        configValidated: boolean;
        productionMode: boolean;
        rateLimitEntries: number;
        warnings: string[];
    };
    /**
     * Encrypt sensitive data (platform-specific)
     */
    encrypt(data: string): Promise<string>;
    /**
     * Decrypt sensitive data (platform-specific)
     */
    decrypt(encryptedData: string): Promise<string>;
}
export declare const securityService: SecurityService;
//# sourceMappingURL=security-service.d.ts.map