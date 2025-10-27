/*
    Assemble le tout pour la scene 3D



*/


'use client'

import { Canvas } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import Player from './Player'
import GalleryRoom from './GalleryRoom'

const GalleryScene = () => {
  return (
    <Canvas shadows>
      {/* LIGHTS */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      {/* 3D Room */}
      <GalleryRoom />

      {/* Player + CAMERA */}
      <Player />

      {/* Controls */}
      <PointerLockControls />
    </Canvas>
  )
}

export default GalleryScene