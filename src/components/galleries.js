import Link from 'next/link'

export const GalleryCard = ({ gallery }) => {
  const galleryName = gallery.name.replaceAll(' ', '-')
  
  return (
    <Link href={`/galleries/${encodeURIComponent(galleryName)}`}>
      <div className="group bg-white dark:bg-[#24252a] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer">
        <div className="p-6">
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
          {gallery.description && (
            <p className="text-gray-600 dark:text-gray-300 break-words mb-4 line-clamp-2">
              {gallery.description}
            </p>
          )}
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

export const GallerySkeleton = () => (
  <div className="bg-white dark:bg-[#24252a] rounded-xl shadow-lg animate-pulse h-48">
    <div className="p-6">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
    </div>
  </div>
)

