#pragma strict
private var Enabled:boolean;
private var stats:StatsController;
var foodValue:float=10;
function Start () {
	stats=GameObject.Find("_StatsCounter").GetComponent(StatsController);
}
function Update () {
	if(Enabled){
		if(Input.GetButton("Fire1")){
			Eat();
		}
	}
}
function setEnabled(val:boolean){
	Enabled=val;
}
function Eat(){//add animation/sounds
	stats.updateHunger(foodValue);
	//yield WaitForSeconds(2);
	Destroy(gameObject,2);
}

function OnPickup(){
	GameObject.Find("GunSwitcher").GetComponent(GunSwitcher).addObject(gameObject);
	
	transform.parent=GameObject.Find("WeaponAnchor").transform;
	transform.localPosition=Vector3(-0.2424172,-0.5481125,-0.9736624);//GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepPos(gameObject.name);
	transform.localRotation.x=0;//GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepRot(gameObject.name);
	transform.localRotation.y=0;
	transform.localRotation.z=0;
	rigidbody.isKinematic=true;
	gameObject.collider.enabled=false;
}

function getVal(){
	return foodValue;
}