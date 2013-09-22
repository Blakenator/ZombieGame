#pragma strict


public static var CanMove:boolean=true;
public static var CanLook:boolean=true;

var LayersToCheck:LayerMask;

private var lastPos:Vector3;
var health:double=100.0;
var gunSwitcherObject:GameObject;
var runSpeed:float=15;
var walkSpeed:float=10;
var crouchSpeed:float=5;

var staminaRegenRate:double=0.5;
var cam:Camera;
private var camHeight:float;
private var chMotor: CharacterMotor;
private var chHeight:float;

var extraCollider:CapsuleCollider;

private var ch: CharacterController;
private var stats:StatsController;
var holdPoint:HingeJoint;
var Strength:float=20;


var kickStrength:float=20;


private var isHolding:boolean=false;

public var crouchToggle:boolean=true;
private var isCrouching:boolean=false;

private var car:Carscript;

var zSpawn:zSpawnerRandom;

var walkAlertRange:float=5;
var runAlertRange:float=10;
var crouchAlertRange:float=2;

private var playerLookx:MouseLook;
private var playerLooky:MouseLook;

enum StanceCat{Stand,Crouch,Sprint};
var Stance:StanceCat;

//var gun2:Gunshot;
function Start () {
	chMotor = GetComponent(CharacterMotor);
    ch = GetComponent(CharacterController);
    stats=GameObject.Find("_StatsCounter").GetComponent(StatsController);
    lastPos = transform.position;
    chHeight=ch.height;
    camHeight=cam.transform.localPosition.y;
    
    
	// Set up layer 15 to cull at 20 meters distance.
	// All other layers use the far clip plane distance.
	var distances = new float[32];
	distances[15] = 20;
	distances[13] = 50;
	cam.layerCullDistances = distances;
	
	
	playerLooky=GameObject.Find("Main Camera").GetComponent(MouseLook);
	playerLookx=GameObject.Find("player").GetComponent(MouseLook);
}


function Update(){
	
	var speed:float=walkSpeed;
	
	
	
	if(Time.timeScale>0){
		Screen.lockCursor=true;
		Screen.showCursor=false;
	}else{
		Screen.lockCursor=false;
		Screen.showCursor=true;
	}
	
	if(!CanLook){
		playerLookx.isPaused=true;
		playerLooky.isPaused=true;
	}else{
		playerLookx.isPaused=false;
		playerLooky.isPaused=false;
	}
	
	
	
	if(Time.timeScale>0){
		if(!CanMove){
			chMotor.canControl=false;
		}else{
			chMotor.canControl=true;
		}
		
		//var cam : Transform = Camera.main.transform;
		var hit:RaycastHit;
		
		if(Input.GetAxis("Mouse ScrollWheel")>0){
			gunSwitcherObject.SendMessage("switchUp",SendMessageOptions.RequireReceiver);
		}else if(Input.GetAxis("Mouse ScrollWheel")<0){
			gunSwitcherObject.SendMessage("switchDown",SendMessageOptions.RequireReceiver);
		}
		
		if(Input.GetButtonDown("Kick")){
			kick();
		}
		
		if (Input.GetButtonDown("Drop")){
			Debug.Log("drop");
			gunSwitcherObject.GetComponent(GunSwitcher).dropCurrent();
		}
	}
	
 	//Debug.DrawRay(cam.transform.position, dir*6,Color.red);
	if (Input.GetButtonDown("Pick Up")){
		if(car!=null){
			car.Use();
			return;
		}
		var dir:Vector3=cam.transform.forward;
		dir.Normalize();
		
		if(Physics.Raycast (cam.transform.position, dir, hit, 6,LayersToCheck)){
			Debug.Log(hit.transform.gameObject);
			if(hit.transform.gameObject.CompareTag("Pickup")||hit.transform.gameObject.CompareTag("LootPickup")){
				hit.transform.gameObject.SendMessage("OnPickup",SendMessageOptions.RequireReceiver);
			}else if((isHolding==false)&&(hit.transform.gameObject.CompareTag("Grab"))&&(hit.transform.rigidbody.mass<Strength)){
				isHolding=true;
				holdPoint.connectedBody=hit.transform.gameObject.rigidbody;
			}else{
				hit.transform.gameObject.SendMessage("Use",SendMessageOptions.DontRequireReceiver);
			}
		}
	}
	//Stances here
	
	
	if(crouchToggle&&Input.GetButtonDown("Crouch")&&Stance.ToString().Equals("Stand")){
		CrouchDown();
	}else if(crouchToggle&&Input.GetButtonDown("Crouch")&&Stance.ToString().Equals("Crouch")){
		CrouchUp();
	}
	if(!crouchToggle&&Input.GetButton("Crouch")&&Stance.ToString().Equals("Stand")){
		CrouchDown();
	}else if(!crouchToggle&&Input.GetButtonUp("Crouch")&&Stance.ToString().Equals("Crouch")){
		CrouchUp();
	}
	
	
	
	if (Input.GetButtonUp("Pick Up")){
		if(isHolding){
			holdPoint.connectedBody=null;
			isHolding=false;
		}
	}
	
	if (Input.GetButton("Sprint")){
		if(ch.isGrounded && hasMoved()&&!isCrouching){
		    if(stats.getStamina()>=.2){
		    	
		    	Stance=StanceCat.Sprint;
		    	
		    	
		    	stats.updateStamina(-0.1);
		    	
		        speed = runSpeed;
		        chMotor.movement.maxForwardSpeed = speed;
		        
		        audio.pitch=runSpeed/walkSpeed;
		    }else if(stats.getStamina()<.2){
		    	Stance=StanceCat.Stand;
		      	speed=walkSpeed;
		      	chMotor.movement.maxForwardSpeed = speed;
		      	
		        audio.pitch=1;
		    }
	    }
    }else if(ch.isGrounded&&stats.getStamina()<=100){
    	//Do not put a stance change here!
      	stats.updateStamina(staminaRegenRate*Time.deltaTime);
      	audio.pitch=1;
    }
		
	if(!isCrouching&&!Input.GetButton("Sprint")){
		Stance=StanceCat.Stand;
		
		speed=walkSpeed;
		chMotor.movement.maxForwardSpeed = speed;
	}
	
	
	
	//Stealth stuff
	if(ch.isGrounded&&hasMoved()){
		//Debug.Log(Stance);
		if(Stance.ToString().Equals("Sprint")){ //if(Input.GetButton("Sprint")){//&&Stance.ToString().Equals("Stand")){
			AlertZombies(runAlertRange);
		}else if(Stance.ToString().Equals("Stand")){//&&!Input.GetButton("Sprint")){
			AlertZombies(walkAlertRange);
		}else if(Stance.ToString().Equals("Crouch")){
			AlertZombies(crouchAlertRange);
		}
	}
	
	
	lastPos = transform.position;//Should always be at the bottom!
}

function CrouchDown(){
	Stance=StanceCat.Crouch;
	isCrouching=true;
	ch.height=chHeight/2;
	cam.transform.localPosition.y=camHeight/2;
	extraCollider.height=extraCollider.height/2;
	
	chMotor.movement.maxForwardSpeed = crouchSpeed;
}
function CrouchUp(){
	if(!CheckUp()){
		Stance=StanceCat.Stand;
		isCrouching=false;
		transform.position.y+=.7;//chHeight/2;
		ch.height=chHeight;
		cam.transform.localPosition.y=camHeight;
		//extraCollider.bounds.size.y=extraCollider.bounds.size.y*2;
		extraCollider.height=extraCollider.height*2;
		chMotor.movement.maxForwardSpeed = walkSpeed;
	}
}


function AlertZombies(attractdist:float){
	zSpawn.AlertZombiesAroundPos(gameObject.transform.position,attractdist);
}


function kick(){
	var dir:Vector3=cam.transform.forward;
	dir.Normalize();
	var hit:RaycastHit;
	if(Physics.Raycast (cam.transform.position, dir, hit, 6,LayersToCheck)){
		Debug.Log(hit.transform.gameObject);
		if(hit.transform.gameObject.CompareTag("Door")){
			var door:Door=hit.transform.gameObject.GetComponent(Door);
			door.Damage(kickStrength,hit.point,dir);
		}
	}
}

function CheckUp(){
	var hit:RaycastHit;
	if(Physics.Raycast (gameObject.transform.position, Vector3.up, hit, 1.5,LayersToCheck)){
		Debug.Log("cant stand here!"+hit.transform.gameObject);
		return true;
	}
	return false;
}

//Change to fit new stats
function addhealth(num:double){
	health=health+num;
}
function subhealth(num:double){
	health=health-num;
	if(health<0){
		health=0;
		Debug.Log("dead");
	}
}
function gethealth(){
	return health;
}
function OnTriggerEnter (other : Collider) {
	if(other.gameObject.CompareTag("Trigger")){
		Debug.Log("ENTER!");
		other.gameObject.GetComponent(Trigger).activateTrigger();
	}
}
function toggleGravity(g:boolean){
	if(g){
		chMotor.movement.gravity = 10;
	}else{
		chMotor.movement.gravity = 0;
	}
}

function hasMoved() {
  var newPos:boolean = Vector3.Distance(lastPos,transform.position)>=0.001f;
  return newPos;
}

function OnControllerColliderHit (hit : ControllerColliderHit) {
	if(hit.gameObject.CompareTag("Pickup")){
		Physics.IgnoreCollision(gameObject.collider,hit.gameObject.collider);
		
	}
}
function setCar(newCar : Carscript){
	car=newCar;
}
function getIsInCar(){
	if(car!=null){
		return true;
	}else{
		return false;
	}
}
function getCar(){
	return car;
}

