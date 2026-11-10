import Link from 'next/link'

import { isLoggedIn } from '@/lib/supabase/user-actions'

import { LuLogIn, LuUser } from 'react-icons/lu'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { LogoutButton } from '../logout-button'
import { Button } from '@/components/ui/button'



const LoginDropdownButton = async () => {

    const loggedIn = await isLoggedIn()
  

  return (
    <>
        {loggedIn ? (
            <Popover>
                <PopoverTrigger>
                    <div 
                        className='w-10 h-10 flex items-center justify-center rounded-full bg-[#9A4312] text-white hover:bg-[#7a3410] transition-colors shadow-md hover:shadow-lg'
                        aria-label="User menu"
                    >
                        <LuUser size={20}/>
                    </div>
                </PopoverTrigger>
                <PopoverContent className='w-56 p-2' align='end'>
                    <div className='flex flex-col gap-1'>
                        <Link 
                            href='/account' 
                            className='flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[#431b07] hover:bg-[#FEE0AA] transition-colors'
                        >
                            <LuUser size={16}/>
                            <span>View Account</span>
                        </Link>
                        
                        <div className='border-t border-gray-200 my-1' />
                        
                        <LogoutButton />
                    </div>
                </PopoverContent>
            </Popover>
        ) : (
            <Link href='/auth/login'>
                <Button 
                    className='bg-[#9A4312] hover:bg-[#7a3410] text-white font-medium shadow-md hover:shadow-lg transition-all'
                    size='sm'
                >
                    <LuLogIn className='inline mr-1.5' size={16}/>
                    Login
                </Button>
            </Link>
        )}
    </>
  )
}

export default LoginDropdownButton