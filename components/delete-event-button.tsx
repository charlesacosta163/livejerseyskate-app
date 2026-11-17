'use client'

import { Button } from '@/components/ui/button'
import { deleteEvent } from '@/lib/actions'
import { LuTrash2 } from 'react-icons/lu'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DeleteEventButtonProps {
  eventId: number
  eventName: string
}

export default function DeleteEventButton({ eventId, eventName }: DeleteEventButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${eventName}"? This action cannot be undone.`)) {
      return
    }

    setIsDeleting(true)
    
    try {
      await deleteEvent(eventId)
      router.refresh()
    } catch (error) {
      alert('Failed to delete event. Please try again.')
      console.error('Delete error:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      size='sm'
      variant='destructive'
      className='text-xs'
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <LuTrash2 size={14} className='mr-1' />
      {isDeleting ? 'Deleting...' : 'Delete'}
    </Button>
  )
}
