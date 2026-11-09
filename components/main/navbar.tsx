import Link from 'next/link';
import Image from 'next/image';

import liveJerseySkateLogo from '@/public/images/livejerseyskate-app-logo.png'

import { LuCalendarDays, LuMapPinCheck, LuLogIn } from "react-icons/lu";
import LoginDropdownButton from './login-button';


const Navbar = () => {
  return (
    <header className="max-w-[1000px] w-full px-4 py-2">
            <nav className="flex justify-between items-center">

                <Link href='/' className="font-black tracking-tight text-2xl"><Image src={liveJerseySkateLogo} width={75} alt='LiveJerseySkate Logo'/></Link>

                <section className="flex gap-4 items-center text-sm font-medium">
                    <Link href='/spots'><LuMapPinCheck className='inline'/> Spots</Link>
                    <Link href='/events'><LuCalendarDays className='inline'/> Events</Link>
                    {/* <LoginDropdownButton /> */}
                </section>
            </nav>
        </header>
  )
}

export default Navbar