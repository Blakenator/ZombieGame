#pragma strict
var health:double=1.0;
var gun1:Gunshot;
var gunSwitcherObject:GameObject;
//var gun2:Gunshot;
function Start () {

}


function Update () {
	if(Input.GetAxis("Mouse ScrollWheel")>0){
		gunSwitcherObject.SendMessage("switchUp",SendMessageOptions.RequireReceiver);
	}else if(Input.GetAxis("Mouse ScrollWheel")<0){
		gunSwitcherObject.SendMessage("switchDown",SendMessageOptions.RequireReceiver);
		
	}
	if (Input.GetKeyDown("escape")){
		//do work
	}
}

function addhealth(num:double)
{
	health=health+num;
}
function subhealth(num:double)
{
	health=health-num;
}
function gethealth()
{
	return health;
}