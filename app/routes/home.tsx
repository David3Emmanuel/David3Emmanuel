import type { Route } from './+types/home'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'David Emmanuel - Full-Stack Developer' },
    {
      name: 'description',
      content:
        'Portfolio of David Emmanuel, a Full-Stack Developer specializing in web development, game development, and more.',
    },
    { property: 'og:title', content: 'David Emmanuel - Full-Stack Developer' },
    {
      property: 'og:description',
      content:
        'Portfolio of David Emmanuel, a Full-Stack Developer specializing in web development, game development, and more.',
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@David3Emmnauel' },
    { name: 'twitter:title', content: 'David Emmanuel - Full-Stack Developer' },
    {
      name: 'twitter:description',
      content:
        'Portfolio of David Emmanuel, a Full-Stack Developer specializing in web development, game development, and more.',
    },
  ]
}

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
