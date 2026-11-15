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
import { LuCheck, LuX, LuMapPin, LuUser, LuExternalLink, LuTriangleAlert } from 'react-icons/lu'
import { approveSkateSpot, rejectSkateSpot } from '@/lib/actions'
import { spotCategories } from '@/lib/spots-data'
import type { SkateSpot } from '@/lib/types'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SpotModerationCardProps {
  spot: SkateSpot
}

export default function SpotModerationCard({ spot }: SpotModerationCardProps) {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const router = useRouter()

  const handleApprove = async () => {
    setIsApproving(true)
    try {
      await approveSkateSpot(spot.id)
      setShowApproveDialog(false)
      router.refresh()
    } catch (error) {
      alert('Failed to approve spot')
      console.error(error)
    } finally {
      setIsApproving(false)
    }
  }

  const handleReject = async () => {
    setIsRejecting(true)
    try {
      await rejectSkateSpot(spot.id)
      setShowRejectDialog(false)
      router.refresh()
    } catch (error) {
      alert('Failed to reject spot')
      console.error(error)
    } finally {
      setIsRejecting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Image */}
        {spot.image_url ? (
          <div className="w-full md:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={spot.image_url} 
              alt={spot.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full md:w-48 h-48 flex-shrink-0 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{spot.title}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <LuMapPin size={14} />
                {spot.location}
              </p>
            </div>
            <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
              Pending
            </Badge>
          </div>

          <p className="text-sm text-gray-700 mb-4 line-clamp-3">{spot.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="text-xs">
              Bust: {spot.bust_level}/5
            </Badge>
            {spot.spot_type && (
              <Badge className="bg-[#9A4312] text-white text-xs capitalize">
                {spotCategories.find(c => c.key === spot.spot_type)?.icon} {spot.spot_type}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <LuUser size={14} />
            <span>Submitted by: <strong>{spot.user_profiles?.username || 'Anonymous'}</strong></span>
            <span className="mx-2">•</span>
            <span>{new Date(spot.created_at).toLocaleDateString()}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto pt-4 border-t border-gray-200">
            <Button
              onClick={() => setShowApproveDialog(true)}
              disabled={isApproving || isRejecting}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <LuCheck className="mr-2" size={16} />
              Approve
            </Button>

            <Button
              onClick={() => setShowRejectDialog(true)}
              disabled={isApproving || isRejecting}
              variant="destructive"
              className="flex-1"
            >
              <LuX className="mr-2" size={16} />
              Reject
            </Button>

            {spot.google_maps_url && (
              <Link href={spot.google_maps_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon">
                  <LuExternalLink size={16} />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Approve Confirmation Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LuCheck className="text-green-600" size={24} />
              Approve Spot?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to approve <strong>"{spot.title}"</strong>? 
              This spot will be visible to the public on the spots page.
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
              onClick={handleApprove}
              disabled={isApproving}
              className="bg-green-600 hover:bg-green-700"
            >
              {isApproving ? 'Approving...' : 'Approve Spot'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Confirmation Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LuTriangleAlert className="text-red-600" size={24} />
              Reject Spot?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to reject <strong>"{spot.title}"</strong>? 
              This spot will be hidden from public view and the submitter will see it as rejected in their submissions.
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
              onClick={handleReject}
              disabled={isRejecting}
              variant="destructive"
            >
              {isRejecting ? 'Rejecting...' : 'Reject Spot'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
