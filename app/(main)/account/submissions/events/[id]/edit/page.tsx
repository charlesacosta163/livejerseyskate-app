import React from 'react'
import { getEventById } from '@/lib/actions'
import { notFound, redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/supabase/user-actions'
import EditEventForm from '@/components/forms/edit-event-form'
import Link from 'next/link'
import { LuArrowLeft, LuBookUser, LuSquareCheckBig, LuSettings } from 'react-icons/lu'
import AccountNavTabs from '@/components/main/account-nav-tabs'

interface EditEventPageProps {
  params: Promise<{ id: string }>
}

const EditEventPage = async ({ params }: EditEventPageProps) => {
  const { id } = await params
  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    redirect('/auth/login')
  }

  const event = await getEventById(Number(id))

  if (!event) {
    notFound()
  }

  // Verify ownership
  if (event.created_by !== currentUser.id) {
    redirect('/account/submissions')
  }

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

        <main className='flex-1 flex flex-col gap-4 w-full max-w-3xl'>
          <Link 
            href="/account/submissions" 
            className="text-[#8daaff] hover:underline text-sm font-medium inline-block"
          >
            <LuArrowLeft className="inline" /> Back to Submissions
          </Link>

          <div>
            <h1 className="text-3xl font-black tracking-tighter text-[#431b07]">
              Edit Event
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Update the details of your event submission.
            </p>
          </div>

          <EditEventForm event={event} />
        </main>
      </div>
    </div>
  )
}

export default EditEventPage
