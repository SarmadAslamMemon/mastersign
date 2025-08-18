import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types
export type Database = {
  public: {
    Tables: {
      quote_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          service_type: string
          timeline: string | null
          budget: string | null
          description: string | null
          files: string[] | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          service_type: string
          timeline?: string | null
          budget?: string | null
          description?: string | null
          files?: string[] | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          service_type?: string
          timeline?: string | null
          budget?: string | null
          description?: string | null
          files?: string[] | null
          status?: string
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          company: string
          rating: string
          content: string
          avatar: string | null
          featured: string
        }
        Insert: {
          id?: string
          name: string
          company: string
          rating: string
          content: string
          avatar?: string | null
          featured?: string
        }
        Update: {
          id?: string
          name?: string
          company?: string
          rating?: string
          content?: string
          avatar?: string | null
          featured?: string
        }
      }
    }
  }
}
