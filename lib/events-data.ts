// Event Types Configuration
export const eventTypes = {
  session: {
    label: 'Session',
    color: '#10B981', // Green
    bgColor: '#ECFDF5',
    svgPath: '/images/events/session.svg'
  },
  hangout: {
    label: 'Hangout',
    color: '#3B82F6', // Blue
    bgColor: '#EFF6FF',
    svgPath: '/images/events/hangout.svg'
  },
  jam: {
    label: 'Jam',
    color: '#F59E0B', // Amber
    bgColor: '#FEF3C7',
    svgPath: '/images/events/jam.svg'
  },
  lesson: {
    label: 'Lesson',
    color: '#8B5CF6', // Purple
    bgColor: '#F5F3FF',
    svgPath: '/images/events/lesson.svg'
  },
  other: {
    label: 'Other',
    color: '#6B7280', // Gray
    bgColor: '#F9FAFB',
    svgPath: '/images/events/other.svg'
  }
} as const

export type EventType = keyof typeof eventTypes

// Mock Events Data
export const mockEvents = [
  {
    id: 1,
    created_at: '2024-01-15T10:00:00Z',
    name: 'Saturday Morning Session',
    description: 'Weekly session at the local park. All skill levels welcome! Bring your board and let\'s skate together.',
    location: 'Echo Lake Park, NJ',
    date: '2024-01-20',
    created_by: '123e4567-e89b-12d3-a456-426614174000',
    shop_id: null,
    type: 'session' as EventType
  },
  {
    id: 2,
    created_at: '2024-01-16T14:00:00Z',
    name: 'Beginner Tricks Workshop',
    description: 'Learn the basics! We\'ll cover ollies, kickflips, and proper board control. Perfect for beginners.',
    location: 'Jersey City Skatepark',
    date: '2024-01-22',
    created_by: '123e4567-e89b-12d3-a456-426614174001',
    shop_id: null,
    type: 'lesson' as EventType
  },
  {
    id: 3,
    created_at: '2024-01-17T09:00:00Z',
    name: 'Chill Sunday Hangout',
    description: 'Just hanging out, skating casually, and meeting new people. Bring snacks!',
    location: 'Asbury Park Boardwalk',
    date: '2024-01-21',
    created_by: '123e4567-e89b-12d3-a456-426614174002',
    shop_id: null,
    type: 'hangout' as EventType
  },
  {
    id: 4,
    created_at: '2024-01-18T11:00:00Z',
    name: 'Street Jam Competition',
    description: 'Friendly competition with prizes! Best trick contests, giveaways, and good vibes all around.',
    location: 'Downtown Newark Plaza',
    date: '2024-01-25',
    created_by: '123e4567-e89b-12d3-a456-426614174003',
    shop_id: null,
    type: 'jam' as EventType
  },
  {
    id: 5,
    created_at: '2024-01-19T15:00:00Z',
    name: 'Advanced Bowl Session',
    description: 'For experienced skaters looking to push their limits in the bowl. Fast-paced and technical.',
    location: 'Princeton Skatepark',
    date: '2024-01-23',
    created_by: '123e4567-e89b-12d3-a456-426614174004',
    shop_id: null,
    type: 'session' as EventType
  },
  {
    id: 6,
    created_at: '2024-01-20T12:00:00Z',
    name: 'Community Meetup',
    description: 'Monthly community gathering to discuss future events, share stories, and connect with fellow skaters.',
    location: 'Red Bank Community Center',
    date: '2024-01-27',
    created_by: '123e4567-e89b-12d3-a456-426614174005',
    shop_id: null,
    type: 'other' as EventType
  }
]
