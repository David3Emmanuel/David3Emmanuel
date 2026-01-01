export interface BlogPost {
  id: number
  documentId: string
  title: string
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
