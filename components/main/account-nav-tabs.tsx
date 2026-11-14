'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LuBookUser, LuSquareCheckBig, LuSettings } from 'react-icons/lu'

const accountTabs = [
  { href: '/account', label: 'Account', icon: LuBookUser },
  { href: '/account/submissions', label: 'Submissions', icon: LuSquareCheckBig },
  { href: '/account/settings', label: 'Settings', icon: LuSettings },
]

export default function AccountNavTabs() {
  const pathname = usePathname()

  return (
    <nav className='flex md:hidden gap-2 overflow-x-auto pb-2 px-1'>
      {accountTabs.map((tab) => {
        const Icon = tab.icon
        const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/')
        
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold transition-colors ${
              isActive
                ? 'bg-[#9A4312] text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            <Icon size={16} /> {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
