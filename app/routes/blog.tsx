import type { Route } from './+types/blog'
import { Link } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FeaturedPosts from '../components/FeaturedPosts'
import PostCard from '../components/PostCard'
import {
  fetchBlogPosts,
  fetchFeaturedPosts,
  fetchAllCategories,
} from '../lib/strapi'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Blog - David Emmanuel' },
    {
      name: 'description',
      content:
        'Read articles and insights from David Emmanuel on web development, game development, and technology.',
    },
  ]
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1')
  const pageSize = 12

  const [{ posts, pagination }, featuredPosts, categories] = await Promise.all([
    fetchBlogPosts(page, pageSize),
    fetchFeaturedPosts(),
    fetchAllCategories(),
  ])

  return {
    posts,
    page,
    pageSize,
    total: pagination?.total || 0,
    featuredPosts,
    categories,
  }
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { posts, page, pageSize, total, featuredPosts, categories } = loaderData

  const featuredIds = new Set(featuredPosts.map((p) => p.id))
  const regularPosts = posts.filter((p) => !featuredIds.has(p.id))

  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      <Header />
      <main className='container mx-auto px-4 py-24'>
        <div className='max-w-6xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>Blog</h1>
          <p className='text-xl text-gray-400 mb-6'>
            Thoughts, tutorials, and insights on development
          </p>

          {categories.length > 0 && (
            <div className='flex gap-2 flex-wrap mb-12'>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/blog/category/${cat.slug}`}
                  className='px-3 py-1 text-sm bg-gray-800 rounded-full hover:bg-gray-700 transition-colors'
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          <FeaturedPosts posts={featuredPosts} />

          {regularPosts.length === 0 && featuredPosts.length === 0 ? (
            <div className='text-center py-16'>
              <p className='text-gray-400 text-lg'>
                No blog posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <>
              {regularPosts.length > 0 && (
                <>
                  {featuredPosts.length > 0 && (
                    <h2 className='text-2xl font-bold mb-6'>All Posts</h2>
                  )}
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {regularPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              )}

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
