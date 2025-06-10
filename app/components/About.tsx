export default function About() {
  return (
    <section id='about' className='py-20 bg-gray-900/30'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center text-white mb-16'>
          About Me
          <div className='h-1 w-20 bg-blue-500 mx-auto mt-2'></div>
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left Column: About Text */}
          <div className='space-y-6'>
            <p className='text-gray-300 text-lg'>
              I'm a Systems Engineering student and passionate Full-Stack
              Developer focused on creating elegant solutions to complex
              problems. Based in Lagos, Nigeria, I'm currently pursuing my
              B.Eng. at the University of Lagos while working on exciting web
              development projects.
            </p>
            <p className='text-gray-300 text-lg'>
              I'm experienced with modern web technologies, game development,
              and have a strong foundation in data structures and algorithms.
            </p>

            <div className='bg-gray-800/50 p-6 rounded-lg border border-gray-700 mt-8'>
              <h3 className='text-xl font-semibold text-white mb-4'>
                Education
              </h3>
              <div className='space-y-2'>
                <div>
                  <h4 className='text-lg font-medium text-blue-400'>
                    University of Lagos
                  </h4>
                  <p className='text-gray-300'>
                    B.Eng. Systems Engineering (2023 – 2028)
                  </p>
                  <p className='text-gray-400'>GPA: 4.97/5.00</p>
                </div>
                <p className='text-gray-300 mt-3'>
                  <span className='font-medium'>Relevant Coursework:</span>{' '}
                  Statistics, System Design, Data Structures and Algorithms,
                  Artificial Intelligence
                </p>
              </div>
            </div>

            <div className='bg-gray-800/50 p-6 rounded-lg border border-gray-700'>
              <h3 className='text-xl font-semibold text-white mb-4'>
                Certifications & Training
              </h3>
              <ul className='space-y-2 text-gray-300'>
                <li className='flex items-start'>
                  <span className='text-blue-400 mr-2'>•</span>
                  <span>HatchDev Training – NITHUB</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-blue-400 mr-2'>•</span>
                  <span>GameUp Africa – Maliyo Games</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-blue-400 mr-2'>•</span>
                  <span>PLP Academy – Power Learn Project</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-blue-400 mr-2'>•</span>
                  <span>Digital For All Challenge – Tech4Dev</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Stats and Info */}
          <div className='space-y-8'>
            {/* Personal Stats Cards */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300'>
                <div className='text-3xl font-bold text-blue-400 mb-2'>2+</div>
                <div className='text-gray-300'>Years of Experience</div>
              </div>

              <div className='bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300'>
                <div className='text-3xl font-bold text-blue-400 mb-2'>5+</div>
                <div className='text-gray-300'>Projects Completed</div>
              </div>

              <div className='bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300'>
                <div className='text-3xl font-bold text-blue-400 mb-2'>4</div>
                <div className='text-gray-300'>Programming Languages</div>
              </div>

              <div className='bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300'>
                <div className='text-3xl font-bold text-blue-400 mb-2'>3+</div>
                <div className='text-gray-300'>Certifications</div>
              </div>
            </div>

            {/* Technical Proficiency */}
            <div className='bg-gray-800/50 p-6 rounded-lg border border-gray-700'>
              <h3 className='text-xl font-semibold text-white mb-4'>
                Technical Proficiency
              </h3>

              {/* Frontend */}
              <div className='mb-4'>
                <div className='flex justify-between mb-1'>
                  <span className='text-gray-300'>Frontend Development</span>
                  <span className='text-blue-400'>90%</span>
                </div>
                <div className='w-full bg-gray-700 rounded-full h-2'>
                  <div
                    className='bg-blue-500 h-2 rounded-full'
                    style={{ width: '90%' }}
                  ></div>
                </div>
              </div>

              {/* Backend */}
              <div className='mb-4'>
                <div className='flex justify-between mb-1'>
                  <span className='text-gray-300'>Backend Development</span>
                  <span className='text-blue-400'>85%</span>
                </div>
                <div className='w-full bg-gray-700 rounded-full h-2'>
                  <div
                    className='bg-blue-500 h-2 rounded-full'
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>

              {/* Game Development */}
              <div className='mb-4'>
                <div className='flex justify-between mb-1'>
                  <span className='text-gray-300'>Game Development</span>
                  <span className='text-blue-400'>75%</span>
                </div>
                <div className='w-full bg-gray-700 rounded-full h-2'>
                  <div
                    className='bg-blue-500 h-2 rounded-full'
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>

              {/* Algorithms & Data Structures */}
              <div>
                <div className='flex justify-between mb-1'>
                  <span className='text-gray-300'>
                    Algorithms & Data Structures
                  </span>
                  <span className='text-blue-400'>80%</span>
                </div>
                <div className='w-full bg-gray-700 rounded-full h-2'>
                  <div
                    className='bg-blue-500 h-2 rounded-full'
                    style={{ width: '80%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
