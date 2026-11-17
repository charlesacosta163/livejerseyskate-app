import React from 'react'
import { getAllEventsForAdmin } from '@/lib/actions'
import { Badge } from '@/components/ui/badge'
import EventModerationCard from '@/components/admin/event-moderation-card'

const DashboardEventsPage = async () => {
  const events = await getAllEventsForAdmin()

  const pendingEvents = events.filter(event => event.status === 'pending')
  const approvedEvents = events.filter(event => event.status === 'approved')
  const rejectedEvents = events.filter(event => event.status === 'rejected')

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Event Moderation</h1>
        <p className="text-gray-600 mt-1">Review and manage event submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 font-medium">Total Events</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{events.length}</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
          <p className="text-sm text-orange-800 font-medium">Pending Review</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{pendingEvents.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <p className="text-sm text-green-800 font-medium">Approved</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{approvedEvents.length}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <p className="text-sm text-red-800 font-medium">Rejected</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{rejectedEvents.length}</p>
        </div>
      </div>

      {/* Pending Events */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Pending Review</h2>
          <Badge className="bg-orange-500 text-white">
            {pendingEvents.length}
          </Badge>
        </div>
        
        {pendingEvents.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No pending events to review</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {pendingEvents.map((event: any) => (
              <EventModerationCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Approved Events */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Approved Events</h2>
          <Badge className="bg-green-500 text-white">
            {approvedEvents.length}
          </Badge>
        </div>
        
        {approvedEvents.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No approved events</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {approvedEvents.map((event: any) => (
              <EventModerationCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Rejected Events */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Rejected Events</h2>
          <Badge variant="destructive">
            {rejectedEvents.length}
          </Badge>
        </div>
        
        {rejectedEvents.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No rejected events</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {rejectedEvents.map((event: any) => (
              <EventModerationCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default DashboardEventsPage
