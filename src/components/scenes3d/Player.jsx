'use client'

import { useRef } from 'react'
import MovementControls from './MovementControls'

const Player = () => {
  const playerRef = useRef()

  return (
    <>
      <mesh ref={playerRef}>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <MovementControls playerRef={playerRef} />
    </>
  )
}

export default Player