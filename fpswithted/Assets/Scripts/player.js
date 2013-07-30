#pragma strict
var health:double=100.0;
var gun1:Gunshot;
var gunSwitcherObject:GameObject;
//var gun2:Gunshot;
function Start () {

}


function Update () {
	
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
	
	
	if (Input.GetKeyDown("e")){
		Debug.Log("EEEEEE");
		
		if(Physics.Raycast (cam.position, cam.forward, hit, 6)){
		Debug.Log("HIT SOMETHING!");
			if(hit.transform.gameObject.CompareTag("Pickup")){
				Debug.Log("HIT AN OBJECT!");
				
				hit.transform.gameObject.SendMessage("pickUp",SendMessageOptions.RequireReceiver);
				
			}
		}
	}
	Debug.DrawRay(cam.position, cam.forward*6,Color.red);
	
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