'use client'

import { useRef, useEffect } from 'react'
import MovementControls from './MovementControls'

const SPAWN_POSITION = [5, 1, 5]

const Player = ({ sceneConfig }) => {
  const playerRef = useRef()

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.position.set(...SPAWN_POSITION)
    }
  }, [])

  return (
    <>
      <mesh ref={playerRef} position={SPAWN_POSITION}>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <MovementControls playerRef={playerRef} sceneConfig={sceneConfig} />
    </>
  )
}
export default Player