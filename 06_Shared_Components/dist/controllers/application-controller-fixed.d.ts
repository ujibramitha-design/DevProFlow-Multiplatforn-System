/**
 * KPRFlow Enterprise - Application Controller (Fixed Version)
 * Simplified TypeScript implementation for cross-platform use
 */
export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'warning' | 'overdue' | 'on_track';
export interface Application {
    id: string;
    customer_id: string;
    unit_id: string;
    bank_id?: string;
    status: ApplicationStatus;
    created_at: string;
    updated_at: string;
    notes?: string;
    data?: Record<string, any>;
    customer?: Customer;
    unit?: Unit;
    bank?: Bank;
}
export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    nik: string;
    address: string;
}
export interface Unit {
    id: string;
    block: string;
    unit_number: string;
    type: string;
    price: number;
    status: string;
}
export interface Bank {
    id: string;
    name: string;
    code: string;
}
export interface ApplicationFilters {
    status?: ApplicationStatus[];
    customer_id?: string;
    unit_id?: string;
    bank_id?: string;
    date_from?: string;
    date_to?: string;
    search?: string;
}
export interface ApplicationListResponse {
    data?: Application[];
    error?: string;
    count?: number;
    has_more?: boolean;
    page?: number;
    limit?: number;
}
export interface ApplicationResponse {
    data?: Application;
    error?: string;
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
    data?: Record<string, any>;
    unit_id?: string;
}
export interface ApplicationStatistics {
    total_applications: number;
    by_status: Record<ApplicationStatus, number>;
    by_bank: Record<string, number>;
    by_unit_type: Record<string, number>;
    average_processing_time: number;
    completion_rate: number;
}
export declare class ApplicationController {
    private static instance;
    private client;
    private constructor();
    static getInstance(): ApplicationController;
    private mockQuery;
    /**
     * Get all applications with optional filters
     */
    getAllApplications(filters?: ApplicationFilters, page?: number, limit?: number): Promise<ApplicationListResponse>;
    /**
     * Get application by ID
     */
    getApplicationById(id: string): Promise<ApplicationResponse>;
    /**
     * Create new application
     */
    createApplication(request: ApplicationCreateRequest): Promise<ApplicationResponse>;
    /**
     * Update application
     */
    updateApplication(id: string, request: ApplicationUpdateRequest): Promise<ApplicationResponse>;
    /**
     * Delete application
     */
    deleteApplication(id: string): Promise<{
        success: boolean;
        error?: string;
    }>;
    /**
     * Get application statistics
     */
    getApplicationStatistics(): Promise<ApplicationStatistics>;
    /**
     * Get applications by status
     */
    getApplicationsByStatus(status: ApplicationStatus[]): Promise<ApplicationListResponse>;
    /**
     * Get applications by customer
     */
    getApplicationsByCustomer(customerId: string): Promise<ApplicationListResponse>;
    /**
     * Get applications by unit
     */
    getApplicationsByUnit(unitId: string): Promise<ApplicationListResponse>;
    /**
     * Get applications by bank
     */
    getApplicationsByBank(bankId: string): Promise<ApplicationListResponse>;
}
export declare const applicationController: ApplicationController;
//# sourceMappingURL=application-controller-fixed.d.ts.map