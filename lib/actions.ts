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

export async function submitNewEvent(formData: FormData) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  // Extract form data
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const location = formData.get('location') as string
  const date = formData.get('date') as string
  const type = formData.get('type') as string

  // Insert into database
  const { data, error } = await supabase
    .from('events')
    .insert([
      {
        name,
        description,
        location,
        date,
        type,
        created_by: user.id,
        shop_id: null
      }
    ])
    .select()

  if (error) {
    console.error('Error submitting event:', error)
    throw new Error('Failed to submit event: ' + error.message)
  }

  // Revalidate the events page
  revalidatePath('/events')
  
  // Redirect to events page
  redirect('/events')
}

export async function getAllEvents() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'approved')
    .order('date', { ascending: true })

  if (error) {
    console.error('Error fetching events:', error)
    return []
  }

  return data || []
}

export async function getEventById(id: number) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching event:', error)
    return null
  }

  return data
}

// Get user's event submissions
export async function getUserEventSubmissions() {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('created_by', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching user events:', error)
    return []
  }

  return data || []
}

// Update event
export async function updateEvent(id: number, formData: FormData) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Verify ownership
  const { data: event } = await supabase
    .from('events')
    .select('created_by')
    .eq('id', id)
    .single()

  if (!event || event.created_by !== user.id) {
    throw new Error('Unauthorized: You can only edit your own events')
  }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const location = formData.get('location') as string
  const date = formData.get('date') as string
  const type = formData.get('type') as string

  const { error } = await supabase
    .from('events')
    .update({
      name,
      description,
      location,
      date,
      type,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating event:', error)
    throw new Error('Failed to update event')
  }

  revalidatePath('/events')
  revalidatePath(`/events/${id}`)
  revalidatePath('/account/submissions')
  redirect('/account/submissions')
}

// Delete event
export async function deleteEvent(id: number) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized: Must be logged in')
  }

  // Verify ownership
  const { data: event } = await supabase
    .from('events')
    .select('created_by')
    .eq('id', id)
    .single()

  if (!event || event.created_by !== user.id) {
    throw new Error('Unauthorized: You can only delete your own events')
  }

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting event:', error)
    throw new Error('Failed to delete event')
  }

  revalidatePath('/events')
  revalidatePath('/account/submissions')
}

// Get pending events for admin
export async function getPendingEvents() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching pending events:', error)
    return []
  }

  return data || []
}

// Get all events for admin
export async function getAllEventsForAdmin() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all events:', error)
    return []
  }

  return data || []
}

// Approve event
export async function approveEvent(id: number) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized: Must be logged in')
  }

  // Update status to approved
  const { error } = await supabase
    .from('events')
    .update({ status: 'approved' })
    .eq('id', id)

  if (error) {
    console.error('Error approving event:', error)
    throw new Error('Failed to approve event')
  }

  revalidatePath('/dashboard/events')
  revalidatePath('/events')
}

// Reject event
export async function rejectEvent(id: number) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized: Must be logged in')
  }

  // Update status to rejected
  const { error } = await supabase
    .from('events')
    .update({ status: 'rejected' })
    .eq('id', id)

  if (error) {
    console.error('Error rejecting event:', error)
    throw new Error('Failed to reject event')
  }

  revalidatePath('/dashboard/events')
  revalidatePath('/events')
}