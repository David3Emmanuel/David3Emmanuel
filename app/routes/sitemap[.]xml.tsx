import { fetchAllCategories, fetchAllTags, fetchBlogPosts } from '~/lib/strapi'
import { env } from '~/lib/env'
import type { Route } from './+types/sitemap[.]xml'

const xmlEscape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: string
}

export async function loader({}: Route.LoaderArgs) {
  const [{ posts }, categories, tags] = await Promise.all([
    fetchBlogPosts(1, 100),
    fetchAllCategories(),
    fetchAllTags(),
  ])

  const domain = env.SITE_URL.replace(/\/$/, '')

  const urls: SitemapUrl[] = [
    { loc: `${domain}/`, changefreq: 'monthly', priority: '1.0' },
    { loc: `${domain}/projects`, changefreq: 'monthly', priority: '0.9' },
    { loc: `${domain}/blog`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${domain}/newsletter`, changefreq: 'monthly', priority: '0.5' },
    ...posts.map((post) => ({
      loc: `${domain}/blog/${post.slug}`,
      lastmod: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      changefreq: 'yearly',
      priority: '0.8',
    })),
    ...categories.map((category) => ({
      loc: `${domain}/blog/category/${category.slug}`,
      changefreq: 'weekly',
      priority: '0.5',
    })),
    ...tags.map((tag) => ({
      loc: `${domain}/blog/tag/${tag.slug}`,
      changefreq: 'weekly',
      priority: '0.4',
    })),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${xmlEscape(url.loc)}</loc>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''}${
      url.changefreq ? `\n    <changefreq>${url.changefreq}</changefreq>` : ''
    }${url.priority ? `\n    <priority>${url.priority}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
