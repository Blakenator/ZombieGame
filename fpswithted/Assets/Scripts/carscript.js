#pragma strict

private var Enabled:boolean=false;


var fl:WheelCollider;
var fr:WheelCollider;
var bl:WheelCollider;
var br:WheelCollider;
var brakelightL:Light;
var brakelightR:Light;

var carCam:Camera;
private var player:player;
private var playerCam:Camera;
private var playerLookx:MouseLook;
private var playerLooky:MouseLook;


var power:float;
var maxSteerAng:float;


function Start () {
	carCam.enabled=false;
	playerCam=Camera.main;
	playerLooky=playerCam.GetComponent(MouseLook);
	playerLookx=GameObject.Find("player").GetComponent(MouseLook);
	Debug.Log(rigidbody.centerOfMass);
	rigidbody.centerOfMass = Vector3 (0, -.5, 0);
	player=GameObject.Find("player").GetComponent("player");
}

function Update () {
	if(Enabled){
		rigidbody.centerOfMass = Vector3 (0, -.5, 0);
		var accel = Input.GetAxis("Vertical");
		var steerAngle=Input.GetAxis("Horizontal")*maxSteerAng;
		
		fl.motorTorque = accel * power;
		fr.motorTorque = accel * power;
		
		bl.motorTorque = accel * power;
		br.motorTorque = accel * power;
		
		bl.steerAngle=0;
		br.steerAngle=0;
		
		fl.steerAngle=steerAngle;
		fr.steerAngle=steerAngle;
		
		if(Input.GetButton("Brake")){
			fr.brakeTorque=100;
			fl.brakeTorque=100;
			
			//br.brakeTorque=100;
			//bl.brakeTorque=100;
			
			brakelightL.intensity=1;
			brakelightR.intensity=1;
		}
		else{
			fr.brakeTorque=0;
			fl.brakeTorque=0;
			
			//bl.brakeTorque=0;
			//br.brakeTorque=0;
			
			brakelightL.intensity=0;
			brakelightR.intensity=0;
		}
	}
}

function Use(){
	Enabled=!Enabled;
	player.CanMove=!Enabled;
	
	playerCam.enabled=!Enabled;
	playerLookx.isPaused=Enabled;
	playerLooky.isPaused=Enabled;
	
	carCam.enabled=Enabled;
	carCam.GetComponent(MouseLook).isPaused=!Enabled;
	
	
	if(Enabled){
		player.setCar(this);
		player.gameObject.transform.position=Vector3(0,0,0);
	}else{
		player.setCar(null);
		player.gameObject.transform.position=gameObject.transform.position+player.gameObject.transform.right+Vector3(0,1,0);
	}
}
function OnCollisionEnter(other:Collision){
	if(other.gameObject.CompareTag("enemy")){
		Debug.Log(rigidbody.velocity.magnitude);
		if(rigidbody.velocity.magnitude>5){
			other.gameObject.GetComponent(zombieAI1).OnDeath();
		}
	}
}