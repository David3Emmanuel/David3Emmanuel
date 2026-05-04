import { redirect } from 'react-router'
import type { Route } from './+types/preview'

export async function loader({ request }: Route.LoaderArgs) {
  const requestUrl = new URL(request.url)
  const secret = requestUrl.searchParams.get('secret')
  const redirectTo = requestUrl.searchParams.get('url')
  const status = requestUrl.searchParams.get('status')

  if (!secret || secret !== process.env.PREVIEW_SECRET) {
    throw new Response('Invalid token', { status: 401 })
  }

  const isDraft = status !== 'published'
  const cookie = isDraft
    ? 'preview_mode=draft; Path=/; HttpOnly; SameSite=Lax'
    : 'preview_mode=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'

  return redirect(redirectTo || '/', {
    headers: { 'Set-Cookie': cookie },
  })
}
