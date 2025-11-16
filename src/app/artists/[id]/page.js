'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { supabase } from '@/lib/supabaseClient'

export default function ArtistDetail() {
  const params = useParams()
  const nameParam = params.id
  const artistName = decodeURIComponent(nameParam).replaceAll('-', ' ')
  const [artist, setArtist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchArtist() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('artists')
          .select('*')
          .eq('name', artistName)
          .single()

        if (error) throw error
        setArtist(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching artist:', err)
      } finally {
        setLoading(false)
      }
    }

    if (artistName) {
      fetchArtist()
    }
  }, [artistName])

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1b1f] text-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/artists" className="text-gray-400 hover:text-white mb-6 inline-block">
            ← Back to Artists
          </Link>

          {loading && (
            <div className="text-center py-20">
              <p className="text-gray-300 text-xl">Loading artist...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-gray-300 text-xl">Artist not found.</p>
            </div>
          )}

         

          {!loading && !error && artist && (
            <div className="bg-white dark:bg-[#24252a] rounded-2xl p-8 shadow-xl overflow-hidden">
              {artist.img_url && (
                <div className="mb-6">
                  <img
                    src={artist.img_url}
                    alt={artist.name}
                    className="w-full h-96 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
