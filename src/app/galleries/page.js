'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { supabase } from '@/lib/supabaseClient'

export default function Galleries() {
  const [galleries, setGalleries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchGalleries() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('galleries')
          .select(`
            *,
            profiles!galleries_id_user_fkey(name)
          `)
          .order('name', { ascending: true })

        if (error) throw error
        setGalleries(data || [])
      } catch (err) {
        setError(err.message)
        console.error('Error fetching galleries:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleries()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1b1f] text-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center mb-12">
            Our Galleries
          </h1>
          
          {loading && (
            <div className="text-center py-20">
              <p className="text-gray-300 text-xl">Loading galleries...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-20">
              <p className="text-red-400 text-xl">Error: {error}</p>
            </div>
          )}
          
          {!loading && !error && galleries.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-300 text-xl">No galleries found.</p>
            </div>
          )}
          
          {!loading && !error && galleries.length > 0 && (
            
            <div className="space-y-4">
              {galleries.map((gallery) => (
                <div
                  key={gallery.id_galleries}
                  className="w-full bg-white dark:bg-[#24252a] rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                >
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
                    <p className="text-gray-600 dark:text-gray-300 break-words mb-4">
                      {gallery.description}
                    </p>
                  )}

                  {gallery.finished === true ? (
                    <Link 
                      href={`/galleries/${encodeURIComponent(gallery.name)}`}
                      className="mt-4 inline-block rounded-lg bg-gray-800 dark:bg-gray-700 px-6 py-2 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition"
                    >
                      Visit 3D Gallery
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="mt-4 inline-block rounded-lg bg-gray-400 dark:bg-gray-600 px-6 py-2 text-white cursor-not-allowed opacity-50"
                    >
                      Visit 3D Gallery
                    </button>
                  )}

                  {gallery.created_at && gallery.id_user && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex flex-wrap gap-15">
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
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Created by</p>
                          <p className="text-gray-900 dark:text-white">
                            {gallery.profiles?.name || 'Unknown'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
