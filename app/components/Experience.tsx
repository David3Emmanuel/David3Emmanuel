import type { ExperienceEntry } from '../lib/types'

interface ExperienceCardProps {
  title: string
  company: string
  period: string
  description: string[]
  tech?: string[]
}

function ExperienceCard({
  title,
  company,
  period,
  description,
  tech,
}: ExperienceCardProps) {
  return (
    <div className='relative pl-8 pb-12 group'>
      {/* Timeline dot and line */}
      <div className='absolute left-0 top-0 h-full w-px bg-gray-700 group-last:bg-transparent'></div>
      <div className='absolute left-0 top-2 w-6 h-6 rounded-full border-2 border-blue-500 bg-gray-900 transform -translate-x-1/2 group-hover:bg-blue-500 transition-colors duration-300'></div>

      {/* Content */}
      <div className='bg-gray-900/50 border border-gray-800 rounded-lg p-6 ml-4 hover:border-blue-500/50 transition-all duration-300'>
        <h3 className='text-xl font-bold text-white'>{title}</h3>
        <p className='text-blue-400 font-medium mb-1'>{company}</p>
        <p className='text-gray-400 text-sm mb-4'>{period}</p>

        <ul className='space-y-2 mb-4'>
          {description.map((item, index) => (
            <li key={index} className='flex items-start'>
              <span className='text-blue-500 mr-2'>•</span>
              <span className='text-gray-300'>{item}</span>
            </li>
          ))}
        </ul>

        {tech && (
          <div className='flex flex-wrap gap-2 mt-4'>
            {tech.map((item) => (
              <span
                key={item}
                className='text-xs font-medium px-2.5 py-0.5 rounded bg-gray-800 text-gray-300'
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Experience({
  experiences,
}: {
  experiences: ExperienceEntry[]
}) {
  const workEntries = experiences.filter((e) => e.type === 'work')
  const activityEntries = experiences.filter((e) => e.type === 'activity')

  return (
    <section id='experience' className='py-20 bg-gray-900/30'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center text-white mb-16'>
          Experience
          <div className='h-1 w-20 bg-blue-500 mx-auto mt-2'></div>
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-2xl font-bold text-white mb-8'>
              Work Experience
            </h3>
            <div className='space-y-0'>
              {workEntries.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  title={exp.title}
                  company={exp.company}
                  period={exp.period}
                  description={exp.description}
                  tech={exp.tech}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-2xl font-bold text-white mb-8'>Activities</h3>
            <div className='space-y-0'>
              {activityEntries.map((act) => (
                <ExperienceCard
                  key={act.id}
                  title={act.title}
                  company={act.company}
                  period={act.period}
                  description={act.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
