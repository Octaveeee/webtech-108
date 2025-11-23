'use client'

import { useState, Suspense, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import GalleryScene from '@/components/scenes3d/GalleryScene'
import HelpPanel from '@/components/scenes3d/HelpPanel'
import { supabase } from '@/lib/supabaseClient'

// preload textures
function TexturePreloader() {
  useEffect(() => {
    const textures = [
      '/textures/floor.jpg',
      '/textures/wall.jpg',
      '/textures/roof.jpg',
      '/textures/plinth.jpg'
    ]
    
    textures.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
    
    return () => {
      textures.forEach(src => {
        const link = document.querySelector(`link[href="${src}"]`)
        if (link) link.remove()
      })
    }
  }, [])
  
  return null
}

// loading animation
function SceneLoader() {
  return (
    <div className="w-screen h-screen bg-[#1a1b1f] flex items-center justify-center">
      <div className="text-white text-3xl font-light">
        Loading
        <span className="animate-pulse">.</span>
        <span className="animate-pulse [animation-delay:0.2s]">.</span>
        <span className="animate-pulse [animation-delay:0.4s]">.</span>
      </div>
    </div>
  )
}

export default function GalleryScenePage() {
  const params = useParams()
  const nameParam = params.name
  const galleryName = decodeURIComponent(nameParam).replaceAll('-', ' ')
  const [isLoading, setIsLoading] = useState(true)
  const [sceneConfig, setSceneConfig] = useState(null)
  const [error, setError] = useState(null)
  const [configLoading, setConfigLoading] = useState(true)

  // get scene config from database
  useEffect(() => {
    async function fetchSceneConfig() {
      try {
        setConfigLoading(true)
        const { data, error } = await supabase.from('galleries').select('scene_config').eq('name', galleryName).single()

        if (error) throw error
        
        // error
        if (!data?.scene_config) {
          throw new Error('No scene configuration found for this gallery')
        }
        
        setSceneConfig(data.scene_config)
      } catch (err) {
        setError(err.message)
      } finally {
        setConfigLoading(false)
      }
    }

    if (galleryName) {
      fetchSceneConfig()
    }
  }, [galleryName])

  const galleryNameForUrl = galleryName.replaceAll(' ', '-')

  return (
    <div className="w-screen h-screen relative">
      <TexturePreloader />
      {configLoading && (
        <SceneLoader />
      )}
      {error && !configLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] bg-red-500 text-white p-5 rounded-lg">
          Error: {error}
        </div>
      )}
      {!configLoading && !error && sceneConfig && (
        <Suspense fallback={<SceneLoader />}>
          <GalleryScene onLoaded={() => setIsLoading(false)} sceneConfig={sceneConfig} />
        </Suspense>
      )}

      {isLoading && (
        <div className={`absolute top-0 left-0 w-full h-full bg-[#1a1b1f] flex items-center justify-center z-[9999] transition-opacity duration-500 ease-out ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-white text-3xl font-light">
            Loading
            <span className="animate-pulse">.</span>
            <span className="animate-pulse [animation-delay:0.2s]">.</span>
            <span className="animate-pulse [animation-delay:0.4s]">.</span>
          </div>
        </div>
      )}

      <Link 
        href={`/galleries/${encodeURIComponent(galleryNameForUrl)}`}
        className="absolute top-5 left-5 z-[1000] px-5 py-2.5 bg-white border border-gray-300 rounded-md cursor-pointer no-underline text-black"
      >
        ← Back to Gallery
      </Link>

      <HelpPanel/>
    </div>
  )
}

