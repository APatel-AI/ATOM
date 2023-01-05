import * as THREE from 'three'; 
import './style.css';
import gsap from 'gsap';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// Scene
const scene = new THREE.Scene();

// create our sphere or the ball. 
// below the 3 is the radius and the 64's represent the height and width segements. 
const geometry = new THREE.SphereGeometry( 3, 64, 64 );

//add texture or looks to the ball
const material = new THREE.MeshStandardMaterial( { 
  color: "#00ff83",
  roughness: 0.5,
 } )

const mesh = new THREE.Mesh(geometry, material); 
scene.add(mesh)


//sizes
const sizes = {
  width: window.innerWidth, 
  height: window.innerHeight, 

}
// creating a light 
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0,10,10)
scene.add(light)
// add Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
//change the camera position
camera.position.z = 20 // the metric for this number can be anython based on what you are making
scene.add(camera)



//render scene on the screen (rendere)
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera)
renderer.setPixelRatio(2)

//controls
const controls = new OrbitControls (camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

//Resize
window.addEventListener('resize', () => {
  // update sizes

  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //update camera
  camera.updateProjectionMatrix() // resets the size of the object to match the screen size
  camera.aspect = sizes.width / sizes.height // match the object to the scree size so it does not appear squishy. 

  renderer.setSize(sizes.width, sizes.height) // resets the canvas size 
})

const loop = () =>{
  renderer.render (scene, camera);
  window.requestAnimationFrame(loop); 
  controls.update()

}

loop()


//timeline
const tl = gsap.timeline({defaults : {duration: 1 }})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1 , x:1, y:1})
tl.fromTo("nav", {y: "-100%"}, {y: "0%" })
tl.fromTo('title', {opacity:0}, {opacity:1})


//mouse animation color

let mouseDown = false
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))


window.addEventListener('mousemove', (e) => {

  if(mouseDown){

    rgb =[
      Math.round((e.pageX / sizes.width) * 255), 
      Math.round((e.pageY / sizes.height) * 255), 
      150,
    ]
    
  // animation
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
       r: newColor.r,
       g: newColor.g,
       b: newColor.b,
      })
  }




});