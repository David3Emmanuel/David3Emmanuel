import { Link } from 'react-router'

export type NewsletterStatusKind = 'confirmed' | 'unsubscribed' | 'invalid'

const copy: Record<
  NewsletterStatusKind,
  { title: string; body: string; tone: string }
> = {
  confirmed: {
    title: "You're on the list",
    body: 'Every new post will land in your inbox. One email per post, nothing else.',
    tone: 'text-green-400',
  },
  unsubscribed: {
    title: 'You have been unsubscribed',
    body: "No more newsletter emails. You can subscribe again from the blog whenever you like.",
    tone: 'text-gray-300',
  },
  invalid: {
    title: 'That link is not valid',
    body: 'It may have expired, or the address may have been copied incorrectly. You can subscribe again from the blog.',
    tone: 'text-red-400',
  },
}

export default function NewsletterStatus({
  state,
}: {
  state: NewsletterStatusKind
}) {
  const content = copy[state]

  return (
    <div className='bg-gray-900/60 border border-gray-800 rounded-lg p-8 text-center'>
      <h1 className={`text-2xl font-bold mb-3 ${content.tone}`}>
        {content.title}
      </h1>
      <p className='text-gray-400 mb-8 max-w-md mx-auto'>{content.body}</p>

      <div className='flex flex-wrap gap-3 justify-center'>
        <Link
          to='/blog'
          className='px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white transition-colors'
        >
          Read the blog
        </Link>
        <Link
          to='/newsletter'
          className='px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-medium text-white transition-colors'
        >
          Newsletter page
        </Link>
      </div>
    </div>
  )
}
