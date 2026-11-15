'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { SkateSpot } from '@/lib/types'

export async function submitNewSkateSpot(formData: FormData) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  // Extract form data
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const imageUrl = formData.get('image-url') as string
  const location = formData.get('location') as string
  const spotType = formData.get('spot-type') as string
  const bustLevel = parseInt(formData.get('bust-level') as string)
  const googleMapsUrl = formData.get('google-maps-url') as string

  // Insert into database
  const { data, error } = await supabase
    .from('skate_spots')
    .insert([
      {
        title,
        description,
        image_url: imageUrl || null,
        location,
        spot_type: spotType,
        bust_level: bustLevel,
        google_maps_url: googleMapsUrl,
        status: 'pending',
        user_id: user.id
      }
    ])
    .select()

  if (error) {
    console.error('Error submitting spot:', error)
    throw new Error('Failed to submit spot: ' + error.message)
  }

  // Revalidate the spots page to show new submission
  revalidatePath('/spots')
  
  // Redirect to spots page or the new spot detail
  redirect('/spots')
}

export async function updateUserProfile(formData: FormData) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  // Extract form data
  const username = formData.get('username') as string
  const bio = formData.get('bio') as string

  // Update profile
  const { error } = await supabase
    .from('user_profiles')
    .update({
      username: username.trim(),
      bio: bio.trim() || null
    })
    .eq('user_id', user.id)

  if (error) {
    console.error('Error updating profile:', error)
    return { error: error.message }
  }

  // Revalidate the account page
  revalidatePath('/account')
  
  return { success: true }
}

export async function getAllSkateSpots(): Promise<SkateSpot[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('skate_spots')
    .select(`
      *,
      user_profiles (
        username
      )
    `)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching spots:', error)
    return []
  }

  return data as SkateSpot[] || []
}

export async function getPendingSkateSpots(): Promise<SkateSpot[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('skate_spots')
    .select(`
      *,
      user_profiles (
        username
      )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching pending spots:', error)
    return []
  }

  return data as SkateSpot[] || []
}

export async function getAllSpotsForAdmin(): Promise<SkateSpot[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('skate_spots')
    .select(`
      *,
      user_profiles (
        username
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all spots:', error)
    return []
  }

  return data as SkateSpot[] || []
}

export async function getSkateSpotById(id: number): Promise<SkateSpot | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('skate_spots')
    .select(`
      *,
      user_profiles (
        username
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching spot:', error)
    return null
  }

  return data as SkateSpot
}

export async function getUserSubmissions(): Promise<SkateSpot[]> {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from('skate_spots')
    .select(`
      *,
      user_profiles (
        username
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching user submissions:', error)
    return []
  }

  return data as SkateSpot[] || []
}

export async function updateSkateSpot(id: number, formData: FormData) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  // Verify ownership
  const { data: spot } = await supabase
    .from('skate_spots')
    .select('user_id')
    .eq('id', id)
    .single()

  if (!spot || spot.user_id !== user.id) {
    throw new Error('Unauthorized: You can only edit your own spots')
  }

  // Extract form data
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const imageUrl = formData.get('image-url') as string
  const location = formData.get('location') as string
  const spotType = formData.get('spot-type') as string
  const bustLevel = parseInt(formData.get('bust-level') as string)
  const googleMapsUrl = formData.get('google-maps-url') as string

  // Update database
  const { error } = await supabase
    .from('skate_spots')
    .update({
      title,
      description,
      image_url: imageUrl || null,
      location,
      spot_type: spotType,
      bust_level: bustLevel,
      google_maps_url: googleMapsUrl,
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating spot:', error)
    throw new Error('Failed to update spot: ' + error.message)
  }

  // Revalidate pages
  revalidatePath('/spots')
  revalidatePath(`/spots/${id}`)
  revalidatePath('/account/submissions')
  
  // Redirect to submissions page
  redirect('/account/submissions')
}

export async function deleteSkateSpot(id: number) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized: Must be logged in')
  }

  // Verify ownership
  const { data: spot } = await supabase
    .from('skate_spots')
    .select('user_id')
    .eq('id', id)
    .single()

  if (!spot || spot.user_id !== user.id) {
    throw new Error('Unauthorized: You can only delete your own spots')
  }

  // Delete from database
  const { error } = await supabase
    .from('skate_spots')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting spot:', error)
    throw new Error('Failed to delete spot: ' + error.message)
  }

  // Revalidate pages
  revalidatePath('/spots')
  revalidatePath('/account/submissions')
  
  return { success: true }
}

export async function approveSkateSpot(id: number) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized: Must be logged in')
  }

  // Update status to approved
  const { error } = await supabase
    .from('skate_spots')
    .update({ status: 'approved' })
    .eq('id', id)

  if (error) {
    console.error('Error approving spot:', error)
    throw new Error('Failed to approve spot: ' + error.message)
  }

  // Revalidate pages
  revalidatePath('/spots')
  revalidatePath('/dashboard/spots')
  
  return { success: true }
}

export async function rejectSkateSpot(id: number) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized: Must be logged in')
  }

  // Update status to rejected
  const { error } = await supabase
    .from('skate_spots')
    .update({ status: 'rejected' })
    .eq('id', id)

  if (error) {
    console.error('Error rejecting spot:', error)
    throw new Error('Failed to reject spot: ' + error.message)
  }

  // Revalidate pages
  revalidatePath('/spots')
  revalidatePath('/dashboard/spots')
  
  return { success: true }
}