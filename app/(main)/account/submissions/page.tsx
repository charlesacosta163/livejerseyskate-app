import React from 'react'
import { getUserSubmissions, getUserEventSubmissions } from '@/lib/actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LuExternalLink, LuMapPin, LuPencil, LuBookUser, LuSquareCheckBig, LuSettings, LuCalendar } from 'react-icons/lu'
import { spotCategories } from '@/lib/spots-data'
import { eventTypes } from '@/lib/events-data'
import AccountNavTabs from '@/components/main/account-nav-tabs'
import DeleteSpotButton from '@/components/delete-spot-button'
import DeleteEventButton from '@/components/delete-event-button'

const SubmissionsPage = async () => {
  const spotSubmissions = await getUserSubmissions()
  const eventSubmissions = await getUserEventSubmissions()
  
  const totalSubmissions = spotSubmissions.length + eventSubmissions.length

  return (
    <div className='flex flex-col gap-4'>
      
      {/* Mobile horizontal tabs */}
      <AccountNavTabs />

      <div className='flex md:flex-row flex-col gap-4 items-start'>
        
        {/* Desktop sidebar */}
        <aside id="sidebar-nav" className='hidden md:block w-[200px]'>
          <nav className='flex flex-col gap-2'>
            <Link href="/account" className='text-lg font-semibold tracking-tight'><LuBookUser className='inline' /> Account</Link>
            <Link href="/account/submissions" className='text-lg font-semibold tracking-tight'><LuSquareCheckBig className='inline' /> Submissions</Link>
            <Link href="/account/settings" className='text-lg font-semibold tracking-tight'><LuSettings className='inline' /> Settings</Link>
          </nav>
        </aside>

        <main className='flex-1 flex flex-col gap-6 w-full'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>My Submissions</h1>
            <p className='text-sm text-gray-500'>View and manage all your submissions.</p>
          </div>

          <div className='flex gap-4 items-center'>
            <p className='text-sm text-gray-600 font-medium'>
              Total Submissions: <span className='text-[#9A4312] font-bold'>{totalSubmissions}</span>
            </p>
            <Badge variant="outline" className='text-xs'>
              {spotSubmissions.length} Spots
            </Badge>
            <Badge variant="outline" className='text-xs'>
              {eventSubmissions.length} Events
            </Badge>
          </div>

      {totalSubmissions === 0 ? (
        <div className='bg-white rounded-lg p-8 text-center'>
          <p className='text-gray-500 mb-4'>You haven't submitted anything yet.</p>
          <div className='flex gap-2 justify-center'>
            <Link href='/spots/new'>
              <Button className='bg-[#9A4312] hover:bg-[#7a3410]'>
                Submit a Spot
              </Button>
            </Link>
            <Link href='/events/new'>
              <Button className='bg-[#8daaff] hover:bg-[#7a99ee]'>
                Create an Event
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Skate Spots Section */}
          <section className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-bold tracking-tight text-[#9A4312]'>
                Skate Spots ({spotSubmissions.length})
              </h2>
              <Link href='/spots/new'>
                <Button size="sm" className='bg-[#9A4312] hover:bg-[#7a3410] text-xs'>
                  + Add Spot
                </Button>
              </Link>
            </div>

            {spotSubmissions.length === 0 ? (
              <div className='bg-white rounded-lg p-6 text-center border-2 border-dashed border-gray-200'>
                <p className='text-gray-400 text-sm'>No spot submissions yet</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-4'>
                {spotSubmissions.map((spot) => (
              <div
                key={spot.id}
                className='bg-white rounded-lg p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow'
              >
                {/* Image Thumbnail */}
                {spot.image_url ? (
                  <div className='w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100'>
                    <img 
                      src={spot.image_url} 
                      alt={spot.title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ) : (
                  <div className='w-full sm:w-32 h-32 flex-shrink-0 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs'>
                    No Image
                  </div>
                )}

                {/* Content */}
                <div className='flex-1 flex flex-col gap-2'>
                  <div>
                    <h3 className='text-lg font-bold tracking-tight'>{spot.title}</h3>
                    {spot.location && (
                      <p className='text-sm text-gray-500'>
                        <LuMapPin className='inline' size={14} /> {spot.location}
                      </p>
                    )}
                  </div>

                  <p className='text-sm text-gray-600 line-clamp-2'>{spot.description}</p>

                  <div className='flex flex-wrap gap-2 items-center'>
                    {/* Status Badge */}
                    {spot.status === 'pending' && (
                      <Badge className='bg-orange-500 text-white text-xs'>
                        ⏳ Pending Review
                      </Badge>
                    )}
                    {spot.status === 'approved' && (
                      <Badge className='bg-green-500 text-white text-xs'>
                        ✓ Approved
                      </Badge>
                    )}
                    {spot.status === 'rejected' && (
                      <Badge variant='destructive' className='text-xs'>
                        ✗ Rejected
                      </Badge>
                    )}
                    <Badge className='bg-amber-800 text-white text-xs'>
                      Bust: {spot.bust_level}/5
                    </Badge>
                    {spot.spot_type && (
                      <Badge variant='outline' className='text-xs capitalize'>
                        {spotCategories.find(c => c.key === spot.spot_type)?.icon} {spot.spot_type}
                      </Badge>
                    )}
                    <span className='text-xs text-gray-400'>
                      Submitted {new Date(spot.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex sm:flex-col gap-2 justify-end'>
                  <Link href={`/account/submissions/${spot.id}/edit`}>
                    <Button size='sm' className='text-xs bg-[#9A4312] hover:bg-[#7a3410]'>
                      <LuPencil size={14} className='mr-1' /> Edit
                    </Button>
                  </Link>
                  <Link href={`/spots/${spot.id}`}>
                    <Button size='sm' variant='outline' className='text-xs'>
                      <LuExternalLink size={14} className='mr-1' /> View
                    </Button>
                  </Link>
                  <DeleteSpotButton spotId={spot.id} spotTitle={spot.title} />
                </div>
              </div>
            ))}
          </div>
            )}
          </section>

          {/* Events Section */}
          <section className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-bold tracking-tight text-[#8daaff]'>
                Events ({eventSubmissions.length})
              </h2>
              <Link href='/events/new'>
                <Button size="sm" className='bg-[#8daaff] hover:bg-[#7a99ee] text-white text-xs'>
                  + Create Event
                </Button>
              </Link>
            </div>

            {eventSubmissions.length === 0 ? (
              <div className='bg-white rounded-lg p-6 text-center border-2 border-dashed border-gray-200'>
                <p className='text-gray-400 text-sm'>No event submissions yet</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-4'>
                {eventSubmissions.map((event: any) => {
                  const typeConfig = eventTypes[event.type as keyof typeof eventTypes]
                  const eventDate = new Date(event.date)
                  
                  return (
                    <div
                      key={event.id}
                      className='bg-white rounded-lg p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow'
                    >
                      {/* Icon */}
                      <div 
                        className='w-full sm:w-32 h-32 flex-shrink-0 rounded-lg flex items-center justify-center'
                        style={{ backgroundColor: typeConfig.color + '20' }}
                      >
                        <svg 
                          width="64" 
                          height="64" 
                          viewBox="0 0 24 24" 
                          fill="none"
                          stroke={typeConfig.color}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={typeConfig.svgPath} />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className='flex-1 flex flex-col gap-2'>
                        <div>
                          <h3 className='text-lg font-bold tracking-tight'>{event.name}</h3>
                          {event.location && (
                            <p className='text-sm text-gray-500'>
                              <LuMapPin className='inline' size={14} /> {event.location}
                            </p>
                          )}
                        </div>

                        <p className='text-sm text-gray-600 line-clamp-2'>{event.description}</p>

                        <div className='flex flex-wrap gap-2 items-center'>
                          <Badge 
                            className='text-xs capitalize'
                            style={{ 
                              backgroundColor: typeConfig.color,
                              color: 'white'
                            }}
                          >
                            {typeConfig.label}
                          </Badge>
                          <Badge variant='outline' className='text-xs'>
                            <LuCalendar className='inline mr-1' size={12} />
                            {eventDate.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </Badge>
                          <span className='text-xs text-gray-400'>
                            Created {new Date(event.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className='flex sm:flex-col gap-2 justify-end'>
                        <Link href={`/account/submissions/events/${event.id}/edit`}>
                          <Button size='sm' className='text-xs bg-[#8daaff] hover:bg-[#7a99ee] text-white'>
                            <LuPencil size={14} className='mr-1' /> Edit
                          </Button>
                        </Link>
                        <Link href={`/events/${event.id}`}>
                          <Button size='sm' variant='outline' className='text-xs'>
                            <LuExternalLink size={14} className='mr-1' /> View
                          </Button>
                        </Link>
                        <DeleteEventButton eventId={event.id} eventName={event.name} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        </>
      )}
        </main>
      </div>
    </div>
  )
}

export default SubmissionsPage