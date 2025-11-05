'use client'

import { useState } from 'react'
import Link from 'next/link'
import GalleryScene from '@/components/scenes3d/GalleryScene'
import HelpPanel from '@/components/scenes3d/HelpPanel'

export default function Scene3DPage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <GalleryScene onLoaded={() => setIsLoading(false)} />

      {isLoading && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#1a1b1f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          opacity: isLoading ? 1 : 0,
          transition: "opacity 0.5s ease-out"
        }}>
          <div className="text-white text-3xl font-light">
             Loading
            <span className="animate-pulse">.</span>
            <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
          </div>
        </div>
      )}


      <Link 
        href="/"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          padding: "10px 20px",
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
          textDecoration: "none",
          color: "black"
        }}
      >
        ← Home
      </Link>

      <HelpPanel/>
      
    </div>
  )
}