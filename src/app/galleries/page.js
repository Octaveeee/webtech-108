import { supabaseServer } from '@/lib/supabaseClient'
import GalleriesList from '@/components/GalleriesList'
import Link from 'next/link'

export default async function Galleries() {
  const { data: galleries, error } = await supabaseServer.from('galleries').select(`*,profiles!galleries_id_user_fkey(name)`).order('name', { ascending: true })

  // errors
  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center mb-12">
            Our Galleries
          </h1>
          <div className="text-center py-20">
            <p className="text-red-400 text-xl">Error: {error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  // to be sure we have something
  const galleriesData = galleries || []

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center mb-12">
          Our Galleries
        </h1>
        
        {/* if no galleries : show create button */}
        {galleriesData.length === 0 ? (
          <div className="text-center mt-12">
            <Link
              href="/galleries/create"
              className="inline-block px-8 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition font-semibold">
              Create your own Gallery
            </Link>
          </div>
        ) : (
          /* if galleries : show them */
          <GalleriesList galleries={galleriesData} />
        )}
      </div>
    </div>
  )
}
