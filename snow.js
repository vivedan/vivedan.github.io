var WIDTH = 1000,
HEIGHT = 600;
VIEW_ANGLE = 45,
ASPECT_RATIO = WIDTH / HEIGHT,
NEAR = 0.1,
FAR = 10000,
PARTICLE_COUNT = 7000
snowflakePath = 'http://i.imgur.com/RWYYhkR.png';

var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT_RATIO, NEAR, FAR);
var scene = new THREE.Scene();
var snowflakeTexture = THREE.ImageUtils.loadTexture(snowflakePath);

camera.position.z = 300;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x000000);

// var ambientLight = new THREE.AmbientLight(0x666666);
// scene.add(ambientLight);

var frame = 0
particles = [],
geometry = new THREE.Geometry();

var assembleGeometry = function() {
for (var i = 0; i < PARTICLE_COUNT; i++) {
    var particle = {
        position: new THREE.Vector3(Math.random() * 600 - 400, Math.random() * 300 - 150, Math.random() * 500 - 250),
        velocity: new THREE.Vector3(0, -Math.random() * 5, 0)
    };
    particles.push(particle);
    geometry.vertices.push(particle.position);
}
};

assembleGeometry();

var particleMaterial = new THREE.ParticleSystemMaterial({ 
    color: '#FFF',
    map: snowflakeTexture,
    size: 2,
    blending: THREE.AdditiveBlending,
    transparent: true
}),
particleSystem = new THREE.ParticleSystem(geometry, particleMaterial);

particleSystem.sortParticles = true;
scene.add(particleSystem);

var i = 0;
var render = function() {
requestAnimationFrame(render);

particleSystem.rotation.y = frame / 350
//particleSystem.rotation.z = frame / 500;

for (i = 0; i < PARTICLE_COUNT; i++) {
    if (geometry.vertices[i].y < -120) {
        geometry.vertices[i].y = 120;
    }
    geometry.vertices[i].y += particles[i].velocity.y / 7;
}

renderer.render(scene, camera);

frame++;
};

render();
document.querySelector('.scene').appendChild(renderer.domElement);