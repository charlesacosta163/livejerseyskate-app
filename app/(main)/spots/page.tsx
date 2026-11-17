import React from "react";
import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SpotFilters from "@/components/main/spot-filters";
import SpotsList from "@/components/main/spots-list";
import { getAllSkateSpots } from "@/lib/actions";

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
          <Link href="/spots/new"><Button className="bg-amber-500 text-white font-bold hover:bg-[#9A4312] hover:text-white">
            <LuPlus className="inline" /> New Spot{" "}
          </Button></Link>
        </div>

        {/* Filters for Spots */}
        <SpotFilters />

        {/* Spots List with Search */}
        <SpotsList spots={filteredSpots} />
      </section>
    </div>
  );
};

export default SpotsPage;
