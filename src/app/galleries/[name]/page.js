'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { supabase } from '@/lib/supabaseClient'

export default function GalleryDetail() {
  const params = useParams()
  const nameParam = params.name
  const galleryName = decodeURIComponent(nameParam).replaceAll('-', ' ')
  const [gallery, setGallery] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchGallery() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('galleries')
          .select(`
            *,
            profiles!galleries_id_user_fkey(name)
          `)
          .eq('name', galleryName)
          .single()

        if (error) throw error
        setGallery(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching gallery:', err)
      } finally {
        setLoading(false)
      }
    }

    if (galleryName) {
      fetchGallery()
    }
  }, [galleryName])

  const galleryNameForUrl = galleryName.replaceAll(' ', '-')

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1b1f] text-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/galleries" className="text-gray-400 hover:text-white mb-6 inline-block">
            ← Back to Galleries
          </Link>

          {loading && (
            <div className="text-center py-20">
              <p className="text-gray-300 text-xl">Loading gallery...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-gray-300 text-xl">Gallery not found.</p>
            </div>
          )}

          {!loading && !error && gallery && (
            <div className="bg-white dark:bg-[#24252a] rounded-2xl p-8 shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {gallery.name}
                </h1>
                {gallery.finished === false && (
                  <span className="text-sm text-orange-500 dark:text-orange-400 font-medium">
                    (in development)
                  </span>
                )}
              </div>

              {gallery.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Description</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                    {gallery.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {gallery.created_at && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Created at</p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(gallery.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}

                {gallery.profiles && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Created by</p>
                    <p className="text-gray-900 dark:text-white">
                      {gallery.profiles.name || 'Unknown'}
                    </p>
                  </div>
                )}
              </div>

              <div className="text-center">
                {gallery.finished === true ? (
                  <Link 
                    href={`/galleries/${encodeURIComponent(galleryNameForUrl)}/scene`}
                    className="inline-block rounded-lg bg-gray-800 dark:bg-gray-700 px-6 py-3 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition font-semibold"
                  >
                    Visit 3D Gallery
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-block rounded-lg bg-gray-400 dark:bg-gray-600 px-6 py-3 text-white cursor-not-allowed opacity-50 font-semibold"
                  >
                    Visit 3D Gallery (Coming Soon)
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

