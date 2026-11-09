import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { LuCalendarDays, LuMapPinCheck } from "react-icons/lu";
import { TbBuildingEstate } from 'react-icons/tb'


export default function LandingPage() {
  return (
    <div className="flex flex-col">

      <section id="hero" className='flex justify-center flex-col items-center gap-4 h-[70svh]'>

      <Badge className='bg-[#F98C16]/75 font-bold py-1 px-3'><TbBuildingEstate className="inline"/> Made for the New Jersey Skate Community</Badge> 

        <div className="flex flex-col gap-4 items-center text-center max-w-[700px]">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-balance text-[#431b07]">Find your next spot. Plan your next session.</h1>
          <p className="text-[#431b07]/50 font-medium text-balance">Discover skate spots across New Jersey, find upcoming community events, and stay connected with the local skate scene.</p>
        </div>

        <div className="flex gap-4 items-center">
          <Link href='/events'><Button className="bg-[#431b07] text-[#fffaf0]"><LuCalendarDays className="inline"/> See Events</Button></Link>
          <Link href='/spots'><Button className='bg-[#FEE0AA] text-[#431b07]'><LuMapPinCheck className="inline"/> Browse Spots</Button></Link>
        </div>


      </section>

    </div>
  );
}
