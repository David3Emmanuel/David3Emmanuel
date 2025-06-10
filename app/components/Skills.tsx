import SkillCategory from './SkillCategory'

export default function Skills() {
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Python', 'JavaScript', 'TypeScript', 'C#'],
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
          />
        </svg>
      ),
    },
    {
      title: 'Frontend',
      skills: ['NextJS', 'React', 'HTML/CSS', 'Tailwind CSS'],
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
      ),
    },
    {
      title: 'Backend',
      skills: ['NestJS', 'NodeJS', 'Express', 'MongoDB', 'Firebase', 'SQL'],
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
          />
        </svg>
      ),
    },
    {
      title: 'Web Development',
      skills: [
        'Responsive Design',
        'API Integration',
        'Full-Stack Development',
      ],
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
          />
        </svg>
      ),
    },
    {
      title: 'Game Development',
      skills: ['Unity', 'C#', 'Game Design'],
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
          />
        </svg>
      ),
    },
    {
      title: 'Other Skills',
      skills: [
        'Git & GitHub',
        'Problem Solving',
        'Team Collaboration',
        'Project Management',
      ],
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
          />
        </svg>
      ),
    },
  ]

  return (
    <section id='skills' className='py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center text-white mb-16'>
          My Skills
          <div className='h-1 w-20 bg-blue-500 mx-auto mt-2'></div>
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={index}
              title={category.title}
              skills={category.skills}
              icon={category.icon}
            />
          ))}
        </div>

        {/* Skill Bars */}
        <div className='max-w-3xl mx-auto mt-16 bg-gray-900/50 border border-gray-800 rounded-lg p-8'>
          <h3 className='text-xl font-bold text-white mb-8 text-center'>
            Core Competencies
          </h3>

          <div className='space-y-6'>
            <div>
              <div className='flex justify-between mb-1'>
                <span className='text-gray-300'>Frontend Development</span>
                <span className='text-blue-400'>90%</span>
              </div>
              <div className='w-full bg-gray-800 rounded-full h-3'>
                <div
                  className='bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full'
                  style={{ width: '90%' }}
                ></div>
              </div>
            </div>

            <div>
              <div className='flex justify-between mb-1'>
                <span className='text-gray-300'>Backend Development</span>
                <span className='text-blue-400'>85%</span>
              </div>
              <div className='w-full bg-gray-800 rounded-full h-3'>
                <div
                  className='bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full'
                  style={{ width: '85%' }}
                ></div>
              </div>
            </div>

            <div>
              <div className='flex justify-between mb-1'>
                <span className='text-gray-300'>Database Management</span>
                <span className='text-blue-400'>80%</span>
              </div>
              <div className='w-full bg-gray-800 rounded-full h-3'>
                <div
                  className='bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full'
                  style={{ width: '80%' }}
                ></div>
              </div>
            </div>

            <div>
              <div className='flex justify-between mb-1'>
                <span className='text-gray-300'>Game Development</span>
                <span className='text-blue-400'>75%</span>
              </div>
              <div className='w-full bg-gray-800 rounded-full h-3'>
                <div
                  className='bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full'
                  style={{ width: '75%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
