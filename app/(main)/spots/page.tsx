import React from "react";
import { spotsData, spotCategories } from "@/lib/data";
import { LuFilter } from "react-icons/lu";
import { TbBinoculars } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import SpotFilters from "@/components/main/spot-filters";

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

  // Filter spots based on active filters (server-side)
  const filteredSpots = activeFilters.length > 0
    ? spotsData.filter(spot => activeFilters.includes(spot.spotType.toLowerCase()))
    : spotsData;
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
          <Button className="bg-[#FEE0AA] hover:bg-gray-100 text-amber-950">
            <LuFilter className="inline" /> Filters{" "}
          </Button>
        </div>

        {/* Filters for Spots*/}
        <SpotFilters />

        <main className="w-full flex flex-col gap-4">
          <h1 className="text-3xl font-black tracking-tighter text-[#9A4312]">
            Results ({filteredSpots.length})
          </h1>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSpots.map((spot) => {
              return (
                <div
                key={spot.id}
                  id="spots-card"
                  className="rounded-[25px] bg-white flex flex-col"
                >
                  {/* Attachment of Skate Spot */}
                  {/* <div className='w-full h-[200px] flex justify-center items-center bg-gray-200 p-4 rounded-t-[25px] text-2xl'><TbSkateboard /></div> */}

                  <div className="flex flex-col gap-2 p-4">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold tracking-tight">
                        {spot.spotName}
                      </span>
                      <span className="text-xs text-gray-400 font-bold tracking-tight">
                        {spot.spotLocation}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 text-xs font-medium">
                      <Badge className="font-bold">
                        {spotCategories.find(e => e.key === spot.spotType.toLowerCase())?.icon} {spot.spotType}
                      </Badge>
                    </div>
                    <Link href={`/spots/${spot.id}`}><Button className="border-[#9A4312] border-2 bg-white text-[#9A4312] hover:bg-[#9A4312] hover:text-white font-bold text-xl self-end">
                      <TbBinoculars className="inline" /> Visit
                    </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </section>
        </main>
      </section>
    </div>
  );
};

export default SpotsPage;
