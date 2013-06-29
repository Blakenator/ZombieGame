var bulletPrefab : GameObject;
var Gun : AudioClip;
var audio1 = false;

var fireRate : double;
var accuracy : double;
var bulletspawn:Transform;
var theEmitter : ParticleSystem;


public var Ammo = 30;
public var Clip = 3;



private var nextFireTime = 0.0;

     
function Start()
{}

function Update() { 



	Debug.DrawRay(bulletspawn.transform.position, bulletspawn.transform.TransformDirection(Vector3.forward), Color.green);
	
	//if(Input.GetButton("Fire1") && Ammo >= 0) {
    	//fireweapon();
    	//Fire();
	//}
	if(audio.isPlaying)
	{
	}
	else{
	if (Input.GetButtonUp("Fire1") || Ammo < 0){
		audio1 = false;
		audio.Stop();
	}
	}
	if (Input.GetKeyDown("r") && Clip > 0){
		reload();
	}
}

function reload(){
	Ammo = 30;
	Clip -= 1;
}


public function Fire(){
 
    if((Time.time - fireRate > nextFireTime)&&(Ammo>0)){
 		
        nextFireTime = Time.time - Time.deltaTime;
 		
        while(nextFireTime < Time.time){
            FireShot();
            nextFireTime += fireRate;
        }
    }
 
}


function FireShot(){
	
	if(audio1 == false && Ammo > 0)
	{
		audio.PlayOneShot(Gun,1);
	}
	
	Ammo-=1;
	
    var direction = SprayDirection();
    var hit : RaycastHit;
 	Debug.Log(direction.ToString());
 	
    if (Physics.Raycast (bulletspawn.transform.position, direction, hit,100))
    {
        Debug.DrawRay(bulletspawn.transform.position, direction, Color.green);
        
        	if(hit.collider.CompareTag("Player")){
        		Debug.Log("HIT PLAYER");
        		var dmg:double=.1;
        		GameObject.Find("player").GetComponent("player").subhealth(dmg);
        		
                //Destroy(hit.collider.gameObject);
        	}
        	if (hit.rigidbody){
        	 hit.rigidbody.AddForceAtPosition(200 * direction, hit.point);
        	}
    }
    theEmitter.Emit(1);
    m_LastFrameShot = Time.frameCount;
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