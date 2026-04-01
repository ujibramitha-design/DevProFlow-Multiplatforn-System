/**
 * KPRFlow Enterprise - Shared Components Main Export
 * Fixed TypeScript implementation for cross-platform use
 */
import { ApplicationController } from './controllers/application-controller-fixed';
declare const supabaseClient: {
    getClient: () => {
        from: (table: string) => {
            select: (columns: string) => {
                eq: (column: string, value: any) => {
                    then: (resolve: any) => any;
                };
                in: (column: string, values: any[]) => {
                    then: (resolve: any) => any;
                };
                gte: (column: string, value: any) => {
                    then: (resolve: any) => any;
                };
                lte: (column: string, value: any) => {
                    then: (resolve: any) => any;
                };
                or: (filters: string) => {
                    then: (resolve: any) => any;
                };
                range: (start: number, end: number) => {
                    then: (resolve: any) => any;
                };
            };
        };
    };
};
export { ApplicationController, applicationController } from './controllers/application-controller-fixed';
export type { Application, Customer, Unit, Bank, ApplicationFilters, ApplicationListResponse, ApplicationResponse, ApplicationCreateRequest, ApplicationUpdateRequest, ApplicationStatistics, ApplicationStatus } from './controllers/application-controller-fixed';
export { supabaseClient };
export declare const notificationService: {
    sendNotification(message: string, channels: string[]): Promise<{
        success: boolean;
        messageId: string;
        channels: string[];
    }>;
    sendBulkNotification(messages: string[], channels: string[]): Promise<{
        success: boolean;
        results: {
            success: boolean;
            messageId: string;
            channel: string;
        }[];
    }>;
};
export declare const dateCalculator: {
    calculateDaysSince(date: string): number;
    formatDate(date: string): string;
};
export declare const KPRFlowShared: {
    controllers: {
        application: ApplicationController;
    };
    apiClients: {
        supabase: {
            getClient: () => {
                from: (table: string) => {
                    select: (columns: string) => {
                        eq: (column: string, value: any) => {
                            then: (resolve: any) => any;
                        };
                        in: (column: string, values: any[]) => {
                            then: (resolve: any) => any;
                        };
                        gte: (column: string, value: any) => {
                            then: (resolve: any) => any;
                        };
                        lte: (column: string, value: any) => {
                            then: (resolve: any) => any;
                        };
                        or: (filters: string) => {
                            then: (resolve: any) => any;
                        };
                        range: (start: number, end: number) => {
                            then: (resolve: any) => any;
                        };
                    };
                };
            };
        };
    };
    services: {
        notification: {
            sendNotification(message: string, channels: string[]): Promise<{
                success: boolean;
                messageId: string;
                channels: string[];
            }>;
            sendBulkNotification(messages: string[], channels: string[]): Promise<{
                success: boolean;
                results: {
                    success: boolean;
                    messageId: string;
                    channel: string;
                }[];
            }>;
        };
    };
    utils: {
        date: {
            calculateDaysSince(date: string): number;
            formatDate(date: string): string;
        };
    };
};
export default KPRFlowShared;
//# sourceMappingURL=index.d.ts.map