import AccountNavTabs from '@/components/main/account-nav-tabs'
import Link from 'next/link'
import React from 'react'
import { LuBookUser, LuSettings, LuSquareCheckBig } from 'react-icons/lu'

const SettingsPage = () => {
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
                        <h1 className='text-2xl font-bold tracking-tight'>Settings</h1>
                        <p className='text-sm text-gray-500'>Manage your account settings.</p>
                    </div>
                </main>

            </div>
        </div>
    )
}

export default SettingsPage