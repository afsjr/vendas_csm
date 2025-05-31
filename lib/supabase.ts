import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL")
}

if (!supabaseAnonKey) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          status: string
          last_contact: string
          next_contact: string | null
          educational_background: string
          interest_areas: string[]
          preferred_course_types: string[]
          preferred_format: string[]
          notes: string
          total_value: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          status?: string
          last_contact?: string
          next_contact?: string | null
          educational_background: string
          interest_areas?: string[]
          preferred_course_types?: string[]
          preferred_format?: string[]
          notes?: string
          total_value?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          status?: string
          last_contact?: string
          next_contact?: string | null
          educational_background?: string
          interest_areas?: string[]
          preferred_course_types?: string[]
          preferred_format?: string[]
          notes?: string
          total_value?: number
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          name: string
          level: string
          format: string
          duration: string
          price: number
          start_date: string
          enrollment_deadline: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          level: string
          format: string
          duration: string
          price: number
          start_date: string
          enrollment_deadline: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          level?: string
          format?: string
          duration?: string
          price?: number
          start_date?: string
          enrollment_deadline?: string
          description?: string | null
          updated_at?: string
        }
      }
      matriculations: {
        Row: {
          id: string
          student_id: string
          student_name: string
          course_id: string
          course_name: string
          enrollment_date: string
          start_date: string
          end_date: string
          status: string
          payment_status: string
          guarantor_name: string | null
          guarantor_relationship: string | null
          guarantor_phone: string | null
          guarantor_email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          student_name: string
          course_id: string
          course_name: string
          enrollment_date?: string
          start_date: string
          end_date: string
          status?: string
          payment_status?: string
          guarantor_name?: string | null
          guarantor_relationship?: string | null
          guarantor_phone?: string | null
          guarantor_email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          student_name?: string
          course_id?: string
          course_name?: string
          enrollment_date?: string
          start_date?: string
          end_date?: string
          status?: string
          payment_status?: string
          guarantor_name?: string | null
          guarantor_relationship?: string | null
          guarantor_phone?: string | null
          guarantor_email?: string | null
          updated_at?: string
        }
      }
      grades: {
        Row: {
          id: string
          matriculation_id: string
          student_id: string
          student_name: string
          course_id: string
          course_name: string
          subject_name: string
          period: string
          grade: number
          max_grade: number
          status: string
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          matriculation_id: string
          student_id: string
          student_name: string
          course_id: string
          course_name: string
          subject_name: string
          period: string
          grade: number
          max_grade: number
          status?: string
          date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          matriculation_id?: string
          student_id?: string
          student_name?: string
          course_id?: string
          course_name?: string
          subject_name?: string
          period?: string
          grade?: number
          max_grade?: number
          status?: string
          date?: string
          updated_at?: string
        }
      }
    }
  }
}
