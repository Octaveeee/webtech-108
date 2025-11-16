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

const Painting = ({ painting }) => {
  const texture = useTexture(painting.img_url)
  return (
    <mesh position={painting.position} rotation={painting.rotation}>
      <planeGeometry args={painting.size} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

const GalleryRoom = ({ sceneConfig }) => {
  
  const baseFloorTexture = useTexture('/textures/floor.jpg')
  const baseWallTexture = useTexture('/textures/wall.jpg')
  const baseRoofTexture = useTexture('/textures/roof.jpg')
  const basePlinthTexture = useTexture('/textures/plinth.jpg')

  const wallTexture = createTexture(baseWallTexture, 2, 2)
  const plinthTexture = createTexture(basePlinthTexture, 1, 1)

  const floors = sceneConfig.floors
  const roofs = sceneConfig.roofs
  const walls = sceneConfig.walls
  const plinth = sceneConfig.plinth
  const backboard = sceneConfig.backboard
  const paintings = sceneConfig.paintings

  return (
    <>
    {/* FLOOR */}
      {floors.map((floor, index) => {
        const repeat = floor.textureRepeat || [1, 1]
        const floorTexture = createTexture(baseFloorTexture, repeat[0], repeat[1])
        return (
          <mesh key={index} position={floor.position} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[floor.size, floor.size]} />
            <meshStandardMaterial map={floorTexture} />
          </mesh>
        )
      })}


      {/* ROOF */}
      {roofs.map((roof, index) => {
        const repeat = roof.textureRepeat || [1, 1]
        const roofTexture = createTexture(baseRoofTexture, repeat[0], repeat[1])
        return (
          <mesh key={index} position={roof.position} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[roof.size, roof.size]} />
            <meshStandardMaterial map={roofTexture} />
          </mesh>
        )
      })}


      {/* WALLS */}
      {walls.map((wall, index) => (
        <mesh key={index} position={wall.position} rotation={wall.rotation}>
          <boxGeometry args={[10, 7, 0.1]} />
          <meshStandardMaterial map={wallTexture} />
        </mesh>
      ))}

      
      {/* PLINTH */}
      {plinth.map((plinthItem, index) => (
        <mesh key={index} position={plinthItem.position} rotation={plinthItem.rotation}>
          <boxGeometry args={[plinthItem.size, 0.5, 0.3]} />
          <meshStandardMaterial map={plinthTexture} />
        </mesh>
      ))}


      {/* BACKBOARD */}
      {backboard.map((backboardItem, index) => (
        <mesh key={index} position={backboardItem.position} rotation={backboardItem.rotation}>
          <boxGeometry args={[backboardItem.size, 3, 0.1]} />
          <meshStandardMaterial color="midnightblue" />
        </mesh>
      ))}

      {/* PAINTINGS */}
      {paintings && paintings.map((painting, index) => (
        <Painting key={index} painting={painting} />
      ))}
    </> 
  )
}
export default GalleryRoom