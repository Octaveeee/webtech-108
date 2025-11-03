/*
   Gère la salle :
        le sol
        les murs
        lumieres
        etc

*/

'use client'
import { useTexture } from '@react-three/drei'
import { RepeatWrapping } from 'three'

const WALL_COLOR = "#cccccc"
const FLOOR_COLOR = "#cccccc"

const GalleryRoom = () => {
  const floorTexture = useTexture('/textures/floor.jpg')

  floorTexture.repeat.set(2, 2)
  floorTexture.wrapS = RepeatWrapping
  floorTexture.wrapT = RepeatWrapping  


  return (
    <>
      {/* FLOOR */}
      <mesh position={[5, 0, 5]} rotation={[-Math.PI / 2, 0, 0]} >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>

      <mesh position={[10, 0, 20]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>

      {/* WALLS */}
      <mesh position={[5, 2, 0]}>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>

      <mesh position={[10, 2, 5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>

      <mesh position={[15, 2, 10]}>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>

      <mesh position={[20, 2, 15]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>

      <mesh position={[20, 2, 25]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>

      <mesh position={[15, 2, 30]}>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>

      <mesh position={[5, 2, 30]}>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>

      <mesh position={[0, 2, 25]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>

      <mesh position={[0, 2, 15]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>

      <mesh position={[0, 2, 5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      
      
      
      
      
    </> 
  )
}

export default GalleryRoom