
private var isEnabled:boolean;

var Damage:float=20;


var semiAuto:boolean=false;

var fireRate:double;
private var originalAccuracy:double;

var resetToAcc:float;

var accuracy:double;
var accRecoveryTime:float;
var accDecreasePerShot:float;
var minAcc:float;
var ADS_Multiplier:double;
var isADS:boolean=false;
var ADSPos:Vector3;
private var origPos:Vector3;



var bulletSpeed:float;
var damageTodestructibles:int;

var maxAmmo:int;
var currAmmo:int;
var maxClips:int;
//var currClips:int;

var bulletSpawn:Transform;
var fireAudio:AudioClip;
var muzzleFlash:ParticleSystem;
var hitFlash:ParticleSystem;

private var lastFireTime=0.0;

static var targetGuiText : GUIText;

private var clipCount:AmmoCounter;
private var GunName:String;



public var clipsOnPickUp:int=1;

//var recoil:float;

var force: float = 2.5; // controls recoil amplitude
var upSpeed: float = 9; // controls smoothing speed
var dnSpeed: float = 20; // how fast the weapon returns to original position


private var startAng:Vector3;
private var targetX: float; // unfiltered recoil angle
private var ang = Vector3.zero; // smoothed angle

private var startPos:Vector3;
private var tgtRecoilPosZ:float;
private var RecoilPos=Vector3.zero;
var pushBackSpeed:float;
var pushBackRecoverSpeed:float;
var pushRecoilForce:float;

public static var canShoot:boolean=true;
function Start(){
	originalAccuracy=accuracy;
	//clipCount=GameObject.Find("_AmmoCounter").GetComponent(AmmoCounter);
	GunName=gameObject.name;
	targetGuiText=GameObject.Find("GUI Text").GetComponent(GUIText);
	startAng=transform.localEulerAngles;
	startPos=transform.localPosition;
	//startPos.z=transform.localPosition.z;
	//Debug.Log(startPos.z+"||"+transform.localPosition.z+"|"+gameObject);
	RecoilPos.z=startPos.z;
	resetToAcc=originalAccuracy;
	origPos=GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepPos(gameObject.name);
	if(semiAuto){
		fireRate=.01;
	}
}


function Update(){
	if(isEnabled&&canShoot){
		targetGuiText.text = "Ammo: " + currAmmo + " " + "Clip: " + AmmoCounter.getClips(GunName);
		
		if (Input.GetButton("Fire3")&&!isADS){
			isADS=true;
			accuracy=accuracy*ADS_Multiplier;
			resetToAcc=originalAccuracy*ADS_Multiplier;
			
			startPos=ADSPos;
			//var temp:float=recoilPosZ;
			RecoilPos.z=startPos.z;
			transform.localPosition=ADSPos;
		}
		
		if (Input.GetButtonUp("Fire3")){
			isADS=false;
			
			resetToAcc=originalAccuracy;
			
			
			startPos=origPos;
			RecoilPos.z=startPos.z;
			
			transform.localPosition=origPos;
		}
		
		if(semiAuto){
			if (Input.GetButtonDown("Fire1")){
				fireGun();
			}else{
				resetAcc();
			}
		}else{
			if (Input.GetButton("Fire1")){
				fireGun();
			}else{
				resetAcc();
			}
		}
		
		if (Input.GetButtonDown("Reload") && AmmoCounter.getClips(GunName) > 0){
			reload();
		}
		
		applyrecoil();
	}
}
function reload(){
	currAmmo=maxAmmo;
	AmmoCounter.addClips(GunName,-1);
	
}

function setEnabled(enabled:boolean){
	isEnabled=enabled;
}

function SprayDirection() {
	var vx = (1 - 2 * Random.value) * accuracy;
	var vy = (1 - 2 * Random.value) * accuracy;
	var vz = 1.0;
	return bulletSpawn.transform.TransformDirection(Vector3(vx,vy,vz));
}

function getCurrAmmo()
{
	return currAmmo;
}
function setCurrAmmo(num:int)
{
	currAmmo=num;
}
function getGunName(){
	return GunName;
}

/*
function getCurrClips()
{
	return currClips;
}
function addClips(ammount:int){
	currClips+=ammount;
}
*/

function fireGun(){
	if(Time.timeScale>0){
		if(isEnabled){
			if(Time.time>lastFireTime+fireRate && currAmmo>0){
				lastFireTime = Time.time - Time.deltaTime;
				audio.PlayOneShot(fireAudio,1);
				currAmmo-=1;
				lastFireTime=Time.time;
				spawnBullet();
			}
		}
	}
}

function spawnBullet(){
	var direction = SprayDirection();
	var hit : RaycastHit;

	muzzleFlash.Emit(1);
	
	
	targetX+=force;
	tgtRecoilPosZ-=pushRecoilForce;
	
	if(accuracy<=minAcc){
		accuracy+=accDecreasePerShot;
	}
 	if (Physics.Raycast(bulletSpawn.transform.position, direction, hit,100))
 	{
 		
     	var delay = hit.distance / bulletSpeed; // calculate the flight time
      
  	 	yield WaitForSeconds(delay); // wait for the flight time
      	// then do the actual shooting:
      	
      	if (Physics.Raycast(bulletSpawn.transform.position, direction, hit))
      	{
      
      		var clone:ParticleSystem;
      		clone=GameObject.Instantiate(hitFlash, hit.point,hitFlash.transform.rotation);
	
     	 	clone.Emit(1);
      		GameObject.Destroy(clone.gameObject,clone.duration);
      		
      	
  			if(hit.collider.CompareTag("enemy"))
	  		{
	    		//Debug.Log("HIT");
	    		//Debug.Log(hit.transform.gameObject);
	            //hit.transform.gameObject.GetComponent("zombieAI1").OnDeath();
	            hit.transform.gameObject.GetComponent("zombieAI1").OnHit(Damage);
	    	}
	    	
	    	//Debug.Log(hit.collider.tag);
	    	if(hit.collider.CompareTag("destructible")&&!hit.rigidbody){
	    		hit.collider.gameObject.SendMessage("addHealth",-damageTodestructibles,SendMessageOptions.RequireReceiver);
	    		return;
	    	}
			if (hit.rigidbody)
			{
		 		hit.rigidbody.AddForceAtPosition(200 * direction, hit.point);
			}
      	}
    }
}

function OnPickup(){

	yield;
	GameObject.Find("GunSwitcher").GetComponent(GunSwitcher).addObject(gameObject);
	
	transform.parent=GameObject.Find("WeaponAnchor").transform;
	
	//Debug.Log("in here");
	transform.localPosition=GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepPos(gameObject.name);
	transform.localEulerAngles=GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepRot(gameObject.name);
	rigidbody.isKinematic=true;
	gameObject.collider.enabled=false;
	startAng=GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepRot(gameObject.name);
	startPos=GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepPos(gameObject.name);
	
	
	
	origPos=GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepPos(gameObject.name);
	
	
	
	//gameObject.tag="Pickup";
	
	//var script = gameObject.GetComponent(weaponBase);
	//if (script != null){
		//gameObject.GetComponent(weaponBase).setEnabled(true);
	//}
	//Debug.Log(gameObject.GetComponent(weaponBase).clipsOnPickUp);
	
	if(gameObject.GetComponent(weaponBase).clipsOnPickUp>0){
		AmmoCounter.addClips(gameObject.name,clipsOnPickUp);
		//gameObject.GetComponent(weaponBase).clipsOnPickUp=0;
		clipsOnPickUp=0;
	}
	
	targetGuiText.text = "Ammo: " + currAmmo + " " + "Clip: " + AmmoCounter.getClips(GunName);
	
	gameObject.tag="Pickup";
	//this.enabled=false;
	yield WaitForSeconds(.2);
	transform.localPosition=GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepPos(gameObject.name);
	transform.localEulerAngles=GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepRot(gameObject.name);
}
function OnSwitchTo(){
	transform.localPosition=GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepPos(gameObject.name);
	transform.localEulerAngles=GameObject.Find("GunSwitcher").GetComponent(WeaponPosData).getWepRot(gameObject.name);
	accuracy=originalAccuracy;
	
	tgtRecoilPosZ=0;
	
	startPos=transform.localPosition;
	tgtRecoilPosZ=startPos.z;
	
	RecoilPos=transform.localPosition;
	Debug.Log("switchto");
}

function applyrecoil() {
	
	ang.x = Mathf.Lerp(ang.x, targetX, upSpeed * Time.deltaTime);
	transform.localEulerAngles = startAng - ang; // move the camera or weapon
	targetX = Mathf.Lerp(targetX, 0, dnSpeed * Time.deltaTime);
	
	
	RecoilPos.z = Mathf.Lerp(RecoilPos.z, tgtRecoilPosZ, pushBackSpeed * Time.deltaTime);
	transform.localPosition.z = RecoilPos.z;//startPos+RecoilPos;
	tgtRecoilPosZ = Mathf.Lerp(tgtRecoilPosZ, startPos.z, pushBackRecoverSpeed); //* Time.deltaTime);
}
function resetAcc(){
	accuracy=Mathf.Lerp(accuracy,resetToAcc,accRecoveryTime*Time.deltaTime); //reset accuracy
}