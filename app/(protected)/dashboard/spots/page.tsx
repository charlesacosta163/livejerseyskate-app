import { getAllSpotsForAdmin } from '@/lib/actions'
import { Badge } from '@/components/ui/badge'
import { spotCategories } from '@/lib/spots-data'
import SpotModerationCard from '@/components/admin/spot-moderation-card'

export default async function SpotsModeration() {
  const allSpots = await getAllSpotsForAdmin()

  // Separate by status
  const pendingSpots = allSpots.filter(spot => spot.status === 'pending')
  const approvedSpots = allSpots.filter(spot => spot.status === 'approved')
  const rejectedSpots = allSpots.filter(spot => spot.status === 'rejected')

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">Skate Spot Moderation</h1>
        <p className="text-gray-600 mt-2">Review and manage spot submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
          <p className="text-sm font-medium text-orange-800">Pending Review</p>
          <p className="text-3xl font-bold text-orange-600 mt-1">{pendingSpots.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
          <p className="text-sm font-medium text-green-800">Approved</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{approvedSpots.length}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
          <p className="text-sm font-medium text-red-800">Rejected</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{rejectedSpots.length}</p>
        </div>
      </div>

      {/* Pending Spots Section */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Pending Review</h2>
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
            {pendingSpots.length}
          </Badge>
        </div>

        {pendingSpots.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No pending submissions</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pendingSpots.map((spot) => (
              <SpotModerationCard key={spot.id} spot={spot} />
            ))}
          </div>
        )}
      </section>

      {/* Approved Spots Section */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Approved Spots</h2>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            {approvedSpots.length}
          </Badge>
        </div>

        {approvedSpots.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No approved spots yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvedSpots.map((spot) => (
              <div key={spot.id} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg">{spot.title}</h3>
                  <Badge className="bg-green-500 text-white">Approved</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{spot.location}</p>
                <p className="text-xs text-gray-400">By: {spot.user_profiles?.username || 'Anonymous'}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Rejected Spots Section */}
      {rejectedSpots.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Rejected Spots</h2>
            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
              {rejectedSpots.length}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rejectedSpots.map((spot) => (
              <div key={spot.id} className="bg-white rounded-lg p-4 border border-gray-200 opacity-70">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg">{spot.title}</h3>
                  <Badge variant="destructive">Rejected</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{spot.location}</p>
                <p className="text-xs text-gray-400">By: {spot.user_profiles?.username || 'Anonymous'}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
