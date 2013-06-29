
var Gun : AudioClip;
var audio1 = false;

var shotgunFireRate : double;
var accuracy : double;
var ADSmod : double;

var isEnabled:boolean;

var bulletspawn:Transform;
var muzzleflash : ParticleSystem;
var hitflash:ParticleSystem;

var myguntype : GType;

public var rifleFireRate:double;
public var Ammo = 30;
public var Clip = 3;
private var isFirstShot=true;

function setEnabled(enabled:boolean){
	isEnabled=enabled;
}

function getGunType(){
	return myguntype;
}
function setGunType(vals:GType){
	myguntype=vals;
}
function setGunType(vals:int){
	if(vals==0){
		myguntype=GType.Rifle;
	}else{
		myguntype=GType.Shotgun;
	}
}

function gtypeToInt(bad:GType){
	var val:int;
	if(bad==GType.Rifle){
		return 0;
	}else{
		return 1;
	}
}

enum GType { 
Rifle=0,
Shotgun=1
}




var bulletSpeed: float = 1000; // bullet speed in meters/second
private var nextFireTime = 0.0;
private var isADS = false;



//Shot gun specific
var bulletspershot:int;


     
function Start()
{}

function Update() { 

	//fix ADS system
	if(isEnabled){
	

	Debug.DrawRay(bulletspawn.transform.position, bulletspawn.transform.TransformDirection(Vector3.forward), Color.green);
	//if(audio.isPlaying)
	//{
	//}
	//else{
	if(Input.GetButton("Fire1") && Ammo >= 0) {
    	//fireweapon();
    	//Debug.Log("rifle");
    	fireGun();
    }
	if (Input.GetButtonUp("Fire1") || Ammo < 0){
		audio1 = false;
		audio.Stop();
	}
	
	
	if (Input.GetButton("Fire2") || Ammo < 0){
		if(isADS==false)
		{
			accuracy-=ADSmod;
			isADS=true;
		}
	}
	if (Input.GetButtonUp("Fire2") || Ammo < 0){
		if(isADS)
		{
			accuracy+=ADSmod;
			isADS=false;
		}
	}
	
	if (Input.GetKeyDown("r") && Clip > 0){
		reload();
	}
	}
}


function reload(){
	Ammo = 30;
	Clip -= 1;
}

function fireGun(){
	var fireRate:double;
	if(myguntype.Equals(GType.rifle)){
		fireRate=rifleFireRate;
	}
	else{
		fireRate=shotgunFireRate;
	}
	if((Time.time - fireRate > nextFireTime)&&(Ammo>0)){
		//set time til next shot
		nextFireTime = Time.time - Time.deltaTime;
		
		//test for gun type
		if(myguntype==GType.Rifle){
			while(nextFireTime < Time.time){
				playAudio();
				Ammo-=1;
            	spawnBullet();
            	nextFireTime =Time.time-Time.deltaTime+ rifleFireRate;
            	Debug.Log("rifle");
        	}
        }else{
        	playAudio();
        	Ammo-=1;
            nextFireTime = Time.time-Time.deltaTime+ shotgunFireRate;
        	for(lcv=0;lcv<=bulletspershot;lcv++)
    		{
    			
    			if(lcv==0){
    				isFirstShot=true;
    			}
    			else{
    				isFirstShot=false;
    			}
    			
    			if(Ammo>0)
    			{
    				spawnBullet();
    				Debug.Log("shotgun");
    			}
    		}
		}
	}
}

function playAudio(){
	if(audio1 == false && Ammo > 0)
		{
			audio.PlayOneShot(Gun,1);
		}
}

function spawnBullet(){
	var direction = SprayDirection();
    var hit : RaycastHit;
 	Debug.Log(direction.ToString());
 	
 	muzzleflash.Emit(1);
 	
 	
 	if (Physics.Raycast(bulletspawn.transform.position, direction, hit,100))
 	{
     	var delay = hit.distance / bulletSpeed; // calculate the flight time
     	var hitPt = hit.point;
      
      	//hitPt.y -= delay * 9.8; // calculate the bullet drop at the target
      	//var dir = hitPt - transform.position; // use this to modify the shot direction
      
      
      
      	m_LastFrameShot = Time.frameCount;
      	yield WaitForSeconds(delay); // wait for the flight time
      	// then do the actual shooting:
      
      
      
      	if (Physics.Raycast(bulletspawn.transform.position, direction, hit))
      	{
      
      		var clone:ParticleSystem;
      		clone=Instantiate(hitflash, hit.point,hitflash.transform.rotation);
	
     	 	clone.Emit(1);
      		Destroy(clone.gameObject,clone.duration);
      		
      	
  			if(hit.collider.CompareTag("enemy"))
	  		{
	    		Debug.Log("HIT");
	            Destroy(hit.collider.gameObject);
	    	}
			if (hit.rigidbody)
			{
		 		hit.rigidbody.AddForceAtPosition(200 * direction, hit.point);
			}
      	}
    }
}


function SprayDirection() {
var vx = (1 - 2 * Random.value) * accuracy;
var vy = (1 - 2 * Random.value) * accuracy;
var vz = 1.0;
return bulletspawn.transform.TransformDirection(Vector3(vx,vy,vz));
}


function getammo()
{
	return Ammo;
}
function getclips()
{
	return Clip;
}
