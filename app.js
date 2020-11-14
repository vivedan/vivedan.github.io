// Variables for setup

let container;
let camera;
let renderer;
let scene;
let crystal;

function init(){
    container = document.querySelector('.scene');

    //Create Scene
    scene = new THREE.Scene();

    //Camera setup
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 1, 100);

    //Lights

    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0x404040, 5);
    light.position.set(0, 2, 0);
    scene.add(light);

    //Renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //Load Model

    let loader = new THREE.PLYLoader();
    loader.load('./sculpt.ply', function(model){


        var material;
			
        material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: THREE.VertexColors,
            transparent: true,
            opacity: 1,
        });
			
        const points = new THREE.Points(model, material);

        scene.add(points);

        //crystal = gltf.scene.children[0];

        renderer.render(scene, camera);
        //animate();

    });

};

/*function animate(){
    requestAnimationFrame(animate);
    crystal.rotation.y += 0.005;
    renderer.render(scene, camera);
}*/

init();