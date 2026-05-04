import { Link } from 'react-router'
import type { BlogPost } from '../lib/types'

export default function FeaturedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className='mb-12'>
      <h2 className='text-2xl font-bold mb-6'>Featured</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {posts.map((post) => (
          <article
            key={post.id}
            className='bg-gray-900 rounded-lg overflow-hidden ring-2 ring-blue-500 hover:ring-blue-400 transition-all'
          >
            {post.coverImage ? (
              <Link to={`/blog/${post.slug}`} className='relative block'>
                <img
                  src={post.coverImage.url}
                  alt={post.coverImage.alternativeText || post.title}
                  className='w-full h-48 object-cover'
                />
                <span className='absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold bg-blue-600 rounded'>
                  Featured
                </span>
              </Link>
            ) : (
              <div className='p-6 pb-0'>
                <span className='inline-block px-2 py-0.5 text-xs font-semibold bg-blue-600 rounded mb-3'>
                  Featured
                </span>
              </div>
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
                <h3 className='text-xl font-bold mb-2 hover:text-blue-400'>
                  {post.title}
                </h3>
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
    </section>
  )
}
