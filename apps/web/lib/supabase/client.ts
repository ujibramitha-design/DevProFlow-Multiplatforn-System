/**
 * Supabase Client Configuration
 * For DevProFlow Enterprise - KPR Management System
 */

import { createClient } from '@supabase/supabase-js'

// Supabase configuration from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  )
}

/**
 * Supabase client instance
 * Used for all database operations
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-application-name': 'DevProFlow-Enterprise'
    }
  }
})

/**
 * Database Tables
 */
export const TABLES = {
  NASABAH: 'nasabah',
  PROPERTI: 'properti',
  UNIT: 'unit',
  APLIKASI_KPR: 'aplikasi_kpr',
  DOKUMEN: 'dokumen',
  BANK: 'bank',
  NOTARIS: 'notaris',
  TIMELINE: 'timeline',
  USERS: 'users',
  AUDIT_LOG: 'audit_log'
} as const

/**
 * Helper function to handle Supabase errors
 */
export function handleSupabaseError(error: any): never {
  console.error('Supabase Error:', error)
  throw new Error(error.message || 'Database operation failed')
}

/**
 * Type-safe query builder
 */
export type SupabaseTable = keyof typeof TABLES

export async function queryTable<T = any>(
  table: SupabaseTable,
  options?: {
    select?: string
    filter?: Record<string, any>
    orderBy?: { column: string; ascending?: boolean }
    limit?: number
  }
) {
  let query = supabase.from(TABLES[table]).select(options?.select || '*')

  if (options?.filter) {
    Object.entries(options.filter).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
  }

  if (options?.orderBy) {
    query = query.order(options.orderBy.column, {
      ascending: options.orderBy.ascending ?? true
    })
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    handleSupabaseError(error)
  }

  return data as T[]
}

/**
 * Insert data into table
 */
export async function insertIntoTable<T = any>(
  table: SupabaseTable,
  data: any | any[]
) {
  const { data: result, error } = await supabase
    .from(TABLES[table])
    .insert(data)
    .select()

  if (error) {
    handleSupabaseError(error)
  }

  return result as T[]
}

/**
 * Update data in table
 */
export async function updateTable<T = any>(
  table: SupabaseTable,
  id: string,
  data: any
) {
  const { data: result, error } = await supabase
    .from(TABLES[table])
    .update(data)
    .eq('id', id)
    .select()

  if (error) {
    handleSupabaseError(error)
  }

  return result as T[]
}

/**
 * Delete from table
 */
export async function deleteFromTable(table: SupabaseTable, id: string) {
  const { error } = await supabase.from(TABLES[table]).delete().eq('id', id)

  if (error) {
    handleSupabaseError(error)
  }

  return true
}

/**
 * Real-time subscription helper
 */
export function subscribeToTable(
  table: SupabaseTable,
  callback: (payload: any) => void,
  filter?: { column: string; value: any }
) {
  let channel = supabase
    .channel(`${table}_changes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: TABLES[table],
        ...(filter && { filter: `${filter.column}=eq.${filter.value}` })
      },
      callback
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

/**
 * Check Supabase connection
 */
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from(TABLES.NASABAH).select('count').limit(1)
    return !error
  } catch {
    return false
  }
}
