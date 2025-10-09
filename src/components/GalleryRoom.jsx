/*
   Gère la salle :
        le sol
        les murs
        lumieres
        etc



*/

'use client'

const GalleryRoom = () => {
  return (
    <>
      {/* Sol */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>

      {/* Murs */}
      <mesh position={[0, 2, -10]}>
        <boxGeometry args={[20, 4, 0.1]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[0, 2, 10]}>
        <boxGeometry args={[20, 4, 0.1]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[10, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[20, 4, 0.1]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[20, 4, 0.1]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
    </>
  )
}

export default GalleryRoom