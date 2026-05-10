import { Link } from 'react-router'
import type { BlogPost } from '../lib/types'

export default function PostCard({
  post,
  featured = false,
}: {
  post: BlogPost
  featured?: boolean
}) {
  const Heading = featured ? 'h3' : 'h2'

  return (
    <article
      className={`bg-gray-900 rounded-lg overflow-hidden transition-all ${
        featured
          ? 'ring-2 ring-blue-500 hover:ring-blue-400'
          : 'hover:ring-2 ring-blue-500'
      }`}
    >
      {post.coverImage ? (
        <Link
          to={`/blog/${post.slug}`}
          className={featured ? 'relative block' : undefined}
        >
          <img
            src={post.coverImage.url}
            alt={post.coverImage.alternativeText || post.title}
            className='w-full h-48 object-cover'
          />
          {featured && (
            <span className='absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold bg-blue-600 rounded'>
              Featured
            </span>
          )}
        </Link>
      ) : featured ? (
        <div className='p-6 pb-0'>
          <span className='inline-block px-2 py-0.5 text-xs font-semibold bg-blue-600 rounded mb-3'>
            Featured
          </span>
        </div>
      ) : null}
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
        {post.tags.length > 0 && (
          <div className='flex gap-2 mb-3 flex-wrap'>
            {post.tags.map((tag) => (
              <Link
                key={tag.slug}
                to={`/blog/tag/${tag.slug}`}
                className='text-xs px-2 py-1 bg-gray-800 text-blue-300 rounded hover:bg-gray-700'
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
        <Link to={`/blog/${post.slug}`}>
          <Heading className='text-xl font-bold mb-2 hover:text-blue-400'>
            {post.title}
          </Heading>
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
  )
}
