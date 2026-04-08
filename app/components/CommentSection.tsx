import { Form, useNavigation, useActionData } from 'react-router'
import type { Comment } from '../lib/types'

interface CommentSectionProps {
  comments: Comment[]
  postDocumentId: string
}

interface ActionData {
  success?: boolean
  error?: string
}

export default function CommentSection({ comments, postDocumentId }: CommentSectionProps) {
  const navigation = useNavigation()
  const actionData = useActionData() as ActionData | undefined
  const isSubmitting = navigation.state === 'submitting'

  return (
    <section className='border-t border-gray-800 pt-10 mt-10'>
      <h2 className='text-2xl font-bold mb-8'>Comments</h2>

      {/* Comments list */}
      {comments.length === 0 ? (
        <p className='text-gray-500 mb-10'>
          No comments yet. Be the first to leave one!
        </p>
      ) : (
        <ul className='space-y-6 mb-10'>
          {comments.map((comment) => (
            <li key={comment.id} className='bg-gray-900 rounded-lg p-5'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold'>
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className='font-medium text-sm'>{comment.name}</p>
                  <time className='text-xs text-gray-500'>
                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>
              <p className='text-gray-300 text-sm whitespace-pre-wrap'>
                {comment.body}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Comment form */}
      <div className='bg-gray-900 rounded-lg p-6'>
        <h3 className='text-lg font-semibold mb-5'>Leave a comment</h3>

        {actionData?.success ? (
          <div className='text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3 text-sm'>
            Thanks for your comment! It will appear after review.
          </div>
        ) : (
          <Form method='post' className='space-y-4'>
            <input type='hidden' name='intent' value='comment' />
            <input type='hidden' name='postDocumentId' value={postDocumentId} />

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm text-gray-400 mb-1'
                >
                  Name <span className='text-red-400'>*</span>
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  required
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500'
                  placeholder='Your name'
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm text-gray-400 mb-1'
                >
                  Email <span className='text-red-400'>*</span>
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500'
                  placeholder='you@example.com'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='body'
                className='block text-sm text-gray-400 mb-1'
              >
                Comment <span className='text-red-400'>*</span>
              </label>
              <textarea
                id='body'
                name='body'
                required
                rows={4}
                className='w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none'
                placeholder='Share your thoughts...'
              />
            </div>

            {actionData?.error && (
              <p className='text-red-400 text-sm'>{actionData.error}</p>
            )}

            <p className='text-xs text-gray-500'>
              Your email won't be published. Comments are reviewed before appearing.
            </p>

            <button
              type='submit'
              disabled={isSubmitting}
              className='px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg text-sm font-medium transition-colors'
            >
              {isSubmitting ? 'Submitting...' : 'Post comment'}
            </button>
          </Form>
        )}
      </div>
    </section>
  )
}
