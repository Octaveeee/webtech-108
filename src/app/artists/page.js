'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { supabase } from '@/lib/supabaseClient'

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-8 pt-22 flex-1">
        <h1 className="text-2xl font-bold mb-4">Artists</h1>
        
        {loading && <p>Loading artists...</p>}
        
        {error && <p className="text-red-500">Error: {error}</p>}
        
        {!loading && !error && artists.length === 0 && (
          <p>No artists found.</p>
        )}
        
        {!loading && !error && artists.length > 0 && (
          <div>
            {artists.map((artist) => (
              <div key={artist.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                <h2>{artist.name}</h2>
                {artist.bio && <p>{artist.bio}</p>}
                {artist.country && <p>Country: {artist.country}</p>}
                {artist.birth_date && <p>Birth date: {artist.birth_date}</p>}
                {artist.image_url && (
                  <img src={artist.image_url} alt={artist.name} style={{ maxWidth: '200px', marginTop: '10px' }} />
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
