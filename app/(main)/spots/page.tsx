import React from "react";
import { spotCategories } from "@/lib/data";
import { LuFilter, LuPlus } from "react-icons/lu";
import { TbBinoculars, TbBrandGoogleMaps } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import SpotFilters from "@/components/main/spot-filters";
import { getAllSkateSpots } from "@/lib/actions";
import { FaGoogle } from "react-icons/fa";

interface SpotsPageProps {
  searchParams: Promise<{ filter?: string | string[] }>;
}

const SpotsPage = async ({ searchParams }: SpotsPageProps) => {
  const params = await searchParams;
  const activeFilters = params.filter 
    ? Array.isArray(params.filter) 
      ? params.filter 
      : [params.filter]
    : [];

  // Fetch spots from database
  const spots = await getAllSkateSpots();

  // Filter spots based on active filters (server-side)
  const filteredSpots = activeFilters.length > 0
    ? spots.filter(spot => activeFilters.includes(spot.spot_type?.toLowerCase()))
    : spots;
  return (
    <div className="flex flex-col gap-4">
      <section id="header" className="flex gap-4 flex-col items-center">
        <div className="flex items-center justify-between w-full gap-2">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tighter text-[#431b07]">
              Skate Spots Catalog
            </h1>
            <p className="text-gray-400 font-medium text-sm">
              Submitted by our beloved community members.
            </p>
          </div>
          <Link href="/spots/new"><Button className="bg-[#8daaff] text-white font-bold hover:bg-[#9A4312] hover:text-white">
            <LuPlus className="inline" /> New Spot{" "}
          </Button></Link>
        </div>

        {/* Filters for Spots */}
        <SpotFilters />

        <main className="w-full flex flex-col gap-4">
          <h1 className="text-3xl font-black tracking-tighter text-[#9A4312]">
            Results ({filteredSpots.length})
          </h1>

          {filteredSpots.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-[25px]">
              <p className="text-gray-400 text-lg">No spots submitted yet. Be the first!</p>
            </div>
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSpots.map((spot) => {
                return (
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
                );
              })}
            </section>
          )}
        </main>
      </section>
    </div>
  );
};

export default SpotsPage;
