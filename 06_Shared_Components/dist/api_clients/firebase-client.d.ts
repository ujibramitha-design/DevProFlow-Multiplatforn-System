/**
 * KPRFlow Enterprise - Shared Firebase Client
 * Adapted from bramsray2 for cross-platform use
 */
import { FirebaseApp } from 'firebase/app';
import { Auth, User } from 'firebase/auth';
import { Database } from 'firebase/database';
export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
}
export interface FirebaseResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}
export declare class FirebaseClientManager {
    private static instance;
    private app;
    private auth;
    private database;
    private config;
    private constructor();
    static getInstance(): FirebaseClientManager;
    /**
     * Initialize Firebase with configuration
     */
    initialize(config: FirebaseConfig): void;
    /**
     * Get Firebase app instance
     */
    getApp(): FirebaseApp;
    /**
     * Get Auth instance
     */
    getAuth(): Auth;
    /**
     * Get Database instance
     */
    getDatabase(): Database;
    /**
     * Sign in with email and password
     */
    signInWithEmail(email: string, password: string): Promise<FirebaseResponse<User>>;
    /**
     * Sign out current user
     */
    signOut(): Promise<FirebaseResponse>;
    /**
     * Get current user
     */
    getCurrentUser(): User | null;
    /**
     * Read data from database
     */
    readData<T = any>(path: string): Promise<FirebaseResponse<T>>;
    /**
     * Write data to database
     */
    writeData<T = any>(path: string, data: T): Promise<FirebaseResponse>;
    /**
     * Update data in database
     */
    updateData<T = any>(path: string, data: Partial<T>): Promise<FirebaseResponse>;
    /**
     * Delete data from database
     */
    deleteData(path: string): Promise<FirebaseResponse>;
    /**
     * Push new data to database (generates unique key)
     */
    pushData<T = any>(path: string, data: T): Promise<FirebaseResponse<string>>;
    /**
     * Listen to real-time data changes
     */
    onDataChanged<T = any>(path: string, callback: (data: T | null) => void): () => void;
    /**
     * Test Firebase connection
     */
    testConnection(): Promise<boolean>;
    /**
     * Get user profile data
     */
    getUserProfile(userId: string): Promise<FirebaseResponse<any>>;
    /**
     * Update user profile data
     */
    updateUserProfile(userId: string, data: any): Promise<FirebaseResponse>;
    /**
     * Log user activity
     */
    logActivity(userId: string, activity: string, data?: any): Promise<FirebaseResponse<string>>;
    /**
     * Get user activities
     */
    getUserActivities(userId: string, limit?: number): Promise<FirebaseResponse<any[]>>;
}
export declare const firebaseClient: FirebaseClientManager;
//# sourceMappingURL=firebase-client.d.ts.map