#pragma strict
private var Enabled:boolean;
private var stats:StatsController;
var foodValue:float=10;
var targetGuiText:GUIText;
function Start () {
	stats=GameObject.Find("_StatsCounter").GetComponent(StatsController);
	targetGuiText=GameObject.Find("GUI Text").GetComponent(GUIText);
}
function Update () {
	if(Time.timeScale>0){
		if(Enabled){
			targetGuiText.text = gameObject.name;
			if(Input.GetButton("Fire1")){
				Eat();
			}
		}
	}
}
function setEnabled(val:boolean){
	Enabled=val;
}
function Eat(){//add animation/sounds
	stats.updateHunger(foodValue);
	var c=GameObject.Find("GunSwitcher").GetComponent(GunSwitcher).dropCurrent();
	
	Destroy(c);
}
function getVal(){
	return foodValue;
}





function OnPickup(){
	GameObject.Find("GunSwitcher").GetComponent(GunSwitcher).addObject(gameObject);
	
	transform.parent=GameObject.Find("WeaponAnchor").transform;
	transform.localPosition=Vector3(.1,-.5,-.65);//GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepPos(gameObject.name);
	transform.localRotation.x=0;//GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepRot(gameObject.name);
	transform.localRotation.y=0;
	transform.localRotation.z=0;
	rigidbody.isKinematic=true;
	gameObject.collider.enabled=false;
	
	Destroy(gameObject.collider);
	
	gameObject.tag="Pickup";
}

