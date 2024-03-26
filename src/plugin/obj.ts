import * as THREE from 'three'
export default function createBox (obj) {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({ color: '#0099ff' })
  )

  box.position.set(0, 3, 0)

  return box
}
