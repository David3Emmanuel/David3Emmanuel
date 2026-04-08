import { useState, useEffect } from 'react'
import { likePost } from '../lib/strapi'

interface LikeButtonProps {
  postSlug: string
  initialCount: number
}

export default function LikeButton({ postSlug, initialCount }: LikeButtonProps) {
  const storageKey = `liked_${postSlug}`
  const [count, setCount] = useState(initialCount)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLiked(localStorage.getItem(storageKey) === 'true')
  }, [storageKey])

  async function handleLike() {
    if (liked || loading) return
    setLoading(true)
    try {
      const result = await likePost(postSlug)
      setCount(result.likeCount)
      setLiked(true)
      localStorage.setItem(storageKey, 'true')
    } catch {
      // silently fail — like is non-critical
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked || loading}
      aria-label={liked ? 'You liked this post' : 'Like this post'}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
        liked
          ? 'border-pink-500 text-pink-400 cursor-default'
          : 'border-gray-700 text-gray-400 hover:border-pink-500 hover:text-pink-400'
      }`}
    >
      <svg
        className={`w-5 h-5 transition-transform ${liked ? 'scale-110' : ''}`}
        fill={liked ? 'currentColor' : 'none'}
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
        />
      </svg>
      <span>{count}</span>
    </button>
  )
}
