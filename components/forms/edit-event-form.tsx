'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { updateEvent } from '@/lib/actions'
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

interface Event {
  id: number
  name: string
  description: string
  location: string
  date: string
  type: string
}

interface EditEventFormProps {
  event: Event
}

export default function EditEventForm({ event }: EditEventFormProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [eventType, setEventType] = useState(event.type)
  const [formData, setFormData] = useState({
    name: event.name,
    description: event.description,
    location: event.location,
    date: event.date,
    type: event.type
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const selectedTypeConfig = formData.type ? eventTypes[formData.type as keyof typeof eventTypes] : null
  const updateEventWithId = updateEvent.bind(null, event.id)

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
                <svg 
                  width="80" 
                  height="80" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  stroke={selectedTypeConfig.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={selectedTypeConfig.svgPath} />
                </svg>
              </div>

              {/* Event Details */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {formData.name || 'Event Name'}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    className="capitalize"
                    style={{ 
                      backgroundColor: selectedTypeConfig.color,
                      color: 'white'
                    }}
                  >
                    {selectedTypeConfig.label}
                  </Badge>
                </div>

                {formData.date && (
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <LuCalendar size={14} />
                    {new Date(formData.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                )}

                {formData.location && (
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <LuMapPin size={14} />
                    {formData.location}
                  </p>
                )}

                <p className="text-sm text-gray-700 mt-2">
                  {formData.description || 'Event description will appear here...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form
        action={updateEventWithId}
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
            placeholder="e.g. Saturday Street Session"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="type" className="text-xs font-medium">
            Event Type *
          </label>
          <Select
            value={eventType}
            onValueChange={(value) => {
              setEventType(value || '')
              setFormData(prev => ({ ...prev, type: value || '' }))
            }}
            required
          >
            <SelectTrigger className="border border-gray-200 rounded-lg px-4 py-2 text-sm">
              <SelectValue placeholder="Select an event type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(eventTypes).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  <span className="capitalize">{config.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" name="type" value={eventType} />
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
            placeholder="e.g. Washington Square Park, NY"
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
            placeholder="Tell everyone about your event..."
            required
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="bg-[#8daaff] hover:bg-[#7a99ee] text-white">
            Update Event
          </Button>
          <a href="/account/submissions">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </a>
        </div>
      </form>
    </div>
  )
}
