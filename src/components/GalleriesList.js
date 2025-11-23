'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GalleryCard } from '@/components/galleries'
import GallerySearch from '@/components/GallerySearch'

export default function GalleriesList({ galleries: initialGalleries }) {
  const [filteredGalleries, setFilteredGalleries] = useState(initialGalleries)

  return (
    <>
      <GallerySearch galleries={initialGalleries} onFilteredChange={setFilteredGalleries} />
      
      {filteredGalleries.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-300 text-xl">No galleries found.</p>
        </div>
      )}
      
      {filteredGalleries.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGalleries.map((gallery) => (
              <GalleryCard key={gallery.id_galleries} gallery={gallery} />
            ))}
          </div>
          
          {/* separator */}
          <div className="mt-16 flex items-center justify-center gap-6">
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Create Gallery button */}
          <div className="mt-12 text-center">
            <Link
              href="/galleries/create"
              className="inline-block px-8 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition font-semibold">
              Create Gallery
            </Link>
          </div>
        </>
      )}
    </>
  )
}

