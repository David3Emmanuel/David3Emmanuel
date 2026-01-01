import type { Route } from './+types/blog.category.$slug'
import { Link } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { fetchCategoryBySlug, fetchPostsByCategory } from '../lib/strapi'

export function meta({ data }: Route.MetaArgs) {
  if (!data?.category) {
    return [{ title: 'Category Not Found' }]
  }

  return [
    { title: `${data.category.name} - Blog - David Emmanuel` },
    {
      name: 'description',
      content: data.category.description || `Posts in ${data.category.name}`,
    },
  ]
}

interface Category {
  name: string
  slug: string
  description?: string
}

interface BlogPost {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string
  coverImage?: {
    url: string
    alternativeText?: string
  }
  readTime?: number
  publishedAt: string
}

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params

  const category = await fetchCategoryBySlug(slug)
  const posts = await fetchPostsByCategory(slug)

  return { category, posts }
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  const { category, posts } = loaderData

  if (!category) {
    return (
      <div className='min-h-screen bg-gray-950 text-white'>
        <Header />
        <main className='container mx-auto px-4 py-24'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl font-bold mb-4'>Category Not Found</h1>
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
        <div className='max-w-6xl mx-auto'>
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

          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            {category.name}
          </h1>
          {category.description && (
            <p className='text-xl text-gray-400 mb-12'>
              {category.description}
            </p>
          )}

          {posts.length === 0 ? (
            <div className='text-center py-16'>
              <p className='text-gray-400 text-lg'>
                No posts in this category yet.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {posts.map((post) => (
                <article
                  key={post.id}
                  className='bg-gray-900 rounded-lg overflow-hidden hover:ring-2 ring-blue-500 transition-all'
                >
                  {post.coverImage && (
                    <Link to={`/blog/${post.slug}`}>
                      <img
                        src={post.coverImage.url}
                        alt={post.coverImage.alternativeText || post.title}
                        className='w-full h-48 object-cover'
                      />
                    </Link>
                  )}
                  <div className='p-6'>
                    <Link to={`/blog/${post.slug}`}>
                      <h2 className='text-xl font-bold mb-2 hover:text-blue-400'>
                        {post.title}
                      </h2>
                    </Link>
                    {post.excerpt && (
                      <p className='text-gray-400 text-sm mb-4'>
                        {post.excerpt}
                      </p>
                    )}
                    <div className='flex justify-between items-center text-sm text-gray-500'>
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </time>
                      {post.readTime && <span>{post.readTime} min read</span>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
