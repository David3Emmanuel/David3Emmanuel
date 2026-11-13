import type { Route } from './+types/newsletter.confirm'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NewsletterStatus, {
  type NewsletterStatusKind,
} from '../components/NewsletterStatus'
import { confirmSubscription } from '../lib/strapi'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Confirm subscription - David Emmanuel' },
    { name: 'robots', content: 'noindex' },
  ]
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = new URL(request.url).searchParams.get('token') ?? ''

  if (!token) {
    return { state: 'invalid' as NewsletterStatusKind }
  }

  const result = await confirmSubscription(token)
  return { state: (result.ok ? 'confirmed' : 'invalid') as NewsletterStatusKind }
}

export default function ConfirmSubscription({
  loaderData,
}: Route.ComponentProps) {
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
