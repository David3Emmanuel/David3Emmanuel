interface SkillCategoryProps {
  title: string
  skills: string[]
  icon: React.ReactNode
}

export default function SkillCategory({
  title,
  skills,
  icon,
}: SkillCategoryProps) {
  return (
    <div className='bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300'>
      <div className='flex items-center mb-4'>
        <div className='mr-3 text-blue-400'>{icon}</div>
        <h3 className='text-lg font-semibold text-white'>{title}</h3>
      </div>
      <div className='flex flex-wrap gap-2'>
        {skills.map((skill) => (
          <span
            key={skill}
            className='px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-300'
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
