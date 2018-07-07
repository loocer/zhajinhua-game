import * as datas from './tools'
export const foot = function(obj){
	this.id = Date.parse( new Date())
	this.camera = null
	this.scene = null
	this.lookAtMesh = null
	this.renderer = null
	this.plane = null
	this.directionalLight = null
	this.ambientLight = null
	this.gameType = obj.type
	this._allPosations = []
	this._renderElement = obj.renderElement
	this.showLooker = []
	this.allPokers = true//true is going,false is not going
	this.raiseMoney = 200
	this.setAllPosations = ()=>{
		var temp = this
		this._allPosations = datas.AllPosations[temp.gameType]
	}
	this.setPukerPanel = (object)=>{
		var cube = new THREE.BoxGeometry(20, 15, 0.1)
                
        // var url = "/static/assets/6.jpg";
        // var url1 = "/static/assets/6-1.jpg";
        var urlF = object.urlFront
        var urlB = object.urlBack
        var materialArr = []
        for(let i = 0 ; i < 6; i++){
        	var url = i === 4 ? urlF : urlB
        	var texture = THREE.ImageUtils.loadTexture(url)
        	materialArr.push(texture)
        }

  
        let facematerial=new THREE.MeshFaceMaterial(materialArr)
        let mesh=new THREE.Mesh(cube,facematerial)
        mesh.class = object.class
        scene.add(mesh)
        mesh.rotation.x = -0.5 * Math.PI
        mesh.position.x = 0
        mesh.position.y = 0
        mesh.position.z = 0
        var sp = {
            x:0,
            y:0,
            z:0
        }
        var tween = new TWEEN.Tween(sp).to({x:object.x, y:object.y, z:object.z, rz:object.rt * Math.PI}, 400).onUpdate(function(){
            plane.position.x = this.x
            plane.position.y = this.y
            plane.position.z = this.z
            plane.rotation.z = this.rz
        })
        var tween = new TWEEN.Tween(sp).to({x:object.x, y:object.y, z:object.z, rz:object.rt * Math.PI}, 500).onUpdate(function(){
            mesh.position.x = this.x
            mesh.position.y = this.y
            mesh.position.z = this.z
            mesh.rotation.z = this.rz
        })
        return tween
	}
	this.createPanel=()=>{
		var temp;
		var data = this._allPosations
        for (let d in data){
            if(d==0){
               var tweenObject = this.setPukerPanel(d,data[d]);
               temp = tweenObject;
               tweenObject.start();
            }else{
               var tweenObject1 = this.setPukerPanel(d,data[d]);
               temp.chain(tweenObject1)
               temp = tweenObject1
            }
        }
	}
	this.test_initState = () => {
		var stats = new Stats()
        stats.setMode(0) 
        // Align top-left
        stats.domElement.style.position = 'absolute'
        stats.domElement.style.left = '0px'
        stats.domElement.style.top = '0px'
        document.getElementById("Stats-output").appendChild(stats.domElement)
        return stats
	}
	this.resice = (chipsObj) => {
		var endP1 = {x:0,y:20,z:0}
        var pm = endP1
        var temp = this
		let stoneGeom = new THREE.BoxGeometry(chipsObj.l, chipsObj.w, chipsObj.h)
        var stone = new Physijs.BoxMesh(stoneGeom, Physijs.createMaterial(new THREE.MeshLambertMaterial(
                {
                    color: scale(Math.random()).hex(),
                    transparent: false, opacity: 1,
                       map: THREE.ImageUtils.loadTexture( '/static/assets/textures/general/darker_wood.jpg' )
                }),0.5,0.7))
        stone.position.copy(new THREE.Vector3(pm.x, pm.y, pm.z))
        stone.lookAt(temp._scene.position)
        stone.__dirtyRotation = true
        // stone.position.y = 3.5;

        scene.add(stone)
        var tween = new TWEEN.Tween(chipsObj.p).to({x:pm.x, y:pm.y, z:pm.z}, 5000).onUpdate(function(){
            stone.position.x = this.x
            stone.position.z = this.z
            tween.start()
	   })
    }
	this.init = () => {
		this.setAllPosations()
        Physijs.scripts.worker = '/static/libs/physijs_worker.js';
        Physijs.scripts.ammo = './ammo.js';
		this.scene = new Physijs.Scene
		this.scene.setGravity(new THREE.Vector3(0, -80, 0))
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.x = -100
        this.camera.position.y = 90
        this.camera.position.z = 0
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0))
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        let planeGeometry = new THREE.PlaneGeometry(180, 180)
        let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff})
        let plane = this.plane = new THREE.Mesh(planeGeometry, planeMaterial)
        // rotate and position the plane
        this.plane.rotation.x = -0.5 * Math.PI
        this.plane.position.x = 0
        this.plane.position.y = 0
        this.plane.position.z = 0
        this.scene.add(plane)

        let lookAtGeom = new THREE.SphereGeometry(2)
        let lookAtMesh = this.lookAtMesh = new THREE.Mesh(lookAtGeom, new THREE.MeshLambertMaterial({color: 0xff0000}))
        this.scene.add(lookAtMesh)

        let directionalLight = this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
        this.directionalLight.position.set(-20, 40, 60)
        this.scene.add(directionalLight)

        // add subtle ambient lighting
        let ambientLight = this.ambientLight = new THREE.AmbientLight(0x292929)
        this.scene.add(ambientLight)

        this._renderElement.appendChild(renderer.domElement)

        this.createPanel()

        let ground_material = Physijs.createMaterial(
                    new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('/static/assets/textures/general/wood-2.jpg')}),
                    .9, .3)
        let ground = new Physijs.BoxMesh(new THREE.BoxGeometry(180,0.1, 180), ground_material, 0)
        this.scene.add(ground)
        var temp = this
        this.render()
	}
	this.render = () => {
		let temp = this
		TWEEN.update()
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))
        this.renderer.render(temp.scene, temp.camera)
        this.scene.simulate(undefined, 1)
        requestAnimationFrame(temp.render)
	}
}