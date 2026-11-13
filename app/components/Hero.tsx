import ProfileImage from './ProfileImage'
import SocialIcon from './SocialIcon'
import type { Profile } from '../lib/types'

export default function Hero({ profile }: { profile: Profile | null }) {
  if (!profile) return null

  return (
    <section
      id='hero'
      className='min-h-screen flex items-center relative overflow-hidden pt-16 lg:pt-0'
    >
      {/* Background elements */}
      <div className='absolute inset-0 z-0'>
        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-linear-to-b from-gray-900 via-gray-900 to-gray-900/80'></div>

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
              {profile.name}
            </h1>
            <h2 className='text-2xl md:text-3xl font-semibold text-gray-300 mb-6'>
              {profile.role}
            </h2>
            {profile.tagline && (
              <p className='text-gray-400 text-lg mb-8 max-w-2xl'>
                {profile.tagline}
              </p>
            )}

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

            {profile.socials && profile.socials.length > 0 && (
              <div className='flex items-center gap-4 mt-8'>
                {profile.socials.map((social) => (
                  <a
                    key={social.url}
                    href={social.url}
                    target='_blank'
                    rel='noreferrer'
                    aria-label={social.label}
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className='flex-1 flex justify-center'>
            <ProfileImage imageSrc='/profile.jpg' />
          </div>
        </div>
      </div>
    </section>
  )
}
