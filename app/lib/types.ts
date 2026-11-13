export interface BlogPost {
  id: number
  documentId: string
  title: string
  subtitle?: string
  slug: string
  excerpt: string
  content: string
  coverImage?: {
    url: string
    alternativeText?: string
  }
  readTime?: number
  featured: boolean
  publishedAt: string
  categories: Array<{ name: string; slug: string }>
  tags: Array<{ name: string; slug: string }>
}

export interface Category {
  name: string
  slug: string
  description?: string
}

export interface Tag {
  name: string
  slug: string
}

export interface Comment {
  id: number
  documentId: string
  name: string
  body: string
  createdAt: string
}

export interface PostStat {
  likeCount: number
}

export type ProjectCategory = 'ai-ml' | 'fullstack' | 'tools' | 'research'

export interface Project {
  id: number
  documentId?: string
  title: string
  description: string
  demo?: string
  github?: string
  techStack: string[]
  timeline?: string
  status?: string
  role?: string
  category?: ProjectCategory
  featured?: boolean
  features?: string[]
  image?: { url: string; alternativeText?: string }
  order?: number
}

export interface ExperienceEntry {
  id: number
  title: string
  company: string
  period: string
  description: string[]
  tech?: string[]
  type: 'work' | 'activity'
  order?: number
}

export type SocialIcon =
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'website'
  | 'email'

export interface SocialLink {
  label: string
  url: string
  icon: SocialIcon
}

export interface Profile {
  name: string
  role: string
  tagline?: string
  bio?: string
  location?: string
  availability?: string
  email?: string
  phone?: string
  website?: string
  socials?: SocialLink[]
}

export interface CourseworkGroup {
  title: string
  courses: string[]
}

export interface Education {
  institution: string
  degree?: string
  period?: string
  gpa?: string
  courseworkGroups?: CourseworkGroup[]
}

export interface Certification {
  id: number
  title: string
  issuer?: string
  dateLabel?: string
  kind: 'training' | 'award' | 'scholarship' | 'shortlist'
  url?: string
  order?: number
}

export type SkillIcon =
  | 'code'
  | 'monitor'
  | 'server'
  | 'globe'
  | 'gamepad'
  | 'sparkles'
  | 'cpu'
  | 'wrench'

export interface SkillGroup {
  id: number
  title: string
  icon: SkillIcon
  items: string[]
  order?: number
}
