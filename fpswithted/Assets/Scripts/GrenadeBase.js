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
	origForce=explosionForce;
}

function setThrown(enabled:boolean){
	thrown=enabled;
}

function FixedUpdate () {
	explosionForce=origForce;
	if(thrown && Time.time>start+fuseTime){
		
		var explosionPos=transform.position;
		var colliders : Collider[] = Physics.OverlapSphere (explosionPos, explosionRadius);
		
	    for (var hit : Collider in colliders) {
	        if (!hit){
	            continue;
	        }
	        if(hit.CompareTag("enemy")){
	        	hit.GetComponent(zombieAI1).RagdollEnemy();
		        if (hit.rigidbody&&hit.name!=name){
		            hit.rigidbody.AddExplosionForce(explosionForce, explosionPos, explosionRadius, 0);
		        }
		        return;
	        }
	        if(hit.collider.CompareTag("destructible")&&!hit.rigidbody&&hit.collider.transform.childCount==0){
	    		hit.collider.gameObject.SendMessage("addHealth",-damageToDestructibles,SendMessageOptions.RequireReceiver);
	    		explosionForce=origForce*3;
	    		
	    	}
	        if (hit.rigidbody&&hit.name!=name){
	            hit.rigidbody.AddExplosionForce(explosionForce, explosionPos, explosionRadius, 0);
	        }
	    }
		audio.PlayOneShot(audioboom,2);
	    grenade.renderer.enabled=false;
	    thrown=false;
	    Destroy(grenade,1);
	}
}

