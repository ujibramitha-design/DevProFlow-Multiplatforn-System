/**
 * KPRFlow Enterprise - Validation Rules
 * Adapted from bramsray1 Google Apps Script for cross-platform use
 */
import { ValidationError, ValidationWarning } from '../types/common-types';
export interface ValidationRule {
    field: string;
    required?: boolean;
    type?: ValidationType;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean | string;
    message?: string;
}
export interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
}
export type ValidationType = 'string' | 'number' | 'email' | 'phone' | 'date' | 'url' | 'boolean' | 'array' | 'object' | 'file' | 'nik' | 'npwp';
export declare class ValidationRules {
    private static readonly PATTERNS;
    static readonly CUSTOMER_RULES: ValidationRule[];
    static readonly APPLICATION_RULES: ValidationRule[];
    static readonly UNIT_RULES: ValidationRule[];
    static readonly BANK_RULES: ValidationRule[];
    static readonly DOCUMENT_RULES: ValidationRule[];
    static validate(data: any, rules: ValidationRule[]): ValidationResult;
    static validateField(fieldName: string, value: any, rule: ValidationRule): ValidationError[];
    private static validateType;
    static validateNIK(nik: string): boolean;
    static validateNPWP(npwp: string): boolean;
    static validatePhone(phone: string): boolean;
    static validateEmail(email: string): boolean;
    static validatePostalCode(postalCode: string): boolean;
    static validateBankAccount(account: string): boolean;
    static formatNIK(nik: string): string;
    static formatNPWP(npwp: string): string;
    static formatPhone(phone: string): string;
    static validateCustomerAge(birthDate: string, minAge?: number): boolean;
    static validateLoanAmount(amount: number, minAmount?: number, maxAmount?: number): boolean;
    static validateMonthlyIncome(income: number, minIncome?: number): boolean;
    static validateDebtToIncomeRatio(debt: number, income: number, maxRatio?: number): boolean;
}
export declare const VALIDATION_RULE_SETS: {
    CUSTOMER: ValidationRule[];
    APPLICATION: ValidationRule[];
    UNIT: ValidationRule[];
    BANK: ValidationRule[];
    DOCUMENT: ValidationRule[];
};
export declare const validateCustomer: (data: any) => ValidationResult;
export declare const validateApplication: (data: any) => ValidationResult;
export declare const validateUnit: (data: any) => ValidationResult;
export declare const validateBank: (data: any) => ValidationResult;
export declare const validateDocument: (data: any) => ValidationResult;
//# sourceMappingURL=validation-rules.d.ts.map