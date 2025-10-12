'use client'

import { useRef } from 'react'
import MovementControls from './MovementControls'

const Player = () => {
  const playerRef = useRef()

  return (
    <>
      <mesh ref={playerRef}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <MovementControls playerRef={playerRef} />
    </>
  )
}

export default Player