import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const color = Math.round(Math.random() * 16777215);

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(15, 20, 30);
scene.add(camera);

// controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 20;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2;

// ambient light

scene.add(new THREE.AmbientLight(0x222222));

// point light

const light = new THREE.PointLight(0xffffff, 1);
camera.add(light);

const icosahedronGeometry = new THREE.IcosahedronGeometry(9, 0);

const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
const meshMaterial = new THREE.MeshPhongMaterial({ color: color, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true });

const mesh = new THREE.Mesh(icosahedronGeometry, meshMaterial);
const mesh2 = new THREE.LineSegments(icosahedronGeometry, lineMaterial);

scene.add(mesh2);
scene.add(mesh);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();