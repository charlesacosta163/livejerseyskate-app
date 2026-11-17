'use client'

import React from 'react'
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { eventTypes } from '@/lib/events-data'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LuX } from "react-icons/lu"

const EventFilters = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Get active filters from URL
  const activeFilters = searchParams.getAll('filter')

  const toggleFilter = (typeKey: string) => {
    const params = new URLSearchParams(searchParams)
    const currentFilters = params.getAll('filter')

    if (currentFilters.includes(typeKey)) {
      // Remove filter
      params.delete('filter')
      currentFilters
        .filter(f => f !== typeKey)
        .forEach(f => params.append('filter', f))
    } else {
      // Add filter
      params.append('filter', typeKey)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push(pathname)
  }

  return (
    <>
      {/* Event Type Legend - Now Interactive */}
      <div className="w-full flex flex-wrap gap-2 justify-center sm:justify-start">
        {Object.entries(eventTypes).map(([key, config]: any) => {
          const isActive = activeFilters.includes(key)
          return (
            <Badge 
              key={key}
              variant="outline" 
              className="text-xs font-medium capitalize cursor-pointer transition-all hover:shadow-md"
              style={{ 
                borderColor: config.color,
                backgroundColor: isActive ? config.color : 'transparent',
                color: isActive ? 'white' : config.color
              }}
              onClick={() => toggleFilter(key)}
            >
              {config.label}
            </Badge>
          )
        })}
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex gap-2 items-center w-full flex-wrap">
          <span className="text-sm font-medium text-gray-600">Active Filters:</span>
          {activeFilters.map(filter => {
            const config = eventTypes[filter as keyof typeof eventTypes]
            return (
              <Badge 
                key={filter}
                className="cursor-pointer text-white"
                style={{ 
                  backgroundColor: config.color,
                }}
                onClick={() => toggleFilter(filter)}
              >
                {config.label}
                <LuX className="ml-1 inline" size={14} />
              </Badge>
            )
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear All
          </Button>
        </div>
      )}
    </>
  )
}

export default EventFilters
