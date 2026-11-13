import type { Certification, Education, Profile } from '../lib/types'

export interface Stat {
  label: string
  value: string
}

function EducationCard({ education }: { education: Education }) {
  return (
    <div className='bg-gray-800/50 p-6 rounded-lg border border-gray-700 mt-8'>
      <h3 className='text-xl font-semibold text-white mb-4'>Education</h3>
      <div className='space-y-2'>
        <div>
          <h4 className='text-lg font-medium text-blue-400'>
            {education.institution}
          </h4>
          <p className='text-gray-300'>
            {education.degree}
            {education.period ? ` (${education.period})` : ''}
          </p>
          {education.gpa && <p className='text-gray-400'>GPA: {education.gpa}</p>}
        </div>

        {education.courseworkGroups && education.courseworkGroups.length > 0 && (
          <div className='mt-4 space-y-3'>
            <p className='text-gray-300 font-medium'>Relevant Coursework</p>
            {education.courseworkGroups.map((group) => (
              <div key={group.title}>
                <p className='text-sm font-medium text-gray-200'>{group.title}</p>
                <p className='text-sm text-gray-400'>
                  {group.courses.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CertificationList({
  title,
  entries,
}: {
  title: string
  entries: Certification[]
}) {
  if (entries.length === 0) return null

  return (
    <div className='bg-gray-800/50 p-6 rounded-lg border border-gray-700'>
      <h3 className='text-xl font-semibold text-white mb-4'>{title}</h3>
      <ul className='space-y-2 text-gray-300'>
        {entries.map((entry) => {
          const meta = [entry.issuer, entry.dateLabel].filter(Boolean).join(' · ')
          const isShortlist = entry.kind === 'shortlist'
          return (
            <li key={entry.id} className='flex items-start'>
              <span className='text-blue-400 mr-2'>•</span>
              <span>
                <span className={isShortlist ? 'text-gray-400' : undefined}>
                  {entry.title}
                </span>
                {meta && <span className='text-gray-500'> — {meta}</span>}
                {isShortlist && (
                  <span className='text-gray-500'> (shortlisted)</span>
                )}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function About({
  profile,
  education,
  certifications,
  stats,
}: {
  profile: Profile | null
  education: Education | null
  certifications: Certification[]
  stats: Stat[]
}) {
  if (!profile && !education && certifications.length === 0) return null

  const paragraphs = profile?.bio
    ? profile.bio.split(/\n{2,}/).filter(Boolean)
    : []
  const trainings = certifications.filter((entry) => entry.kind === 'training')
  const awards = certifications.filter((entry) => entry.kind !== 'training')

  return (
    <section id='about' className='py-20 bg-gray-900/30'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center text-white mb-16'>
          About Me
          <div className='h-1 w-20 bg-blue-500 mx-auto mt-2'></div>
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
          {/* Left Column: About Text */}
          <div className='space-y-6'>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className='text-gray-300 text-lg'>
                {paragraph}
              </p>
            ))}

            {education && <EducationCard education={education} />}

            <CertificationList
              title='Certifications & Training'
              entries={trainings}
            />
            <CertificationList
              title='Scholarships & Awards'
              entries={awards}
            />
          </div>

          {/* Right Column: Stats and Proficiencies */}
          <div className='space-y-8'>
            {stats.length > 0 && (
              <div className='grid grid-cols-2 gap-4'>
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className='bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300'
                  >
                    <div className='text-3xl font-bold text-blue-400 mb-2'>
                      {stat.value}
                    </div>
                    <div className='text-gray-300'>{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {profile?.location && (
              <div className='bg-gray-800/50 p-6 rounded-lg border border-gray-700'>
                <h3 className='text-xl font-semibold text-white mb-3'>
                  Based In
                </h3>
                <p className='text-gray-300'>{profile.location}</p>
                {profile.availability && (
                  <p className='text-gray-400 text-sm mt-1'>
                    {profile.availability}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
