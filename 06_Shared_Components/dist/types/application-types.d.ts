/**
 * KPRFlow Enterprise - Application Types
 * Adapted from bramsray2 backend for cross-platform use
 */
export interface BaseApplication {
    id: string;
    customer_id: string;
    unit_id: string;
    bank_id?: string;
    status: ApplicationStatus;
    created_at: string;
    updated_at: string;
    notes?: string;
    data?: Record<string, any>;
}
export interface Application extends BaseApplication {
    customer?: Customer;
    unit?: Unit;
    bank?: Bank;
    documents?: ApplicationDocument[];
    status_history?: ApplicationStatusHistory[];
    sla_info?: ApplicationSLAInfo;
}
export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    nik: string;
    npwp?: string;
    birth_date?: string;
    birth_place?: string;
    address_ktp: string;
    address_domisili: string;
    marital_status: 'single' | 'married' | 'divorced' | 'widowed';
    occupation?: string;
    monthly_income?: number;
    emergency_contact?: EmergencyContact;
    created_at: string;
    updated_at: string;
}
export interface EmergencyContact {
    name: string;
    phone: string;
    address: string;
    relationship: string;
}
export interface Unit {
    id: string;
    unit_type: string;
    block: string;
    number: string;
    price: number;
    unit_area: number;
    land_area: number;
    bedroom: number;
    bathroom: number;
    garage: number;
    floor: number;
    facing: 'north' | 'south' | 'east' | 'west';
    view?: string;
    status: UnitStatus;
    customer_id?: string;
    created_at: string;
    updated_at: string;
}
export interface Bank {
    id: string;
    name: string;
    code: string;
    contact_person?: string;
    phone?: string;
    email?: string;
    address?: string;
    plafon_limit?: number;
    interest_rate?: number;
    tenor_options?: number[];
    requirements?: string[];
    created_at: string;
    updated_at: string;
}
export interface ApplicationDocument {
    id: string;
    application_id: string;
    document_type: DocumentType;
    file_name: string;
    file_url: string;
    file_size: number;
    mime_type: string;
    uploaded_at: string;
    uploaded_by: string;
    verified: boolean;
    verified_by?: string;
    verified_at?: string;
    notes?: string;
}
export interface ApplicationStatusHistory {
    id: string;
    application_id: string;
    from_status: ApplicationStatus;
    to_status: ApplicationStatus;
    changed_by: string;
    changed_at: string;
    notes?: string;
    data?: Record<string, any>;
}
export interface ApplicationSLAInfo {
    sla_days: number;
    days_used: number;
    days_remaining: number;
    status: 'on_track' | 'warning' | 'overdue' | 'completed';
    percentage_used: number;
    deadline_date: string;
}
export type ApplicationStatus = 'PENDING' | 'DOCUMENT_COLLECTION' | 'BANK_SUBMISSION' | 'BANK_VERIFICATION' | 'BANK_APPROVAL' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED' | 'BAST_COMPLETED';
export type UnitStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'CANCELLED' | 'UNDER_CONSTRUCTION' | 'READY';
export type DocumentType = 'KTP' | 'KK' | 'NPWP' | 'AKTA_NIKAH' | 'AKTA_CERAI' | 'SURAT_KERJA' | 'SLIP_GAJI' | 'REKENING_KORAN' | 'SKU' | 'SERTIFIKAT' | 'IMB' | 'PBB' | 'LAINNYA';
export interface ApplicationFilters {
    status?: ApplicationStatus[];
    customer_id?: string;
    unit_id?: string;
    bank_id?: string;
    date_from?: string;
    date_to?: string;
    search?: string;
}
export interface ApplicationCreateRequest {
    customer_id: string;
    unit_id: string;
    bank_id?: string;
    notes?: string;
    data?: Record<string, any>;
}
export interface ApplicationUpdateRequest {
    status?: ApplicationStatus;
    notes?: string;
    bank_id?: string;
    data?: Record<string, any>;
}
export interface ApplicationResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
export interface ApplicationListResponse {
    success: boolean;
    data: Application[];
    count: number;
    page?: number;
    limit?: number;
    total?: number;
}
export interface ApplicationStatistics {
    total: number;
    by_status: Record<ApplicationStatus, number>;
    by_bank: Record<string, number>;
    by_month: Record<string, number>;
    average_processing_time: number;
    approval_rate: number;
    rejection_rate: number;
}
export interface ApplicationValidation {
    is_valid: boolean;
    errors: string[];
    warnings: string[];
    missing_documents: DocumentType[];
    incomplete_fields: string[];
}
export interface ApplicationWorkflow {
    current_status: ApplicationStatus;
    next_statuses: ApplicationStatus[];
    required_actions: string[];
    required_documents: DocumentType[];
    estimated_completion: string;
    bottlenecks: string[];
}
export interface ApplicationReport {
    id: string;
    name: string;
    type: 'summary' | 'detailed' | 'sla' | 'performance';
    filters: ApplicationFilters;
    generated_at: string;
    generated_by: string;
    data: any;
    file_url?: string;
}
export type ApplicationWithRelations = Application & {
    customer: Customer;
    unit: Unit;
    bank?: Bank;
    documents: ApplicationDocument[];
    status_history: ApplicationStatusHistory[];
};
export type ApplicationSummary = Pick<Application, 'id' | 'customer_id' | 'unit_id' | 'status' | 'created_at' | 'updated_at'> & {
    customer_name: string;
    unit_block: string;
    unit_number: string;
    bank_name?: string;
    aging_days: number;
    sla_status: 'on_track' | 'warning' | 'overdue';
};
export interface ApplicationFormData {
    customer: Partial<Customer>;
    unit: Partial<Unit>;
    bank?: Partial<Bank>;
    notes?: string;
    documents: File[];
}
export interface ApplicationSearchResult {
    application: ApplicationSummary;
    score: number;
    matched_fields: string[];
}
export declare function isValidApplicationStatus(status: string): status is ApplicationStatus;
export declare function isValidDocumentType(type: string): type is DocumentType;
export declare function isValidUnitStatus(status: string): status is UnitStatus;
export declare const DEFAULT_APPLICATION_STATUS: ApplicationStatus;
export declare const DEFAULT_UNIT_STATUS: UnitStatus;
export declare const DEFAULT_SLA_DAYS = 30;
export declare const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string>;
export declare const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string>;
export declare const DOCUMENT_TYPE_LABELS: Record<DocumentType, string>;
//# sourceMappingURL=application-types.d.ts.map