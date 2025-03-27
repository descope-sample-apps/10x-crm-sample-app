import { createClient, SupabaseClient } from '@supabase/supabase-js'

interface UserProfile {
  id: string
  name: string
  email: string
}

interface Contact {
  id: string
  name: string
  email: string
  tenant_id: string
}

interface CreateContactRequest {
  name: string
  email: string
  tenant_id: string
}

class ApiClient {
  private client: SupabaseClient

  constructor() {
    this.client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  // User Profile endpoints
  async getUserProfile(): Promise<UserProfile | null> {
    const { data, error } = await this.client.auth.getUser()
    if (error) throw error
    return data.user && data.user.email ? {
      id: data.user.id,
      name: data.user.user_metadata.name,
      email: data.user.email
    } : null
  }

  // Contacts endpoints
  async getContacts(): Promise<Contact[]> {
    const { data, error } = await this.client
      .from('contacts')
      .select('*')
    if (error) throw error
    return data
  }

  async getContact(id: string): Promise<Contact | null> {
    const { data, error } = await this.client
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  }

  async createContact(contact: CreateContactRequest): Promise<Contact> {
    const { data, error } = await this.client
      .from('contacts')
      .insert(contact)
      .select()
      .single()
    if (error) throw error
    return data
  }

  async updateContact(id: string, contact: Partial<Contact>): Promise<Contact> {
    const { data, error } = await this.client
      .from('contacts')
      .update(contact)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  async deleteContact(id: string): Promise<void> {
    const { error } = await this.client
      .from('contacts')
      .delete()
      .eq('id', id)
    if (error) throw error
  }

  // Auth methods
  setSession(accessToken: string) {
    this.client.auth.setSession({ access_token: accessToken, refresh_token: '' })
  }
}

const apiClient = new ApiClient()

export { apiClient }
export type { UserProfile, Contact, CreateContactRequest }

export const analyticsApi = {
  getDashboardData: async () => {
    const response = await fetch('/api/analytics/dashboard')
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data')
    }
    return response.json()
  }
} 