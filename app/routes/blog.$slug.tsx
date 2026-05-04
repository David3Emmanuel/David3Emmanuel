import type { Route } from './+types/blog.$slug'
import { Link, data } from 'react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LikeButton from '../components/LikeButton'
import CommentSection from '../components/CommentSection'
import {
  fetchBlogPostBySlug,
  fetchPostStat,
  fetchComments,
  submitComment,
} from '../lib/strapi'

const customSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'video', 'source'],
  attributes: {
    ...defaultSchema.attributes,
    video: ['src', 'controls', 'width', 'height', 'preload', 'poster'],
    source: ['src', 'type'],
  },
}

export function meta({ data, params }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: 'Post Not Found' }]
  }

  const siteUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5173'
  const canonicalUrl = `${siteUrl}/blog/${params.slug}`

  return [
    { title: `${data.post.title} - David Emmanuel` },
    { name: 'description', content: data.post.excerpt || '' },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    { property: 'og:title', content: data.post.title },
    { property: 'og:description', content: data.post.excerpt || '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: canonicalUrl },
    ...(data.post.coverImage
      ? [{ property: 'og:image', content: data.post.coverImage.url }]
      : []),
  ]
}

export function headers() {
  const strapiUrl = (
    import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
  ).replace(/\/$/, '')
  return {
    'Content-Security-Policy': `frame-ancestors 'self' ${strapiUrl}`,
  }
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const { slug } = params

  const cookieHeader = request.headers.get('Cookie') ?? ''
  const isPreview = cookieHeader.includes('preview_mode=draft')

  const [post, postStat, comments] = await Promise.all([
    fetchBlogPostBySlug(slug, isPreview ? 'draft' : undefined),
    fetchPostStat(slug),
    fetchComments(slug),
  ])

  return { post, likeCount: postStat?.likeCount ?? 0, comments, isPreview }
}

export async function action({ request, params }: Route.ActionArgs) {
  const { slug } = params
  const formData = await request.formData()
  const intent = formData.get('intent')

  if (intent === 'comment') {
    const postDocumentId = String(formData.get('postDocumentId') ?? '').trim()
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const body = String(formData.get('body') ?? '').trim()

    if (!postDocumentId || !name || !email || !body) {
      return data({ error: 'All fields are required.' }, { status: 400 })
    }

    try {
      await submitComment(postDocumentId, { name, email, body })
      return data({ success: true })
    } catch {
      return data(
        { error: 'Failed to submit comment. Please try again.' },
        { status: 500 },
      )
    }
  }

  return data({ error: 'Unknown action.' }, { status: 400 })
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post, likeCount, comments, isPreview } = loaderData

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
      {isPreview && (
        <div className='bg-yellow-500 text-gray-900 text-sm text-center py-2 px-4 font-medium'>
          Draft preview. This content is not yet published
        </div>
      )}
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

          <div className='prose prose-invert prose-lg max-w-none mb-12'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, [rehypeSanitize, customSchema]]}
              components={{
                p({ children }) {
                  return <p style={{ whiteSpace: 'pre-wrap' }}>{children}</p>
                },
                img({ src, alt }) {
                  const isVideo =
                    src!.endsWith('.mp4') || src!.endsWith('.webm')

                  if (isVideo)
                    return (
                      <video
                        controls
                        className='w-full max-h-[80vh] mx-auto rounded-lg object-contain'
                      >
                        <source
                          src={src}
                          type={`video/${src!.split('.').pop()}`}
                        />
                        Your browser does not support the video tag.
                      </video>
                    )

                  return (
                    <img
                      src={src}
                      alt={alt}
                      className='max-h-[80vh] w-auto mx-auto rounded-lg object-contain'
                      loading='lazy'
                    />
                  )
                },
                video({ src }) {
                  return (
                    <video
                      controls
                      className='w-full max-h-[80vh] mx-auto rounded-lg object-contain'
                    >
                      <source
                        src={src}
                        type={`video/${src!.split('.').pop()}`}
                      />
                      Your browser does not support the video tag.
                    </video>
                  )
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {post.tags.length > 0 && (
            <div className='border-t border-gray-800 pt-8 mb-8'>
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

          <div className='flex items-center gap-3 mb-2'>
            <LikeButton postSlug={post.slug} initialCount={likeCount} />
            <span className='text-gray-500 text-sm'>
              {likeCount === 1 ? '1 like' : `${likeCount} likes`}
            </span>
          </div>

          <CommentSection
            comments={comments}
            postDocumentId={post.documentId}
          />
        </article>
      </main>
      <Footer />
    </div>
  )
}
