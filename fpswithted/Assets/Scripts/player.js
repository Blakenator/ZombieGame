#pragma strict
public static var CanMove:boolean=true;

var health:double=100.0;
var gunSwitcherObject:GameObject;
var runSpeed:float=15;
var walkSpeed:float=10;
var staminaRegenRate:double=0.5;
var cam:Camera;

private var chMotor: CharacterMotor;
private var ch: CharacterController;
private var stats:StatsController;
var holdPoint:HingeJoint;
var Strength:float=20;
private var isHolding:boolean=false;
//var gun2:Gunshot;
function Start () {
	chMotor = GetComponent(CharacterMotor);
    ch = GetComponent(CharacterController);
    stats=GameObject.Find("_StatsCounter").GetComponent(StatsController);
}


function Update () {
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
	
	
	Debug.DrawRay(cam.transform.position, cam.transform.forward*6,Color.red);
	
	if (Input.GetButtonDown("Pick Up")){
		if(Physics.Raycast (cam.transform.position, cam.transform.forward, hit, 6)){
			if(hit.transform.gameObject.CompareTag("Pickup")){
				Debug.Log("HIT AN OBJECT!");
				
				hit.transform.gameObject.SendMessage("pickUp",SendMessageOptions.RequireReceiver);
				
			}else if((isHolding==false)&&(hit.transform.gameObject.CompareTag("Grab"))&&(hit.transform.rigidbody.mass<Strength)){
				Debug.Log("GRAB ON!");
				isHolding=true;
				holdPoint.connectedBody=hit.transform.gameObject.rigidbody;
			}
		}
	}
	if (Input.GetButtonUp("Pick Up")){
		if(isHolding){
			holdPoint.connectedBody=null;
			isHolding=false;
		}
	}
	if (Input.GetButtonDown("Drop")){
		Debug.Log("drop");
		gunSwitcherObject.GetComponent(GunSwitcher).dropCurrent();
	}
    
	
	
	
	 if (ch.isGrounded && Input.GetButton("Sprint")){

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
     
     
     
	chMotor.movement.maxForwardSpeed = speed;
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