export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          tenant_id: string
          name: string
          email: string
          company: string | null
          phone: string | null
          status: string
          value: number
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          notes: string | null
          last_contact: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          name: string
          email: string
          company?: string | null
          phone?: string | null
          status?: string
          value?: number
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          notes?: string | null
          last_contact?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          name?: string
          email?: string
          company?: string | null
          phone?: string | null
          status?: string
          value?: number
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          notes?: string | null
          last_contact?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      deals: {
        Row: {
          id: string
          tenant_id: string
          name: string
          contact_id: string
          stage: string
          value: number
          probability: number
          expected_close_date: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          name: string
          contact_id: string
          stage: string
          value: number
          probability: number
          expected_close_date: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          name?: string
          contact_id?: string
          stage?: string
          value?: number
          probability?: number
          expected_close_date?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

