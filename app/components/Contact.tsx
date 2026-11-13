import SocialIcon from './SocialIcon'
import type { Profile } from '../lib/types'

export default function Contact({ profile }: { profile: Profile | null }) {
  if (!profile) return null

  return (
    <section id='contact' className='py-16 bg-gray-900/30'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center text-white mb-12'>
          Get In Touch
          <div className='h-1 w-20 bg-blue-500 mx-auto mt-2'></div>
        </h2>

        <div className='max-w-3xl mx-auto'>
          <div className='bg-gray-900/50 border border-gray-800 rounded-lg p-8'>
            <p className='text-gray-300 text-center mb-8'>
              I'm open to new opportunities and collaborations. Feel free to
              reach out!
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {profile.location && (
                <div className='flex items-center p-4 bg-gray-800/50 rounded-lg'>
                  <div className='bg-blue-600/20 p-3 rounded-full mr-4'>
                    <svg
                      className='w-6 h-6 text-blue-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      ></path>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-lg font-medium text-white'>Location</h3>
                    <p className='text-gray-400'>{profile.location}</p>
                    {profile.availability && (
                      <p className='text-gray-500 text-sm'>
                        {profile.availability}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {profile.phone && (
                <div className='flex items-center p-4 bg-gray-800/50 rounded-lg'>
                  <div className='bg-blue-600/20 p-3 rounded-full mr-4'>
                    <svg
                      className='w-6 h-6 text-blue-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-lg font-medium text-white'>Phone</h3>
                    <p className='text-gray-400'>{profile.phone}</p>
                  </div>
                </div>
              )}

              {profile.email && (
                <div className='flex items-center p-4 bg-gray-800/50 rounded-lg'>
                  <div className='bg-blue-600/20 p-3 rounded-full mr-4'>
                    <svg
                      className='w-6 h-6 text-blue-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-lg font-medium text-white'>Email</h3>
                    <a
                      href={`mailto:${profile.email}`}
                      className='text-gray-400 hover:text-blue-400 transition-colors'
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
              )}

              {profile.socials && profile.socials.length > 0 && (
                <div className='flex items-center p-4 bg-gray-800/50 rounded-lg'>
                  <div className='bg-blue-600/20 p-3 rounded-full mr-4'>
                    <svg
                      className='w-6 h-6 text-blue-400'
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
                  </div>
                  <div>
                    <h3 className='text-lg font-medium text-white'>Social</h3>
                    <div className='flex space-x-3 mt-1'>
                      {profile.socials.map((social) => (
                        <a
                          key={social.url}
                          href={social.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label={social.label}
                          className='text-gray-400 hover:text-blue-400 transition-colors'
                        >
                          <SocialIcon icon={social.icon} className='w-5 h-5' />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
