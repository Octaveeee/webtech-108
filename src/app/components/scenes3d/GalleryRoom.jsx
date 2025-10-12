/*
   Gère la salle :
        le sol
        les murs
        lumieres
        etc



*/

'use client'

const WALL_COLOR = "#cccccc"
const FLOOR_COLOR = "#cccccc"

const GalleryRoom = () => {
  return (
    <>
      {/* FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={FLOOR_COLOR} />
      </mesh>

      {/* WALLS */}
      <mesh position={[0, 2, -10]}>
        <boxGeometry args={[20, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[0, 2, 10]}>
        <boxGeometry args={[20, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[10, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[20, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[20, 4, 0.1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
    </>
  )
}

export default GalleryRoom