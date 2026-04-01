/**
 * KPRFlow Enterprise - Shared Firebase Client
 * Adapted from bramsray2 for cross-platform use
 */
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, get, set, update, remove, push, onValue } from 'firebase/database';
export class FirebaseClientManager {
    constructor() {
        this.app = null;
        this.auth = null;
        this.database = null;
        this.config = null;
    }
    static getInstance() {
        if (!FirebaseClientManager.instance) {
            FirebaseClientManager.instance = new FirebaseClientManager();
        }
        return FirebaseClientManager.instance;
    }
    /**
     * Initialize Firebase with configuration
     */
    initialize(config) {
        this.config = config;
        this.app = initializeApp(config);
        this.auth = getAuth(this.app);
        this.database = getDatabase(this.app);
    }
    /**
     * Get Firebase app instance
     */
    getApp() {
        if (!this.app) {
            throw new Error('Firebase app not initialized. Call initialize() first.');
        }
        return this.app;
    }
    /**
     * Get Auth instance
     */
    getAuth() {
        if (!this.auth) {
            throw new Error('Firebase auth not initialized.');
        }
        return this.auth;
    }
    /**
     * Get Database instance
     */
    getDatabase() {
        if (!this.database) {
            throw new Error('Firebase database not initialized.');
        }
        return this.database;
    }
    /**
     * Sign in with email and password
     */
    async signInWithEmail(email, password) {
        try {
            if (!this.auth) {
                return { success: false, error: 'Firebase auth not initialized' };
            }
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            return { success: true, data: userCredential.user };
        }
        catch (error) {
            console.error('Error signing in with Firebase:', error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Sign out current user
     */
    async signOut() {
        try {
            if (!this.auth) {
                return { success: false, error: 'Firebase auth not initialized' };
            }
            await signOut(this.auth);
            return { success: true };
        }
        catch (error) {
            console.error('Error signing out from Firebase:', error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Get current user
     */
    getCurrentUser() {
        return this.auth?.currentUser || null;
    }
    /**
     * Read data from database
     */
    async readData(path) {
        try {
            if (!this.database) {
                return { success: false, error: 'Firebase database not initialized' };
            }
            const dbRef = ref(this.database, path);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                return { success: true, data: snapshot.val() };
            }
            else {
                return { success: false, error: 'Data not found' };
            }
        }
        catch (error) {
            console.error(`Error reading data from ${path}:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Write data to database
     */
    async writeData(path, data) {
        try {
            if (!this.database) {
                return { success: false, error: 'Firebase database not initialized' };
            }
            const dbRef = ref(this.database, path);
            await set(dbRef, data);
            return { success: true };
        }
        catch (error) {
            console.error(`Error writing data to ${path}:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Update data in database
     */
    async updateData(path, data) {
        try {
            if (!this.database) {
                return { success: false, error: 'Firebase database not initialized' };
            }
            const dbRef = ref(this.database, path);
            await update(dbRef, data);
            return { success: true };
        }
        catch (error) {
            console.error(`Error updating data at ${path}:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Delete data from database
     */
    async deleteData(path) {
        try {
            if (!this.database) {
                return { success: false, error: 'Firebase database not initialized' };
            }
            const dbRef = ref(this.database, path);
            await remove(dbRef);
            return { success: true };
        }
        catch (error) {
            console.error(`Error deleting data at ${path}:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Push new data to database (generates unique key)
     */
    async pushData(path, data) {
        try {
            if (!this.database) {
                return { success: false, error: 'Firebase database not initialized' };
            }
            const dbRef = ref(this.database, path);
            const newRef = push(dbRef, data);
            return { success: true, data: newRef.key || '' };
        }
        catch (error) {
            console.error(`Error pushing data to ${path}:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Listen to real-time data changes
     */
    onDataChanged(path, callback) {
        if (!this.database) {
            console.error('Firebase database not initialized');
            return () => { };
        }
        const dbRef = ref(this.database, path);
        const unsubscribe = onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                callback(snapshot.val());
            }
            else {
                callback(null);
            }
        });
        return unsubscribe;
    }
    /**
     * Test Firebase connection
     */
    async testConnection() {
        try {
            if (!this.database) {
                return false;
            }
            const testRef = ref(this.database, '_connection_test');
            await set(testRef, { timestamp: Date.now() });
            await remove(testRef);
            return true;
        }
        catch (error) {
            console.error('Firebase connection test failed:', error);
            return false;
        }
    }
    /**
     * Get user profile data
     */
    async getUserProfile(userId) {
        return this.readData(`users/${userId}`);
    }
    /**
     * Update user profile data
     */
    async updateUserProfile(userId, data) {
        return this.updateData(`users/${userId}`, data);
    }
    /**
     * Log user activity
     */
    async logActivity(userId, activity, data) {
        const logData = {
            userId,
            activity,
            data,
            timestamp: Date.now(),
            date: new Date().toISOString()
        };
        return this.pushData(`activity_logs/${userId}`, logData);
    }
    /**
     * Get user activities
     */
    async getUserActivities(userId, limit = 50) {
        try {
            const response = await this.readData(`activity_logs/${userId}`);
            if (response.success && response.data) {
                const activities = Object.entries(response.data)
                    .map(([key, value]) => ({ id: key, ...value }))
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .slice(0, limit);
                return { success: true, data: activities };
            }
            return { success: false, error: 'No activities found' };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
}
// Export singleton instance
export const firebaseClient = FirebaseClientManager.getInstance();
//# sourceMappingURL=firebase-client.js.map