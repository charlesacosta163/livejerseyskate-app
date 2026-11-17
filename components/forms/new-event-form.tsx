'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { submitNewEvent } from '@/lib/actions'
import { useState } from 'react'
import { LuEye, LuEyeOff, LuCalendar, LuMapPin } from 'react-icons/lu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { eventTypes } from '@/lib/events-data'
import Image from 'next/image'

export function NewEventForm() {
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    type: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const selectedTypeConfig = formData.type ? eventTypes[formData.type as keyof typeof eventTypes] : null

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
      {showPreview && selectedTypeConfig && (
        <div 
          className="rounded-2xl overflow-hidden border-2"
          style={{ 
            borderColor: selectedTypeConfig.color,
            backgroundColor: selectedTypeConfig.bgColor 
          }}
        >
          <div className="bg-white text-white p-4" style={{ backgroundColor: selectedTypeConfig.color }}>
            <h3 className="text-lg font-bold">Preview</h3>
            <p className="text-xs opacity-90">This is how your event will appear</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-4">
              {/* Event Type Icon */}
              <div className="flex items-center justify-center h-24">
                <Image
                  src={selectedTypeConfig.svgPath}
                  alt={selectedTypeConfig.label}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              <Badge 
                className="w-fit font-bold"
                style={{ 
                  backgroundColor: selectedTypeConfig.color,
                  color: 'white'
                }}
              >
                {selectedTypeConfig.label}
              </Badge>

              <h2 className="text-2xl font-bold tracking-tight">
                {formData.name || <span className="text-gray-400">No name yet</span>}
              </h2>
              
              <p className="text-gray-600">
                {formData.description || <span className="text-gray-400">No description yet</span>}
              </p>

              <div className="flex flex-col gap-2">
                {formData.date && (
                  <div className="flex items-center gap-2 text-sm">
                    <LuCalendar size={16} style={{ color: selectedTypeConfig.color }} />
                    <span>{new Date(formData.date).toLocaleDateString()}</span>
                  </div>
                )}
                {formData.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <LuMapPin size={16} style={{ color: selectedTypeConfig.color }} />
                    <span>{formData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form
        action={submitNewEvent}
        className="flex flex-col gap-4 bg-white/80 rounded-[25px] p-12
          [&>div>input]:text-sm
          [&>div>textarea]:text-sm
        "
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-xs font-medium">
            Event Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-200 rounded-lg px-4 py-2"
            placeholder="e.g. Saturday Morning Session"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="type" className="text-xs font-medium">
            Event Type *
          </label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData(prev => ({ ...prev, type: value || '' }))}
            required
          >
            <SelectTrigger className="border border-gray-200 rounded-lg px-4 py-2 text-sm">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(eventTypes).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" name="type" value={formData.type} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-xs font-medium">
            Event Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="border border-gray-200 rounded-lg px-4 py-2"
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
            value={formData.location}
            onChange={handleInputChange}
            className="border border-gray-200 rounded-lg px-4 py-2"
            placeholder="e.g. Echo Lake Park, NJ"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-xs font-medium">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border border-gray-200 rounded-lg px-4 py-2 min-h-[120px]"
            placeholder="Describe your event. Include skill level, what to bring, and any other important details..."
            required
          />
        </div>

        <Button type="submit" className="self-start bg-[#9A4312] hover:bg-[#7a3410]">
          Submit Event
        </Button>
      </form>
    </div>
  )
}
