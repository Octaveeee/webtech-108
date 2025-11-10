
import Link from 'next/link'

export const ArtistCard = ({ artist }) => {
  const imageUrl = artist.image_url || artist.img_url
  
  return (
    <Link href={`/artists/${artist.id}`}>
      <div className="group bg-white dark:bg-[#24252a] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer">
        <div className="relative w-full h-80 overflow-hidden bg-gray-100 dark:bg-gray-700">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={artist.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              No Image
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {artist.name}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export const ArtistSkeleton = () => (
  <div className="bg-white dark:bg-[#24252a] rounded-xl shadow-lg animate-pulse h-96">
    <div className="w-full h-56 bg-gray-300 dark:bg-gray-700"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
    </div>
  </div>
)