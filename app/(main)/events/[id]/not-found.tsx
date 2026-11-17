import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LuArrowLeft } from 'react-icons/lu'

export default function EventNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <h1 className="text-6xl font-black text-gray-200">404</h1>
      <h2 className="text-2xl font-bold text-gray-900">Event Not Found</h2>
      <p className="text-gray-600 max-w-md">
        The event you're looking for doesn't exist or may have been removed.
      </p>
      <Link href="/events">
        <Button className="bg-[#9A4312] hover:bg-[#7a3410] text-white">
          <LuArrowLeft className="inline mr-2" />
          Back to Events
        </Button>
      </Link>
    </div>
  )
}
