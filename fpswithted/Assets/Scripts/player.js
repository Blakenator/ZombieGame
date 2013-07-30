#pragma strict
var health:double=100.0;
var gun1:Gunshot;
var gunSwitcherObject:GameObject;
var runSpeed:float=20;
var walkSpeed:float=10;
private var chMotor: CharacterMotor;
private var ch: CharacterController;
private var stats:StatsController;

//var gun2:Gunshot;
function Start () {
	chMotor = GetComponent(CharacterMotor);
    ch = GetComponent(CharacterController);
    stats=GameObject.Find("_StatsCounter").GetComponent(StatsController);
}


function Update () {
	
	var speed = walkSpeed;
	
	var cam : Transform = Camera.main.transform;
	var hit:RaycastHit;
	
	if(Input.GetAxis("Mouse ScrollWheel")>0){
		gunSwitcherObject.SendMessage("switchUp",SendMessageOptions.RequireReceiver);
	}else if(Input.GetAxis("Mouse ScrollWheel")<0){
		gunSwitcherObject.SendMessage("switchDown",SendMessageOptions.RequireReceiver);
	}
	
	if (Input.GetKeyDown("escape")){
		//do work
	}
	
	Debug.DrawRay(cam.position, cam.forward*6,Color.red);
	
	if (Input.GetKeyDown("e")){
		if(Physics.Raycast (cam.position, cam.forward, hit, 6)){
			if(hit.transform.gameObject.CompareTag("Pickup")){
				Debug.Log("HIT AN OBJECT!");
				
				hit.transform.gameObject.SendMessage("pickUp",SendMessageOptions.RequireReceiver);
				
			}
		}
	}
	
	
	
	
	if (Input.GetKeyDown("q")){
		Debug.Log("drop");
		gunSwitcherObject.GetComponent(GunSwitcher).dropCurrent();
	}
	
	
    
    if (ch.isGrounded && Input.GetKey("left shift") || Input.GetKey("right shift")){
        speed = runSpeed;
		stats.updateStamina(-0.1);
    }
	
	chMotor.movement.maxForwardSpeed = speed;
}

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