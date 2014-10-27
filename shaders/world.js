PROJECT.World = function() {
	HMU.World.call(this, {
		fixed: true,
		camera: new THREE.Vector3(0, -10, 3),
		look: true,
	});
	
	this.load();
	
	this.light = new THREE.DirectionalLight(0xffffff);
	this.light.position.set(0, .75, 1);
	this.add(this.light);
	
	this.on('loaded', function(e) {
		this.build();
		this.gui && this.gui();
		this.start();
	});
	
	this.on('update', function(e) {
		this.tick(e.delta, e.time);
	});
	
	this.on('resize', function(e) {
		
	});
	
	this.uniforms = {
		time: { type: "f", value: 1.0 },
		speed: { type: "v3", value: new THREE.Vector3(0,0,1) },
		seed: { type: "f", value: 0.0 },
		resolution: { type: "v2", value: new THREE.Vector2(1920,1080) },
		
		gradient: { type: "t",  value: THREE.ImageUtils.loadTexture('gradient.png') },
	};
	
	var shaders = this.shaders = {};
	var loader = new THREE.XHRLoader();
	loader.load('shaders/vertexPlain.c', function(shader) {
		shaders.vertex = shader;
	});
	loader.load('shaders/fragmentPlasma.c', function(shader) {
		shaders.fragment = shader;
	});
}

PROJECT.World.prototype = Object.create(HMU.World.prototype);

PROJECT.World.prototype.load = function() {
	
}

PROJECT.World.prototype.build = function() {
//	var geometry = new THREE.PlaneGeometry(10,5, 200,100);
//	var geometry = new THREE.IcosahedronGeometry(5,7);
	var geometry = new THREE.BoxGeometry(5,5,5, 100,100,100);
	
	var material = new THREE.ShaderMaterial({
		uniforms: this.uniforms,
		vertexShader: this.shaders.vertex,
		fragmentShader: this.shaders.fragment,
	});
	
	material.side = THREE.DoubleSide;
	
	this.object = new THREE.Mesh(geometry, material);
	this.add(this.object);
	
//	this.add(new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({ wireframe: true })));
}

PROJECT.World.prototype.gui = function() {
	this.gui = new dat.GUI();
	
	var camera = this.gui.addFolder('Camera');
	camera.add(this.camera.position, 'x', -10, 10);
	camera.add(this.camera.position, 'y', -10, 10);
	camera.add(this.camera.position, 'z', -10, 10);
	
	var object = this.gui.addFolder('Object');
	object.add(this.object.position, 'x', -1, 1);
	object.add(this.object.position, 'y', 0, 5);
	object.add(this.object.position, 'z', 0, 10);
	object.add(this.object.rotation, 'x', -Math.PI, Math.PI);
	object.add(this.object.rotation, 'y', -Math.PI, Math.PI);
	object.add(this.object.rotation, 'z', -Math.PI, Math.PI);
}

PROJECT.World.prototype.tick = function(d) {
	this.uniforms.time.value += d;
}

window.onload = function() {
	this.world = new PROJECT.World();
}
