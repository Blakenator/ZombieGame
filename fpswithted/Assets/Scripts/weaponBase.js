
var isEnabled:boolean;

var fireRate:double;
private var originalAccuracy:double;
var accuracy:double;
var ADS_Multiplier:double;
var bulletSpeed:float;
var damageTodestructibles:int;

var maxAmmo:int;
var currAmmo:int;
var maxClips:int;
var currClips:int;

var bulletSpawn:Transform;
var fireAudio:AudioClip;
var muzzleFlash:ParticleSystem;
var hitFlash:ParticleSystem;

private var lastFireTime=0.0;
var targetGuiText : GUIText;

function Start(){
	originalAccuracy=accuracy;
}

function Update(){
	if(isEnabled){
	
		targetGuiText.text = "Ammo: " + currAmmo + " " + "Clip: " + currClips;
	
		if (Input.GetButton("Fire3")){
			accuracy=originalAccuracy*ADS_Multiplier;
		}else{
			accuracy=originalAccuracy;
		}
		if (Input.GetButton("Fire1")){
			fireGun();
		}
		if (Input.GetButtonDown("Reload") && currClips > 0){
			reload();
		}
	}
}
function reload(){
	currAmmo=maxAmmo;
	currClips-=1;
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
function getCurrClips()
{
	return currClips;
}
function addClips(ammount:int){
	currClips+=ammount;
}


function fireGun(){
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

function spawnBullet(){
	var direction = SprayDirection();
	var hit : RaycastHit;
	//Debug.Log(direction.ToString());

	muzzleFlash.Emit(1);


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
	    		Debug.Log("HIT");
	    		Debug.Log(hit.transform.gameObject);
	            //GameObject.Destroy(hit.collider.gameObject);
	            hit.transform.gameObject.GetComponent("zombieAI1").RagdollEnemy();
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

