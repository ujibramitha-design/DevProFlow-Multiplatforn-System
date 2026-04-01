/**
 * KPRFlow Enterprise - Date Calculator Utility
 * Adapted from bramsray1 Google Apps Script for cross-platform use
 */
export interface DateRange {
    start: Date;
    end: Date;
}
export interface AgingInfo {
    days: number;
    weeks: number;
    months: number;
    years: number;
    businessDays: number;
    isOverdue: boolean;
    status: 'fresh' | 'normal' | 'aging' | 'critical' | 'overdue';
}
export interface WorkingDaysConfig {
    startHour: number;
    endHour: number;
    workingDays: number[];
    holidays: Date[];
}
export declare class DateCalculator {
    private static readonly INDONESIAN_TIMEZONE;
    private static readonly WORKING_DAYS_CONFIG;
    /**
     * Calculate aging between two dates
     */
    static calculateAging(startDate: Date | string, endDate?: Date | string): AgingInfo;
    /**
     * Calculate business days between two dates
     */
    static calculateBusinessDays(startDate: Date, endDate: Date, config?: Partial<WorkingDaysConfig>): number;
    /**
     * Add working days to a date
     */
    static addWorkingDays(startDate: Date, days: number, config?: Partial<WorkingDaysConfig>): Date;
    /**
     * Get due date based on aging
     */
    static getDueDate(startDate: Date | string, agingDays: number): Date;
    /**
     * Check if date is within range
     */
    static isDateInRange(date: Date, range: DateRange): boolean;
    /**
     * Get date ranges for different periods
     */
    static getDateRanges(baseDate?: Date): {
        today: DateRange;
        week: DateRange;
        month: DateRange;
        quarter: DateRange;
        year: DateRange;
    };
    /**
     * Format date in Indonesian format
     */
    static formatIndonesian(date: Date | string, includeTime?: boolean): string;
    /**
     * Parse Indonesian date string
     */
    static parseIndonesian(dateString: string): Date | null;
    /**
     * Check if two dates are the same day
     */
    static isSameDay(date1: Date, date2: Date): boolean;
    /**
     * Get relative time string (e.g., "2 days ago")
     */
    static getRelativeTime(date: Date | string): string;
    /**
     * Get Indonesian public holidays for a year
     */
    static getIndonesianHolidays(year: number): Date[];
    /**
     * Check if date is a working day
     */
    static isWorkingDay(date: Date, config?: Partial<WorkingDaysConfig>): boolean;
    /**
     * Get next working day
     */
    static getNextWorkingDay(date: Date, config?: Partial<WorkingDaysConfig>): Date;
    /**
     * Get previous working day
     */
    static getPreviousWorkingDay(date: Date, config?: Partial<WorkingDaysConfig>): Date;
    /**
     * Calculate SLA deadline
     */
    static calculateSLADeadline(startDate: Date | string, slaDays: number, config?: Partial<WorkingDaysConfig>): Date;
    /**
     * Check if SLA is met
     */
    static isSLAMet(startDate: Date | string, endDate: Date | string, slaDays: number, config?: Partial<WorkingDaysConfig>): boolean;
    /**
     * Get SLA status
     */
    static getSLAStatus(startDate: Date | string, endDate: (Date | string) | undefined, slaDays: number, config?: Partial<WorkingDaysConfig>): {
        status: 'on_track' | 'warning' | 'overdue' | 'completed';
        daysUsed: number;
        daysRemaining: number;
        percentageUsed: number;
    };
}
export declare const calculateAging: typeof DateCalculator.calculateAging;
export declare const formatIndonesianDate: typeof DateCalculator.formatIndonesian;
export declare const getRelativeTime: typeof DateCalculator.getRelativeTime;
export declare const isSLAMet: typeof DateCalculator.isSLAMet;
//# sourceMappingURL=date-calculator.d.ts.map