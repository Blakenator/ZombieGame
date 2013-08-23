#pragma strict

private var Enabled:boolean=false;


var fl:WheelCollider;
var fr:WheelCollider;
var bl:WheelCollider;
var br:WheelCollider;
var carCam:Camera;
var playerCam:Camera;
var playerLookx:MouseLook;
var playerLooky:MouseLook;


var power:float;
var maxSteerAng:float;


function Start () {
	carCam.enabled=false;
	playerCam=Camera.main;
	playerLookx=playerCam.GetComponent(MouseLook);
	playerLookx=GameObject.Find("player").GetComponent(MouseLook);
}

function Update () {
	if(Enabled){
		var accel = Input.GetAxis("Vertical");
		var steerAngle=Input.GetAxis("Horizontal")*maxSteerAng;
		
		fl.motorTorque = accel * power;
		fr.motorTorque = accel * power;
		bl.motorTorque = accel * power;
		br.motorTorque = accel * power;
		
		fl.steerAngle=steerAngle;
		fr.steerAngle=steerAngle;
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
}