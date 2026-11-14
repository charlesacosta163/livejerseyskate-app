'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { submitNewSkateSpot } from '@/lib/actions'
import { useState } from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const spotTypes = [
  { key: 'stair', label: 'Stair' },
  { key: 'ledge', label: 'Ledge' },
  { key: 'gap', label: 'Gap' },
  { key: 'bank', label: 'Bank' },
  { key: 'flatground', label: 'Flatground' },
  { key: 'hubba', label: 'Hubba' },
  { key: 'other', label: 'Other' },
]

export function NewSpotForm() {
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    location: '',
    spotType: '',
    bustLevel: 1,
    googleMapsUrl: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Preview Toggle Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setShowPreview(!showPreview)}
        className="self-start"
      >
        {showPreview ? (
          <>
            <LuEyeOff className="mr-2" size={16} />
            Hide Preview
          </>
        ) : (
          <>
            <LuEye className="mr-2" size={16} />
            Show Preview
          </>
        )}
      </Button>

      {/* Preview Section */}
      {showPreview && (
        <div className="bg-white rounded-[25px] overflow-hidden border-2 border-[#9A4312]">
          <div className="bg-[#9A4312] text-white p-4">
            <h3 className="text-lg font-bold">Preview</h3>
            <p className="text-xs opacity-90">This is how your spot will appear</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-4">
              {formData.imageUrl && (
                <div className="w-full h-[200px] overflow-hidden rounded-lg bg-gray-100">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-sm">Invalid image URL</div>'
                    }}
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold tracking-tight">
                {formData.title || <span className="text-gray-400">No title yet</span>}
              </h2>
              {formData.location && (
                <p className="text-sm text-gray-500">📍 {formData.location}</p>
              )}
              <p className="text-gray-600">
                {formData.description || <span className="text-gray-400">No description yet</span>}
              </p>
              <div className="flex gap-2 items-center flex-wrap">
                <Badge className="bg-amber-800 text-white">🔥 Bust Level: {formData.bustLevel}/5</Badge>
                {formData.spotType && (
                  <Badge variant="outline">
                    {spotTypes.find(t => t.key === formData.spotType)?.label || formData.spotType}
                  </Badge>
                )}
                {formData.googleMapsUrl && (
                  <Badge variant="outline">📍 Map Added</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form
        action={submitNewSkateSpot}
        className="flex flex-col gap-4 bg-white/80 rounded-[25px] p-4 py-8 md:p-12
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            value={formData.spotType}
            onValueChange={(value) => setFormData(prev => ({ ...prev, spotType: value || '' }))}
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
          <input type="hidden" name="spot-type" value={formData.spotType} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-xs font-medium">
            Description *
          </label>
          <textarea
            name="description"
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            className="border border-gray-200 rounded-lg px-4 py-2"
            placeholder="https://maps.google.com/..."
            required
          />
        </div>

        <Button type="submit" className="self-start bg-[#9A4312] hover:bg-[#7a3410]">
          Submit Spot
        </Button>
      </form>
    </div>
  )
}
