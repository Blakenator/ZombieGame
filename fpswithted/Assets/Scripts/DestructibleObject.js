#pragma strict
var forceRequired:double;
var isRigidbody:boolean;
private var health=100;

function OnCollisionEnter(other:Collision){
	//Debug.Log(other.impactForceSum.magnitude);
	if(other.impactForceSum.magnitude>=forceRequired){
		separate();
	}
}

function separate(){
	var clone:GameObject=Instantiate(gameObject,gameObject.transform.position,gameObject.transform.rotation);
	clone.AddComponent("Rigidbody");
	clone.SendMessage("setIsClone",true,SendMessageOptions.RequireReceiver);
	
	Destroy(gameObject);
}
function setIsClone(val:boolean){
	isRigidbody=val;
}
function addHealth(val:int){
	Debug.Log(health);
	health+=val;
	if(val<0 && health<=0){
		separate();
	}
}