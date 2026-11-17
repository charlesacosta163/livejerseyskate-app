'use client'

import { useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import EventCard from '@/components/main/event-card'

interface Event {
  id: number
  name: string
  description: string
  location: string
  date: string
  type: string
  created_at: string
  created_by: string
  shop_id: string | null
}

interface EventsListProps {
  events: Event[]
}

export default function EventsList({ events }: EventsListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter events based on search query
  const filteredEvents = events.filter(event => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    return (
      event.name.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.type?.toLowerCase().includes(query)
    )
  })

  return (
    <section className="w-full flex flex-col gap-4">
      {/* Search Bar */}
      <div className="relative">
        <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search events by name, location, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8daaff] focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-medium"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tighter text-[#9A4312]">
          {searchQuery ? `Search Results (${filteredEvents.length})` : `Upcoming Events (${filteredEvents.length})`}
        </h2>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-[25px]">
          <p className="text-gray-400 text-lg">
            {searchQuery 
              ? `No events found matching "${searchQuery}"`
              : 'No events available'}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-[#8daaff] hover:underline font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event: any) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  )
}
