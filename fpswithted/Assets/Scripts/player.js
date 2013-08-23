#pragma strict
public static var CanMove:boolean=true;

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

var extraCollider:Collider;

private var ch: CharacterController;
private var stats:StatsController;
var holdPoint:HingeJoint;
var Strength:float=20;
private var isHolding:boolean=false;

public var crouchToggle:boolean=true;
private var isCrouching:boolean=false;

private var car:Carscript;

//var gun2:Gunshot;
function Start () {
	chMotor = GetComponent(CharacterMotor);
    ch = GetComponent(CharacterController);
    stats=GameObject.Find("_StatsCounter").GetComponent(StatsController);
    lastPos = transform.position;
    chHeight=ch.height;
    camHeight=cam.transform.localPosition.y;
}


function Update(){
	if(Time.timeScale>0){
		Screen.lockCursor=true;
		Screen.showCursor=false;
	}else{
		Screen.lockCursor=false;
		Screen.showCursor=true;
	}
	if(Time.timeScale>0){
		if(!CanMove){
			chMotor.canControl=false;
		}else{
			chMotor.canControl=true;
		}
		var speed = walkSpeed;
		//var cam : Transform = Camera.main.transform;
		var hit:RaycastHit;
		
		if(Input.GetAxis("Mouse ScrollWheel")>0){
			gunSwitcherObject.SendMessage("switchUp",SendMessageOptions.RequireReceiver);
		}else if(Input.GetAxis("Mouse ScrollWheel")<0){
			gunSwitcherObject.SendMessage("switchDown",SendMessageOptions.RequireReceiver);
		}
		if (Input.GetButtonDown("Drop")){
			Debug.Log("drop");
			gunSwitcherObject.GetComponent(GunSwitcher).dropCurrent();
		}
		if (ch.isGrounded && Input.GetButton("Sprint") && hasMoved()&&!isCrouching){
		   	stats.updateStamina(-0.1);
		    if(stats.getStamina()>0){
		        speed = runSpeed;
		        audio.pitch=runSpeed/walkSpeed;
		    }else{
		      	speed=walkSpeed;
		        audio.pitch=1;
		    }
	    }else if(ch.isGrounded&&stats.getStamina()<=100){
		      	stats.updateStamina(staminaRegenRate*Time.deltaTime);
		      	audio.pitch=1;
	    }
	    
	    if(!isCrouching){
			chMotor.movement.maxForwardSpeed = speed;
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
		if(Physics.Raycast (cam.transform.position, dir, hit, 6)){
			if(hit.transform.gameObject.CompareTag("Pickup")||hit.transform.gameObject.CompareTag("LootPickup")){
				Debug.Log("HIT AN OBJECT!");
				hit.transform.gameObject.SendMessage("OnPickup",SendMessageOptions.RequireReceiver);
			}else if((isHolding==false)&&(hit.transform.gameObject.CompareTag("Grab"))&&(hit.transform.rigidbody.mass<Strength)){
				Debug.Log("GRAB ON!");
				isHolding=true;
				holdPoint.connectedBody=hit.transform.gameObject.rigidbody;
			}
			else{
				hit.transform.gameObject.SendMessage("Use",SendMessageOptions.DontRequireReceiver);
			}
		}
	}
	
	if(crouchToggle&&Input.GetButtonDown("Crouch")){
		isCrouching=!isCrouching;
		//canSprint=!canSprint;
		if(isCrouching){
			ch.height=chHeight/2;
			cam.transform.localPosition.y=camHeight/2;
			extraCollider.bounds.size.y=extraCollider.bounds.size.y/2;
			chMotor.movement.maxForwardSpeed = crouchSpeed;
		}else{
			transform.position.y+=.7;//chHeight/2;
			
			
			ch.height=chHeight;
			cam.transform.localPosition.y=camHeight;
			extraCollider.bounds.size.y=extraCollider.bounds.size.y*2;
			chMotor.movement.maxForwardSpeed = walkSpeed;
		}
	}
	
	if(!crouchToggle&&Input.GetButton("Crouch")){
		isCrouching=true;
		ch.height=chHeight/2;
		cam.transform.localPosition.y=camHeight/2;
		extraCollider.bounds.size.y=extraCollider.bounds.size.y/2;
		chMotor.movement.maxForwardSpeed = crouchSpeed;
	}
	if(!crouchToggle&&Input.GetButtonUp("Crouch")){
		isCrouching=false;
		transform.position.y+=.7;
		
		ch.height=chHeight;
		cam.transform.localPosition.y=camHeight;
		extraCollider.bounds.size.y=extraCollider.bounds.size.y*2;
		chMotor.movement.maxForwardSpeed = walkSpeed;
	}
	
	
	
	if (Input.GetButtonUp("Pick Up")){
		if(isHolding){
			holdPoint.connectedBody=null;
			isHolding=false;
		}
	}
}

//Change to fit new stats
function addhealth(num:double)
{
	health=health+num;
}
function subhealth(num:double)
{
	health=health-num;
	if(health<0){
		health=0;
		Debug.Log("dead");
	}
}
function gethealth()
{
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
  var newPos = transform.position - lastPos;
  lastPos = transform.position;
  if(newPos.magnitude > 0.01){
  	return true;
  }
  return false;
  //return newPos.magnitude > 0.01; // return true if char moved 1mm
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