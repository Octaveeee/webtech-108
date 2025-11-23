'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function CreateGallery() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({name: '',description: ''})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [selectedLayout, setSelectedLayout] = useState('open')

  // get current user
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  // generate 3 3D scene config
  const getGalleryConfig = (layout) => {
    const cellSize = 10
    const floors = []
    const roofs = []
    
    // floor and roof
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        floors.push({
          position: [col * cellSize + 5, 0, row * cellSize + 5],
          size: cellSize,
          textureRepeat: [1, 1]
        })
        roofs.push({
          position: [col * cellSize + 5, 5.5, row * cellSize + 5],
          size: cellSize,
          textureRepeat: [1, 1]
        })
      }
    }

    let walls = []

    // different wall layouts
    if (layout === 'open') {
      for (let col = 0; col < 5; col++) {
        walls.push({ position: [col * cellSize + 5, 2, 0], rotation: [0, 0, 0] })
        walls.push({ position: [col * cellSize + 5, 2, 50], rotation: [0, 0, 0] })
      }
      for (let row = 0; row < 5; row++) {
        walls.push({ position: [0, 2, row * cellSize + 5], rotation: [0, 1.5708, 0] })
        walls.push({ position: [50, 2, row * cellSize + 5], rotation: [0, 1.5708, 0] })
      }
    } else if (layout === 'divided') {
      for (let col = 0; col < 5; col++) {
        walls.push({ position: [col * cellSize + 5, 2, 0], rotation: [0, 0, 0] })
        walls.push({ position: [col * cellSize + 5, 2, 50], rotation: [0, 0, 0] })
      }
      for (let row = 0; row < 5; row++) {
        walls.push({ position: [0, 2, row * cellSize + 5], rotation: [0, 1.5708, 0] })
        walls.push({ position: [50, 2, row * cellSize + 5], rotation: [0, 1.5708, 0] })
      }
      for (let row = 0; row < 5; row++) {
        walls.push({ position: [25, 2, row * cellSize + 5], rotation: [0, 1.5708, 0] })
      }
      for (let col = 0; col < 2; col++) {
        walls.push({ position: [col * cellSize + 5, 2, 20], rotation: [0, 0, 0] })
      }
      for (let col = 3; col < 5; col++) {
        walls.push({ position: [col * cellSize + 5, 2, 20], rotation: [0, 0, 0] })
      }
    } else if (layout === 'small') {
      for (let col = 0; col < 2; col++) {
        walls.push({ position: [col * cellSize + 5, 2, 0], rotation: [0, 0, 0] })
        walls.push({ position: [col * cellSize + 5, 2, 20], rotation: [0, 0, 0] })
      }
      for (let row = 0; row < 2; row++) {
        walls.push({ position: [0, 2, row * cellSize + 5], rotation: [0, 1.5708, 0] })
        walls.push({ position: [20, 2, row * cellSize + 5], rotation: [0, 1.5708, 0] })
      }
    }

    // plinths
    const plinths = walls.map(wall => ({
      position: [wall.position[0], 0.05, wall.position[2]],
      rotation: wall.rotation,
      size: 10
    }))

    return {
      floors,
      walls,
      roofs,
      plinth: plinths,
      backboard: [],
      paintings: []
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('You must be logged in to create a gallery')
      return
    }

    // check gallery name
    if (!formData.name.trim()) {
      setError('Gallery name is required')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const sceneConfig = getGalleryConfig(selectedLayout)

      // insert gallery in database
      const { error: insertError } = await supabase.from('galleries').insert({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          id_user: user.id,
          finished: false,
          scene_config: sceneConfig
        }).select().single()

      if (insertError) throw insertError

      // redirect to gallery page
      router.push(`/galleries/${encodeURIComponent(formData.name.trim().replaceAll(' ', '-'))}`)
    } catch (err) {
      setError(err.message || 'Error creating gallery')
    } finally {
      setSubmitting(false)
    }
  }

  // loading
  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center py-20">
            <p className="text-gray-300 text-xl">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  // the user must be logged in, if not : show this
  if (!user) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white dark:bg-[#24252a] rounded-2xl p-8 shadow-xl text-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Login Required</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You must be logged in to create a gallery.
            </p>
            <Link href="/auth?mode=login" className="inline-block px-6 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition font-semibold">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }


  // if the user is logged in, show the form : 
  return (
    <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <Link href="/galleries" className="text-gray-400 hover:text-white mb-6 inline-block">
            ← Back to Galleries
          </Link>

          <div className="bg-white dark:bg-[#24252a] rounded-2xl p-8 shadow-xl">
            <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Create New Gallery
            </h1>

            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Gallery Name <span className="text-red-500">*</span>
                </label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                  className="w-full rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter gallery name"
                />
              </div>

              {/* description */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={5}
                  className="w-full rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter gallery description (optional)"
                />
              </div>

              {/* ldiiferent scene configs */}
              <div>
                <label className="block text-sm font-medium mb-4 text-gray-900 dark:text-white">
                  Gallery Layout
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button type="button" onClick={() => setSelectedLayout('open')}
                    className={`p-4 rounded-lg border-2 transition ${
                      selectedLayout === 'open'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Large Open Room</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      A single space without interior walls
                    </p>
                  </button>
                  
                  <button type="button" onClick={() => setSelectedLayout('divided')}
                    className={`p-4 rounded-lg border-2 transition ${
                      selectedLayout === 'divided'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Divided Space</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Some walls to create 2-3 zones
                    </p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setSelectedLayout('small')}
                    className={`p-4 rounded-lg border-2 transition ${
                      selectedLayout === 'small'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Small Room</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      A compact space with minimal walls
                    </p>
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/galleries" className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-semibold text-center">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={submitting || !formData.name.trim()}
                  className="flex-1 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Creating...' : 'Create Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}