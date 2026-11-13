import type {
  BlogPost,
  Category,
  Tag,
  Comment,
  PostStat,
  Project,
  ExperienceEntry,
  Profile,
  Education,
  Certification,
  SkillGroup,
  NewsletterResult,
} from './types'
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

/**
 * Strapi omits relation fields that were not included via `populate`, so a
 * post can legitimately arrive without `categories`/`tags` even though the
 * `BlogPost` type declares them. Normalise them to empty arrays here so
 * consumers (e.g. PostCard) never dereference `undefined`.
 */
function normalizePost(post: BlogPost): BlogPost {
  return {
    ...post,
    categories: post.categories ?? [],
    tags: post.tags ?? [],
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
    posts: json.data.map(normalizePost),
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

  return post ? normalizePost(post) : null
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
    'populate[1]': 'categories',
    'populate[2]': 'tags',
    sort: 'publishedAt:desc',
  })

  const response = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`)
  if (!response.ok) throw new Error('Failed to fetch posts by category')

  const json: StrapiResponse<BlogPost[]> = await response.json()

  return json.data.map(normalizePost)
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
    'populate[1]': 'categories',
    'populate[2]': 'tags',
    sort: 'publishedAt:desc',
  })

  const response = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`)
  if (!response.ok) throw new Error('Failed to fetch posts by tag')

  const json: StrapiResponse<BlogPost[]> = await response.json()

  return json.data.map(normalizePost)
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

const PROJECTS_POPULATE = { 'populate[0]': 'image' }

export async function fetchFeaturedProjects(limit = 6): Promise<Project[]> {
  const params = new URLSearchParams({
    ...PROJECTS_POPULATE,
    'filters[featured][$eq]': 'true',
    sort: 'order:asc',
    'pagination[pageSize]': limit.toString(),
  })
  const response = await fetch(`${STRAPI_URL}/api/projects?${params}`)
  if (!response.ok) return []
  const json: StrapiResponse<Project[]> = await response.json()
  return json.data
}

export async function fetchProjectsPage({
  page = 1,
  pageSize = 12,
  category = 'all',
}: {
  page?: number
  pageSize?: number
  category?: string
}): Promise<{
  projects: Project[]
  total: number
  page: number
  pageSize: number
}> {
  const params = new URLSearchParams({
    ...PROJECTS_POPULATE,
    sort: 'order:asc',
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
  })
  if (category !== 'all') {
    params.set('filters[category][$eq]', category)
  }

  const response = await fetch(`${STRAPI_URL}/api/projects?${params}`)
  if (!response.ok) {
    return { projects: [], total: 0, page, pageSize }
  }

  const json: StrapiResponse<Project[]> = await response.json()
  return {
    projects: json.data,
    total: json.meta.pagination?.total ?? json.data.length,
    page,
    pageSize,
  }
}

export async function fetchExperiences(): Promise<ExperienceEntry[]> {
  const params = new URLSearchParams({
    sort: 'order:asc',
    'pagination[pageSize]': '50',
  })
  const response = await fetch(`${STRAPI_URL}/api/experiences?${params}`)
  if (!response.ok) return []
  const json: StrapiResponse<ExperienceEntry[]> = await response.json()
  return json.data
}

export async function fetchProfile(): Promise<Profile | null> {
  const response = await fetch(`${STRAPI_URL}/api/profile?populate=*`)
  if (!response.ok) return null
  const json: StrapiResponse<Profile | null> = await response.json()
  return json.data ?? null
}

export async function fetchEducation(): Promise<Education | null> {
  const response = await fetch(`${STRAPI_URL}/api/education?populate=*`)
  if (!response.ok) return null
  const json: StrapiResponse<Education | null> = await response.json()
  return json.data ?? null
}

export async function fetchCertifications(): Promise<Certification[]> {
  const params = new URLSearchParams({
    sort: 'order:asc',
    'pagination[pageSize]': '100',
  })
  const response = await fetch(`${STRAPI_URL}/api/certifications?${params}`)
  if (!response.ok) return []
  const json: StrapiResponse<Certification[]> = await response.json()
  return json.data
}

export async function fetchSkillGroups(): Promise<SkillGroup[]> {
  const params = new URLSearchParams({
    sort: 'order:asc',
    'pagination[pageSize]': '100',
  })
  const response = await fetch(`${STRAPI_URL}/api/skill-groups?${params}`)
  if (!response.ok) return []
  const json: StrapiResponse<SkillGroup[]> = await response.json()
  return json.data
}

export async function fetchAllCategories(): Promise<Category[]> {
  const response = await fetch(`${STRAPI_URL}/api/categories?sort=name:asc`)
  if (!response.ok) return []
  const json: StrapiResponse<Category[]> = await response.json()
  return json.data
}

export async function fetchAllTags(): Promise<Tag[]> {
  const params = new URLSearchParams({
    sort: 'name:asc',
    'pagination[pageSize]': '100',
  })
  const response = await fetch(`${STRAPI_URL}/api/tags?${params}`)
  if (!response.ok) return []
  const json: StrapiResponse<Tag[]> = await response.json()
  return json.data
}

async function strapiError(response: Response): Promise<string> {
  try {
    const body = await response.json()
    const message = body?.error?.message ?? body?.error ?? body?.message
    if (typeof message === 'string' && message.trim()) return message
  } catch {
    // fall through to the generic message
  }
  return 'Something went wrong. Please try again.'
}

export async function subscribeToNewsletter(
  email: string,
  source: string,
): Promise<NewsletterResult> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    })

    if (!response.ok) {
      return { ok: false, error: await strapiError(response) }
    }

    return { ok: true, status: 'pending' }
  } catch {
    return { ok: false, error: 'Could not reach the subscription service.' }
  }
}

export async function confirmSubscription(
  token: string,
): Promise<NewsletterResult> {
  try {
    const params = new URLSearchParams({ token })
    const response = await fetch(`${STRAPI_URL}/api/newsletter/confirm?${params}`)
    if (response.ok) return { ok: true, status: 'confirmed' }
    return { ok: false, error: await strapiError(response) }
  } catch {
    return { ok: false, error: 'Could not reach the subscription service.' }
  }
}

export async function unsubscribeFromNewsletter(
  token: string,
): Promise<NewsletterResult> {
  try {
    const params = new URLSearchParams({ token })
    const response = await fetch(`${STRAPI_URL}/api/newsletter/unsubscribe?${params}`)
    if (response.ok) return { ok: true, status: 'unsubscribed' }
    return { ok: false, error: await strapiError(response) }
  } catch {
    return { ok: false, error: 'Could not reach the subscription service.' }
  }
}

export async function fetchFeaturedPosts(): Promise<BlogPost[]> {
  const params = new URLSearchParams({
    'filters[featured][$eq]': 'true',
    'populate[0]': 'coverImage',
    'populate[1]': 'categories',
    'populate[2]': 'tags',
    'pagination[pageSize]': '3',
    sort: 'publishedAt:desc',
  })

  const response = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`)
  if (!response.ok) return []

  const json: StrapiResponse<BlogPost[]> = await response.json()

  return json.data.map(normalizePost)
}
