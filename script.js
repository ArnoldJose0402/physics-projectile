let scene, camera, renderer, sphere;
let velocity, angle;
let t = 0;
let animationActive = false;

init();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 30, 60);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 50, 20);
    light.castShadow = true;
    scene.add(light);

    const ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);

    // Sphere
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ffff });
    sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    scene.add(sphere);

    document.getElementById("launchBtn").addEventListener("click", launch);

    animate();
}

function launch() {
    velocity = parseFloat(document.getElementById("velocity").value);
    angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180;
    t = 0;
    animationActive = true;
}

function animate() {
    requestAnimationFrame(animate);

    if (animationActive) {
        const g = 9.8;

        const x = velocity * Math.cos(angle) * t;
        const y = velocity * Math.sin(angle) * t - 0.5 * g * t * t;

        if (y >= 0) {
            sphere.position.set(x, y, 0);
            t += 0.05;
        } else {
            animationActive = false;
        }
    }

    renderer.render(scene, camera);
}