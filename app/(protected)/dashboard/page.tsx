
import Link from 'next/link'
import { LuMapPin, LuCalendar, LuClock, LuCheck } from 'react-icons/lu'
import { getPendingSkateSpots, getPendingEvents } from '@/lib/actions'

export default async function DashboardPage() {
  const pendingSpots = await getPendingSkateSpots()
  const pendingEvents = await getPendingEvents()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Monitor and manage submissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Skate Spots Card */}
        <Link href="/dashboard/spots">
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#9A4312] transition-all hover:shadow-lg cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-[#9A4312] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <LuMapPin size={24} />
              </div>
              {pendingSpots.length > 0 && (
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {pendingSpots.length} Pending
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">Skate Spots</h3>
            <p className="text-gray-600 text-sm mb-4">
              Review and moderate skate spot submissions from the community
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <LuClock size={16} />
                <span>{pendingSpots.length} pending review</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className="text-[#9A4312] font-semibold text-sm group-hover:underline">
                Manage Spots →
              </span>
            </div>
          </div>
        </Link>

        {/* Events Card */}
        <Link href="/dashboard/events">
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#8daaff] transition-all hover:shadow-lg cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-[#8daaff] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <LuCalendar size={24} />
              </div>
              {pendingEvents.length > 0 && (
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {pendingEvents.length} Pending
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">Events</h3>
            <p className="text-gray-600 text-sm mb-4">
              Review and moderate event submissions from the community
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <LuClock size={16} />
                <span>{pendingEvents.length} pending review</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className="text-[#8daaff] font-semibold text-sm group-hover:underline">
                Manage Events →
              </span>
            </div>
          </div>
        </Link>

      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-orange-600">{pendingSpots.length}</p>
            </div>
            <LuClock size={32} className="text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 opacity-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved Today</p>
              <p className="text-2xl font-bold text-green-600">-</p>
            </div>
            <LuCheck size={32} className="text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 opacity-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spots</p>
              <p className="text-2xl font-bold text-[#9A4312]">-</p>
            </div>
            <LuMapPin size={32} className="text-[#9A4312]" />
          </div>
        </div>
      </div>
    </div>
  )
}
