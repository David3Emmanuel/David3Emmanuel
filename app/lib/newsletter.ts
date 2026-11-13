import { subscribeToNewsletter } from './strapi'

export interface NewsletterActionData {
  newsletter?: { ok: boolean; message: string }
}

const SUCCESS =
  'Almost there — check your inbox for the confirmation link and you are on the list.'

/**
 * Shared by every route that renders the signup form, so the honeypot and the
 * error copy behave the same on the blog index, a post, and /newsletter.
 */
export async function handleNewsletterSubmission(
  formData: FormData,
): Promise<{ ok: boolean; message: string }> {
  const email = String(formData.get('email') ?? '').trim()
  const source = String(formData.get('source') ?? 'unknown').slice(0, 40)
  const honeypot = String(formData.get('website') ?? '')

  // Bots fill hidden fields; humans never see this one.
  if (honeypot) return { ok: true, message: SUCCESS }

  if (!email) {
    return { ok: false, message: 'Enter your email address.' }
  }

  const result = await subscribeToNewsletter(email, source)

  if (!result.ok) {
    return {
      ok: false,
      message: result.error ?? 'Something went wrong. Please try again.',
    }
  }

  return { ok: true, message: SUCCESS }
}
