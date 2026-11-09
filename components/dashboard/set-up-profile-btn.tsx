'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'

export default function SetUpProfileBtn() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending}>
      {pending ? 'Saving...' : 'Save Changes'}
    </Button>
  )
}