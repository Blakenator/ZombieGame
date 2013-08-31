#pragma strict
private var Enabled:boolean;
private var zSpawn:zSpawnerRandom;
private var gunswitch:GunSwitcher;
private var isThrown:boolean=false;
var throwspeed:float;
var attractdist:float=40;
private var targetGuiText:GUIText;
function Start () {
	zSpawn=GameObject.Find("_A*").GetComponent(zSpawnerRandom);
	gunswitch=GameObject.Find("GunSwitcher").GetComponent(GunSwitcher);
	targetGuiText=GameObject.Find("GUI Text").GetComponent(GUIText);
	
	audio.maxDistance=attractdist;
}

function Update(){
	if(Enabled&&Time.timeScale>0){
		
		if(Input.GetButtonDown("Fire1")){
			var clone:GameObject=gunswitch.dropCurrent();
			clone.GetComponent(distractorScript).setIsThrown(true);
			Debug.Log("set");
			clone.rigidbody.velocity=Camera.main.transform.TransformDirection(Vector3.forward*throwspeed);
		}
	}
}

function OnCollisionEnter(collision : Collision) {
	
	//if(isThrown){
		//Debug.Log(collision.relativeVelocity.magnitude);
		if(collision.relativeVelocity.magnitude>5){
			if(!(collision.gameObject.CompareTag("Player"))){
				isThrown=false;
				distract();
			}
		}
	//}
}


function distract(){
	
	audio.Play();
	var temparr=new Array();
	temparr=zSpawn.getZombiesAroundPos(gameObject.transform.position,attractdist);
	
	if(temparr.length>0){
		for(var z in temparr){
			var tempobj:GameObject=z;
			var tempZ:zombieAI1=tempobj.GetComponent(zombieAI1);
			
			tempZ.alertToPosition(gameObject.transform.position);
		}
	}
	
}


function setIsThrown(val:boolean){
	isThrown=val;
}


function OnPickup(){
	GameObject.Find("GunSwitcher").GetComponent(GunSwitcher).addObject(gameObject);
	isThrown=false;
	transform.parent=GameObject.Find("WeaponAnchor").transform;
	transform.localPosition=Vector3(.1,-.5,-.65);//GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepPos(gameObject.name);
	transform.localRotation.x=0;//GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepRot(gameObject.name);
	transform.localRotation.y=0;
	transform.localRotation.z=0;
	rigidbody.isKinematic=true;
	//gameObject.collider.enabled=false;
	Destroy(gameObject.collider);
	
	gameObject.tag="Pickup";
}

function setEnabled(val:boolean){
	Enabled=val;
}