import React from 'react'
import { redirect } from 'next/navigation'
import { NewEventForm } from '@/components/forms/new-event-form'
import { getCurrentUser } from '@/lib/supabase/user-actions'
import Link from 'next/link'
import { LuArrowLeft } from 'react-icons/lu'

const NewEventPage = async () => {
  // Check if user is authenticated
  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    redirect('/auth/login')
  }

  return (
    <div className="max-w-3xl mx-auto">
      
      {/* Back Button */}
      <Link 
        href="/events" 
        className="text-[#9A4312] hover:underline text-sm font-medium inline-flex items-center gap-2 mb-6"
      >
        <LuArrowLeft size={16} />
        Back to Events
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tighter text-[#431b07]">
          Create New Event
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          Share your event with the community. All submissions will be visible to everyone.
        </p>
      </div>

      <NewEventForm />
    </div>
  )
}

export default NewEventPage
