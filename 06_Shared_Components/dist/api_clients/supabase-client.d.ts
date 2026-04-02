/**
 * KPRFlow Enterprise - Shared Supabase Client
 * Adapted from bramsray2 backend for cross-platform use
 */
import type { SupabaseClient } from '@supabase/supabase-js';
export interface SupabaseConfig {
    url: string;
    anonKey: string;
    serviceKey?: string;
}
export declare class SupabaseClientManager {
    private static instance;
    private client;
    private config;
    private constructor();
    static getInstance(): SupabaseClientManager;
    /**
     * Initialize Supabase client with configuration
     */
    initialize(config: SupabaseConfig): void;
    /**
     * Get Supabase client instance
     */
    getClient(): SupabaseClient;
    /**
     * Get admin client with service role key
     */
    getAdminClient(): SupabaseClient;
    /**
     * Test connection
     */
    testConnection(): Promise<boolean>;
    /**
     * Get current user
     */
    getCurrentUser(): Promise<{
        user: import("@supabase/supabase-js").AuthUser | null;
        error: import("@supabase/supabase-js").AuthError | null;
    } | {
        user: null;
        error: unknown;
    }>;
    /**
     * Sign in with email and password
     */
    signInWithEmail(email: string, password: string): Promise<{
        data: {
            user: import("@supabase/supabase-js").AuthUser;
            session: import("@supabase/supabase-js").AuthSession;
            weakPassword?: import("@supabase/supabase-js").WeakPassword;
        } | {
            user: null;
            session: null;
            weakPassword?: null | undefined;
        };
        error: import("@supabase/supabase-js").AuthError | null;
    } | {
        data: null;
        error: unknown;
    }>;
    /**
     * Sign out
     */
    signOut(): Promise<{
        error: unknown;
    }>;
    /**
     * Generic select operation
     */
    select<T = any>(table: string, columns?: string, filters?: Record<string, any>, orderBy?: {
        column: string;
        ascending?: boolean;
    }): Promise<{
        data: T[];
        error: import("@supabase/postgrest-js").PostgrestError | null;
    } | {
        data: null;
        error: unknown;
    }>;
    /**
     * Generic insert operation
     */
    insert<T = any>(table: string, data: Partial<T> | Partial<T>[]): Promise<{
        data: T[];
        error: import("@supabase/postgrest-js").PostgrestError | null;
    } | {
        data: null;
        error: unknown;
    }>;
    /**
     * Generic update operation
     */
    update<T = any>(table: string, data: Partial<T>, filters: Record<string, any>): Promise<{
        data: T[];
        error: import("@supabase/postgrest-js").PostgrestError | null;
    } | {
        data: null;
        error: unknown;
    }>;
    /**
     * Generic delete operation
     */
    delete(table: string, filters: Record<string, any>): Promise<{
        data: any[] | null;
        error: import("@supabase/postgrest-js").PostgrestError | null;
    } | {
        data: null;
        error: unknown;
    }>;
}
export declare const supabaseClient: SupabaseClientManager;
//# sourceMappingURL=supabase-client.d.ts.map