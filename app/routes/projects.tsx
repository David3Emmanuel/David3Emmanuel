import type { Route } from './+types/projects'
import { Link } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import { env } from '../lib/env'
import { fetchProfile, fetchProjectsPage } from '../lib/strapi'

const CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'ai-ml', label: 'AI & Computer Vision' },
  { value: 'fullstack', label: 'Web & Mobile' },
  { value: 'tools', label: 'Developer Tools' },
  { value: 'research', label: 'Research' },
]

const PAGE_SIZE = 12

export const links: Route.LinksFunction = () => [
  { rel: 'canonical', href: `${env.SITE_URL}/projects` },
]

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Projects - David Emmanuel' },
    {
      name: 'description',
      content:
        'Projects by David Emmanuel across computer vision, machine learning, full-stack products, developer tooling and research.',
    },
  ]
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const parsed = Number.parseInt(url.searchParams.get('page') ?? '1', 10)
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1
  const categoryParam = url.searchParams.get('category') ?? 'all'
  const category = CATEGORIES.some((entry) => entry.value === categoryParam)
    ? categoryParam
    : 'all'

  const [{ projects, total, pageSize }, profile] = await Promise.all([
    fetchProjectsPage({ page, pageSize: PAGE_SIZE, category }),
    fetchProfile(),
  ])

  return { projects, total, page, pageSize, category, profile }
}

function pageHref(page: number, category: string) {
  const params = new URLSearchParams()
  if (page > 1) params.set('page', page.toString())
  if (category !== 'all') params.set('category', category)
  const query = params.toString()
  return query ? `/projects?${query}` : '/projects'
}

export default function ProjectsPage({ loaderData }: Route.ComponentProps) {
  const { projects, total, page, pageSize, category, profile } = loaderData
  const pageCount = Math.max(1, Math.ceil(total / pageSize))

  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      <Header />
      <main className='container mx-auto px-4 pt-28 pb-20'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10'>
            <div>
              <h1 className='text-4xl md:text-5xl font-bold mb-3'>Projects</h1>
              <p className='text-xl text-gray-400'>
                {total} projects across computer vision, applied ML, full-stack
                products, developer tooling and research.
              </p>
            </div>
            {total > 0 && (
              <p className='text-sm text-gray-500'>
                Page {page} of {pageCount}
              </p>
            )}
          </div>

          <div className='flex gap-2 flex-wrap mb-12'>
            {CATEGORIES.map((entry) => {
              const active = entry.value === category
              return (
                <Link
                  key={entry.value}
                  to={pageHref(1, entry.value)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {entry.label}
                </Link>
              )
            })}
          </div>

          {projects.length === 0 ? (
            <div className='text-center py-16'>
              <p className='text-gray-400 text-lg'>
                No projects to show here yet.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  demo={project.demo}
                  techStack={project.techStack}
                  timeline={project.timeline}
                  status={project.status}
                  role={project.role}
                  features={project.features}
                  image={project.image?.url}
                  github={project.github}
                />
              ))}
            </div>
          )}

          {pageCount > 1 && (
            <div className='flex justify-center gap-4 mt-12'>
              {page > 1 && (
                <Link
                  to={pageHref(page - 1, category)}
                  className='px-4 py-2 bg-gray-800 rounded hover:bg-gray-700'
                >
                  Previous
                </Link>
              )}
              {page < pageCount && (
                <Link
                  to={pageHref(page + 1, category)}
                  className='px-4 py-2 bg-gray-800 rounded hover:bg-gray-700'
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer profile={profile} />
    </div>
  )
}
