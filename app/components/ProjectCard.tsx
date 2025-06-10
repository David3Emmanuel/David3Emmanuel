interface ProjectCardProps {
  title: string
  description: string
  demo?: string
  github?: string
  techStack: string[]
  timeline?: string
  role?: string
  features?: string[]
  image?: string
}

export default function ProjectCard({
  title,
  description,
  demo,
  github,
  techStack,
  timeline,
  role,
  features,
  image,
}: ProjectCardProps) {
  return (
    <div className='group bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300'>
      {' '}
      {image && (
        <div className='h-48 overflow-hidden'>
          <img
            src={image}
            alt={title}
            className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500'
          />
        </div>
      )}
      <div className='p-6'>
        <h3 className='text-xl font-bold text-white mb-2'>{title}</h3>
        <p className='text-gray-400 mb-4'>{description}</p>

        <div className='mb-4'>
          <div className='flex flex-wrap gap-2 mb-4'>
            {techStack.map((tech) => (
              <span
                key={tech}
                className='text-xs font-medium px-2.5 py-0.5 rounded bg-blue-900/30 text-blue-300'
              >
                {tech}
              </span>
            ))}
          </div>

          {timeline && (
            <p className='text-sm text-gray-400 mb-1'>
              <span className='font-medium text-gray-300'>Timeline:</span>{' '}
              {timeline}
            </p>
          )}

          {role && (
            <p className='text-sm text-gray-400 mb-1'>
              <span className='font-medium text-gray-300'>Role:</span> {role}
            </p>
          )}

          {features && features.length > 0 && (
            <div className='mt-3'>
              <h4 className='text-sm font-medium text-gray-300 mb-1'>
                Key Features:
              </h4>
              <ul className='list-disc list-inside text-sm text-gray-400 pl-2'>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {demo && (
            <a
              href={demo}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors'
            >
              View Demo
              <svg
                className='w-4 h-4 ml-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                ></path>
              </svg>
            </a>
          )}

          {github && (
            <a
              href={github}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-800 hover:bg-gray-700 text-white transition-colors'
            >
              GitHub Repo
              <svg
                className='w-4 h-4 ml-2'
                fill='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
