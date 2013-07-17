#pragma strict
var currentGunIndex:int;
var inventory:GameObject[];


function Start () {

}
function getCurrGunIndex(){
	return currentGunIndex;
}
function allButCurrent(){
	for(gun in inventory){
			setChildrenVisible(gun,false);
			gun.renderer.enabled=false;
			gun.SendMessage("setEnabled",false,SendMessageOptions.RequireReceiver);
		}
		setChildrenVisible(inventory[currentGunIndex],true);
		inventory[currentGunIndex].renderer.enabled=true;
		inventory[currentGunIndex].SendMessage("setEnabled",true,SendMessageOptions.RequireReceiver);
}
function setChildrenVisible(obj:GameObject,val:boolean){
	var allchildren=obj.transform.GetComponentsInChildren(Transform);
	for(child in allchildren){
		try{
			child.gameObject.renderer.enabled=val;
			child.collider.isTrigger=!val;
		}
		catch(err){
		
		};
	}
}

function Update () {
	allButCurrent();	
}

function switchUp(){
	if(currentGunIndex>=inventory.Length-1){
		currentGunIndex=0;
		allButCurrent();
		Debug.Log("switchup");
	}else{
		currentGunIndex+=1;
		allButCurrent();
	}
}

function switchDown(){
	if(currentGunIndex<=0){
		currentGunIndex=inventory.Length-1;
		allButCurrent();
		Debug.Log("switchdown");
	}else{
		currentGunIndex-=1;
		allButCurrent();
	}
}