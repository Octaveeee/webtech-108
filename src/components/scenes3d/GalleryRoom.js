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

const createTexture = (baseTexture, repeatX, repeatY) => {
  const texture = baseTexture.clone()
  texture.repeat.set(repeatX, repeatY)
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  return texture
}

const GalleryRoom = () => {
  const baseFloorTexture = useTexture('/textures/floor.jpg')
  const baseWallTexture = useTexture('/textures/wall.jpg')
  const baseRoofTexture = useTexture('/textures/roof.jpg')
  const basePlinthTexture = useTexture('/textures/plinth.jpg')

  const floorTexture1 = createTexture(baseFloorTexture, 3, 3)
  const floorTexture2 = createTexture(baseFloorTexture, 6, 6)
  const wallTexture = createTexture(baseWallTexture, 2, 2)
  const roofTexture1 = createTexture(baseRoofTexture, 1, 1)
  const roofTexture2 = createTexture(baseRoofTexture, 2, 2)
  const plinthTexture = createTexture(basePlinthTexture, 1, 1)


  const floors = [
    { position: [5, 0, 5], size: 10, texture: floorTexture1 },
    { position: [10, 0, 20], size: 20, texture: floorTexture2 },
  ]

  const roofs = [
    { position: [5, 5.5, 5], size: 10, texture: roofTexture1 },
    { position: [10, 5.5, 20], size: 20, texture: roofTexture2 },
  ]

  const walls = [
    { position: [5, 2, 0], rotation: [0, 0, 0] },
    { position: [10, 2, 5], rotation: [0, Math.PI / 2, 0] },
    { position: [15, 2, 10], rotation: [0, 0, 0] },
    { position: [20, 2, 15], rotation: [0, Math.PI / 2, 0] },
    { position: [20, 2, 25], rotation: [0, Math.PI / 2, 0] },
    { position: [15, 2, 30], rotation: [0, 0, 0] },
    { position: [5, 2, 30], rotation: [0, 0, 0] },
    { position: [0, 2, 25], rotation: [0, Math.PI / 2, 0] },
    { position: [0, 2, 15], rotation: [0, Math.PI / 2, 0] },
    { position: [0, 2, 5], rotation: [0, Math.PI / 2, 0] },
  ]

  const plinth = [
    { position: [5, 0.05, 0], size: 10, texture: plinthTexture, rotation: [0, 0, 0] },
    { position: [10, 0.05, 30], size: 20, texture: plinthTexture, rotation: [0, 0, 0] },
    { position: [20, 0.05, 20], size: 20, texture: plinthTexture, rotation: [0, Math.PI / 2, 0] },
    { position: [0, 0.05, 15], size: 30, texture: plinthTexture, rotation: [0, Math.PI / 2, 0] },
    { position: [10, 0.05, 5], size: 10, texture: plinthTexture, rotation: [0, Math.PI / 2, 0] },
    { position: [15, 0.05, 10], size: 10.3, texture: plinthTexture, rotation: [0, 0, 0] },
  ]

  const backboard = [
    { position: [5, 2.7, 0.05], size: 5, rotation: [0, 0, 0] },
  ]

  return (
    <>
      {/* FLOOR */}
      {floors.map((floor, index) => (
        <mesh key={index} position={floor.position} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[floor.size, floor.size]} />
          <meshStandardMaterial map={floor.texture} />
        </mesh>
      ))}

      {/* ROOF */}
      {roofs.map((roof, index) => (
        <mesh key={index} position={roof.position} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roof.size, roof.size]} />
          <meshStandardMaterial map={roof.texture} />
        </mesh>
      ))}



      {/* WALLS */}
      {walls.map((wall, index) => (
        <mesh key={index} position={wall.position} rotation={wall.rotation}>
          <boxGeometry args={[10, 7, 0.1]} />
          <meshStandardMaterial map={wallTexture} />
        </mesh>
      ))}

      
      {/* PLINTH */}
      {plinth.map((plinth, index) => (
        <mesh key={index} position={plinth.position} rotation={plinth.rotation}>
          <boxGeometry args={[plinth.size, 0.5, 0.3]} />
          <meshStandardMaterial map={plinth.texture} />
        </mesh>
      ))}


      {/* BACKBOARD */}
      {backboard.map((backboard, index) => (
        <mesh key={index} position={backboard.position} rotation={backboard.rotation}>
          <boxGeometry args={[backboard.size, 3, 0.1]} />
          <meshStandardMaterial color="midnightblue" />
        </mesh>
      ))}



      
      
      
    </> 
  )
}

export default GalleryRoom