import type { BlogPost, Category, Tag } from './types'
import { env } from './env'

const STRAPI_URL = env.STRAPI_URL

interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export async function fetchBlogPosts(page = 1, pageSize = 12) {
  const params = new URLSearchParams({
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    'populate[0]': 'coverImage',
    'populate[1]': 'categories',
    'populate[2]': 'tags',
    sort: 'publishedAt:desc',
  })

  const response = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`)
  if (!response.ok) throw new Error('Failed to fetch blog posts')

  const json: StrapiResponse<BlogPost[]> = await response.json()

  json.data.forEach((post) => {
    if (post?.coverImage)
      post.coverImage.url = `${STRAPI_URL}${post.coverImage.url}`
  })

  return {
    posts: json.data,
    pagination: json.meta.pagination,
  }
}

export async function fetchBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[0]': 'coverImage',
    'populate[1]': 'categories',
    'populate[2]': 'tags',
  })

  const response = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`)
  if (!response.ok) throw new Error('Failed to fetch blog post')

  const json: StrapiResponse<BlogPost[]> = await response.json()
  const post = json.data[0] || null

  if (post?.coverImage)
    post.coverImage.url = `${STRAPI_URL}${post.coverImage.url}`

  return post
}

export async function fetchCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
  })

  const response = await fetch(`${STRAPI_URL}/api/categories?${params}`)
  if (!response.ok) throw new Error('Failed to fetch category')

  const json: StrapiResponse<Category[]> = await response.json()
  return json.data[0] || null
}

export async function fetchPostsByCategory(slug: string): Promise<BlogPost[]> {
  const params = new URLSearchParams({
    'filters[categories][slug][$eq]': slug,
    'populate[0]': 'coverImage',
    sort: 'publishedAt:desc',
  })

  const response = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`)
  if (!response.ok) throw new Error('Failed to fetch posts by category')

  const json: StrapiResponse<BlogPost[]> = await response.json()

  json.data.forEach((post) => {
    if (post?.coverImage)
      post.coverImage.url = `${STRAPI_URL}${post.coverImage.url}`
  })

  return json.data
}

export async function fetchTagBySlug(slug: string): Promise<Tag | null> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
  })

  const response = await fetch(`${STRAPI_URL}/api/tags?${params}`)
  if (!response.ok) throw new Error('Failed to fetch tag')

  const json: StrapiResponse<Tag[]> = await response.json()
  return json.data[0] || null
}

export async function fetchPostsByTag(slug: string): Promise<BlogPost[]> {
  const params = new URLSearchParams({
    'filters[tags][slug][$eq]': slug,
    'populate[0]': 'coverImage',
    sort: 'publishedAt:desc',
  })

  const response = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`)
  if (!response.ok) throw new Error('Failed to fetch posts by tag')

  const json: StrapiResponse<BlogPost[]> = await response.json()

  json.data.forEach((post) => {
    if (post?.coverImage)
      post.coverImage.url = `${STRAPI_URL}${post.coverImage.url}`
  })

  return json.data
}
