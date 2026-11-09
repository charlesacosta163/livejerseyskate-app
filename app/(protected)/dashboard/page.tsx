import { redirect } from 'next/navigation'

import { LogoutButton } from '@/components/logout-button'
import { createClient } from '@/lib/supabase/server'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  // <p>
  //       Hello <span>{data.claims.email}</span>
  //     </p>

  return (
    <div className="flex justify-center items-center h-auto">
      <LogoutButton />
    </div>
  )
}
