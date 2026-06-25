import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create a real client if both env vars are present and look valid
function createSupabaseClient(): SupabaseClient | null {
  if (
    !supabaseUrl ||
    !supabaseKey ||
    supabaseUrl.includes('placeholder') ||
    supabaseKey.includes('placeholder') ||
    supabaseUrl === 'your_supabase_url_here'
  ) {
    return null
  }
  try {
    return createClient(supabaseUrl, supabaseKey)
  } catch {
    return null
  }
}

export const supabase = createSupabaseClient()

export type Message = {
  id: string
  name: string | null
  phone: string | null
  email: string | null
  country: string
  city: string
  district: string
  one_word: string
  message: string
  latitude: number | null
  longitude: number | null
  approval_status: 'pending' | 'approved' | 'hidden'
  created_at: string
  referral_code: string | null
}
