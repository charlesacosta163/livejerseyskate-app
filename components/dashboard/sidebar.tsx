import React from 'react'
import Link from 'next/link'
import { LuLayoutDashboard, LuMapPin, LuCalendar, LuSettings, LuUser } from 'react-icons/lu'

const Sidebar = () => {
  return (
   <aside className="w-[250px] bg-[#9A4312] text-white p-4 flex flex-col h-screen">
   <div className="mb-8">
     <h1 className="text-2xl font-black tracking-tight">LiveJerseySkate</h1>
   </div>

   <nav className="flex-1 flex flex-col gap-2">
     <Link 
       href="/dashboard" 
       className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
     >
       <LuLayoutDashboard size={20} />
       <span className="font-medium">Overview</span>
     </Link>
     
     <Link 
       href="/dashboard/spots" 
       className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
     >
       <LuMapPin size={20} />
       <span className="font-medium">Skate Spots</span>
     </Link>

     <Link 
       href="/dashboard/events" 
       className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
     >
       <LuCalendar size={20} />
       <span className="font-medium">Events</span>
     </Link>

     <div className="border-t border-white/20 my-4" />

     <Link 
       href="/account" 
       className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
     >
       <LuUser size={20} />
       <span className="font-medium">Account</span>
     </Link>

     <div className="border-t border-white/20 my-4" />

     <Link 
       href="/dashboard/settings" 
       className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors opacity-50 cursor-not-allowed"
     >
       <LuSettings size={20} />
       <span className="font-medium">Settings</span>
     </Link>
   </nav>

   <div className="mt-auto pt-4 border-t border-white/20">
     <Link 
       href="/" 
       className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
     >
       ← Back to Site
     </Link>
   </div>
 </aside>
  )
}

export default Sidebar