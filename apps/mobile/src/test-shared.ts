// Test file for shared logic imports in mobile app
import { Avatar, AvatarImage, AvatarFallback } from '@devproflow/ui'
import { supabase } from '@devproflow/database'

// Example usage of shared components and database
export class MobileAppService {
  constructor() {
    // Test database connection
    this.testDatabaseConnection()
  }

  async testDatabaseConnection() {
    try {
      const { data, error } = await supabase.from('test').select('*').limit(1)
      if (error) throw error
      console.log('Mobile: Database connected successfully')
      return data
    } catch (error) {
      console.error('Mobile: Database connection error:', error)
      return null
    }
  }

  // Example method using shared UI components
  createAvatarComponent() {
    return {
      Avatar,
      AvatarImage,
      AvatarFallback
    }
  }
}

export default MobileAppService
