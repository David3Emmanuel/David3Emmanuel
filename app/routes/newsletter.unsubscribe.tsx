import type { Route } from './+types/newsletter.unsubscribe'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NewsletterStatus, {
  type NewsletterStatusKind,
} from '../components/NewsletterStatus'
import { unsubscribeFromNewsletter } from '../lib/strapi'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Unsubscribe - David Emmanuel' },
    { name: 'robots', content: 'noindex' },
  ]
}

async function resolveState(request: Request): Promise<NewsletterStatusKind> {
  const token = new URL(request.url).searchParams.get('token') ?? ''
  if (!token) return 'invalid'

  const result = await unsubscribeFromNewsletter(token)
  return result.ok ? 'unsubscribed' : 'invalid'
}

export async function loader({ request }: Route.LoaderArgs) {
  return { state: await resolveState(request) }
}

/** Mailbox providers POST here for one-click unsubscribe. */
export async function action({ request }: Route.ActionArgs) {
  return { state: await resolveState(request) }
}

export default function Unsubscribe({ loaderData }: Route.ComponentProps) {
  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      <Header />
      <main className='container mx-auto px-4 pt-28 pb-20'>
        <div className='max-w-xl mx-auto'>
          <NewsletterStatus state={loaderData.state} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
