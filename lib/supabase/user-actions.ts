import { createClient } from '@/lib/supabase/server'

export async function isLoggedIn(): Promise<boolean> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    return false
  }
  return data.user !== null
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    return null
  }
  return data.user
}

/**
 * Gets or creates a user profile
 * If profile doesn't exist, creates one with default values
 */
export async function getOrCreateUserProfile() {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return null
  }

  // Check if profile exists
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // If profile exists, return it
  if (profile && !profileError) {
    return profile
  }

  // If profile doesn't exist, create it
  const { data: newProfile, error: insertError } = await supabase
    .from('user_profiles')
    .insert([
      {
        user_id: user.id,
        email: user.email,
        username: user.email?.split('@')[0] || 'user',
        role: 'user',
        bio: null
      }
    ])
    .select()
    .single()

  if (insertError) {
    console.error('Error creating user profile:', insertError)
    return null
  }

  return newProfile
}