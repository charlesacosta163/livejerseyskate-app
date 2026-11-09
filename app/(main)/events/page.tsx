import { Button } from '@/components/ui/button'
import React from 'react'
import { LuFilter } from 'react-icons/lu'

const EventsPage = () => {
  return (
    <div className='flex flex-col gap-4'>

        <section id="header" className='flex gap-4 flex-col items-center'>

            <div className="flex items-center justify-between w-full gap-2">
                
                <div>
                    <h1 className='text-2xl sm:text-4xl font-black tracking-tighter text-[#431b07]'>Events Catalog</h1>
                    <p className='text-gray-400 font-medium text-sm'>All your skate/community events in one place.</p>
                </div>
                <Button className='bg-[#FEE0AA] hover:bg-gray-100 text-amber-950'><LuFilter className='inline'/> Filters </Button>
            </div>

        </section>

    </div>
  )
}

export default EventsPage
