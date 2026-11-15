import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LuCalendar, LuMapPin, LuClock } from 'react-icons/lu'
import { eventTypes, type EventType } from '@/lib/events-data'
import Link from 'next/link'

interface Event {
  id: number
  created_at: string
  name: string
  description: string
  location: string
  date: string
  created_by: string
  shop_id: number | null
  type: EventType
}

interface EventCardProps {
  event: Event
}

const EventCard = ({ event }: EventCardProps) => {
  const typeConfig = eventTypes[event.type]
  
  // Format date to be more readable
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div 
      className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border-2 border-gray-200 hover:border-gray-300"
      style={{ backgroundColor: typeConfig.bgColor }}
    >
      {/* Header with SVG */}
      <div 
        className="relative h-32 flex items-center justify-center p-6"
        style={{ backgroundColor: typeConfig.color + '20' }}
      >
        <Image
          src={typeConfig.svgPath}
          alt={typeConfig.label}
          width={80}
          height={80}
          className="object-contain"
        />
        
        {/* Type Badge */}
        <Badge 
          className="absolute top-3 right-3 font-bold text-xs"
          style={{ 
            backgroundColor: typeConfig.color,
            color: 'white',
            border: 'none'
          }}
        >
          {typeConfig.label}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5 bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {event.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <LuCalendar size={16} className="flex-shrink-0" style={{ color: typeConfig.color }} />
            <span className="font-medium">{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <LuMapPin size={16} className="flex-shrink-0" style={{ color: typeConfig.color }} />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/events/${event.id}`}>
          <Button 
            className="w-full font-bold"
            style={{ 
              backgroundColor: typeConfig.color,
              color: 'white'
            }}
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default EventCard
