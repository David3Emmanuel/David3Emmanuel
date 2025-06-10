import ProfileImage from './ProfileImage'

export default function Hero() {
  return (
    <section
      id='hero'
      className='min-h-screen flex items-center relative overflow-hidden pt-16 lg:pt-0'
    >
      {/* Background elements */}
      <div className='absolute inset-0 z-0'>
        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/80'></div>

        {/* Grid pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDQ0IiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]"></div>
        </div>

        {/* Animated glowing orbs */}
        <div className='absolute top-1/4 right-1/4 w-80 h-80 bg-blue-600/30 rounded-full filter blur-[100px] animate-pulse'></div>
        <div className='absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-600/20 rounded-full filter blur-[100px] animate-pulse animation-delay-2000'></div>
      </div>

      <div className='container mx-auto px-4 z-10'>
        <div className='flex flex-col md:flex-row items-center gap-12'>
          <div className='flex-1'>
            <p className='text-blue-400 font-medium mb-4'>Hi there 👋, I'm</p>
            <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
              David Emmanuel
            </h1>
            <h2 className='text-2xl md:text-3xl font-semibold text-gray-300 mb-6'>
              Full-Stack Developer
            </h2>
            <p className='text-gray-400 text-lg mb-8 max-w-2xl'>
              A dedicated developer focused on creating elegant solutions to
              complex problems. Systems Engineering student with experience in
              modern web technologies, game development, and a strong foundation
              in data structures and algorithms.
            </p>

            <div className='flex flex-wrap gap-4'>
              <a
                href='#projects'
                className='px-8 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center'
              >
                View My Work
                <svg
                  className='w-5 h-5 ml-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 14l-7 7m0 0l-7-7m7 7V3'
                  ></path>
                </svg>
              </a>
              <a
                href='#contact'
                className='px-8 py-3 rounded-md border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white font-medium transition-colors'
              >
                Contact Me
              </a>
            </div>

            <div className='flex items-center gap-4 mt-8'>
              <a
                href='https://github.com/David3Emmanuel'
                target='_blank'
                rel='noreferrer'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
              <a
                href='https://linkedin.com/in/David3Emmanuel'
                target='_blank'
                rel='noreferrer'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                </svg>
              </a>
              <a
                href='https://twitter.com/David3Emmnauel'
                target='_blank'
                rel='noreferrer'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
              </a>
            </div>
          </div>

          <div className='flex-1 flex justify-center'>
            <ProfileImage />
          </div>
        </div>
      </div>
    </section>
  )
}
