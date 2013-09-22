#pragma strict
public class BandageScript extends ItemClass{






	var HealthValue:float=10;
	function BandageScript(){
		super(HealthValue);
	}
	function ItemUse(){//add animation/sounds
		StatsController.updateHealth(HealthValue);
		var c=GameObject.Find("GunSwitcher").GetComponent(GunSwitcher).dropCurrent();
		Destroy(c);
	}
	function getVal(){
		return HealthValue;
	}
	


/*
private var Enabled;
var healthValue:float=20;
private var stats:StatsController;


private var targetGuiText:GUIText;
//private var player:Transform;

function Start () {
	//player=GameObject.Find("player").transform;
	stats=GameObject.Find("_StatsCounter").GetComponent(StatsController);
	targetGuiText=GameObject.Find("GUI Text").GetComponent(GUIText);
}

function Update () {
	if(Time.timeScale>0){
		if(Enabled){
			targetGuiText.text = gameObject.name;
			if(Input.GetButton("Fire1")){
				Bandage();
			}
		}
	}
}



function setEnabled(val:boolean){
	Enabled=val;
}
function Bandage(){//add animation/sounds
	stats.updateHealth(healthValue);
	var c=GameObject.Find("GunSwitcher").GetComponent(GunSwitcher).dropCurrent();
	
	Destroy(c);
}
function getVal(){
	return healthValue;
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
	gameObject.tag="Pickup";
}
*/
}