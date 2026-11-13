import type { Route } from './+types/home'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About, { type Stat } from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import { env } from '../lib/env'
import {
  fetchCertifications,
  fetchEducation,
  fetchExperiences,
  fetchFeaturedProjects,
  fetchProfile,
  fetchProjectsPage,
  fetchSkillGroups,
} from '../lib/strapi'

export const links: Route.LinksFunction = () => [
  {
    rel: 'canonical',
    href: env.SITE_URL,
  },
]

export function meta({ data }: Route.MetaArgs) {
  const name = data?.profile?.name ?? 'David Emmanuel'
  const role = data?.profile?.role ?? 'Full-Stack Developer'
  const title = `${name} - ${role}`

  return [
    { title },
    {
      name: 'description',
      content:
        data?.profile?.tagline ??
        'Portfolio of David Emmanuel, a Full-Stack Developer specializing in web development, game development, and more.',
    },
    { property: 'og:title', content: title },
    {
      property: 'og:description',
      content:
        data?.profile?.tagline ??
        'Portfolio of David Emmanuel, a Full-Stack Developer specializing in web development, game development, and more.',
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@David3Emmanuel' },
    { name: 'twitter:title', content: title },
    {
      name: 'twitter:description',
      content:
        data?.profile?.tagline ??
        'Portfolio of David Emmanuel, a Full-Stack Developer specializing in web development, game development, and more.',
    },
  ]
}

function workYears(experiences: Awaited<ReturnType<typeof fetchExperiences>>) {
  const years = experiences
    .filter((entry) => entry.type === 'work')
    .flatMap((entry) => entry.period.match(/\d{4}/g) ?? [])
    .map(Number)

  if (years.length === 0) return null

  const span = new Date().getFullYear() - Math.min(...years)
  return span > 0 ? `${span}+` : null
}

export async function loader() {
  const [
    profile,
    education,
    certifications,
    skillGroups,
    projects,
    experiences,
    projectTotal,
  ] = await Promise.all([
    fetchProfile(),
    fetchEducation(),
    fetchCertifications(),
    fetchSkillGroups(),
    fetchFeaturedProjects(6),
    fetchExperiences(),
    fetchProjectsPage({ pageSize: 1 }),
  ])

  const languages =
    skillGroups.find((group) => group.title.toLowerCase() === 'languages')?.items
      .length ?? null

  const years = workYears(experiences)

  const stats: Stat[] = [
    years && { label: 'Years of Experience', value: years },
    projectTotal.total > 0 && {
      label: 'Projects Built',
      value: `${projectTotal.total}`,
    },
    languages && { label: 'Programming Languages', value: `${languages}` },
    certifications.length > 0 && {
      label: 'Certifications & Awards',
      value: `${certifications.length}`,
    },
  ].filter(Boolean) as Stat[]

  return {
    profile,
    education,
    certifications,
    skillGroups,
    projects,
    experiences,
    stats,
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const {
    profile,
    education,
    certifications,
    skillGroups,
    projects,
    experiences,
    stats,
  } = loaderData

  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      <Header />
      <main>
        <Hero profile={profile} />
        <About
          profile={profile}
          education={education}
          certifications={certifications}
          stats={stats}
        />
        <Skills skillGroups={skillGroups} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
      <ScrollToTop />
    </div>
  )
}
