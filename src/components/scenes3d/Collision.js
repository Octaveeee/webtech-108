import * as THREE from 'three'

export class CollisionBox {

    constructor(position, size, rotation = [0, 0, 0]) {
      this.position = new THREE.Vector3(...position)
      this.size = new THREE.Vector3(...size)
      this.rotation = rotation
    }

    contains(point) {
        const localPoint = point.clone().sub(this.position)
        
        if (this.rotation[1] !== 0) {
          const angle = -this.rotation[1]
          const cos = Math.cos(angle)
          const sin = Math.sin(angle)
          const x = localPoint.x * cos - localPoint.z * sin
          const z = localPoint.x * sin + localPoint.z * cos
          localPoint.x = x
          localPoint.z = z
        }
        
        return (
          Math.abs(localPoint.x) <= this.size.x / 2 &&
          Math.abs(localPoint.y) <= this.size.y / 2 &&
          Math.abs(localPoint.z) <= this.size.z / 2
        )
    }
}


export function createCollisionBoxes() {
    const boxes = []
    
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
    
    walls.forEach(wall => {
        boxes.push(new CollisionBox(
            wall.position,
            [10, 7, 0.1],
            wall.rotation
        ))
    })
    
    return boxes
}


export function checkCollision(position, collisionBoxes, playerRadius = 0.25) {
    const playerPos = new THREE.Vector3(...position)
    
    for (const box of collisionBoxes) {
        const testPoints = [
            playerPos,
            playerPos.clone().add(new THREE.Vector3(playerRadius, 0, 0)),
            playerPos.clone().add(new THREE.Vector3(-playerRadius, 0, 0)),
            playerPos.clone().add(new THREE.Vector3(0, 0, playerRadius)),
            playerPos.clone().add(new THREE.Vector3(0, 0, -playerRadius)),
        ]
      
        for (const point of testPoints) {
            if (box.contains(point)) {
                return true
            }
        }
    }
    
    // no collision
    return false
}