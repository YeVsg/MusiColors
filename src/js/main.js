/* Author(a): Juan David Gaviria - Lisa Maria Gonzalez*/

// var, let, const ¿?
// Creación variables
var scene = null,
    camera = null,
    renderer = null,
    controls = null;

var modelLoad = null,
    light3 = null,
    light3Color = null,
    modelColor = null,
    stats = null,
    sound3d = null;

var pickup = null,
    myPickUps = [],
    points = 0;

var myPlayer = null,
    input = { left: 0, right: 0, up: 0, down: 0 },
    rotSpeed = 0.05,
    speed = 0.5;
    collidableMeshList = [];

// Inicializar la scene
function startScene() {
    initScene("red");
    initScene2("black");
    initScene3("green")
    animate();
}

function initScene() {
    // Scene, Camera, Renderer 
    scene = new THREE.Scene();
    scene.background = new THREE.TextureLoader().load('../src/img/fondo_rojo2.jpg');
    scene.fog = new THREE.Fog(0x505050, 200, 1000);
    



    camera = new THREE.PerspectiveCamera(
        75,                                      // Ángulo de visión (abajo o arriba)
        window.innerWidth / window.innerHeight,  // Relación de aspecto 16:9
        0.1,                                     // Mas cerca (no renderiza)
        1000);                                   // Mas lejos (no renderiza)

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('app') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const container = document.getElementById('container');

    stats = new Stats();
    container.appendChild(stats.domElement);

    // Controls
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(-1, 10, 30);
    // controls.update();
    gridWidth = 200;
    gridDivisions = 10;

    // Grid Helper
    const gridHelper = new THREE.GridHelper(gridWidth, gridDivisions);
    gridHelper.rotation.y = Math.PI / 2; // Rota el grid para que esté en la posición horizontal
    //scene.add(gridHelper);

    // Other Code
    const axesHelper = new THREE.AxesHelper(5);
    //scene.add(axesHelper);

    const soundConfigs = [
        { position: { x: 60, y: 10, z: 60 }, range: 40, soundFile: soundFiles[4]},
        { position: { x: -60, y: 10, z: -60 }, range: 40, soundFile: soundFiles[1] },
        { position: { x: -60, y: 10, z: 60 }, range: 40, soundFile: soundFiles[2] },
        {position: { x: 60, y: 10, z: -60 }, range: 40, soundFile: soundFiles[3] }
    ];
    
    soundConfigs.forEach(config => {
        initSound3D(config.position, config.range, config.soundFile);
    });

    
    const geometry = new THREE.PlaneGeometry( 200, 200 );

    const texturePlano = new THREE.TextureLoader().load('../src/img/AlfombraR.jpg');

    const material = new THREE.MeshStandardMaterial( { 
                                                    side: THREE.DoubleSide,
                                                    map: texturePlano, 
                                                    color: 0x7d7f7d, // White color, ensuring no color multiplication
                                                    transparent: false} );

    const plane = new THREE.Mesh( geometry, material );
    plane.rotateX(90*(Math.PI)/180);
    scene.add( plane );

    createLight('ambient');
    //initGUI();
        
    createPlayer();
    initWorld("red");
    initWorld("red2");
    initWorld("red3");
    initWorld("red4");
    //createMultiplyPickUps();
    createFrontera()

}

function initScene2() {
    // Scene, Camera, Renderer 
    scene = new THREE.Scene();
    scene.background = new THREE.TextureLoader().load('../src/img/fondoMusica.jpg');
    scene.fog = new THREE.Fog(0x505050, 200, 1000);



    camera = new THREE.PerspectiveCamera(
        75,                                      // Ángulo de visión (abajo o arriba)
        window.innerWidth / window.innerHeight,  // Relación de aspecto 16:9
        0.1,                                     // Mas cerca (no renderiza)
        1000);                                   // Mas lejos (no renderiza)

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('app') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const container = document.getElementById('container');

    stats = new Stats();
    container.appendChild(stats.domElement);

    // Controls
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(-1, 10, 30);
    // controls.update();

    // Grid Helper
    const size = 200;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    //scene.add(gridHelper);

    // Other Code
    const axesHelper = new THREE.AxesHelper(5);
    //scene.add(axesHelper);

    createLight(0xFFFFFF, 1);


    const soundConfigs = [
        { position: { x: 60, y: 10, z: 60 }, range: 40, soundFile: soundFiles[7] },
        { position: { x: -60, y: 10, z: -60 }, range: 40, soundFile: soundFiles[5]},
        { position: { x: -60, y: 10, z: 60 }, range: 40, soundFile: soundFiles[6] },
        {position: { x: 60, y: 10, z: -60 }, range: 40, soundFile: soundFiles[8] }
    ];
    
    soundConfigs.forEach(config => {
        initSound3D(config.position, config.range, config.soundFile);   
    });

    const geometry = new THREE.PlaneGeometry( 200, 200 );

    const texturePlano = new THREE.TextureLoader().load('../src/img/alNegro.png');

    const material = new THREE.MeshStandardMaterial( { 
                                                    side: THREE.DoubleSide,
                                                    map: texturePlano, 
                                                    color: 0x7d7f7d, // White color, ensuring no color multiplication
                                                    transparent: false} );

    const plane = new THREE.Mesh( geometry, material );
    plane.rotateX(90*(Math.PI)/180);
    scene.add( plane );

    
    //initGUI();
    
    createPlayer();
    initWorld2("black");
    initWorld2("black2");
    initWorld2("black3");
    initWorld2("black4");
    //createMultiplyPickUps();
    createFrontera();


}

function initScene3() {
    // Scene, Camera, Renderer 
    scene = new THREE.Scene();
    scene.background = new THREE.TextureLoader().load('../src/img/fondoVerde.png');
    scene.fog = new THREE.Fog(0x505050, 200, 1000);



    camera = new THREE.PerspectiveCamera(
        75,                                      // Ángulo de visión (abajo o arriba)
        window.innerWidth / window.innerHeight,  // Relación de aspecto 16:9
        0.1,                                     // Mas cerca (no renderiza)
        1000);                                   // Mas lejos (no renderiza)

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('app') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const container = document.getElementById('container');

    stats = new Stats();
    container.appendChild(stats.domElement);

    // Controls
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(-1, 10, 30);
    // controls.update();

    // Grid Helper
    const size = 200;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    //scene.add(gridHelper);

    // Other Code
    const axesHelper = new THREE.AxesHelper(5);
    //scene.add(axesHelper);

    createLight(0xFFFFFF, 1);


    const soundConfigs = [
        { position: { x: 60, y: 10, z: 60 }, range: 40, soundFile: soundFiles[12] },
        { position: { x: -60, y: 10, z: -60 }, range: 40, soundFile: soundFiles[9]},
        { position: { x: -60, y: 10, z: 60 }, range: 40, soundFile: soundFiles[10] },
        {position: { x: 60, y: 10, z: -60 }, range: 40, soundFile: soundFiles[11] }
    ];
    
    soundConfigs.forEach(config => {
        initSound3D(config.position, config.range, config.soundFile);   
    });

    const geometry = new THREE.PlaneGeometry( 200, 200 );

    const texturePlano = new THREE.TextureLoader().load('../src/img/pasto.jpg');

    const material = new THREE.MeshStandardMaterial( { 
                                                    side: THREE.DoubleSide,
                                                    map: texturePlano, 
                                                    color: 0x7d7f7d, // White color, ensuring no color multiplication
                                                    transparent: false} );

    const plane = new THREE.Mesh( geometry, material );
    plane.rotateX(90*(Math.PI)/180);
    scene.add( plane );

    
    //initGUI();
    
    createPlayer();
    initWorld3("green");
    initWorld3("green2");
    initWorld3("green3");
    initWorld3("green4");
    //createMultiplyPickUps();
    createFrontera();


}

const soundFiles = [
    "./src/songs/rain.mp3",
    "./src/songs/ROSALÍA-SAOKO.mp3",
    "./src/songs/Te_Olvidaste.mp3",
    "./src/songs/Bailando Solo.mp3",
    "./src/songs/Borderline.mp3",
    "./src/songs/Come to Life.mp3",
    "./src/songs/Brianstorm.mp3",
    "./src/songs/DaddyIssues.mp3",
    "./src/songs/So What.mp3",
    "./src/songs/365.mp3",
    "./src/songs/que.mp3",
    "./src/songs/Hola Como Vas.mp3",
    "./src/songs/Meetm.mp3"
    
]

let sound3dInstances = []; // Arreglo para almacenar múltiples instancias de sonido

function initSound3D(position, range, soundFile) {
    // Validar parámetros
    if (!position || !range || !soundFile) {
        console.error("Se requieren 'position' y 'range' para inicializar el sonido 3D.");
        return;
    }

    // Crear una nueva instancia de sonido con configuración correcta
    const sound3d = new Sound([soundFile], range, scene, {
        debug: true,
        position: position // Pasar directamente el objeto {x, y, z}
    });

    // Reproducir sonido
    sound3d.play();
    console.log(`Sonido inicializado en posición: (${position.x}, ${position.y}, ${position.z}) con rango: ${range} y sonido: ${soundFile}`);
    
    // Almacenar la instancia en el arreglo
    sound3dInstances.push(sound3d);
}

function createlight(typeLight){

    switch(typeLight) {
        
      case 'ambient':
      
        mylight = new THREE.AmbientLight( 0xFFFFFF, 1); // soft white light
        scene.add( mylight );
      break;
  
      case 'directionalLight':
        mylight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        scene.add( mylight );
      break;
  
      case 'pointLight':
        mylight= new THREE.PointLight( 0xffffff, 10, 100);
        mylight.position.set( 0, 5, 6 );
        scene.add( mylight );
  
        const sphereSize = 2;
        const pointLightHelper = new THREE.PointLightHelper( mylight, sphereSize );
        scene.add( pointLightHelper );
      break;
  
      case 'spot':
        mylight = new THREE.Spotmylight( 0xffffff );
        mylight.position.set( 10, 10, 10 );
  
        scene.add( mylight );
      break;
    }
  }

function getRandomPosition(min, max) {
    return Math.random() * (max - min) + min;
}

function createMultiplyPickUps() {

    myPickUps.forEach(pickup => scene.remove(pickup));
    myPickUps = [];

    const positions = [
        { x: -30, y: 10, z: 20 },
        { x: -10, y: 10, z: 20 },
        { x: 20, y: 10, z: 20 },
        { x: 40, y: 10, z: 20 }
    ];

    positions.forEach(pos => {
        initCollectible(pos.x, pos.z);
    });


}


function initCollectible(posX, posZ) {

    /*const geometry = new THREE.BoxGeometry( 8, 8, 8 );

    // Create Texture
    
    var texture = textureLoader.load("./src/img/uv_test_bw_1024.png");
    var material = new THREE.MeshBasicMaterial( {map: texture} ); */
    const geometry = new THREE.SphereGeometry(8, 8, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    //var textureLoader = new THREE.TextureLoader();

    pickup = new THREE.Mesh(geometry, material);
    pickup.name = "modelToPick" + Math.floor(Math.random() * 101);
    pickup.position.set(posX, 15, posZ);
    // pickup.id = "modelToPick"+Math.floor(Math.random()*101);
    /*pickup.position.y = camera.position.y;
    pickup.position.x = posOfCreate;
    pickup.position.z = posOfCreate;
    */

    scene.add(pickup);
    myPickUps.push(pickup);

    // Collider Temporal
    // myPlayer.geometry.computeBoundingBox();
    // pickup.geometry.computeBoundingBox();
}

function collisionAnimate() {

    var originPoint = myPlayer.position.clone();

    for (var vertexIndex = 0; vertexIndex < myPlayer.geometry.vertices.length; vertexIndex++) {
        var localVertex = myPlayer.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4(myPlayer.matrix);
        var directionVector = globalVertex.sub(myPlayer.position);

        var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(myPickUps);
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
            //         sendToAddAndSubs(collisionResults[0].object.name);
            //     }else{
            //     }
            console.log("take element: " + collisionResults[0].object.name);
            points++;
            collisionResults[0].object.visible = false;
            document.getElementById("points").innerHTML = points;
        }
    }
}

function createLight(color, intensidad) {
    light3 = new THREE.AmbientLight(color, intensidad); // soft white light
    scene.add(light3);
}

function animate() {

    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    // controls.update();
     // Llamar a update para cada instancia de sonido
     sound3dInstances.forEach(sound => {
        if (sound) {
            sound.update(camera);
        }
    });
    movementPlayer();
    renderer.render(scene, camera);
    stats.update();
    collisionAnimate();



    /*var box2 = myPlayer.geometry.boundingBox.clone();
    var box3 = pickup.geometry.boundingBox.clone();

    var collider = new THREEx.ColliderBox3(pickup, box3);
    var collider2 = new THREEx.ColliderBox3(myPlayer, box2);


    var colliderSystem  = new THREEx.ColliderSystem();
    colliderSystem.computeAndNotify(collider);

    var onCollideEnter  = collider.addEventListener('contactEnter', function(otherCollider){
        console.log('contactEnter with', otherCollider.id);
    })*/
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function loadOBJ_MTL(generalPath, pathMTL, pathOBJ, position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }) {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath(generalPath);
    mtlLoader.setPath(generalPath);
    mtlLoader.load(pathMTL, function (materials) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(generalPath);
        objLoader.load(pathOBJ, function (object) {

            modelLoad = object;
            scene.add(object);
            object.scale.set(12, 12, 12);
            
            // Modifica la posición según el parámetro `position`
            object.position.set(position.x, position.y, position.z);
            object.rotation.set(
                degreesToRadians(rotation.x),
                degreesToRadians(rotation.y),
                degreesToRadians(rotation.z)
            );

        }, undefined, function (error) {
            console.error('Error loading OBJ:', error);
        });
    }, undefined, function (error) {
        console.error('Error loading MTL:', error);
    
    });
}

function loadGLTF() {
    // Instanciar un loader - Cargador de informacion
    var loader = new THREE.GLTFLoader();

    // Decodificar el Mesh autocontenido
    var dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath("./src/modelos/other/");
    loader.setDRACOLoader(dracoLoader);

    // Load a glTF resource
    loader.load(
        // resource URL
        './src/modelos/other/duck.gltf',
        // called when the resource is loaded
        function (gltf) {

            modelLoad = gltf;
            scene.add(gltf.scene);
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene;   // THREE.Scene
            gltf.scenes;  // Array<THREE.Scene>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset;   // Object
            gltf.scene.scale.set(10, 10, 10) // scale here
            gltf.scene.rotation.y = -(Math.PI / 2);
        },

        // called while loading is progressing
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened');
        }   
    );
}


function initWorld(typeWorld) {

    switch (typeWorld) {
        case "red":
            loadOBJ_MTL(
                "./src/modelos/Gasolinera/", 
                "gasStation.mtl", 
                "gasStation.obj", 
                { x: -60, y: 0, z: -60 } 
            );
            break;
            
        case "red2":
            loadOBJ_MTL("./src/modelos/El_madrileño/", "el madrileño.mtl", "el madrileño.obj", {x:-60, y:0, z:60}, {x:0, y:180, z:0});
        break;

        case "red3":
            loadOBJ_MTL("./src/modelos/LVDLL/", "the bunkers.mtl", "the bunkers.obj", {x:60, y:0, z:-60}, {x:0, y:-90, z:0});
        break;

        case "red4":
            loadOBJ_MTL("./src/modelos/TSR/", "the slow rush.mtl", "the slow rush.obj", {x:60, y:0, z:60}, {x:0, y:180, z:0});
        break;
    }

}

function initWorld2(typeWorld2) {

    switch (typeWorld2) {
        case "black":
            loadOBJ_MTL(
                "./src/modelos/Donda/", 
                "donda.mtl", 
                "donda.obj", 
                { x: -60, y: 0, z: -60 } 
            );
            break;
            
        case "black2":
            loadOBJ_MTL("./src/modelos/FWN/", "favorite worst nightmare.mtl", "favorite worst nightmare.obj", {x:-60, y:0, z:60}, {x:0, y:180, z:0});
        break;

        case "black3":
            loadOBJ_MTL("./src/modelos/LYT/", "Love yourself tear.mtl", "Love yourself tear.obj", {x:60, y:0, z:-60}, {x:0, y:0, z:0});
        break;

        case "black4":
            loadOBJ_MTL("./src/modelos/wo/", "wiped out.mtl", "wiped out.obj", {x:60, y:0, z:60}, {x:0, y:180, z:0});
        break;
    }

}

function initWorld3(typeWorld3) {

    switch (typeWorld3) {
        case "green":
            loadOBJ_MTL(
                "./src/modelos/Brat/", 
                "Brat.mtl", 
                "Brat.obj", 
                { x: -60, y: 0, z: -60 } 
            );
            break;
            
        case "green2":
            loadOBJ_MTL("./src/modelos/Golden/", "Golden.mtl", "Golden.obj", {x:-60, y:0, z:60}, {x:0, y:180, z:0});
        break;

        case "green3":
            loadOBJ_MTL("./src/modelos/sauceboyz/", "sauceboyz.mtl", "sauceboyz.obj", {x:60, y:0, z:-60}, {x:0, y:0, z:0});
        break;

        case "green4":
            loadOBJ_MTL("./src/modelos/theEnd/", "THE E.N.mtl", "THE E.N.obj", {x:60, y:0, z:60}, {x:0, y:180, z:0});
        break;
    }

}

function goToPlay() {
    document.getElementById("menuPanel").style.display = "none";
    document.getElementById('optionsPanel').style.display = "flex";
    // Start General Sound
    //document.getElementById("bckSound").play();
}

function selectOption(status) {

    switch (status) {
        case 'opt1':
            initScene("red");
            break;
        case 'opt2':
            initScene2("black");
            break;
        case 'opt3':
            initScene3("green");
            break;
        case 'opt4':

            break;
    }

    document.getElementById('optionsPanel').style.display = "none";

}


function createPlayer() {
    console.log("this is my principal player");

    var geometry = new THREE.BoxGeometry(0, 5, 0);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    myPlayer = new THREE.Mesh(geometry, material);
    myPlayer.position.set(1, 5, 1);

    scene.add(myPlayer);
}

function createFrontera() {
    var cubeGeometry = new THREE.BoxGeometry(200, 50, 200,1 ,1 ,1);
    var wireMaterial = new THREE.MeshBasicMaterial({
        
        color: 0xc20000,
        wireframe: false,
        transparent: false,
    });
    worldWalls = new THREE.Mesh(cubeGeometry, wireMaterial);
    worldWalls.position.set(0, 25, 0);
    scene.add(worldWalls);

    // Crea un BoundingBox desde el objeto
    worldWalls.geometry.computeBoundingBox();
    
}

function checkCollisionWithBoundary(player) {
    // BoundingBox del jugador
    var playerBox = new THREE.Box3().setFromObject(player);

    // BoundingBox de los límites ya precomputados
    var boundaryBox = new THREE.Box3().setFromObject(worldWalls);

    // Comprueba la intersección
    return !boundaryBox.containsBox(playerBox);
}

function movementPlayer() {
    var originalPosition = myPlayer.position.clone();

    // Calcula nueva posición según la entrada
    if (input.right) {
        camera.rotation.y -= rotSpeed;
        myPlayer.rotation.y -= rotSpeed;
    } else if (input.left) {
        camera.rotation.y += rotSpeed;
        myPlayer.rotation.y += rotSpeed;
    } else if (input.up) {
        myPlayer.position.x -= Math.sin(camera.rotation.y) * speed;
        myPlayer.position.z -= Math.cos(camera.rotation.y) * speed;
        camera.position.x -= Math.sin(camera.rotation.y) * speed;
        camera.position.z -= Math.cos(camera.rotation.y) * speed;
    } else if (input.down) {
        myPlayer.position.x += Math.sin(camera.rotation.y) * speed;
        myPlayer.position.z += Math.cos(camera.rotation.y) * speed;
        camera.position.x += Math.sin(camera.rotation.y) * speed;
        camera.position.z += Math.cos(camera.rotation.y) * speed;
    }

     // Si el jugador se sale de los límites, restaura su posición original
     if (checkCollisionWithBoundary(myPlayer)) {
        myPlayer.position.copy(originalPosition);
        camera.position.z = myPlayer.position.z + 1; // Ajusta para mantener la cámara en sincronización
        camera.position.x = myPlayer.position.x - 1;
    }   
}

function showInfoCreator() {
    if( document.getElementById("myNameInfo").style.display == "none")
        document.getElementById("myNameInfo").style.display = "block";
    else
        document.getElementById("myNameInfo").style.display = "none";

}

window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 68: // Derecha
            input.right = 1.5;
            // console.log("derecha");
            break;
        case 65: // Izquierda
            input.left = 1.5;
            // console.log("izquierda");
            break;
        case 87: // Arriba
            input.up = 1.5;
            // console.log("arriba");
            break;
        case 83: // Abajo
            input.down = 1.5;
            // console.log("abajo");
            break;
    }
});

window.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
        case 68: // Derecha
            input.right = 0;
            break;
        case 65: // Izquierda
            input.left = 0;
            break;
        case 87: // Arriba
            input.up = 0;
            break;
        case 83: // Abajo
            input.down = 0;
            break;
    }
});

