import { Button } from '@/components/ui/button'
import React from 'react'
import { LuPlus } from 'react-icons/lu'
import Link from 'next/link'
import { getAllEvents } from '@/lib/actions'
import EventFilters from '@/components/main/event-filters'
import EventsList from '@/components/main/events-list'

interface EventsPageProps {
  searchParams: Promise<{ filter?: string | string[] }>
}

const EventsPage = async ({ searchParams }: EventsPageProps) => {
  const params = await searchParams
  const activeFilters = params.filter 
    ? Array.isArray(params.filter) 
      ? params.filter 
      : [params.filter]
    : []

  // Fetch events from database
  const events = await getAllEvents()

  // Filter events based on active filters (server-side)
  const filteredEvents = activeFilters.length > 0
    ? events.filter(event => activeFilters.includes(event.type?.toLowerCase()))
    : events

  return (
    <div className='flex flex-col gap-4'>

      <section id="header" className='flex gap-4 flex-col items-center'>

        <div className="flex items-center justify-between w-full gap-2">
          
          <div>
            <h1 className='text-2xl sm:text-4xl font-black tracking-tighter text-[#431b07]'>Events Catalog</h1>
            <p className='text-gray-400 font-medium text-sm'>All your skate/community events in one place.</p>
          </div>
          
          <Link href="/events/new">
            <Button className='bg-[#8daaff] font-bold text-white hover:bg-[#9A4312]'>
              <LuPlus className='inline'/> New Event
            </Button>
          </Link>
        </div>

        {/* Event Type Filters */}
        <EventFilters />

        {/* Events List with Search */}
        <EventsList events={filteredEvents} />

      </section>

    </div>
  )
}

export default EventsPage
