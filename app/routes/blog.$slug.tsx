import type { Route } from './+types/blog.$slug'
import { Link } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: 'Post Not Found' }]
  }

  return [
    { title: `${data.post.title} - David Emmanuel` },
    { name: 'description', content: data.post.excerpt || '' },
    { property: 'og:title', content: data.post.title },
    { property: 'og:description', content: data.post.excerpt || '' },
    { property: 'og:type', content: 'article' },
    ...(data.post.coverImage
      ? [{ property: 'og:image', content: data.post.coverImage.url }]
      : []),
  ]
}

interface BlogPost {
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
  publishedAt: string
  categories: Array<{ name: string; slug: string }>
  tags: Array<{ name: string; slug: string }>
}

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params

  // TODO: Replace with actual Strapi API call
  // const response = await fetch(`${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`)
  // const data = await response.json()
  
  return { post: null as BlogPost | null }
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData

  if (!post) {
    return (
      <div className='min-h-screen bg-gray-950 text-white'>
        <Header />
        <main className='container mx-auto px-4 py-24'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl font-bold mb-4'>Post Not Found</h1>
            <p className='text-gray-400 mb-8'>
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              to='/blog'
              className='inline-block px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700'
            >
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      <Header />
      <main className='container mx-auto px-4 py-24'>
        <article className='max-w-4xl mx-auto'>
          <Link
            to='/blog'
            className='inline-flex items-center text-blue-400 hover:text-blue-300 mb-8'
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
                d='M15 19l-7-7 7-7'
              />
            </svg>
            Back to Blog
          </Link>

          {post.coverImage && (
            <img
              src={post.coverImage.url}
              alt={post.coverImage.alternativeText || post.title}
              className='w-full h-96 object-cover rounded-lg mb-8'
            />
          )}

          <div className='flex gap-2 mb-4 flex-wrap'>
            {post.categories.map((category) => (
              <Link
                key={category.slug}
                to={`/blog/category/${category.slug}`}
                className='text-sm px-3 py-1 bg-blue-600 rounded hover:bg-blue-700'
              >
                {category.name}
              </Link>
            ))}
          </div>

          <h1 className='text-4xl md:text-5xl font-bold mb-4'>{post.title}</h1>

          <div className='flex items-center gap-4 text-gray-400 mb-8'>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.readTime && <span>• {post.readTime} min read</span>}
          </div>

          <div
            className='prose prose-invert prose-lg max-w-none mb-12'
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags.length > 0 && (
            <div className='border-t border-gray-800 pt-8'>
              <div className='flex gap-2 flex-wrap'>
                <span className='text-gray-400'>Tags:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    to={`/blog/tag/${tag.slug}`}
                    className='text-sm px-3 py-1 bg-gray-800 rounded hover:bg-gray-700'
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  )
}
