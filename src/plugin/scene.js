import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
function createScene () {
  // 创建场景
  const scene = new THREE.Scene()

  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // 添加交互逻辑，例如鼠标控制
  const controls = new OrbitControls(camera, renderer.domElement)

  // 创建立方体
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // 创建光源
  const light = new THREE.PointLight(0xffffff, 1, 100)
  light.position.set(0, 0, 10)
  camera.position.z = 5
  scene.add(light)

  // 渲染函数
  function animate () {
    window.requestAnimationFrame(animate)

    // 实现交互逻辑
    controls.update()

    // 旋转立方体
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    // 渲染场景
    renderer.render(scene, camera)
  }

  // 调用渲染函数开始动画
  animate()

  // 返回场景对象
  return { scene, camera, renderer, cube }
}

export default createScene
