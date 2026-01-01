const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

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

  const json: StrapiResponse<any[]> = await response.json()
  return {
    posts: json.data,
    pagination: json.meta.pagination,
  }
}

export async function fetchBlogPostBySlug(slug: string) {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[0]': 'coverImage',
    'populate[1]': 'categories',
    'populate[2]': 'tags',
  })

  const response = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`)
  if (!response.ok) throw new Error('Failed to fetch blog post')

  const json: StrapiResponse<any[]> = await response.json()
  return json.data[0] || null
}

export async function fetchCategoryBySlug(slug: string) {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
  })

  const response = await fetch(`${STRAPI_URL}/api/categories?${params}`)
  if (!response.ok) throw new Error('Failed to fetch category')

  const json: StrapiResponse<any[]> = await response.json()
  return json.data[0] || null
}

export async function fetchPostsByCategory(slug: string) {
  const params = new URLSearchParams({
    'filters[categories][slug][$eq]': slug,
    'populate[0]': 'coverImage',
    sort: 'publishedAt:desc',
  })

  const response = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`)
  if (!response.ok) throw new Error('Failed to fetch posts by category')

  const json: StrapiResponse<any[]> = await response.json()
  return json.data
}

export async function fetchTagBySlug(slug: string) {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
  })

  const response = await fetch(`${STRAPI_URL}/api/tags?${params}`)
  if (!response.ok) throw new Error('Failed to fetch tag')

  const json: StrapiResponse<any[]> = await response.json()
  return json.data[0] || null
}

export async function fetchPostsByTag(slug: string) {
  const params = new URLSearchParams({
    'filters[tags][slug][$eq]': slug,
    'populate[0]': 'coverImage',
    sort: 'publishedAt:desc',
  })

  const response = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`)
  if (!response.ok) throw new Error('Failed to fetch posts by tag')

  const json: StrapiResponse<any[]> = await response.json()
  return json.data
}
