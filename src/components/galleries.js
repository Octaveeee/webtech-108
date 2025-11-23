import Link from 'next/link'

export const GalleryCard = ({ gallery }) => {
  const galleryName = gallery.name.replaceAll(' ', '-')
  
  return (
    <Link href={`/galleries/${encodeURIComponent(galleryName)}`}>
      <div className="group bg-white dark:bg-[#24252a] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer">
        <div className="p-6">
          {/* gallery name and status */}
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {gallery.name}
            </h2>
            {gallery.finished === false && (
              <span className="text-sm text-orange-500 dark:text-orange-400 font-medium">
                (in development)
              </span>
            )}
          </div>
          {/* if description */}
          {gallery.description && (
            <p className="text-gray-600 dark:text-gray-300 break-words mb-4 line-clamp-2">
              {gallery.description}
            </p>
          )}
          {/* if creator */}
          {gallery.profiles && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Created by {gallery.profiles.name}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

