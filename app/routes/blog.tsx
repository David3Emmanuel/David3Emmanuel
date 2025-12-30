import { Link } from 'react-router'
import type { Route } from './+types/blog'
import Header from '../components/Header'
import Footer from '../components/Footer'

// TypeScript interfaces for Strapi blog data
interface StrapiImageFormat {
  url: string
  width: number
  height: number
}

interface StrapiImage {
  id: number
  attributes: {
    url: string
    alternativeText?: string
    caption?: string
    formats?: {
      thumbnail?: StrapiImageFormat
      small?: StrapiImageFormat
      medium?: StrapiImageFormat
      large?: StrapiImageFormat
    }
  }
}

interface BlogPostAttributes {
  title: string
  content: string
  description?: string
  slug: string
  publishedAt: string
  createdAt: string
  updatedAt: string
  cover?: {
    data?: StrapiImage
  }
  author?: {
    data?: {
      id: number
      attributes: {
        name: string
        email?: string
      }
    }
  }
}

interface BlogPost {
  id: number
  attributes: BlogPostAttributes
}

interface StrapiResponse {
  data: BlogPost[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Fetch blog posts from Strapi API
async function fetchBlogPosts(): Promise<BlogPost[]> {
  // Get configuration server-side for security
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
  const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || ''

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Add authorization header if token is provided
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`
    }

    const response = await fetch(
      `${STRAPI_URL}/api/articles?populate=*&sort=publishedAt:desc`,
      {
        headers,
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch blog posts:', response.statusText)
      return []
    }

    const result: StrapiResponse = await response.json()
    return result.data
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// Loader function to fetch data for the route
export async function loader({}: Route.LoaderArgs) {
  const posts = await fetchBlogPosts()
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
  return { posts, strapiUrl: STRAPI_URL }
}

// Meta tags for the blog page
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Blog - David Emmanuel' },
    {
      name: 'description',
      content:
        'Read articles and insights from David Emmanuel on web development, software engineering, and technology.',
    },
    { property: 'og:title', content: 'Blog - David Emmanuel' },
    {
      property: 'og:description',
      content:
        'Read articles and insights from David Emmanuel on web development, software engineering, and technology.',
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@David3Emmanuel' },
    { name: 'twitter:title', content: 'Blog - David Emmanuel' },
    {
      name: 'twitter:description',
      content:
        'Read articles and insights from David Emmanuel on web development, software engineering, and technology.',
    },
  ]
}

// Blog component
export default function Blog({ loaderData }: Route.ComponentProps) {
  const { posts, strapiUrl } = loaderData

  // Helper function to get image URL
  const getImageUrl = (post: BlogPost): string | null => {
    const cover = post.attributes.cover?.data
    if (!cover) return null

    // Try to get medium format, fall back to small, then original
    const formats = cover.attributes.formats
    if (formats?.medium?.url) {
      return `${strapiUrl}${formats.medium.url}`
    }
    if (formats?.small?.url) {
      return `${strapiUrl}${formats.small.url}`
    }
    return `${strapiUrl}${cover.attributes.url}`
  }

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      <Header />
      <main className='pt-20'>
        {/* Hero Section */}
        <section className='py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center'>
              <h1 className='text-5xl font-bold mb-6'>Blog</h1>
              <p className='text-xl text-gray-400'>
                Thoughts, insights, and stories about software development and
                technology
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className='py-20 bg-gray-950'>
          <div className='container mx-auto px-4'>
            {posts.length === 0 ? (
              <div className='text-center py-20'>
                <p className='text-gray-400 text-xl'>
                  No blog posts available at the moment.
                </p>
                <p className='text-gray-500 mt-4'>
                  Check back soon for new content!
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {posts.map((post) => {
                  const imageUrl = getImageUrl(post)
                  const description =
                    post.attributes.description ||
                    truncateText(post.attributes.content, 150)

                  return (
                    <article
                      key={post.id}
                      className='bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10'
                    >
                      {imageUrl && (
                        <div className='aspect-video overflow-hidden'>
                          <img
                            src={imageUrl}
                            alt={
                              post.attributes.cover?.data?.attributes
                                .alternativeText || post.attributes.title
                            }
                            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                          />
                        </div>
                      )}
                      <div className='p-6'>
                        <div className='flex items-center gap-4 text-sm text-gray-500 mb-4'>
                          <time dateTime={post.attributes.publishedAt}>
                            {formatDate(post.attributes.publishedAt)}
                          </time>
                          {post.attributes.author?.data && (
                            <>
                              <span>•</span>
                              <span>
                                {post.attributes.author.data.attributes.name}
                              </span>
                            </>
                          )}
                        </div>
                        <h2 className='text-2xl font-bold mb-3 text-white hover:text-blue-400 transition-colors'>
                          {post.attributes.title}
                        </h2>
                        <p className='text-gray-400 mb-4 overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                          {description}
                        </p>
                        <Link
                          to={`/blog/${post.attributes.slug}`}
                          className='inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors'
                        >
                          Read more
                          <svg
                            className='w-4 h-4 ml-2'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 5l7 7-7 7'
                            />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}

            {/* Back to Home Link */}
            <div className='text-center mt-12'>
              <Link
                to='/'
                className='inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors border border-gray-700 hover:border-blue-500'
              >
                <svg
                  className='w-5 h-5 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 19l-7-7m0 0l7-7m-7 7h18'
                  />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
