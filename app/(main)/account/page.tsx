import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { LuBookUser, LuSquareCheckBig, LuSettings, LuUser, LuSpeech } from 'react-icons/lu'
import { LogoutButton } from '@/components/logout-button'   
import { EditProfileForm } from '@/components/forms/edit-profile-dialog'
import AccountNavTabs from '@/components/main/account-nav-tabs'

import { formatToShortDate } from '@/lib/utils'
import { getOrCreateUserProfile } from '@/lib/supabase/user-actions'


const AccountPage = async () => {

    // Get or create user profile (auto-creates if doesn't exist)
    const userProfile = await getOrCreateUserProfile()

    if (!userProfile) {
        redirect('/auth/login')
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

            <main className='flex-1 flex flex-col gap-4 w-full'>
            
            <section id='#name' className='flex flex-col md:flex-row justify-between gap-4 items-start md:items-center p-4 bg-white rounded-lg'>

                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-full bg-[#9A4312] text-white flex items-center justify-center text-xl font-bold'>
                        {userProfile.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="flex flex-col">
                        <span className='text-xl font-bold tracking-tight'>{userProfile.username || 'User'}</span>
                        <span className='text-sm text-muted-foreground'>{userProfile.email}</span>
                        <span className='text-xs text-gray-400 mt-0.5'>Role: {userProfile.role}</span>
                    </span>
                </div>

                <span className="self-end md:self-auto"><LogoutButton /></span>

            </section>

            <section id="bio" className='p-4 bg-white rounded-lg'>
                <h2 className='text-lg font-semibold tracking-tight mb-3'><LuSpeech className='inline' /> Bio</h2>
                {userProfile.bio ? (
                    <p className='text-sm text-gray-700'>
                        {userProfile.bio}
                    </p>
                ) : (
                    <p className='text-sm text-muted-foreground italic'>
                        No bio added yet. Click edit to add one.
                    </p>
                )}
                <div className='mt-4'>
                    <EditProfileForm 
                        currentUsername={userProfile.username || ''}
                        currentBio={userProfile.bio}
                    />
                </div>
            </section>

            <span className='text-xs text-gray-400 font-semibold'>Account created on {formatToShortDate(userProfile.created_at)}</span>
            </main>

        </div>
    </div>
  )
}

export default AccountPage