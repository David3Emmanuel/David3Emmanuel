import { fetchBlogPosts } from '~/lib/strapi'
import { env } from '~/lib/env'
import type { Route } from './+types/rss[.]xml'

export async function loader({ request }: Route.LoaderArgs) {
  // Fetch the latest 100 posts
  const { posts } = await fetchBlogPosts(1, 100)
  const domain = env.SITE_URL

  const rssItems = posts
    .map((post) => {
      const postUrl = `${domain}/blog/${post.slug}`

      const teaserContent = `
      <p>${post.excerpt}</p>
      <hr />
      <p><strong>
        <a href="${postUrl}">Read the full article with proper syntax highlighting on my personal blog.</a>
      </strong></p>
    `

      return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${postUrl}</link>
        <guid>${postUrl}</guid>
        <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt}]]></description>
        <content:encoded><![CDATA[${teaserContent}]]></content:encoded> 
      </item>
    `
    })
    .join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>David Emmanuel's Blog</title>
        <link>${domain}</link>
        <description>Life &amp; Tech</description>
        <language>en-us</language>
        
        <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml" />
        
        ${rssItems}
      </channel>
    </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
