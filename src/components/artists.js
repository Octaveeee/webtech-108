import Link from 'next/link'
import Image from 'next/image'

export const ArtistCard = ({ artist }) => {
  const imageUrl = artist.img_url

  const artistName = artist.name.replaceAll(' ', '-')
  
  
  return (
    <Link href={`/artists/${encodeURIComponent(artistName)}`}>
      <div className="group bg-white dark:bg-[#24252a] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer">
        {/* artist image */}
        <div className="relative w-full h-80 overflow-hidden bg-gray-100 dark:bg-gray-700">
          {/* if image : show it */}
          {imageUrl ? (
            <Image src={imageUrl} alt={artist.name} fill className="object-cover" unoptimized/>
          ) : (
            /* if no image */
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              No Image
            </div>
          )}
        </div>
        
        {/* artist name */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {artist.name}
          </h2>
        </div>
      </div>
    </Link>
  )
}