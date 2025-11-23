import { supabaseServer } from '@/lib/supabaseClient'
import { ArtistCard } from '@/components/artists'


export default async function Artists() {
  // get all artists from database
  const { data: artists, error } = await supabaseServer.from('artists').select('*').order('name', { ascending: true })

  // errors
  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center mb-12">
            Our Artists
          </h1>
          <div className="text-center py-20">
            <p className="text-red-400 text-xl">Error: {error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  // to be sure we have something
  const artistsData = artists || []

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center mb-12">
          Our Artists
        </h1>
        <p className="text-center text-lg text-gray-400 mb-12">
          Discover the talents that shape our collection.
        </p>
        
        {/* if no artists */}
        {artistsData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-300 text-xl">No artists found.</p>
          </div>
        )}
        
        {/* if artists : display them in a grid */}
        {artistsData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artistsData.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
