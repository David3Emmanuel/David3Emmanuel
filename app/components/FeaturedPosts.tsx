import type { BlogPost } from '../lib/types'
import PostCard from './PostCard'

export default function FeaturedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className='mb-12'>
      <h2 className='text-2xl font-bold mb-6'>Featured</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} featured />
        ))}
      </div>
    </section>
  )
}
