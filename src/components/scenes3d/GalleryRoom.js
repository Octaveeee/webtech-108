/*
   Gère la salle :
        le sol
        les murs
        lumieres
        etc

*/

'use client'
import { useTexture, useGLTF } from '@react-three/drei'
import { RepeatWrapping, Box3, Vector3 } from 'three'
import * as THREE from 'three'

const createTexture = (baseTexture, repeatX, repeatY) => {
  const texture = baseTexture.clone()
  texture.repeat.set(repeatX, repeatY)
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  return texture
}

// paintings frames
const Frame3D = ({ modelPath, width, height, frameThickness, frameScale }) => {
  const defaultPath = '/textures/picture_frame.glb'
  const path = modelPath || defaultPath
  const frameModel = useGLTF(path)
  
  if (!frameModel || !frameModel.scene) return null
  
  const clonedScene = frameModel.scene.clone()
  
  const box = new THREE.Box3().setFromObject(clonedScene)
  const modelSize = box.getSize(new THREE.Vector3())
  
  const targetWidth = width + frameThickness * 2
  const targetHeight = height + frameThickness * 2
  
  const scaleFactor = frameScale || 1
  const scaleX = (targetWidth / Math.max(modelSize.x, 0.001)) * scaleFactor
  const scaleY = (targetHeight / Math.max(modelSize.y, 0.001)) * scaleFactor
  const scaleZ = scaleFactor
  
  return (
    <primitive
      object={clonedScene}
      scale={[scaleX, scaleY, scaleZ]}
      rotation={[0, Math.PI, 0]}
    />
  )
}

const Painting = ({ painting }) => {
  const texture = useTexture(painting.img_url)
  const [width, height] = painting.size || [2, 2]
  
  const frameThickness = painting.frameThickness || 0.1
  const frameScale = painting.frameScale || 1
  

  const frameModelPath = '/textures/picture_frame.glb'
  
  return (
    <group position={painting.position} rotation={painting.rotation}>
      {/* painting */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      
      {/* frame */}
      <Frame3D
        modelPath={frameModelPath}
        width={width}
        height={height}
        frameThickness={frameThickness}
        frameScale={frameScale}
      />
    </group>
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