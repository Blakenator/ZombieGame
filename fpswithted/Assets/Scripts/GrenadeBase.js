#pragma strict
var grenade:GameObject;
var fuseTime:double;
var explosionRadius:double;
var explosionForce:double;
var audioboom:AudioClip;
private var thrown=false;
private var start:double;
var damageToDestructibles:int;
private var origForce:double;

function Start () {
	start=Time.time;
}

function setThrown(enabled:boolean){
	thrown=enabled;
}

function Update () {
	explosionForce=origForce;
	if(thrown && Time.time>start+fuseTime){
		
		var explosionPos=this.transform.position;
		var colliders : Collider[] = Physics.OverlapSphere (explosionPos, explosionRadius);
		
	    for (var hit : Collider in colliders) {
	        if (!hit){
	            continue;
	        }
	        if(hit.collider.CompareTag("destructible")&&!hit.rigidbody){
	    		hit.collider.gameObject.SendMessage("addHealth",-damageToDestructibles,SendMessageOptions.RequireReceiver);
	    		explosionForce*=10;
	    		
	    		//Debug.Log(colliders.Length);
	    	}
	        if (hit.rigidbody){
	        	//Debug.Log("has it");
	            hit.rigidbody.AddExplosionForce(explosionForce, explosionPos, explosionRadius, 0);
	        }
	    }
		audio.PlayOneShot(audioboom,2);
	    grenade.renderer.enabled=false;
	    wait(3);
	    Destroy(grenade);
	}
}
function wait(val:double){
	yield WaitForSeconds(val);
}

