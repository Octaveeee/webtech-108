import { supabaseServer } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default async function ArtistDetail({ params }) {
  const nameParam = params.id
  const artistName = decodeURIComponent(nameParam).replaceAll('-', ' ')

  const { data: artist, error } = await supabaseServer
    .from('artists')
    .select('*')
    .eq('name', artistName)
    .single()

  if (error || !artist) {
    notFound()
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/artists" className="text-gray-400 hover:text-white mb-6 inline-block">
          ← Back to Artists
        </Link>

        <div className="bg-white dark:bg-[#24252a] rounded-2xl p-8 shadow-xl overflow-hidden">
          {artist.img_url && (
            <div className="mb-6 relative w-full h-96 rounded-lg overflow-hidden">
              <Image
                src={artist.img_url}
                alt={artist.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {artist.name}
          </h1>

          {artist.bio && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Biography</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                {artist.bio}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artist.country && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Country</p>
                <p className="text-gray-900 dark:text-white">{artist.country}</p>
              </div>
            )}

            {artist.birth_date && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Birthday</p>
                <p className="text-gray-900 dark:text-white">
                  {new Date(artist.birth_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
