interface ProfileImageProps {
  imageSrc?: string
  initials?: string
}

export default function ProfileImage({
  imageSrc,
  initials = 'D3E',
}: ProfileImageProps) {
  return (
    <div className='relative'>
      <div className='w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1'>
        <div className='w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden'>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt='Profile'
              className='w-full h-full object-cover rounded-full'
            />
          ) : (
            <div className='text-6xl font-bold text-blue-500'>{initials}</div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute -bottom-4 -right-4 w-24 h-24 rounded-lg bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rotate-12'></div>
      <div className='absolute -top-4 -left-4 w-16 h-16 rounded-lg bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 -rotate-12'></div>
    </div>
  )
}
