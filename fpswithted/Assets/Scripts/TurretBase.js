#pragma strict

var turnSpeed:double;
var fireAudio:AudioClip;
var isEnabled:boolean;
var fireRate:double;
private var lastFire:double;
var muzzleFlash:ParticleSystem;
var hitFlash:ParticleSystem;
var spawn:Transform[];
var currBarrelIndex:int;
var animationObject:GameObject;
var barrelBase:GameObject;
var Aimer:GameObject;
var targetAimer:GameObject;
private var other:Collider;
var range:double;
var targetObject:Collider;
var bulletForce:double;

function Start () {
	
}

function inRange(col:Collider,obj:Collider){
	if(Vector3.Distance(col.transform.position,obj.transform.position)<range){
		return true;
	}else{
		return false;
	}
}

function getClosest(colliders : Collider[]){
	var temp:Collider;
	//Debug.Log("made it!"+colliders.Length);
	for(var i=0;i<colliders.Length;i++){
		//Debug.Log("hi");
		if(inRange(colliders[i],gameObject.collider)){
			if(colliders[i].CompareTag("world") || colliders[i].CompareTag("Turret")||colliders[i].name=="Graphics"){
			}else{
				//Debug.Log(colliders[i]);
				if(!temp||Vector3.Distance(this.gameObject.transform.position,colliders[i].gameObject.transform.position)<Vector3.Distance(this.gameObject.transform.position,temp.gameObject.transform.position)){
					temp=colliders[i];
				}
			}
		}
	}
	//Debug.Log(temp.name);
	targetObject=temp;
	return temp;
}
private var cnt:int;

function Update () {
	var colliders : Collider[] = Physics.OverlapSphere (gameObject.transform.position, range);
	
	if(cnt>=5){
		other=getClosest(colliders);//Debug.Log(col.gameObject.name);
		cnt=0;
	}else{
		cnt++;
	}
	if(other){
		//Debug.Log(other.gameObject.name);
		if (!animationObject.animation.isPlaying){
			barrelBase.SendMessage("setOn",true,SendMessageOptions.RequireReceiver);
		}
		rotate();
		shoot();
	}else{
		if (!animationObject.animation.isPlaying){
			barrelBase.SendMessage("setOn",false,SendMessageOptions.RequireReceiver);
		}
	}
	

}
function wait(delay:double){
	yield WaitForSeconds(delay);
}
function OnTriggerEnter(other1:Collider){
	if (!isEnabled){
		barrelBase.SendMessage("setOn",true,SendMessageOptions.RequireReceiver);
	}
	isEnabled=true;
	//other=other1;
	
}

function OnTriggerExit(other1:Collider){
	//isEnabled=false;
	//other=other1;
	if(!other){
		barrelBase.SendMessage("setOn",false,SendMessageOptions.RequireReceiver);
	}
}

function rotate(){
/*
	targetAimer.transform.LookAt(other.transform.position);
	targetAimer.transform.Rotate(90,-90,0);
	var target=targetAimer.transform.rotation;
	var curr=Aimer.transform.rotation;
	Debug.Log(target.ToString()+"|"+curr.ToString());
	transform.rotation=Quaternion.Lerp(curr,target,Time.deltaTime*turnSpeed);
	*/
	targetAimer.transform.LookAt(other.transform.position);
	Aimer.transform.rotation=Quaternion.RotateTowards(Aimer.transform.rotation,targetAimer.transform.rotation,turnSpeed*Time.deltaTime);
}

function shoot(){
	if(!lastFire || Time.time>lastFire+fireRate*Time.deltaTime){
		audio.PlayOneShot(fireAudio,1);
		
		
		
		lastFire=Time.time;
		if(currBarrelIndex>=spawn.Length-1){
			currBarrelIndex=0;
		}else{
			currBarrelIndex+=1;
		}
		
		var direction = spawn[currBarrelIndex].TransformDirection(Vector3.right);
		var hit : RaycastHit;
		//Debug.Log(direction.ToString());
		var muz=Instantiate(muzzleFlash,spawn[currBarrelIndex].position,Quaternion.Euler(direction.x,direction.y,direction.z));
		muz.Emit(1);
		GameObject.Destroy(muz.gameObject,muz.duration);
	
	 	if (Physics.Raycast(spawn[currBarrelIndex].transform.position, direction, hit,100))
	 	{
	     	var delay = hit.distance / 1000; // calculate the flight time
	      
	  	 	wait(delay); // wait for the flight time
	      	// then do the actual shooting:
	      	      
	      	if (Physics.Raycast(spawn[currBarrelIndex].transform.position, direction, hit))
	      	{
	      
	      		var clone:ParticleSystem;
	      		clone=GameObject.Instantiate(hitFlash, hit.point,hitFlash.transform.rotation);
		
	     	 	clone.Emit(1);
	      		GameObject.Destroy(clone.gameObject,clone.duration);
	      		
	      	
	  			if(hit.collider.CompareTag("enemy"))
		  		{
		    		Debug.Log("HIT");
		            GameObject.Destroy(hit.collider.gameObject);
		    	}
				if (hit.rigidbody)
				{
					
			 		hit.rigidbody.AddForceAtPosition(bulletForce * direction, hit.point);
				}
	      	}
		}
    }
}