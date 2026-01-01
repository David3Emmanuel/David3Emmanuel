import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('blog', 'routes/blog.tsx'),
  route('blog/:slug', 'routes/blog.$slug.tsx'),
  route('blog/category/:slug', 'routes/blog.category.$slug.tsx'),
  route('blog/tag/:slug', 'routes/blog.tag.$slug.tsx'),
  route('rss.xml', 'routes/rss[.]xml.tsx'),
] satisfies RouteConfig
