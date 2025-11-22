'use client'

import { useRef, useEffect } from 'react'
import { PointerLockControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { createCollisionBoxes, checkCollision } from './Collision'
import * as THREE from 'three'

const MovementControls = ({ playerRef, sceneConfig }) => {
  const controlsRef = useRef()
  const { camera } = useThree()
  const collisionBoxes = useRef(createCollisionBoxes(sceneConfig))
  
  useEffect(() => {
    if (sceneConfig) {
      collisionBoxes.current = createCollisionBoxes(sceneConfig)
    }
  }, [sceneConfig])
  
  const keys = useRef({ forward: false, backward: false, left: false, right: false, jump: false })
  const verticalVelocity = useRef(0)
  const groundY = 1
  const GRAVITY = 20
  const JUMP_SPEED = 7

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyW') keys.current.forward = true
      if (e.code === 'KeyS') keys.current.backward = true
      if (e.code === 'KeyA') keys.current.left = true
      if (e.code === 'KeyD') keys.current.right = true
      if (e.code === 'Space') {
        if (playerRef.current && Math.abs(playerRef.current.position.y - groundY) < 1e-3) {
          verticalVelocity.current = JUMP_SPEED
        }
        keys.current.jump = true
      }
    }
    
    const handleKeyUp = (e) => {
      if (e.code === 'KeyW') keys.current.forward = false
      if (e.code === 'KeyS') keys.current.backward = false
      if (e.code === 'KeyA') keys.current.left = false
      if (e.code === 'KeyD') keys.current.right = false
      if (e.code === 'Space') keys.current.jump = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [playerRef])

  useFrame((state, delta) => {
    if (!playerRef.current) return

    const speed = 5 * delta
    const direction = new THREE.Vector3()
    camera.getWorldDirection(direction)
    direction.y = 0
    direction.normalize()

    const right = new THREE.Vector3()
    right.crossVectors(direction, new THREE.Vector3(0, 1, 0)).normalize()

    const movement = new THREE.Vector3()
    if (keys.current.forward) movement.add(direction)
    if (keys.current.backward) movement.sub(direction)
    if (keys.current.left) movement.sub(right)
    if (keys.current.right) movement.add(right)

    if (movement.lengthSq() > 0) {
      movement.normalize().multiplyScalar(speed)
      const newPosition = playerRef.current.position.clone().add(movement)
      
      // check collision
      const hasCollision = checkCollision(
        [newPosition.x, newPosition.y, newPosition.z],
        collisionBoxes.current
      )
      
      // apply movement if no collision
      if (!hasCollision) {
        playerRef.current.position.copy(newPosition)
      }
    }

    
    verticalVelocity.current -= GRAVITY * delta
    playerRef.current.position.y += verticalVelocity.current * delta
    
    if (playerRef.current.position.y < groundY) {
      playerRef.current.position.y = groundY
      verticalVelocity.current = 0
    }

    camera.position.copy(playerRef.current.position).add(new THREE.Vector3(0, 1.5, 0))
  })

  useEffect(() => {
    if (playerRef.current && camera) {
      camera.position.copy(playerRef.current.position).add(new THREE.Vector3(0, 1.5, 0))
    }
  }, [camera, playerRef])
  return <PointerLockControls ref={controlsRef} />
}
export default MovementControls