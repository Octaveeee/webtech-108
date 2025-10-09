/*
    Assemble le tout pour la scene 3D



*/


'use client'

import { Canvas } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import Player from '../Player'
import GalleryRoom from '../GalleryRoom'

const GalleryScene = () => {
  return (
    <Canvas shadows>
      {/* Lumière */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      {/* Salle de galerie */}
      <GalleryRoom />

      {/* Joueur / caméra */}
      <Player />

      {/* Contrôles souris */}
      <PointerLockControls />
    </Canvas>
  )
}

export default GalleryScene