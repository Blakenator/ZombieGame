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



var power:float=45;
var maxSteerAng:float=33;
var turnSpeed:float=10;

var steerAngle:float;
var accel:float;
var speedDecrease:float=5;

function Start () {
	carCam.enabled=false;
	playerCam=Camera.main;
	playerLooky=playerCam.GetComponent(MouseLook);
	playerLookx=GameObject.Find("player").GetComponent(MouseLook);
	
	//Debug.Log(rigidbody.centerOfMass);
	
	rigidbody.centerOfMass = Vector3 (0, -.6, 0);
	
	player=GameObject.Find("player").GetComponent("player");
	
	
	brakelightL.intensity=0;
	brakelightR.intensity=0;
}

function Update () {
	if(Enabled){
		rigidbody.centerOfMass = Vector3 (0, -.6, 0);
		
		accel= Input.GetAxis("Vertical");
		
		
		
		steerAngle+=((Input.GetAxis("Horizontal")*maxSteerAng)*turnSpeed)*Time.deltaTime;
		
		
		steerAngle=Mathf.Clamp(steerAngle,-maxSteerAng,maxSteerAng);
		
		if(steerAngle>=maxSteerAng){
			//steerAngle=maxSteerAng;
		}else if(steerAngle<=-maxSteerAng){
			//steerAngle=-maxSteerAng;
		}
		
		if(accel<0){
			if(fr.rpm>=10){
				fr.brakeTorque=100;
				fl.brakeTorque=100;
				br.brakeTorque=50;
				bl.brakeTorque=50;
				brakelightL.intensity=1;
				brakelightR.intensity=1;
			}else{
				fr.brakeTorque=0;
				fl.brakeTorque=0;
				br.brakeTorque=0;
				bl.brakeTorque=0;
				brakelightL.intensity=0;
				brakelightR.intensity=0;
			}
		}else{
			fr.brakeTorque=0;
			fl.brakeTorque=0;
			br.brakeTorque=0;
			bl.brakeTorque=0;
			brakelightL.intensity=0;
			brakelightR.intensity=0;
		}
		
		//Debug.Log(fl.steerAngle);
		
		if(Input.GetAxis("Horizontal")==0){
			fl.steerAngle=0;
			fr.steerAngle=0;
			steerAngle=0;
		}else{
			fl.steerAngle=steerAngle;
			fr.steerAngle=steerAngle;
		}
		
		//Debug.Log(accel);
		
		if(accel<=.1&&fl.motorTorque>0){
			if(fl.motorTorque<0){
				fl.motorTorque -=speedDecrease*Time.deltaTime;
				fr.motorTorque -=speedDecrease*Time.deltaTime;
				bl.motorTorque -=speedDecrease*Time.deltaTime;
				br.motorTorque -=speedDecrease*Time.deltaTime;
			}else{
				fl.motorTorque = 0;
				fr.motorTorque = 0;
				bl.motorTorque = 0;
				br.motorTorque = 0;
			}
		}else{
			fl.motorTorque = accel * power;
			fr.motorTorque = accel * power;
			bl.motorTorque = accel * power;
			br.motorTorque = accel * power;
		}
		
		
		bl.steerAngle=0;
		br.steerAngle=0;
		
		
		if(Input.GetButton("Brake")){
			fr.brakeTorque=100;
			fl.brakeTorque=100;
			
			br.brakeTorque=100;
			bl.brakeTorque=100;
			brakelightL.intensity=1;
			brakelightR.intensity=1;
		}else{
			fr.brakeTorque=0;
			fl.brakeTorque=0;
			
			bl.brakeTorque=0;
			br.brakeTorque=0;
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
		//gameObject.layer=null;
		gameObject.layer=12;
		fr.brakeTorque=0;
		fl.brakeTorque=0;
		br.brakeTorque=0;
		bl.brakeTorque=0;
		carCam.tag="MainCamera";
		playerCam.tag="Untagged";
	}else{
		player.setCar(null);
		player.gameObject.transform.position=gameObject.transform.position+player.gameObject.transform.right+Vector3(0,1,0);
		//gameObject.layer=null;
		gameObject.layer=0;
		fr.brakeTorque=100;
		fl.brakeTorque=100;
		br.brakeTorque=50;
		bl.brakeTorque=50;
		carCam.tag="Untagged";
		playerCam.tag="MainCamera";
	}
}
function OnCollisionEnter(other:Collision){
	if(other.gameObject.CompareTag("enemy")){
		//Debug.Log(rigidbody.velocity.magnitude);
		if(rigidbody.velocity.magnitude>5){
			other.gameObject.GetComponent(zombieAI1).OnDeath();
		}
	}
}