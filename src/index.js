import * as THREE from 'three';
import * as dat from 'dat.gui';
import * as Stats from 'stats.js';

// Global Variables
let renderer = null;
let scene = null;
let camera = null;
let control = null;
let stats = null;

// Init
function init() {

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render, sets the background color and the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(20, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = -2;
    plane.position.z = 0;

    // add the plane to the scene
    scene.add(plane);

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, transparent:true, opacity:0.6});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.name='cube';
    cube.castShadow = true;

    // add the cube to the scene
    scene.add(cube);

    // position and point the camera to the center of the scene
    camera.position.x = 15;
    camera.position.y = 16;
    camera.position.z = 13;
    camera.lookAt(scene.position);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(10, 20, 20);
    spotLight.shadowCameraNear = 20;
    spotLight.shadowCameraFar = 50;
    spotLight.castShadow = true;
    scene.add(spotLight);

    control = new function() {
        this.rotationSpeed = 0.005;
        this.opacity = 0.6;
        this.color = cubeMaterial.color.getHex();
    };
    addControlGui(control);
    addStatsObject();

    document.body.appendChild( renderer.domElement );
    render();
}

function addControlGui(controlObject) {
    var gui = new dat.GUI();
    gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
    gui.add(controlObject, 'opacity', 0.1, 1);
    gui.addColor(controlObject, 'color');
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );
}

// Render Loop
function render() {
    // update the camera
    let rotSpeed = control.rotationSpeed;
    camera.position.x = camera.position.x * Math.cos(rotSpeed) + camera.position.z * Math.sin(rotSpeed);
    camera.position.z = camera.position.z * Math.cos(rotSpeed) - camera.position.x * Math.sin(rotSpeed);
    camera.lookAt(scene.position);

    //change opacity
    scene.getObjectByName('cube').material.opacity = control.opacity;

    // change color
    scene.getObjectByName('cube').material.color = new THREE.Color(control.color);

    // update stats
    stats.update();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();

window.addEventListener('resize', handleResize, false);





