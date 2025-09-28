import { createClient } from '@supabase/supabase-js'

// 使用硬编码的凭据，确保密钥完整
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ushkxsxbnuurusvrfqvc.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzaGt4c3hibnV1cnVzdnJmcXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNjMxOTgsImV4cCI6MjA3NDYzOTE5OH0.IrV-QGnrxo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations that need elevated permissions
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzaGt4c3hibnV1cnVzdnJmcXZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTA2MzE5OCwiZXhwIjoyMDc0NjM5MTk4fQ.vgaBY4ri9ZY_Osa_mJeGFm7u0LZYqFJBdRI7kyWVsBQ'

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey
)
