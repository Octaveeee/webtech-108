'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { supabase } from '@/lib/supabaseClient'
import { GalleryCard, GallerySkeleton } from '@/components/galleries'

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
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center mb-12">
            Our Galleries
          </h1>
          
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <GallerySkeleton key={i} />)}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleries.map((gallery) => (
                <GalleryCard key={gallery.id_galleries} gallery={gallery} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
