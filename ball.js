
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

			var factor = 1.0 + ( endzoom.y - startzoom.y ) * this.zoomSpeed; //멈춘지점에서 시작지점을 빼고 속도를 곱해 준다.
            //factor에 +1을 하는 이유는 multiplyScalar를 사용하기 때문에 움직임이 없어도 곱할 수 있게 하기 위해서이다. 
			if ( factor !== 1.0 && factor > 0.0 ) {

				eye.multiplyScalar( factor ); //eye 벡터에 factor값을 곱해준다. 

				if ( this.staticMoving ) {

					startzoom.copy( endzoom );  

				} else { 

					startzoom.y += ( endzoom.y - startzoom.y ) * this.dynamicDampingFactor; //this.dynamicDampingFactor은 화면이 줌이 될 때 튕기는 효과를 준다. 

				}

			}


	};

	this.update = function () { //거리가 변화 하는 것을 입력해주는 함수 

		eye.subVectors( this.object.position, this.target ); 

		this.zoomCamera();

		this.object.position.addVectors( this.target, eye ); //객체의 위치 설정 

		this.object.lookAt( this.target );  //earth.js 속 카메라가 계속 타겟을 볼 수 있도록 설정 


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