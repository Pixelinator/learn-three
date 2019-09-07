// Imports
import * as THREE from 'three';
import Preloader from './preloader';

/**
 * class Game
 * 
 */
class Game {
    constructor() {
        this.scene =  new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        window.onError = function(error) {
            console.error(JSON.stringify(error));
        }

        this.animate();
    }

    animate() {
        const game = this;
        requestAnimationFrame( function() { game.animate(); });

        this.renderer.render(this.scene, this.camera);
    }
}

export default Game;