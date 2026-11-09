import { createClient } from '@/lib/supabase/server'

export async function isLoggedIn(): Promise<boolean> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    return false
  }
  return data.user !== null
}