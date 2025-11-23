'use client'

import { useState, useEffect } from 'react'

export default function GallerySearch({ galleries, onFilteredChange }) {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (searchQuery.trim() === '') {
      onFilteredChange(galleries)
    } else {
      const filtered = galleries.filter(gallery =>
        gallery.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      onFilteredChange(filtered)
    }
  }, [searchQuery, galleries, onFilteredChange])

  return (
    <div className="mb-8 max-w-2xl mx-auto">
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search galleries by name..."
        className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

