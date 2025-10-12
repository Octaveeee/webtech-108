'use client'

import Link from 'next/link'
import GalleryScene from './GalleryScene'

export default function Scene3DPage() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <GalleryScene />
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
        ← Retour à l'accueil
      </Link>
    </div>
  )
}