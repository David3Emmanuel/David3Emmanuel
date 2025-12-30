import type { Route } from './+types/blog'
import { Link } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Blog - David Emmanuel' },
    {
      name: 'description',
      content: 'Read articles and insights from David Emmanuel on web development, game development, and technology.',
    },
  ]
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
  featured: boolean
  publishedAt: string
  categories: Array<{ name: string; slug: string }>
  tags: Array<{ name: string; slug: string }>
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1')
  const pageSize = 12

  // TODO: Replace with actual Strapi API call
  const posts: BlogPost[] = []
  
  return { posts, page, pageSize, total: 0 }
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { posts, page, pageSize, total } = loaderData

  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      <Header />
      <main className='container mx-auto px-4 py-24'>
        <div className='max-w-6xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>Blog</h1>
          <p className='text-xl text-gray-400 mb-12'>
            Thoughts, tutorials, and insights on development
          </p>

          {posts.length === 0 ? (
            <div className='text-center py-16'>
              <p className='text-gray-400 text-lg'>No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <>
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
                      <div className='flex gap-2 mb-3 flex-wrap'>
                        {post.categories.map((category) => (
                          <Link
                            key={category.slug}
                            to={`/blog/category/${category.slug}`}
                            className='text-xs px-2 py-1 bg-blue-600 rounded hover:bg-blue-700'
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                      <Link to={`/blog/${post.slug}`}>
                        <h2 className='text-xl font-bold mb-2 hover:text-blue-400'>
                          {post.title}
                        </h2>
                      </Link>
                      {post.excerpt && (
                        <p className='text-gray-400 text-sm mb-4'>{post.excerpt}</p>
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

              {total > pageSize && (
                <div className='flex justify-center gap-4 mt-12'>
                  {page > 1 && (
                    <Link
                      to={`/blog?page=${page - 1}`}
                      className='px-4 py-2 bg-gray-800 rounded hover:bg-gray-700'
                    >
                      Previous
                    </Link>
                  )}
                  {page * pageSize < total && (
                    <Link
                      to={`/blog?page=${page + 1}`}
                      className='px-4 py-2 bg-gray-800 rounded hover:bg-gray-700'
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
