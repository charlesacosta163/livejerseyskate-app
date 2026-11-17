'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LuShare2, LuCheck } from 'react-icons/lu'

interface ShareButtonProps {
  color: string
}

export default function ShareButton({ color }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      const url = window.location.href
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleShare}
      className="flex-1 font-bold text-lg py-6 flex items-center justify-center gap-2"
      style={{ 
        borderColor: color,
        color: color
      }}
    >
      {copied ? (
        <>
          <LuCheck size={20} />
          Link Copied!
        </>
      ) : (
        <>
          <LuShare2 size={20} />
          Share Event
        </>
      )}
    </Button>
  )
}
