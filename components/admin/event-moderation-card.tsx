'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LuCheck, LuX, LuMapPin, LuCalendar, LuExternalLink, LuTriangleAlert } from 'react-icons/lu'
import { approveEvent, rejectEvent } from '@/lib/actions'
import { eventTypes } from '@/lib/events-data'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Event {
  id: number
  name: string
  description: string
  location: string
  date: string
  type: string
  status: string
  created_at: string
  created_by: string
}

interface EventModerationCardProps {
  event: Event
}

export default function EventModerationCard({ event }: EventModerationCardProps) {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const router = useRouter()

  const typeConfig = eventTypes[event.type as keyof typeof eventTypes]
  const eventDate = new Date(event.date)

  const handleApprove = async () => {
    setIsApproving(true)
    try {
      await approveEvent(event.id)
      setShowApproveDialog(false)
      router.refresh()
    } catch (error) {
      alert('Failed to approve event')
      console.error(error)
    } finally {
      setIsApproving(false)
    }
  }

  const handleReject = async () => {
    setIsRejecting(true)
    try {
      await rejectEvent(event.id)
      setShowRejectDialog(false)
      router.refresh()
    } catch (error) {
      alert('Failed to reject event')
      console.error(error)
    } finally {
      setIsRejecting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Icon */}
        <div 
          className="w-full md:w-48 h-48 flex-shrink-0 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: typeConfig.color + '20' }}
        >
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 24 24" 
            fill="none"
            stroke={typeConfig.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={typeConfig.svgPath} />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{event.name}</h3>
              <Badge 
                className="capitalize"
                style={{ 
                  backgroundColor: typeConfig.color,
                  color: 'white'
                }}
              >
                {typeConfig.label}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                <LuCalendar size={16} />
                {eventDate.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <LuMapPin size={16} />
                {event.location}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-4 line-clamp-3">
              {event.description}
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Submitted {new Date(event.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => setShowApproveDialog(true)}
              disabled={event.status === 'approved'}
            >
              <LuCheck size={16} className="mr-1" />
              {event.status === 'approved' ? 'Approved' : 'Approve'}
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => setShowRejectDialog(true)}
              disabled={event.status === 'rejected'}
            >
              <LuX size={16} className="mr-1" />
              {event.status === 'rejected' ? 'Rejected' : 'Reject'}
            </Button>

            <Link href={`/events/${event.id}`} target="_blank">
              <Button size="sm" variant="outline">
                <LuExternalLink size={16} className="mr-1" />
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <LuCheck size={24} />
              Approve Event
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to approve "<strong>{event.name}</strong>"? 
              This event will be visible to all users on the events catalog.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApproveDialog(false)}
              disabled={isApproving}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={handleApprove}
              disabled={isApproving}
            >
              {isApproving ? 'Approving...' : 'Approve Event'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <LuTriangleAlert size={24} />
              Reject Event
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to reject "<strong>{event.name}</strong>"? 
              This event will be marked as rejected and hidden from the public catalog.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
              disabled={isRejecting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={isRejecting}
            >
              {isRejecting ? 'Rejecting...' : 'Reject Event'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
