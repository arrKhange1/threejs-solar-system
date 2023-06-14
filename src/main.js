import {
    AmbientLight,
    CubeTextureLoader, DoubleSide,
    Mesh,
    MeshBasicMaterial, MeshStandardMaterial, Object3D,
    PerspectiveCamera, PointLight, RingGeometry,
    Scene, SphereGeometry, TextureLoader,
    WebGLRenderer
} from "three";
import stars from './imgs/stars.jpg';
import earthTexture from './imgs/earthmap1k.jpg';
import jupyterTexture from './imgs/jupitermap.jpg';
import marsTexture from './imgs/mars_1k_color.jpg';
import mercuryTexture from './imgs/mercurymap.jpg';
import neptuneTexture from './imgs/neptunemap.jpg';
import plutoTexture from './imgs/plutomap1k.jpg';
import saturnTexture from './imgs/saturnmap.jpg';
import sunTexture from './imgs/sunmap.jpg';
import uranusTexture from './imgs/uranusmap.jpg';
import venusTexture from './imgs/venusmap.jpg';
import {OrbitControls} from "three/addons/controls/OrbitControls";

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight,
    0.1, 1000);

const orbitControls = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbitControls.update();

const ambientLight = new AmbientLight(0x333333);
scene.add(ambientLight);

document.body.appendChild(renderer.domElement);

const cubeTextureLoader = new CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    stars,
    stars,
    stars,
    stars,
    stars,
    stars,
])

const textureLoader = new TextureLoader();

function createPlanet(size, texture, position, ring) {
    const geo = new SphereGeometry(size, 30, 30);
    const mat = new MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const planet = new Mesh(geo, mat);
    planet.position.x = position;
    const planetRelativeSun = new Object3D();
    if (ring) {
        const ringGeo = new RingGeometry(ring.innerRadius, ring.outerRadius, 32);
        const ringMat = new MeshBasicMaterial({
            map: textureLoader.load(ring.ringTexture),
            side: DoubleSide,
        });
        const ringMesh = new Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = 1/2 * Math.PI;
        ringMesh.position.x = position;
        planetRelativeSun.add(ringMesh);
    }
    planetRelativeSun.add(planet);
    scene.add(planetRelativeSun);

    return {planet, planetRelativeSun};
}

const sunGeo = new SphereGeometry(16, 30, 30);
const sunMat = new MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new Mesh(sunGeo, sunMat);
scene.add(sun);

const pointLight = new PointLight(0xFFFFFF, 2,300);
scene.add(pointLight);

const {planet: mercury, planetRelativeSun: mercuryRelativeSun} = createPlanet(3.2, mercuryTexture, 28);

const {planet: saturn, planetRelativeSun: saturnRelativeSun} = createPlanet(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    ringTexture: saturnTexture,
});

const {planet: venus, planetRelativeSun: venusRelativeSun} = createPlanet(5.8, venusTexture, 44);
const {planet: earth, planetRelativeSun: earthRelativeSun} = createPlanet(6, earthTexture, 62);
const {planet: mars, planetRelativeSun: marsRelativeSun} = createPlanet(4, marsTexture, 78);
const {planet: jupyter, planetRelativeSun: jupyterRelativeSun} = createPlanet(12, jupyterTexture, 100);
const {planet: uranus, planetRelativeSun: uranusRelativeSun} = createPlanet(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
});

const {planet: neptune, planetRelativeSun: neptuneRelativeSun} = createPlanet(7, neptuneTexture, 200);
const {planet: pluto, planetRelativeSun: plutoRelativeSun} = createPlanet(2.8, plutoTexture, 216);

//
function animate() {
    sun.rotateY(0.01);

    mercury.rotateY(0.01);
    mercuryRelativeSun.rotateY(0.04);

    saturn.rotateY(0.004);
    saturnRelativeSun.rotateY(0.0009);

    venus.rotateY(0.002);
    venusRelativeSun.rotateY(0.015);

    earth.rotateY(0.02);
    earthRelativeSun.rotateY(0.01);

    mars.rotateY(0.018);
    marsRelativeSun.rotateY(0.008);

    jupyter.rotateY(0.004);
    jupyterRelativeSun.rotateY(0.002);

    uranus.rotateY(0.03);
    uranusRelativeSun.rotateY(0.0004);

    neptune.rotateY(0.032);
    neptuneRelativeSun.rotateY(0.0001);

    pluto.rotateY(0.008);
    plutoRelativeSun.rotateY(0.00007);

    renderer.render(scene, camera);
}



renderer.setAnimationLoop(animate);

window.addEventListener('resize', e => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})
