'use client'

import { Button } from '@/components/ui/button'
import { updateSkateSpot } from '@/lib/actions'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { SkateSpot } from '@/lib/types'

const spotTypes = [
  { key: 'stair', label: 'Stair' },
  { key: 'ledge', label: 'Ledge' },
  { key: 'gap', label: 'Gap' },
  { key: 'bank', label: 'Bank' },
  { key: 'flatground', label: 'Flatground' },
  { key: 'hubba', label: 'Hubba' },
  { key: 'other', label: 'Other' },
]

interface EditSpotFormProps {
  spot: SkateSpot
}

export default function EditSpotForm({ spot }: EditSpotFormProps) {
  const [spotType, setSpotType] = useState(spot.spot_type || '')

  const updateSpotWithId = updateSkateSpot.bind(null, spot.id)

  return (
    <form
      action={updateSpotWithId}
      className="flex flex-col gap-4 bg-white/80 rounded-[25px] p-12
        [&>div>input]:text-sm
        [&>div>textarea]:text-sm
      "
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="image-url" className="text-xs font-medium">
          Image URL (optional)
        </label>
        <input
          type="text"
          name="image-url"
          defaultValue={spot.image_url || ''}
          className="border border-gray-200 rounded-lg px-4 py-2"
          placeholder="Place Image URL of Spot"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-xs font-medium">
          Title *
        </label>
        <input
          type="text"
          name="title"
          defaultValue={spot.title}
          className="border border-gray-200 rounded-lg px-4 py-2"
          placeholder="e.g. Johnson Hall 6 Stair"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="location" className="text-xs font-medium">
          Location *
        </label>
        <input
          type="text"
          name="location"
          defaultValue={spot.location}
          className="border border-gray-200 rounded-lg px-4 py-2"
          placeholder="e.g. New York, NY"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="spot-type" className="text-xs font-medium">
          Spot Type *
        </label>
        <Select
          value={spotType}
          onValueChange={(value) => setSpotType(value || '')}
          required
        >
          <SelectTrigger className="border border-gray-200 rounded-lg px-4 py-2 text-sm">
            <SelectValue placeholder="Select a spot type" />
          </SelectTrigger>
          <SelectContent>
            {spotTypes.map((type) => (
              <SelectItem key={type.key} value={type.key}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input type="hidden" name="spot-type" value={spotType} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-xs font-medium">
          Description *
        </label>
        <textarea
          name="description"
          defaultValue={spot.description}
          className="border border-gray-200 rounded-lg px-4 py-2 min-h-[100px]"
          placeholder="e.g. A great 6 stair with good runup. Best on weekends due to presence of security"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="bust-level" className="text-xs font-medium">
          Bust Level (1-5) *
        </label>
        <input
          type="number"
          max={5}
          min={1}
          name="bust-level"
          defaultValue={spot.bust_level}
          className="border border-gray-200 rounded-lg px-4 py-2"
          placeholder="1 = Low, 5 = High"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="google-maps-url" className="text-xs font-medium">
          Google Maps URL *
        </label>
        <input
          type="url"
          name="google-maps-url"
          defaultValue={spot.google_maps_url}
          className="border border-gray-200 rounded-lg px-4 py-2"
          placeholder="https://maps.google.com/..."
          required
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="bg-[#9A4312] hover:bg-[#7a3410]">
          Update Spot
        </Button>
        <a href="/account/submissions">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </a>
      </div>
    </form>
  )
}
