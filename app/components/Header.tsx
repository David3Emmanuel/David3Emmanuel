import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'

interface NavItem {
  label: string
  href: string
}

export default function Header() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const onHome = location.pathname === '/'
  const section = (hash: string) => (onHome ? hash : `/${hash}`)

  const navItems: NavItem[] = onHome
    ? [
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Experience', href: '#experience' },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
      ]

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between py-4'>
          <div className='flex items-center'>
            <Link to='/' className='text-2xl font-bold text-white'>
              David<span className='text-blue-500'>3Emmanuel</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className='text-gray-300 hover:text-blue-400 transition-colors'
              >
                {item.label}
              </a>
            ))}
            <Link
              to='/blog'
              className='text-gray-300 hover:text-blue-400 transition-colors'
            >
              Blog
            </Link>
            <a
              href={section('#contact')}
              className='px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors'
            >
              Contact Me
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-gray-200 focus:outline-none'
            aria-label='Toggle navigation'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
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
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
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
                  strokeWidth={2}
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className='md:hidden bg-gray-900 border-t border-gray-800 py-4'>
          <div className='container mx-auto px-4 flex flex-col space-y-4'>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className='text-gray-300 hover:text-blue-400 transition-colors p-2'
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              to='/blog'
              className='text-gray-300 hover:text-blue-400 transition-colors p-2'
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <a
              href={section('#contact')}
              className='inline-block px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Me
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
