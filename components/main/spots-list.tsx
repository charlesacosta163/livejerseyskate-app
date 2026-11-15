'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TbBinoculars, TbBrandGoogleMaps } from 'react-icons/tb'
import { FaGoogle } from 'react-icons/fa'
import { LuSearch } from 'react-icons/lu'
import { spotCategories } from '@/lib/spots-data'
import type { SkateSpot } from '@/lib/types'

interface SpotsListProps {
  spots: SkateSpot[]
}

export default function SpotsList({ spots }: SpotsListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter spots based on search query
  const filteredSpots = spots.filter(spot => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    return (
      spot.title.toLowerCase().includes(query) ||
      spot.location?.toLowerCase().includes(query) ||
      spot.description.toLowerCase().includes(query) ||
      spot.spot_type?.toLowerCase().includes(query)
    )
  })

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Search Bar */}
      <div className="relative">
        <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search spots by title, location, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9A4312] focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-medium"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tighter text-[#9A4312]">
          Results ({filteredSpots.length})
        </h1>
        {searchQuery && (
          <span className="text-sm text-gray-500">
            Searching for: <span className="font-semibold">"{searchQuery}"</span>
          </span>
        )}
      </div>

      {/* Spots Grid */}
      {filteredSpots.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-[25px]">
          <p className="text-gray-400 text-lg">
            {searchQuery ? `No spots found for "${searchQuery}"` : 'No spots submitted yet. Be the first!'}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-[#9A4312] hover:underline font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSpots.map((spot) => (
            <div
              key={spot.id}
              id="spots-card"
              className="rounded-[25px] bg-white flex flex-col self-start"
            >
              {/* Image of Skate Spot */}
              {spot.image_url && (
                <div className="w-full h-[200px] overflow-hidden rounded-t-[25px]">
                  <img 
                    src={spot.image_url} 
                    alt={spot.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col gap-2 p-4">
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight">
                    {spot.title}
                  </span>
                  {spot.location && (
                    <span className="text-sm text-gray-500 mt-1">
                      {spot.location}
                    </span>
                  )}
                  <span className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {spot.description}
                  </span>
                  <span className="text-xs text-gray-400 font-medium mt-2">
                    Submitted by: {spot.user_profiles?.username || 'Anonymous'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-medium mt-2">
                  <Badge variant="outline" className="font-bold">
                    Bust Level: {spot.bust_level}/5
                  </Badge>
                  {spot.spot_type && (
                    <Badge className="bg-[#9A4312] text-white capitalize">
                      {spotCategories.find(c => c.key === spot.spot_type)?.icon} {spot.spot_type}
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2 mt-2">
                  <Link href={`/spots/${spot.id}`} className="flex-1">
                    <Button className="w-full border-[#9A4312] border-2 bg-white text-[#9A4312] hover:bg-[#9A4312] hover:text-white font-bold">
                      <TbBinoculars className="inline" /> View Details
                    </Button>
                  </Link>
                  {spot.google_maps_url && (
                    <Link href={spot.google_maps_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="font-bold">
                        <FaGoogle className="inline" /> <TbBrandGoogleMaps className="inline" /> 
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
