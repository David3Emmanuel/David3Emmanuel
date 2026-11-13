import { Form, useActionData, useNavigation } from 'react-router'
import type { NewsletterActionData } from '../lib/newsletter'

export default function NewsletterSignup({
  source,
  className = '',
}: {
  source: string
  className?: string
}) {
  const actionData = useActionData() as NewsletterActionData | undefined
  const navigation = useNavigation()

  const submitting =
    navigation.state === 'submitting' &&
    navigation.formData?.get('intent') === 'newsletter'
  const result = actionData?.newsletter

  return (
    <section
      className={`bg-gray-900/60 border border-gray-800 rounded-lg p-6 md:p-8 ${className}`}
    >
      <h2 className='text-xl md:text-2xl font-bold text-white mb-2'>
        Get new posts by email
      </h2>
      <p className='text-gray-400 text-sm md:text-base mb-6 max-w-xl'>
        One email when I publish something new. No digest, no marketing, no
        forwarding your address anywhere.
      </p>

      {result?.ok ? (
        <div className='text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3 text-sm'>
          {result.message}
        </div>
      ) : (
        <Form method='post' className='flex flex-col sm:flex-row gap-3'>
          <input type='hidden' name='intent' value='newsletter' />
          <input type='hidden' name='source' value={source} />

          {/* Honeypot: hidden from people, filled by bots. */}
          <div aria-hidden='true' className='hidden'>
            <label htmlFor={`website-${source}`}>Website</label>
            <input
              id={`website-${source}`}
              name='website'
              type='text'
              tabIndex={-1}
              autoComplete='off'
            />
          </div>

          <label htmlFor={`email-${source}`} className='sr-only'>
            Email address
          </label>
          <input
            id={`email-${source}`}
            name='email'
            type='email'
            required
            autoComplete='email'
            placeholder='you@example.com'
            className='flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500'
          />

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg text-sm font-medium text-white transition-colors whitespace-nowrap'
          >
            {submitting ? 'Subscribing…' : 'Subscribe'}
          </button>
        </Form>
      )}

      {result && !result.ok && (
        <p className='text-red-400 text-sm mt-3'>{result.message}</p>
      )}
    </section>
  )
}
