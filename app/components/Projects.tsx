import { Link } from 'react-router'
import type { Project } from '../lib/types'
import ProjectCard from './ProjectCard'

export default function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null

  return (
    <section id='projects' className='py-20 bg-gray-950'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center text-white mb-16'>
          My Projects
          <div className='h-1 w-20 bg-blue-500 mx-auto mt-2'></div>
        </h2>

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

        <div className='text-center mt-12'>
          <Link
            to='/projects'
            className='inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors border border-gray-700 hover:border-blue-500'
          >
            View More Projects
            <svg
              className='w-5 h-5 ml-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
