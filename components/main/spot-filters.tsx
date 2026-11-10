'use client'

import React from 'react'
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { spotCategories } from '@/lib/data';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuX } from "react-icons/lu";

const SpotFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get active filters from URL
  const activeFilters = searchParams.getAll('filter');

  const toggleFilter = (categoryKey: string) => {
    const params = new URLSearchParams(searchParams);
    const currentFilters = params.getAll('filter');

    if (currentFilters.includes(categoryKey)) {
      // Remove filter
      params.delete('filter');
      currentFilters
        .filter(f => f !== categoryKey)
        .forEach(f => params.append('filter', f));
    } else {
      // Add filter
      params.append('filter', categoryKey);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(pathname);
  };

  return (
    <>
      {/* Spot Categories */}
      <div
        id="selections"
        className="flex gap-1 p-4 bg-white/60 rounded-2xl w-full overflow-x-auto
              sm:[&>div]:min-w-[155px]
              [&>div]:min-w-[75px]
          "
      >
        {spotCategories.map(category => {
          const isActive = activeFilters.includes(category.key);
          return(
            <div 
              key={category.key} 
              onClick={() => toggleFilter(category.key)}
              className={`flex flex-col items-center p-2 rounded-[20px] cursor-pointer transition-colors ${
                isActive 
                  ? 'bg-[#9A4312] text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {category.icon}
              <span className="text-xs font-medium"> {category.key}</span>
            </div>
          )
        })}
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex gap-2 items-center w-full flex-wrap">
          <span className="text-sm font-medium text-gray-600">Active Filters:</span>
          {activeFilters.map(filter => (
            <Badge 
              key={filter}
              className="bg-[#9A4312] hover:bg-[#7a3410] text-white cursor-pointer"
              onClick={() => toggleFilter(filter)}
            >
              {spotCategories.find(category => category.key === filter)?.icon} {filter}
              <LuX className="ml-1 inline" size={14} />
            </Badge>
          ))}
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

export default SpotFilters