// Import THREE.js using import map
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.5,
  100
);
camera.position.set(0, 4, 16);

// Mouse tracking variables
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// 3D object variable
let object;

// Which object to render
let objToRender = 'dino';

// Create renderer
const renderer = new THREE.WebGLRenderer({ 
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio * 1.5);

// Add renderer to DOM
const container = document.getElementById("container3D");
if (container) {
  container.appendChild(renderer.domElement);
}

// Add lights - exact same as original
const topLight = new THREE.DirectionalLight(0xB5ACEE, 3.5);
topLight.position.set(200, 50, 700);
topLight.castShadow = true;
scene.add(topLight);

const backLight = new THREE.DirectionalLight(0xB5ACEE, 3.5);
backLight.position.set(200, 50, -700);
backLight.castShadow = true;
scene.add(backLight);

const ambientLight = new THREE.AmbientLight(0x544C73, 4);
scene.add(ambientLight);

// Setup camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0; // Default is 2.0, increase for faster rotation
controls.enableDamping = true;

// Load GLTF model
const loader = new GLTFLoader();
loader.load(
  `./models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error('Error loading model:', error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  if (object && objToRender === "eye") {
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }
  
  controls.update();
  renderer.render(scene, camera);
}

// Window resize handler
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse move handler
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Start animation
animate();