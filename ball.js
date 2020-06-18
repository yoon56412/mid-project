
THREE.TrackballControls = function ( object, domElement ) {

	this.object = object; 
	this.domElement = domElement;

	this.zoomSpeed = 1.0;
	this.staticMoving = false;
	this.dynamicDampingFactor = 0.1;

	this.target = new THREE.Vector3();

	var eye = new THREE.Vector3();

	var startzoom = new THREE.Vector2();
	var endzoom = new THREE.Vector2();


	this.zoomCamera = function () {

			var factor = 1.0 + ( endzoom.y - startzoom.y ) * this.zoomSpeed; 
			if ( factor !== 1.0 && factor > 0.0 ) {

				eye.multiplyScalar( factor ); 

				if ( this.staticMoving ) {

					startzoom.copy( endzoom );  

				} else { 

					startzoom.y += ( endzoom.y - startzoom.y ) * this.dynamicDampingFactor; 

				}

			}


	};

	this.update = function () { //거리가 변화 하는 것을 입력해주는 함수 

		eye.subVectors( this.object.position, this.target ); 

		this.zoomCamera();

		this.object.position.addVectors( this.target, eye ); 

		this.object.lookAt( this.target ); 


	};

	function mousewheel( event ) { //mouse wheel 이벤트 설정 

		var delta = 0;

		if ( event.wheelDelta ) {

			delta = event.wheelDelta / 120;

		}

		startzoom.y += delta * 0.02; 

	}


	this.domElement.addEventListener( 'mousewheel', mousewheel); //html에 이벤트 할당


};

THREE.TrackballControls.prototype = Object.create( THREE.EventDispatcher.prototype );