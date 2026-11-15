'use client'

import React from 'react'
import Link from 'next/link'
import { LogoutButton } from '../logout-button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { LuMenu, LuLayoutDashboard, LuMapPin, LuCalendar, LuSettings, LuUser, LuX } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between">
      
      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3">
        <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <PopoverTrigger className="md:hidden">
            <Button variant="outline" size="icon">
              {isMenuOpen ? <LuX size={20} /> : <LuMenu size={20} />}
            </Button>
          </PopoverTrigger>
          
          <PopoverContent 
            align="start" 
            className="w-[280px] p-0 bg-[#9A4312] text-white border-none"
          >
            <div className="p-4">
              <div className="mb-6">
                <h1 className="text-xl font-black tracking-tight">LiveJerseySkate</h1>
                <p className="text-xs text-white/70 mt-1">Admin Dashboard</p>
              </div>

              <nav className="flex flex-col gap-1">
                <Link 
                  href="/dashboard" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <LuLayoutDashboard size={18} />
                  <span className="font-medium text-sm">Overview</span>
                </Link>
                
                <Link 
                  href="/dashboard/spots" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <LuMapPin size={18} />
                  <span className="font-medium text-sm">Skate Spots</span>
                </Link>

                <Link 
                  href="/account" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <LuUser size={18} />
                  <span className="font-medium text-sm">Account</span>
                </Link>

                <Link 
                  href="/dashboard/events" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors opacity-50 cursor-not-allowed"
                >
                  <LuCalendar size={18} />
                  <span className="font-medium text-sm">Events</span>
                  <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded">Soon</span>
                </Link>

                <div className="border-t border-white/20 my-2" />

                <Link 
                  href="/dashboard/settings" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors opacity-50 cursor-not-allowed"
                >
                  <LuSettings size={18} />
                  <span className="font-medium text-sm">Settings</span>
                </Link>

                <div className="border-t border-white/20 my-2" />

                <Link 
                  href="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  ← Back to Site
                </Link>
              </nav>
            </div>
          </PopoverContent>
        </Popover>

        {/* Title */}
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-xs md:text-sm text-gray-500 hidden sm:block">Manage your platform</p>
        </div>
      </div>
      
      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <LogoutButton />
      </div>
    </header>
  )
}

export default Navbar