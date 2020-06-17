
window.onload = function init() {
	var scene = new THREE.Scene();

	var width  = window.innerWidth;
	var height = window.innerHeight;

	var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	camera.position.z = 1.5;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	
	var webglEl = document.getElementById('webgl');

	webglEl.appendChild(renderer.domElement);

	var light = new THREE.DirectionalLight(0xffffff, 1); //빛 만들기 
	light.position.set(3,0,3);
	scene.add(light);
//지구 만들기 
	var geometry = new THREE.SphereGeometry(0.5, 32, 32);
	var meterial = new THREE.MeshPhongMaterial();
		meterial.map = THREE.ImageUtils.loadTexture('https://2.bp.blogspot.com/-Jfw4jY6vBWM/UkbwZhdKxuI/AAAAAAAAK94/QTmtnuDFlC8/s640/2_no_clouds_4k.jpg');
		meterial.bumpMap = THREE.ImageUtils.loadTexture('https://2.bp.blogspot.com/-oeguWUXEM8o/UkbyhLmUg-I/AAAAAAAAK-E/kSm3sH_f9fk/s640/elev_bump_4k.jpg');
		meterial.bumpScale = 0.05;
		meterial.specularMap =THREE.ImageUtils.loadTexture('https://1.bp.blogspot.com/-596lbFumbyA/Ukb1cHw21_I/AAAAAAAAK-U/KArMZAjbvyU/s640/water_4k.png');
		meterial.specular = new THREE.Color('grey');

    var sphere = new THREE.Mesh(geometry, meterial); //구 만들기(지구)
	scene.add(sphere)
//구름 만들기 
	var geometry1 = new THREE.SphereGeometry(0.5, 32, 32);
	var meterial1 = new THREE.MeshPhongMaterial();
		meterial1.map = THREE.ImageUtils.loadTexture('https://1.bp.blogspot.com/-puWLaF31coQ/Ukb49iL_BgI/AAAAAAAAK-k/mI7c24mkpj8/s640/fair_clouds_8k.jpg');
		meterial1.side = THREE.DoubleSide;
		meterial1.opacity = 0.5;
		meterial1.transparent = true;
		meterial1.depthWrite = false;
		
    var clouds = new THREE.Mesh(geometry1, meterial1);
	scene.add(clouds)

	var controls = new THREE.TrackballControls(camera, webglEl);


	render();

	function render() {
		controls.update();
		sphere.rotation.y += 0.01;
		clouds.rotation.y += 0.01;		
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}


};