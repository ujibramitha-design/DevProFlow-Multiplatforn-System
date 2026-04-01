/**
 * KPRFlow Enterprise - Application Controller
 * Adapted from bramsray2 backend for cross-platform use
 */
import { Application, ApplicationStatus, ApplicationCreateRequest, ApplicationUpdateRequest, ApplicationFilters, ApplicationResponse, ApplicationListResponse, ApplicationStatistics } from '../types/supabase-types';
export declare class ApplicationController {
    private static instance;
    private constructor();
    static getInstance(): ApplicationController;
    /**
     * Get all applications with optional filters
     */
    getAllApplications(filters?: ApplicationFilters, page?: number, limit?: number): Promise<ApplicationListResponse>;
    /**
     * Get application by ID
     */
    getApplicationById(id: string): Promise<ApplicationResponse<Application>>;
    /**
     * Create new application
     */
    createApplication(request: ApplicationCreateRequest): Promise<ApplicationResponse<Application>>;
    /**
     * Update application
     */
    updateApplication(id: string, request: ApplicationUpdateRequest): Promise<ApplicationResponse<Application>>;
    /**
     * Delete application
     */
    deleteApplication(id: string): Promise<ApplicationResponse>;
    /**
     * Get applications by status
     */
    getApplicationsByStatus(status: ApplicationStatus, page?: number, limit?: number): Promise<ApplicationListResponse>;
    /**
     * Get application statistics
     */
    getApplicationStatistics(): Promise<ApplicationResponse<ApplicationStatistics>>;
    /**
     * Bulk update applications
     */
    bulkUpdateApplications(ids: string[], updateData: ApplicationUpdateRequest): Promise<ApplicationResponse<Application[]>>;
    private validateApplicationCreation;
    private validateStatusChange;
    private logStatusChange;
    private sendStatusChangeNotification;
    private updateUnitStatus;
    private handleStatusChangeUnitUpdate;
    private canDeleteApplication;
    private getSLADaysByStatus;
    private getSLAStatus;
}
export declare const applicationController: ApplicationController;
//# sourceMappingURL=application-controller.d.ts.map