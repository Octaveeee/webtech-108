'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { supabase } from '@/lib/supabaseClient'
import { ArtistCard, ArtistSkeleton } from '@/components/artists'



export default function Artists() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchArtists() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('artists')
          .select('*')
          .order('name', { ascending: true })

        if (error) throw error
        setArtists(data || [])
      } catch (err) {
        setError(err.message)
        console.error('Error fetching artists:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArtists()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1b1f] text-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center mb-12">
            Our Artists
          </h1>
          <p className="text-center text-lg text-gray-400 mb-12">
            Discover the talents that shape our collection.
          </p>
          
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <ArtistSkeleton key={i} />)}
            </div>
          )}
          
          {error && (
            <div className="text-center py-20">
              <p className="text-red-400 text-xl">Error: {error}</p>
            </div>
          )}
          
          {!loading && !error && artists.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-300 text-xl">No artists found.</p>
            </div>
          )}
          
          {!loading && !error && artists.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
