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

export interface Project {
  id: number
  title: string
  description: string
  demo?: string
  github?: string
  techStack: string[]
  timeline?: string
  role?: string
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
