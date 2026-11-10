import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { LuBookUser, LuSquareCheckBig, LuSettings, LuUser, LuSpeech } from 'react-icons/lu'
import { LogoutButton } from '@/components/logout-button'   

import { formatToShortDate } from '@/lib/utils'
import { getCurrentUser } from '@/lib/supabase/user-actions'


const AccountPage = async () => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        redirect('/auth/login')
    }


  return (
    <div className='flex flex-col gap-4'>

        {/* Mobile horizontal tabs */}
        <nav className='flex md:hidden gap-2 overflow-x-auto pb-2 px-1'>
            <Link 
                href="/account" 
                className='flex items-center gap-2 px-4 py-2 bg-[#9A4312] text-white rounded-lg whitespace-nowrap text-sm font-semibold'
            >
                <LuBookUser size={16} /> Account
            </Link>
            <Link 
                href="/account/submissions" 
                className='flex items-center gap-2 px-4 py-2 bg-white rounded-lg whitespace-nowrap text-sm font-semibold hover:bg-gray-100'
            >
                <LuSquareCheckBig size={16} /> Submissions
            </Link>
            <Link 
                href="/account/settings" 
                className='flex items-center gap-2 px-4 py-2 bg-white rounded-lg whitespace-nowrap text-sm font-semibold hover:bg-gray-100'
            >
                <LuSettings size={16} /> Settings
            </Link>
        </nav>

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
            
            <section id='#name' className='flex justify-between gap-4 items-center p-4 bg-white rounded-lg'>

                <div className='flex items-center gap-2 text-2xl font-semibold tracking-tight'>
                    <LuUser className='inline' />
                    <span className="flex flex-col">
                        <span>John Doe</span>
                        <span className='text-sm text-muted-foreground'>john.doe@example.com</span>
                    </span>
                </div>

                <span className="self-end"><LogoutButton /></span>

            </section>

            <section id="bio" className='p-4 bg-white rounded-lg'>
                <h2 className='text-lg font-semibold tracking-tight'><LuSpeech className='inline' /> Bio</h2>
                <p className='text-sm text-muted-foreground'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit alias quia quam pariatur quo expedita! Labore repudiandae quam eaque culpa.
                </p>
                <Button variant='outline' className='mt-4'>Edit Profile</Button>
            </section>

            <span className='text-xs text-gray-400 font-semibold'>Account created on {formatToShortDate(currentUser?.created_at)}</span>
            </main>

        </div>
    </div>
  )
}

export default AccountPage