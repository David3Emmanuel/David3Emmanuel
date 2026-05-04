import type { BlogPost, Category, Tag, Comment, PostStat } from './types'
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

  return {
    posts: json.data,
    pagination: json.meta.pagination,
  }
}

export async function fetchBlogPostBySlug(
  slug: string,
  status?: string,
): Promise<BlogPost | null> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[0]': 'coverImage',
    'populate[1]': 'categories',
    'populate[2]': 'tags',
  })

  if (status === 'draft') {
    params.set('status', 'draft')
  }

  const response = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`)
  if (!response.ok) throw new Error('Failed to fetch blog post')

  const json: StrapiResponse<BlogPost[]> = await response.json()
  const post = json.data[0] || null

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

export async function fetchPostStat(slug: string): Promise<PostStat | null> {
  const params = new URLSearchParams({
    'filters[blog_post][slug][$eq]': slug,
  })

  const response = await fetch(`${STRAPI_URL}/api/post-stats?${params}`)
  if (!response.ok) return null

  const json: StrapiResponse<PostStat[]> = await response.json()
  return json.data[0] || null
}

export async function likePost(slug: string): Promise<{ likeCount: number }> {
  const response = await fetch(`${STRAPI_URL}/api/post-stats/${slug}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) throw new Error('Failed to like post')
  return response.json()
}

export async function fetchComments(slug: string): Promise<Comment[]> {
  const params = new URLSearchParams({
    'filters[blog_post][slug][$eq]': slug,
    'filters[approved][$eq]': 'true',
    sort: 'createdAt:asc',
  })

  const response = await fetch(`${STRAPI_URL}/api/comments?${params}`)
  if (!response.ok) return []

  const json: StrapiResponse<Comment[]> = await response.json()
  return json.data
}

export async function submitComment(
  postDocumentId: string,
  data: { name: string; email: string; body: string },
): Promise<void> {
  const response = await fetch(`${STRAPI_URL}/api/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: {
        name: data.name,
        email: data.email,
        body: data.body,
        blog_post: postDocumentId,
      },
    }),
  })
  if (!response.ok) throw new Error('Failed to submit comment')
}
