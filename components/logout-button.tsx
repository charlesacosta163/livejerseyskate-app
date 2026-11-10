'use client'

import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'
import { LuLogOut } from 'react-icons/lu'

export function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')

    router.refresh()
  }

  return (
    <button 
      onClick={logout}
      className='flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full'
    >
      <LuLogOut size={16}/>
      <span>Sign Out</span>
    </button>
  )
}
