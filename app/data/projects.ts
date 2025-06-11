// Import images directly
import playcineImage from '../assets/playcine.jpg'
import climaImage from '../assets/clima.jpg'
import futaElectionImage from '../assets/futa-election.jpg'
import dataCommunityImage from '../assets/data-community.png'

export interface ProjectData {
  title: string
  description: string
  demo?: string
  github?: string
  techStack: string[]
  timeline?: string
  role?: string
  features?: string[]
  image: string
}

export const projects: ProjectData[] = [
  {
    title: 'Data Community Anonymous',
    description:
      'An anonymous messaging platform for Game Night at the Data Community, UNILAG with message moderation capabilities.',
    demo: 'https://data-community-anonymous.vercel.app',
    github: 'https://github.com/data-community-anonymous',
    techStack: ['Supabase', 'React', 'Vercel'],
    features: [
      'Anonymous message submission',
      'Real-time message feed',
      'Inappropriate content flagging system',
      'Moderation of flagged messages',
    ],
    image: dataCommunityImage,
  },
  {
    title: 'PlayCINE',
    description:
      'A movie watchlist and streaming service built as a solo project in 3 weeks for my HatchDev final project.',
    demo: 'https://movie-app-frontend-zw19.onrender.com',
    github: 'https://github.com/David3Emmanuel/movie-app-frontend',
    techStack: ['NextJS', 'NestJS', 'MongoDB', 'TMDb API'],
    features: [
      'User authentication and profile management',
      'Movie search with advanced filters',
      'Watchlist creation and management',
      'Streaming server integration',
    ],
    image: playcineImage,
  },
  {
    title: 'CLIMA',
    description:
      'A weather map web application developed in collaboration with a partner.',
    demo: 'https://weather-hatchdev.vercel.app',
    github: 'https://github.com/David3Emmanuel/weather-hatchdev',
    techStack: ['React', 'MapBox', 'WeatherAPI'],
    timeline: 'Completed in 7 days for a HatchDev submission',
    features: [
      'Interactive map with real-time weather data',
      'Location-based weather forecasts',
      'Responsive design for all devices',
    ],
    image: climaImage,
  },
  {
    title: 'FUTA Sec Student Body Election Website',
    description:
      'A scalable election website for FUTA Secondary School designed to handle 2,000–4,000 voters annually.',
    github: 'https://github.com/David3Emmanuel/futa-election-backend',
    techStack: ['NestJS', 'MongoDB', 'Brevo Email API'],
    role: 'Backend Developer',
    features: [
      'Secure voting system with email verification',
      'Admin dashboard for election management',
      'Real-time result tabulation',
    ],
    image: futaElectionImage,
  },
]
