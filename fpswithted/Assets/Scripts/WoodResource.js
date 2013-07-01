#pragma strict
var isRigidbody:boolean;
var resourceManager:GameObject;
var woodValue:double;
var pickupRange:double;
var player:GameObject;

function separate(){
	var clone:GameObject=Instantiate(gameObject,gameObject.transform.position,gameObject.transform.rotation);
	clone.AddComponent("Rigidbody");
	clone.SendMessage("setIsClone",true,SendMessageOptions.RequireReceiver);
	Destroy(gameObject);
}

function Update(){
	
	if(Vector3.Distance(transform.position,player.transform.position)<=pickupRange && isRigidbody){
		Debug.Log(transform.parent+"|"+transform.childCount);
		if(!transform.parent && transform.GetChildCount()==0){
			resourceManager.SendMessage("addWood",woodValue,SendMessageOptions.RequireReceiver);
			Destroy(gameObject);
		}
	}
}
function setIsClone(val:boolean){
	isRigidbody=val;
	Debug.Log("true");
}