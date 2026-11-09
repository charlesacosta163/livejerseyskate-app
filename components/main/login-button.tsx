import Link from 'next/link'

import { isLoggedIn } from '@/lib/supabase/user-actions'

import { LuLogIn, LuUser, LuLogOut } from 'react-icons/lu'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { LogoutButton } from '../logout-button'



const LoginDropdownButton = async () => {

    const loggedIn = await isLoggedIn()
  

  return (
    <div>

        {loggedIn ? (
            <div>
                <Popover>
                    <PopoverTrigger>
                        <div className='w-[35px] h-[35px] flex items-center justify-center border-2 border-gray-500 rounded-full bg-gray-700 text-white hover:bg-gray-900'><LuUser className='inline'/></div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Link href='/account' className='px-4 py-1 bg-gray-700 rounded-lg text-white hover:bg-gray-900'><LuUser className='inline'/> View Account</Link>
                        <Link href='/dashboard' className='px-4 py-1 rounded-lg bg-gray-700 text-white hover:bg-gray-900'><LuUser className='inline'/> Visit Dashboard</Link>

                        <LogoutButton />
                       
                    </PopoverContent>
                </Popover>
            </div>
        ) : (
            <div>
                <Link href='/auth/login'><LuLogIn className='inline'/> Login</Link>
            </div>
        )}
    </div>
  )
}

export default LoginDropdownButton