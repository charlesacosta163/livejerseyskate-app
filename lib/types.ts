export interface UserProfile {
  id: number
  created_at: string
  username: string
  bio: string | null
  role: string
  email: string
  user_id: string
}

export interface SkateSpot {
  id: number
  created_at: string
  title: string
  description: string
  image_url: string | null
  location: string
  spot_type: string
  bust_level: number
  google_maps_url: string
  user_id: string
  status: 'pending' | 'approved' | 'rejected'
  user_profiles?: {
    username: string
  }
}
