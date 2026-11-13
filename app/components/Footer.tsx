import { useLocation } from 'react-router'
import SocialIcon from './SocialIcon'
import type { Profile } from '../lib/types'

export default function Footer({ profile }: { profile?: Profile | null }) {
  const { pathname } = useLocation()
  const home = pathname === '/'
  const anchor = (hash: string) => (home ? hash : `/${hash}`)

  return (
    <footer className='bg-gray-900 text-white py-12 border-t border-gray-800'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-6 md:mb-0'>
            <h2 className='text-2xl font-bold'>
              David<span className='text-blue-500'>3Emmanuel</span>
            </h2>
            {profile?.tagline && (
              <p className='text-gray-400 mt-2 max-w-md'>{profile.tagline}</p>
            )}
          </div>

          <div className='flex flex-col items-center md:items-end'>
            {profile?.socials && profile.socials.length > 0 && (
              <div className='flex space-x-4 mb-4'>
                {profile.socials.map((social) => (
                  <a
                    key={social.url}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={social.label}
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            )}
            <p className='text-gray-500 text-sm'>
              © {new Date().getFullYear()} {profile?.name ?? 'David Emmanuel'}.
              All rights reserved.
            </p>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between'>
          <nav className='flex flex-wrap justify-center md:justify-start gap-6 mb-4 md:mb-0'>
            <a
              href={anchor('#hero')}
              className='text-gray-400 hover:text-blue-400 transition-colors'
            >
              Home
            </a>
            <a
              href={anchor('#about')}
              className='text-gray-400 hover:text-blue-400 transition-colors'
            >
              About
            </a>
            <a
              href={anchor('#skills')}
              className='text-gray-400 hover:text-blue-400 transition-colors'
            >
              Skills
            </a>
            <a
              href={anchor('#projects')}
              className='text-gray-400 hover:text-blue-400 transition-colors'
            >
              Projects
            </a>
            <a
              href={anchor('#experience')}
              className='text-gray-400 hover:text-blue-400 transition-colors'
            >
              Experience
            </a>
            <a
              href={anchor('#contact')}
              className='text-gray-400 hover:text-blue-400 transition-colors'
            >
              Contact
            </a>
          </nav>
          <p className='text-gray-500 text-sm text-center md:text-right'>
            Built with ❤️ by David Emmanuel
          </p>
        </div>
      </div>
    </footer>
  )
}
