'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { spotsData, spotCategories } from '@/lib/data'

import { LuArrowLeft, LuMapPin, LuUser } from 'react-icons/lu'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

const SpotPage = () => {
    const {id} = useParams()

    const spot = spotsData.find(spotObj => spotObj.id === Number(id))
    const spotType: any = spotCategories.find(e => e.key === spot?.spotType)

    
  return (
    <div className='flex flex-col gap-4'>

        <Link href='/spots' className='text-amber-600 font-bold text-sm underline'><LuArrowLeft className='inline' /> Back to Spots List</Link>

        <header>
            
            <h1 className='font-black text-4xl tracking-tighter'>{spot?.spotName}</h1>

            <section className='flex justify-between gap-2'>

                <div className="flex gap-2 items-center">
                    <div>
                        <LuMapPin className='inline'/> {spot?.spotLocation}
                    </div>
                    <Badge>{spotType.icon} {spot?.spotType}</Badge>
                </div>

                <Badge className='bg-amber-800 text-white font-semibold'>Bust Level: {spot?.bustLevel}</Badge>

            </section>
        </header>

        <main className='flex flex-col gap-4'>

            {/* Attachments/Images at a later feature, another section tag 👆 */}
            <section>
                <img src={spot?.spotImage} alt="" className='w-full rounded-[25px]' />
            </section>

            <section className="flex flex-col md:flex-row gap-4">


                <div id='left' className='flex-5 flex flex-col gap-4'>

                    <div className='bg-white/60 p-8 rounded-[25px]'>
                        <h2 className='text-2xl font-bold tracking-tight text-gray-600'>About This Spot</h2>

                        <p className='text-gray-500 font-medium mt-2'>{spot?.spotDescription}</p>

                    </div>

                    <div className='p-4 rounded-[25px] bg-amber-100 self-start'>
                        <h3 className='text-sm font-semibold text-gray-500'>Submitted By:</h3>
                        <p className='text-xl font-bold tracking-tight'><LuUser className='inline'/> {spot?.submittedBy}</p>
                    </div>



                </div>



                <div id='right' className='flex-2 flex flex-col gap-4'>

                    <div className='flex flex-col gap-4 bg-gray-600 text-white rounded-[25px] p-6'>

                        <span className='font-semibold text-2xl'>Bust Level</span>

                        <span className='text-6xl font-black self-end'>{spot?.bustLevel}</span>

                    </div>

                    <Link href={`${spot?.addressLink}`} target='_blank' className='bg-white rounded-[25px] p-6 flex gap-4 items-center hover:bg-gray-100'>
                        <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Google_Maps_icon_%282015-2020%29.svg/960px-Google_Maps_icon_%282015-2020%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" alt="map icon" className='w-[50px] h-[50px]'/>
                        <span className='text-2xl font-bold text-gray-500 tracking-tight'>See the Location</span>
                    </Link>

                </div>

            </section>

        </main>

    </div>
  )
}

export default SpotPage