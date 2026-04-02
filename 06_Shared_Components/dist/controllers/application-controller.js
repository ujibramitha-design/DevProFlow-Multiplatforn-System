/**
 * KPRFlow Enterprise - Application Controller
 * Adapted from bramsray2 backend for cross-platform use
 */
import { supabaseClient } from '../api_clients/supabase-client';
import { notificationService } from '../services/notification-service';
import { DateCalculator } from '../utils/date-calculator';
export class ApplicationController {
    constructor() { }
    static getInstance() {
        if (!ApplicationController.instance) {
            ApplicationController.instance = new ApplicationController();
        }
        return ApplicationController.instance;
    }
    /**
     * Get all applications with optional filters
     */
    async getAllApplications(filters, page = 1, limit = 20) {
        try {
            const client = supabaseClient.getClient();
            let query = client.from('kpr_applications');
            // Apply filters
            if (filters) {
                if (filters.status && filters.status.length > 0) {
                    query = query.in('status', filters.status);
                }
                if (filters.customer_id) {
                    query = query.eq('customer_id', filters.customer_id);
                }
                if (filters.unit_id) {
                    query = query.eq('unit_id', filters.unit_id);
                }
                if (filters.bank_id) {
                    query = query.eq('bank_id', filters.bank_id);
                }
                if (filters.date_from) {
                    query = query.gte('created_at', filters.date_from);
                }
                if (filters.date_to) {
                    query = query.lte('created_at', filters.date_to);
                }
                if (filters.search) {
                    query = query.or(`customer.name.ilike.%${filters.search}%,unit.block.ilike.%${filters.search}%`);
                }
            }
            // Apply pagination
            const offset = (page - 1) * limit;
            query = query.range(offset, offset + limit - 1);
            // Get count
            const { count } = await client
                .from('kpr_applications')
                .select('*', { count: 'exact', head: true });
            // Execute query
            const { data, error } = await query;
            if (error) {
                return {
                    data: undefined,
                    error: error.message,
                    count: 0,
                    has_more: false,
                    page,
                    limit
                };
            }
            const applicationsWithAging = (data || []).map(app => ({
                ...app,
                aging_days: DateCalculator.calculateDaysSince(app.created_at),
                sla_info: this.calculateSLAInfo(app)
            }));
            return {
                success: true,
                data: applicationsWithAging,
                count: applicationsWithAging.length,
                page,
                limit,
                total: count || 0,
                has_more: (count || 0) > offset + limit
            };
        }
        catch (error) {
            console.error('Error fetching applications:', error);
            return {
                success: false,
                data: [],
                count: 0,
                error: error.message
            };
        }
    }
    /**
     * Get application by ID
     */
    async getApplicationById(id) {
        try {
            const client = supabaseClient.getClient();
            const { data, error } = await client
                .from('kpr_applications')
                .select(`
          *,
          customers:customer_id(*),
          units:unit_id(*),
          banks:bank_id(*),
          application_documents(id, document_type, file_name, file_url, uploaded_at, verified),
          application_status_history(id, from_status, to_status, changed_by, changed_at, notes)
        `)
                .eq('id', id)
                .single();
            if (error)
                throw error;
            // Calculate SLA info
            const slaInfo = DateCalculator.getSLAStatus(data.created_at, new Date(), this.getSLADaysByStatus(data.status));
            const application = {
                ...data,
                sla_info: slaInfo,
                aging_days: DateCalculator.calculateAging(data.created_at).days
            };
            return {
                success: true,
                data: application
            };
        }
        catch (error) {
            console.error('Error fetching application:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    /**
     * Create new application
     */
    async createApplication(request) {
        try {
            const client = supabaseClient.getClient();
            // Validate customer and unit availability
            const validation = await this.validateApplicationCreation(request);
            if (!validation.isValid) {
                return {
                    success: false,
                    error: validation.errors.join(', ')
                };
            }
            // Create application
            const applicationData = {
                ...request,
                status: 'PENDING',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            const { data, error } = await client
                .from('kpr_applications')
                .insert([applicationData])
                .select(`
          *,
          customers:customer_id(name, email, phone),
          units:unit_id(unit_type, block, number, price)
        `)
                .single();
            if (error)
                throw error;
            // Send notification
            await this.sendStatusChangeNotification(data, null, 'PENDING');
            // Update unit status if needed
            await this.updateUnitStatus(request.unit_id, 'RESERVED');
            return {
                success: true,
                data,
                message: 'Aplikasi KPR berhasil dibuat'
            };
        }
        catch (error) {
            console.error('Error creating application:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    /**
     * Update application
     */
    async updateApplication(id, request) {
        try {
            const client = supabaseClient.getClient();
            // Get current application
            const currentApp = await this.getApplicationById(id);
            if (!currentApp.success || !currentApp.data) {
                return {
                    success: false,
                    error: 'Aplikasi tidak ditemukan'
                };
            }
            // Validate status change
            if (request.status && request.status !== currentApp.data.status) {
                const validation = await this.validateStatusChange(currentApp.data.status, request.status, currentApp.data);
                if (!validation.isValid) {
                    return {
                        success: false,
                        error: validation.errors.join(', ')
                    };
                }
            }
            // Update application
            const updateData = {
                ...request,
                updated_at: new Date().toISOString()
            };
            const { data, error } = await client
                .from('kpr_applications')
                .update(updateData)
                .eq('id', id)
                .select(`
          *,
          customers:customer_id(name, email, phone),
          units:unit_id(unit_type, block, number, price),
          banks:bank_id(name, contact_person)
        `)
                .single();
            if (error)
                throw error;
            // Log status change
            if (request.status && request.status !== currentApp.data.status) {
                await this.logStatusChange(id, currentApp.data.status, request.status, request.notes);
                // Send notification
                await this.sendStatusChangeNotification(data, currentApp.data.status, request.status);
                // Update unit status if needed
                await this.handleStatusChangeUnitUpdate(request.unit_id, request.status);
            }
            return {
                success: true,
                data,
                message: 'Aplikasi berhasil diperbarui'
            };
        }
        catch (error) {
            console.error('Error updating application:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    /**
     * Delete application
     */
    async deleteApplication(id) {
        try {
            const client = supabaseClient.getClient();
            // Get application before deletion
            const currentApp = await this.getApplicationById(id);
            if (!currentApp.success || !currentApp.data) {
                return {
                    success: false,
                    error: 'Aplikasi tidak ditemukan'
                };
            }
            // Check if can be deleted
            if (!this.canDeleteApplication(currentApp.data.status)) {
                return {
                    success: false,
                    error: 'Aplikasi tidak dapat dihapus pada status ini'
                };
            }
            // Delete application
            const { error } = await client
                .from('kpr_applications')
                .delete()
                .eq('id', id);
            if (error)
                throw error;
            // Update unit status
            await this.updateUnitStatus(currentApp.data.unit_id, 'AVAILABLE');
            return {
                success: true,
                message: 'Aplikasi berhasil dihapus'
            };
        }
        catch (error) {
            console.error('Error deleting application:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    /**
     * Get applications by status
     */
    async getApplicationsByStatus(status, page = 1, limit = 20) {
        return this.getAllApplications({ status }, page, limit);
    }
    /**
     * Get application statistics
     */
    async getApplicationStatistics() {
        try {
            const client = supabaseClient.getClient();
            // Get total applications by status
            const { data: statusData, error: statusError } = await client
                .from('kpr_applications')
                .select('status')
                .not('status', 'eq', 'CANCELLED');
            if (statusError)
                throw statusError;
            const statusCounts = statusData?.reduce((acc, app) => {
                acc[app.status] = (acc[app.status] || 0) + 1;
                return acc;
            }, {}) || {};
            // Get applications by bank
            const { data: bankData, error: bankError } = await client
                .from('kpr_applications')
                .select('banks!inner(name)')
                .not('bank_id', 'is', null);
            if (bankError)
                throw bankError;
            const bankCounts = bankData?.reduce((acc, app) => {
                const bankName = app.banks.name;
                acc[bankName] = (acc[bankName] || 0) + 1;
                return acc;
            }, {}) || {};
            // Get monthly statistics
            const currentMonth = new Date().toISOString().substring(0, 7);
            const { data: monthlyData, error: monthlyError } = await client
                .from('kpr_applications')
                .select('created_at')
                .like('created_at', `${currentMonth}%`);
            if (monthlyError)
                throw monthlyError;
            const monthlyStats = monthlyData?.reduce((acc, app) => {
                const day = app.created_at.substring(8, 10);
                acc[day] = (acc[day] || 0) + 1;
                return acc;
            }, {}) || {};
            // Calculate approval and rejection rates
            const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
            const approved = statusCounts['APPROVED'] || 0;
            const rejected = statusCounts['REJECTED'] || 0;
            const statistics = {
                total,
                by_status: statusCounts,
                by_bank: bankCounts,
                by_month: monthlyStats,
                average_processing_time: 0, // Would need more complex calculation
                approval_rate: total > 0 ? (approved / total) * 100 : 0,
                rejection_rate: total > 0 ? (rejected / total) * 100 : 0
            };
            return {
                success: true,
                data: statistics
            };
        }
        catch (error) {
            console.error('Error fetching statistics:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    /**
     * Bulk update applications
     */
    async bulkUpdateApplications(ids, updateData) {
        try {
            const client = supabaseClient.getClient();
            const { data, error } = await client
                .from('kpr_applications')
                .update({
                ...updateData,
                updated_at: new Date().toISOString()
            })
                .in('id', ids)
                .select(`
          *,
          customers:customer_id(name, email, phone),
          units:unit_id(unit_type, block, number, price)
        `);
            if (error)
                throw error;
            return {
                success: true,
                data: data || [],
                message: `${ids.length} aplikasi berhasil diperbarui`
            };
        }
        catch (error) {
            console.error('Error bulk updating applications:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    // Private helper methods
    async validateApplicationCreation(request) {
        const errors = [];
        // Validate customer exists
        const customer = await supabaseClient.getClient()
            .from('customers')
            .select('id')
            .eq('id', request.customer_id)
            .single();
        if (customer.error) {
            errors.push('Customer tidak ditemukan');
        }
        // Validate unit exists and is available
        const unit = await supabaseClient.getClient()
            .from('units')
            .select('id, status')
            .eq('id', request.unit_id)
            .single();
        if (unit.error) {
            errors.push('Unit tidak ditemukan');
        }
        else if (unit.data.status !== 'AVAILABLE') {
            errors.push('Unit tidak tersedia');
        }
        // Validate bank if provided
        if (request.bank_id) {
            const bank = await supabaseClient.getClient()
                .from('banks')
                .select('id')
                .eq('id', request.bank_id)
                .single();
            if (bank.error) {
                errors.push('Bank tidak ditemukan');
            }
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    async validateStatusChange(fromStatus, toStatus, application) {
        const errors = [];
        // Define valid status transitions
        const validTransitions = {
            'PENDING': ['DOCUMENT_COLLECTION', 'CANCELLED'],
            'DOCUMENT_COLLECTION': ['BANK_SUBMISSION', 'CANCELLED'],
            'BANK_SUBMISSION': ['BANK_VERIFICATION', 'CANCELLED'],
            'BANK_VERIFICATION': ['BANK_APPROVAL', 'REJECTED', 'CANCELLED'],
            'BANK_APPROVAL': ['APPROVED', 'CANCELLED'],
            'APPROVED': ['COMPLETED', 'CANCELLED'],
            'COMPLETED': ['BAST_COMPLETED'],
            'BAST_COMPLETED': [],
            'REJECTED': [],
            'CANCELLED': []
        };
        const allowedStatuses = validTransitions[fromStatus] || [];
        if (!allowedStatuses.includes(toStatus)) {
            errors.push(`Status change dari ${fromStatus} ke ${toStatus} tidak diizinkan`);
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    async logStatusChange(applicationId, fromStatus, toStatus, notes) {
        try {
            const client = supabaseClient.getClient();
            await client.from('application_status_history').insert({
                application_id: applicationId,
                from_status: fromStatus,
                to_status: toStatus,
                changed_by: 'system', // Would get from auth context
                changed_at: new Date().toISOString(),
                notes
            });
        }
        catch (error) {
            console.error('Error logging status change:', error);
        }
    }
    async sendStatusChangeNotification(application, fromStatus, toStatus) {
        try {
            const notification = notificationService.createFromTemplate('status_change', {
                customer_name: application.customer?.name,
                application_id: application.id,
                unit_block: application.unit?.block,
                unit_number: application.unit?.number,
                new_status: toStatus,
                previous_status: fromStatus
            }, application.customer_id, application.id);
            if (notification) {
                await notificationService.sendNotification(notification);
            }
        }
        catch (error) {
            console.error('Error sending status change notification:', error);
        }
    }
    async updateUnitStatus(unitId, status) {
        try {
            const client = supabaseClient.getClient();
            await client.from('units')
                .update({ status, updated_at: new Date().toISOString() })
                .eq('id', unitId);
        }
        catch (error) {
            console.error('Error updating unit status:', error);
        }
    }
    async handleStatusChangeUnitUpdate(unitId, status) {
        const unitStatusMap = {
            'PENDING': 'RESERVED',
            'DOCUMENT_COLLECTION': 'RESERVED',
            'BANK_SUBMISSION': 'RESERVED',
            'BANK_VERIFICATION': 'RESERVED',
            'BANK_APPROVAL': 'RESERVED',
            'APPROVED': 'SOLD',
            'COMPLETED': 'SOLD',
            'BAST_COMPLETED': 'SOLD',
            'REJECTED': 'AVAILABLE',
            'CANCELLED': 'AVAILABLE'
        };
        const unitStatus = unitStatusMap[status];
        if (unitStatus) {
            await this.updateUnitStatus(unitId, unitStatus);
        }
    }
    canDeleteApplication(status) {
        return ['PENDING', 'DOCUMENT_COLLECTION'].includes(status);
    }
    getSLADaysByStatus(status) {
        const slaDays = {
            'PENDING': 3,
            'DOCUMENT_COLLECTION': 7,
            'BANK_SUBMISSION': 2,
            'BANK_VERIFICATION': 14,
            'BANK_APPROVAL': 3,
            'APPROVED': 30,
            'COMPLETED': 0,
            'BAST_COMPLETED': 0,
            'REJECTED': 0,
            'CANCELLED': 0
        };
        return slaDays[status] || 30;
    }
    getSLAStatus(createdDate, status) {
        const slaDays = this.getSLADaysByStatus(status);
        const slaInfo = DateCalculator.getSLAStatus(createdDate, new Date(), slaDays);
        return slaInfo.status === 'on_track' ? 'on_track' : slaInfo.status;
    }
}
// Export singleton instance
export const applicationController = ApplicationController.getInstance();
//# sourceMappingURL=application-controller.js.map