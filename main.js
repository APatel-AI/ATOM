import * as THREE from 'three'; 
import './style.css';
import gsap from 'gsap';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();

// create our sphere or the ball. 
// below the 3 is the radius and the 64's represent the height and width segements. 
const geometry = new THREE.SphereGeometry( 1, 64, 64 );

//2nd ball 
const twoball = new THREE.SphereGeometry (1,40,40); 

//3rd ball
const threeball = new THREE.SphereGeometry (1,40,40); 

//4th ball 
const fourthball = new THREE.SphereGeometry (1, 40, 40); 



// creating the 1st ring: 
const ring1 = new THREE.TorusGeometry( 7.8, .5, 30, 100 );
const ring1_material = new THREE.MeshStandardMaterial( {
  color: 0xFFFFFF, 
  roughness: 0.1, 
} );
const torus = new THREE.Mesh( ring1, ring1_material );
scene.add( torus );

// creating the 2nd ring: 
const ring2 = new THREE.TorusGeometry( 7.4, .5, 30, 100 );
const ring2_material = new THREE.MeshStandardMaterial( {
  color: 0xFFFFFF, 
  roughness: 0.1, 
} );
const disc2 = new THREE.Mesh( ring2, ring2_material );

scene.add( disc2 );


// creating the 3rd ring: 
const ring3 = new THREE.TorusGeometry( 7.0, 0.5 , 30, 100 );
const ring3_material = new THREE.MeshStandardMaterial( {
  color: 0xFFFFFF, 
  roughness: 0.1, 
} );
const disc3 = new THREE.Mesh( ring3, ring3_material );
scene.add( disc3 );

// creating the 4th ring: 
const ring4 = new THREE.TorusGeometry( 6.6, 0.5, 30, 100 );
const ring4_material = new THREE.MeshStandardMaterial( {
  color: 0xFFFFFF, 
  roughness: 0.1, 
} );
const disc4 = new THREE.Mesh( ring4, ring4_material );

scene.add( disc4 );


// creating the 5th ring: 0.4 difference in size from the previous ring 
const ring5 = new THREE.TorusGeometry( 6.2, 0.5, 30, 100 );
const ring5_material = new THREE.MeshStandardMaterial( {
  color: 0xFFFFFF, 
  roughness: 0.1, 
} );
const disc5 = new THREE.Mesh( ring5, ring5_material );

scene.add( disc5 );

// creating the 6th ring: 0.4 difference in size from the previous ring 
const ring6 = new THREE.TorusGeometry( 5.8, 0.5, 30, 100 );
const ring6_material = new THREE.MeshStandardMaterial( {
  color: 0xFFFFFF, 
  roughness: 0.1, 
} );
const disc6 = new THREE.Mesh( ring6, ring6_material );

scene.add( disc6 );

// creating the 7th ring: 0.4 difference in size from the previous ring 
const ring7 = new THREE.TorusGeometry( 5.4, 0.5, 30, 100 );
const ring7_material = new THREE.MeshStandardMaterial( {
  color: 0xFFFFFF, 
  roughness: 0.1, 
} );
const disc7 = new THREE.Mesh( ring7, ring7_material );

scene.add( disc7 );


//add texture or looks to the ball
const material = new THREE.MeshStandardMaterial( { 
  color: "#ffb700",
  roughness: 0.5,
 } )

const mesh = new THREE.Mesh(geometry, material); 
scene.add(mesh)

// creating and postioning the twoball
const twoball_material = new THREE.MeshStandardMaterial ({
  color: "#00FF00", 
  roughness: 0.5,
})

const twoball_mesh = new THREE.Mesh(twoball, twoball_material);
twoball_mesh.position.set(1,0,1);
scene.add(twoball_mesh)

// creating and postioning the threeball color: white
const threeball_material = new THREE.MeshStandardMaterial ({
  color: "#FFFFFF", 
  roughness: 0.5,
})

const threeball_mesh = new THREE.Mesh(threeball, threeball_material);
threeball_mesh.position.set(0,1,1.4);
scene.add(threeball_mesh)







// creating and postioning the fourthball
const fourthball_material = new THREE.MeshStandardMaterial ({
  color: "#FFD700", 
  roughness: 0.5,
})

const fourthball_mesh = new THREE.Mesh(fourthball, fourthball_material);
fourthball_mesh.position.set(1,1,1);
scene.add(fourthball_mesh)



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

// ring animation 
function animate() {
  requestAnimationFrame (animate);
  torus.rotation.x += 0.02;
	torus.rotation.y += 0.02;

  disc2.rotation.x += 0.03;
	disc2.rotation.y += 0.03;

  disc3.rotation.x += 0.04;
  disc3.rotation.y += 0.04; 

  disc4.rotation.x += 0.05;
  disc4.rotation.y += 0.05;
  
  disc5.rotation.x += 0.06;
  disc5.rotation.y += 0.06;  

  disc6.rotation.x += 0.07;
  disc6.rotation.y += 0.07;

  disc7.rotation.x += 0.08;
  disc7.rotation.y += 0.08;  
  renderer.render(scene, camera);
}

animate();

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