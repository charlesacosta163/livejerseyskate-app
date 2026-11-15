import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import React from 'react'
import { LuFilter, LuPlus } from 'react-icons/lu'
import { mockEvents, eventTypes } from '@/lib/events-data'
import EventCard from '@/components/main/event-card'
import Link from 'next/link'

const EventsPage = () => {
  // Group events by type for stats
  const eventsByType = mockEvents.reduce((acc: any, event: any) => {
    acc[event.type] = (acc[event.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className='flex flex-col gap-4'>

      <section id="header" className='flex gap-4 flex-col items-center'>

        <div className="flex items-center justify-between w-full gap-2">
          
          <div>
            <h1 className='text-2xl sm:text-4xl font-black tracking-tighter text-[#431b07]'>Events Catalog</h1>
            <p className='text-gray-400 font-medium text-sm'>All your skate/community events in one place.</p>
          </div>
          
          <div className="flex gap-2">
            <Link href="/events/new">
              <Button className='bg-[#8daaff] text-white hover:bg-[#9A4312]'>
                <LuPlus className='inline'/> New Event
              </Button>
            </Link>
            <Button className='bg-[#FEE0AA] hover:bg-gray-100 text-amber-950'>
              <LuFilter className='inline'/> Filters
            </Button>
          </div>
        </div>

        {/* Event Type Legend */}
        <div className="w-full flex flex-wrap gap-2 justify-center sm:justify-start">
          {Object.entries(eventTypes).map(([key, config]: any) => (
            <Badge 
              key={key}
              variant="outline" 
              className="text-xs font-medium capitalize"
              style={{ 
                borderColor: config.color,
                color: config.color
              }}
            >
              {config.label} ({eventsByType[key] || 0})
            </Badge>
          ))}
        </div>

      </section>

      {/* Events Grid */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black tracking-tighter text-[#9A4312]">
            Upcoming Events ({mockEvents.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEvents.map((event: any) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

    </div>
  )
}

export default EventsPage
