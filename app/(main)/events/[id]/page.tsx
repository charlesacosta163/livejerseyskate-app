import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LuArrowLeft, LuCalendar, LuMapPin, LuUser, LuClock } from 'react-icons/lu'
import { eventTypes } from '@/lib/events-data'
import { getEventById } from '@/lib/actions'
import { notFound } from 'next/navigation'
import ShareButton from '@/components/share-button'

interface EventDetailPageProps {
  params: Promise<{ id: string }>
}

const EventDetailPage = async ({ params }: EventDetailPageProps) => {
  const { id } = await params
  const event = await getEventById(Number(id))

  if (!event) {
    notFound()
  }

  const typeConfig = eventTypes[event.type as keyof typeof eventTypes]
  
  // Format date
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  })

  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      
      {/* Back Button */}
      <Link 
        href="/events" 
        className="text-[#9A4312] hover:underline text-sm font-medium inline-flex items-center gap-2 w-fit"
      >
        <LuArrowLeft size={16} />
        Back to Events
      </Link>

      {/* Hero Section */}
      <div 
        className="rounded-2xl overflow-hidden border-2 border-gray-200"
        style={{ backgroundColor: typeConfig.bgColor }}
      >
        {/* Header with SVG */}
        <div 
          className="relative h-48 md:h-64 flex items-center justify-center p-8"
          style={{ backgroundColor: typeConfig.color + '30' }}
        >
          <Image
            src={typeConfig.svgPath}
            alt={typeConfig.label}
            width={150}
            height={150}
            className="object-contain"
          />
          
          {/* Type Badge */}
          <Badge 
            className="absolute top-4 right-4 font-bold text-sm px-4 py-2"
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
        <div className="bg-white p-6 md:p-8">
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-4">
            {event.name}
          </h1>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            
            <div 
              className="flex items-start gap-3 p-4 rounded-lg"
              style={{ backgroundColor: typeConfig.bgColor }}
            >
              <LuCalendar 
                size={24} 
                className="flex-shrink-0 mt-1" 
                style={{ color: typeConfig.color }} 
              />
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Date</p>
                <p className="text-lg font-bold text-gray-900">{formattedDate}</p>
              </div>
            </div>

            <div 
              className="flex items-start gap-3 p-4 rounded-lg"
              style={{ backgroundColor: typeConfig.bgColor }}
            >
              <LuMapPin 
                size={24} 
                className="flex-shrink-0 mt-1" 
                style={{ color: typeConfig.color }} 
              />
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Location</p>
                <p className="text-lg font-bold text-gray-900">{event.location}</p>
              </div>
            </div>

          </div>

          {/* Description Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">About This Event</h2>
            <p className="text-gray-700 leading-relaxed text-base">
              {event.description}
            </p>
          </div>

          {/* Additional Info */}
          {/* <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-bold text-gray-700 mb-2">Event Information</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <LuUser size={16} />
                <span>Open to all skill levels</span>
              </div>
              <div className="flex items-center gap-2">
                <LuClock size={16} />
                <span>Check-in starts 15 minutes before</span>
              </div>
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* <Button 
              className="flex-1 font-bold text-lg py-6"
              style={{ 
                backgroundColor: typeConfig.color,
                color: 'white'
              }}
            >
              Register for Event
            </Button> */}
            <ShareButton color={typeConfig.color} />
          </div>

          {/* Footer Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Event created on {new Date(event.created_at).toLocaleDateString()}
            </p>
          </div>

        </div>
      </div>

      {/* Related Events Section (Placeholder) */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-2">More Events</h3>
        <p className="text-sm text-gray-600">
          Check out other {typeConfig.label.toLowerCase()} events happening nearby.
        </p>
        <Link href="/events">
          <Button variant="outline" className="mt-4">
            View All Events
          </Button>
        </Link>
      </div>

    </div>
  )
}

export default EventDetailPage
