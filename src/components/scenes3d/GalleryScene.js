/*
    Assemble le tout pour la scene 3D



*/


'use client'

import { useEffect } from 'react'
import { useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Player from './Player'
import GalleryRoom from './GalleryRoom'

function LoadingDetector({ onLoaded }) {
  const { progress } = useProgress()
  
  useEffect(() => {
    if (progress === 100 && onLoaded) {
      setTimeout(() => onLoaded(), 300)
    }
  }, [progress, onLoaded])
  
  return null
}

const GalleryScene = ({ onLoaded, sceneConfig }) => {
  return (
    <Canvas shadows>
      <LoadingDetector onLoaded={onLoaded} />

      {/* LIGHTS */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      {/* 3D ROOM */}
      <GalleryRoom sceneConfig={sceneConfig} />

      {/* Player + CAMERA */}
      <Player sceneConfig={sceneConfig} />
    </Canvas>
  )
}
export default GalleryScene