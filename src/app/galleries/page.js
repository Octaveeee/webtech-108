'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { supabase } from '@/lib/supabaseClient'
import { GalleryCard, GallerySkeleton } from '@/components/galleries'

export default function Galleries() {
  const [galleries, setGalleries] = useState([])
  const [filteredGalleries, setFilteredGalleries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
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
        setFilteredGalleries(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleries()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredGalleries(galleries)
    } else {
      const filtered = galleries.filter(gallery =>
        gallery.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredGalleries(filtered)
    }
  }, [searchQuery, galleries])

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1b1f] text-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center mb-12">
            Our Galleries
          </h1>
          
          <div className="mb-8 max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search galleries by name..."
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
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
          
          {!loading && !error && filteredGalleries.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-300 text-xl">
                {searchQuery ? `No galleries found matching "${searchQuery}"` : 'No galleries found.'}
              </p>
            </div>
          )}
          
          {!loading && !error && filteredGalleries.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGalleries.map((gallery) => (
                  <GalleryCard key={gallery.id_galleries} gallery={gallery} />
                ))}
              </div>
              
              {/* séparateur */}
              <div className="mt-16 flex items-center justify-center gap-6">
                <div className="flex-1 h-px bg-gray-600"></div>
              </div>

              {/* Bouton Create Gallery */}
              <div className="mt-12 text-center">
                <Link
                  href="/galleries/create"
                  className="inline-block px-8 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition font-semibold">
                  Create Gallery
                </Link>
              </div>
            </>
          )}

          {!loading && !error && galleries.length === 0 && (
            <div className="text-center mt-12">
              <Link
                href="/galleries/create"
                className="inline-block px-8 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition font-semibold">
                Create your own Gallery
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
