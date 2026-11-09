import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LuBookUser, LuSquareCheckBig, LuSettings, LuUser, LuSpeech } from 'react-icons/lu'
import { LogoutButton } from '@/components/logout-button'

const AccountPage = () => {
  return (
    <div className='flex gap-4 items-start'>


        <aside id="sidebar-nav" className='w-[200px]'>

            <nav className='flex flex-col gap-2'>
                
                <Link href="/account" className='text-lg font-semibold tracking-tight'><LuBookUser className='inline' /> Account</Link>
                <Link href="/account/submissions" className='text-lg font-semibold tracking-tight'><LuSquareCheckBig className='inline' /> Submissions</Link>
                <Link href="/account/settings" className='text-lg font-semibold tracking-tight'><LuSettings className='inline' /> Settings</Link>

            </nav>

        </aside>

        <main className='flex-1 flex flex-col gap-4'>
            
            <section id='#name' className='flex justify-between gap-4 items-center p-4 bg-white rounded-lg'>

                <div className='flex items-center gap-2 text-2xl font-semibold tracking-tight'>
                    <LuUser className='inline' />
                    <span className="flex flex-col">
                        <span>John Doe</span>
                        <span className='text-sm text-muted-foreground'>john.doe@example.com</span>
                    </span>
                </div>

                <LogoutButton />

            </section>

            <section id="bio" className='p-4 bg-white rounded-lg'>
                <h2 className='text-lg font-semibold tracking-tight'><LuSpeech className='inline' /> Bio</h2>
                <p className='text-sm text-muted-foreground'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit alias quia quam pariatur quo expedita! Labore repudiandae quam eaque culpa.
                </p>
                <Button variant='outline' className='mt-4'>Edit Profile</Button>
            </section>
        </main>


    </div>
  )
}

export default AccountPage