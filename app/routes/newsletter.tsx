import type { Route } from './+types/newsletter'
import { data } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NewsletterSignup from '../components/NewsletterSignup'
import { handleNewsletterSubmission } from '../lib/newsletter'
import { fetchProfile } from '../lib/strapi'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Newsletter - David Emmanuel' },
    {
      name: 'description',
      content:
        'One email when David Emmanuel publishes a new post. No digest, no marketing.',
    },
  ]
}

export async function loader() {
  return { profile: await fetchProfile() }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  if (formData.get('intent') === 'newsletter') {
    return data({ newsletter: await handleNewsletterSubmission(formData) })
  }

  return data({ error: 'Unknown action.' }, { status: 400 })
}

export default function NewsletterPage({ loaderData }: Route.ComponentProps) {
  const { profile } = loaderData

  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      <Header />
      <main className='container mx-auto px-4 pt-28 pb-20'>
        <div className='max-w-2xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>Newsletter</h1>
          <p className='text-xl text-gray-400 mb-10'>
            One email when I publish something new. That's the whole promise.
          </p>

          <NewsletterSignup source='newsletter-page' className='mb-10' />

          <div className='space-y-4 text-gray-400'>
            <p>
              I write about applied AI, computer vision and the web systems
              around them — usually the thing I just built, and what it taught
              me.
            </p>
            <p>
              Subscribing costs nothing and takes one click to confirm. Every
              email has an unsubscribe link, and the address is never shared.
            </p>
            <p>
              Prefer a feed? The same posts are at{' '}
              <a href='/rss.xml' className='text-blue-400 hover:text-blue-300'>
                /rss.xml
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer profile={profile} />
    </div>
  )
}
