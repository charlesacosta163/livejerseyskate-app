import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LuLayoutDashboard, LuMapPin, LuCalendar, LuLogOut, LuSettings, LuUser } from 'react-icons/lu'
import { LogoutButton } from '@/components/logout-button'
import Sidebar from '@/components/dashboard/sidebar'
import Navbar from '@/components/dashboard/navbar'

export default async function DashboardLayout({ children }: LayoutProps<"/">) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  return (
    <div className="flex h-screen bg-white">

      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#FFFAF0] p-4 md:p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-4 md:px-6 py-3 text-center text-xs text-gray-500">
          © 2026 LiveJerseySkate - Admin Dashboard
        </footer>

      </div>

    </div>
  )
}
