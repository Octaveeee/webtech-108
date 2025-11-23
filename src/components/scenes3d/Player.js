'use client'

import { useRef, useEffect } from 'react'
import MovementControls from './MovementControls'

// spawn position
const SPAWN_POSITION = [5, 1, 5]

const Player = ({ sceneConfig }) => {
  const playerRef = useRef()

  // set initial position
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.position.set(...SPAWN_POSITION)
    }
  }, [])

  return (
    <>
      {/* player box */}
      <mesh ref={playerRef} position={SPAWN_POSITION}>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* movement controls */}
      <MovementControls playerRef={playerRef} sceneConfig={sceneConfig} />
    </>
  )
}
export default Player