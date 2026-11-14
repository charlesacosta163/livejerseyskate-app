import React from 'react'
import { redirect } from 'next/navigation'
import { NewSpotForm } from '@/components/forms/new-spot-form'
import { getCurrentUser } from '@/lib/supabase/user-actions'

const NewSpotSubmissionPage = async () => {
  // Check if user is authenticated
  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    redirect('/auth/login')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tighter text-[#431b07]">
          Submit a New Spot
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          Share a skate spot with the community. All submissions are reviewed before being published.
        </p>
      </div>

      <NewSpotForm />
    </div>
  )
}

export default NewSpotSubmissionPage