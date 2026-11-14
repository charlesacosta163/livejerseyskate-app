'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { updateUserProfile } from '@/lib/actions'
import { LuLoader, LuX } from 'react-icons/lu'

interface EditProfileFormProps {
  currentUsername: string
  currentBio: string | null
}

export function EditProfileForm({ currentUsername, currentBio }: EditProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    
    try {
      const result = await updateUserProfile(formData)
      
      if (result?.success) {
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isEditing) {
    return (
      <Button variant='outline' onClick={() => setIsEditing(true)}>
        Edit Profile
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={() => setIsEditing(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={isSubmitting}
        >
          <LuX size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>
        <p className="text-sm text-gray-600 mb-6">
          Update your display name and bio. Click save when you're done.
        </p>
        
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium">
              Display Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={currentUsername}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Enter your display name"
              required
              minLength={2}
              maxLength={50}
            />
            <span className="text-xs text-gray-500">
              This is how others will see your name
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              defaultValue={currentBio || ''}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm min-h-[100px]"
              placeholder="Tell us a bit about yourself..."
              maxLength={500}
            />
            <span className="text-xs text-gray-500">
              Brief description for your profile (max 500 characters)
            </span>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#9A4312] hover:bg-[#7a3410]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
