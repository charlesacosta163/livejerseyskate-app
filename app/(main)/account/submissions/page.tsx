import React from 'react'
import { getUserSubmissions } from '@/lib/actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LuExternalLink, LuMapPin, LuPencil, LuBookUser, LuSquareCheckBig, LuSettings } from 'react-icons/lu'
import { spotCategories } from '@/lib/data'
import AccountNavTabs from '@/components/main/account-nav-tabs'
import DeleteSpotButton from '@/components/delete-spot-button'

const SubmissionsPage = async () => {
  const submissions = await getUserSubmissions()

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

        <main className='flex-1 flex flex-col gap-4 w-full'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>My Submissions</h1>
            <p className='text-sm text-gray-500'>View and manage all your spot submissions.</p>
          </div>

      {submissions.length === 0 ? (
        <div className='bg-white rounded-lg p-8 text-center'>
          <p className='text-gray-500 mb-4'>You haven't submitted any spots yet.</p>
          <Link href='/spots/new'>
            <Button className='bg-[#9A4312] hover:bg-[#7a3410]'>
              Submit Your First Spot
            </Button>
          </Link>
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          <p className='text-sm text-gray-600 font-medium'>
            Total Submissions: <span className='text-[#9A4312] font-bold'>{submissions.length}</span>
          </p>

          <div className='grid grid-cols-1 gap-4'>
            {submissions.map((spot) => (
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
        </div>
      )}
        </main>
      </div>
    </div>
  )
}

export default SubmissionsPage