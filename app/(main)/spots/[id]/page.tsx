import React from 'react'
import { getSkateSpotById } from '@/lib/actions'
import { LuArrowLeft, LuMapPin, LuUser } from 'react-icons/lu'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { spotCategories } from '@/lib/spots-data'

interface SpotPageProps {
  params: Promise<{ id: string }>
}

const SpotPage = async ({ params }: SpotPageProps) => {
  const { id } = await params
  const spot = await getSkateSpotById(Number(id))

  if (!spot) {
    notFound()
  }

  return (
    <div className='flex flex-col gap-4'>

        <Link href='/spots' className='text-amber-600 font-bold text-sm underline'><LuArrowLeft className='inline' /> Back to Spots List</Link>

        <header>
            
            <h1 className='font-black text-4xl tracking-tighter'>{spot.title}</h1>
            
            {spot.location && (
              <p className='text-lg text-gray-600 mt-2'>
                <LuMapPin className='inline'/> {spot.location}
              </p>
            )}

            <section className='flex justify-between gap-2 flex-wrap mt-4'>

                <div className="flex gap-2 items-center flex-wrap">
                    {spot.spot_type && (
                      <Badge className='bg-[#9A4312] text-white capitalize text-sm'>
                        {spotCategories.find(c => c.key === spot.spot_type)?.icon} {spot.spot_type}
                      </Badge>
                    )}
                    {spot.google_maps_url && (
                      <Link href={spot.google_maps_url} target='_blank'>
                        <Badge variant="outline" className='text-blue-600 hover:bg-blue-50'>
                          View on Maps
                        </Badge>
                      </Link>
                    )}
                </div>

                <Badge className='bg-amber-800 text-white font-semibold'>Bust Level: {spot.bust_level}/5</Badge>

            </section>
        </header>

        <main className='flex flex-col gap-4'>

            {/* Image */}
            {spot.image_url && (
              <section>
                  <img src={spot.image_url} alt={spot.title} className='w-full rounded-[25px] max-h-[500px] object-cover' />
              </section>
            )}

            <section className="flex flex-col md:flex-row gap-4">


                <div id='left' className='flex-5 flex flex-col gap-4'>

                    <div className='bg-white/60 p-8 rounded-[25px]'>
                        <h2 className='text-2xl font-bold tracking-tight text-gray-600'>About This Spot</h2>

                        <p className='text-gray-500 font-medium mt-2'>{spot.description}</p>

                    </div>

                    <div className='p-4 rounded-[25px] bg-amber-100 self-start'>
                        <h3 className='text-sm font-semibold text-gray-500'>Submitted By:</h3>
                        <p className='text-xl font-bold tracking-tight'>
                          <LuUser className='inline'/> {spot.user_profiles?.username || 'Anonymous'}
                        </p>
                    </div>

                    <div className='text-xs text-gray-400'>
                      Submitted on {new Date(spot.created_at).toLocaleDateString()}
                    </div>

                </div>



                <div id='right' className='flex-2 flex flex-col gap-4'>

                    <div className='flex flex-col gap-4 bg-gray-600 text-white rounded-[25px] p-6'>

                        <span className='font-semibold text-2xl'>Bust Level</span>

                        <span className='text-6xl font-black self-end'>{spot.bust_level}</span>

                    </div>

                    {spot.google_maps_url && (
                      <Link href={spot.google_maps_url} target='_blank' className='bg-white rounded-[25px] p-6 flex gap-4 items-center hover:bg-gray-100'>
                          <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Google_Maps_icon_%282015-2020%29.svg/960px-Google_Maps_icon_%282015-2020%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" alt="map icon" className='w-[50px] h-[50px]'/>
                          <span className='text-2xl font-bold text-gray-500 tracking-tight'>See the Location</span>
                      </Link>
                    )}

                </div>

            </section>

        </main>

    </div>
  )
}

export default SpotPage