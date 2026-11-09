import { BsBox2 } from "react-icons/bs";
import { GiJumpAcross } from "react-icons/gi";
import { LuTriangleRight } from "react-icons/lu";
import { PiParallelogram } from "react-icons/pi";
import { RiStairsLine } from "react-icons/ri";
import { TbRectangularPrism, TbTagStarred } from "react-icons/tb";

// **TESTING BEFORE DATABASE IMPLEMENTATION**
export const spotsData = [
    {
      id: 1,
      spotName: "Black Hubba",
      // ** TEMPORARY - WILL USE SUPABASE ATTACHMENTS
      spotImage: "https://www.thrashermagazine.com/mediaV2/k2/items/cache/2c8cda9380c4a8e755c10cef663a79c5_L.jpg?t=1702495744",
      spotDescription:
        "Popular skate spot in NYC, fine marble ledge, best on weekends",
      spotType: "hubba",
      spotLocation: "New York, NY",
      bustLevel: 1,
      addressLink:
        "https://www.google.com/maps/place/Foley+Square/@40.7143131,-74.0030902,9a,75y,73.75h,90.72t/data=!3m7!1e1!3m5!1sgeAE7mRwlrTqGW7a7SmSZQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.clients6.google.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-0.7239882485690714%26panoid%3DgeAE7mRwlrTqGW7a7SmSZQ%26yaw%3D73.75261621187957!7i16384!8i8192!4m14!1m7!3m6!1s0x89c25a2172220cb7:0xcdfe8a84db974d1c!2sFoley+Square!8m2!3d40.7143512!4d-74.0029927!16zL20vMDlsdHdy!3m5!1s0x89c25a2172220cb7:0xcdfe8a84db974d1c!8m2!3d40.7143512!4d-74.0029927!16zL20vMDlsdHdy?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D",
        submittedBy: "JohnDoe123"
    },
    {
      id: 2,
      // ** TEMPORARY - WILL USE SUPABASE ATTACHMENTS
      spotImage: "https://www.dunnlumber.com/media/magefan_blog/2018/08/What-is-Kebony-hero-ps-min-scaled.jpg",
      spotName: "Kean University Wood Ledges",
      spotDescription:
        "Wooden ledges, 3 levels, be careful for passing students. No one really bothers you here.",
      spotType: "ledge",
      spotLocation: "Union, NJ",
      bustLevel: 2,
      addressLink:
        "https://www.google.com/maps/place/Kean+University/@40.6829727,-74.2331815,16a,75y,254.77h,66.27t/data=!3m7!1e1!3m5!1svW5qZLg6nSFuIjWPDTTLbA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.clients6.google.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D23.731081369380675%26panoid%3DvW5qZLg6nSFuIjWPDTTLbA%26yaw%3D254.77008206954704!7i16384!8i8192!4m16!1m8!3m7!1s0x89c3ad5b6a0b3391:0x76c486324be28e94!2sKean+University!8m2!3d40.6801659!4d-74.23311!10e5!16zL20vMDFyNDVq!3m6!1s0x89c3ad5b6a0b3391:0x76c486324be28e94!8m2!3d40.6801659!4d-74.23311!10e5!16zL20vMDFyNDVq?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D",
        submittedBy: "JohnDoe123"
    },
    {
      id: 3,
      // ** TEMPORARY - WILL USE SUPABASE ATTACHMENTS
      spotImage: "https://www.kean.edu/sites/default/files/styles/highlight/public/2022-12/Hynes%20Hall%20%281200%29.png?h=242cd5c8&itok=9U4yLVw_",
      spotName: "Kean University Hynes Hall 6 Stair",
      spotDescription:
        "Nice little 6 stair. Be careful of passing students and occasional security. Best on weekends",
      spotType: "stair",
      spotLocation: "Union, NJ",
      bustLevel: 3,
      addressLink:
        "https://www.google.com/maps/place/Kean+University/@40.6827386,-74.2329414,16a,75y,72.18h,79.47t/data=!3m7!1e1!3m5!1sjc7OOi1bDx2LMOIYN4lYkQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.clients6.google.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D10.53169640963604%26panoid%3Djc7OOi1bDx2LMOIYN4lYkQ%26yaw%3D72.17529427219057!7i16384!8i8192!4m16!1m8!3m7!1s0x89c3ad5b6a0b3391:0x76c486324be28e94!2sKean+University!8m2!3d40.6801659!4d-74.23311!10e5!16zL20vMDFyNDVq!3m6!1s0x89c3ad5b6a0b3391:0x76c486324be28e94!8m2!3d40.6801659!4d-74.23311!10e5!16zL20vMDFyNDVq?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D",
        submittedBy: "JohnDoe123"
    },
  ];

  
export const spotCategories = [
    {key: 'stair', icon: <RiStairsLine />},
    {key: 'ledge', icon: <BsBox2 />},
    {key: 'gap', icon: <GiJumpAcross />},
    {key: 'bank', icon: <LuTriangleRight />},
    {key: 'flatground', icon: <PiParallelogram />},
    {key: 'hubba', icon: <TbRectangularPrism />},
    {key: 'other', icon: <TbTagStarred />},
]