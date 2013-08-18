#pragma strict

var currentGunIndex:int;
var startingInventory:GameObject[];
private var inventoryArray:Array;
private var last:int;
var hands:GameObject;

function Awake () {
	inventoryArray=startingInventory.Clone();
	allButCurrent();
	
}
function getCurrGunIndex(){
	return currentGunIndex;
}


function allButCurrent(){
	if(inventoryArray.length>0){
		hands.active=false;
		for(var gun:GameObject in inventoryArray){
			gun.renderer.enabled=false;
			if(gun.collider){
				gun.collider.enabled=false;
			}
			gun.SendMessage("setEnabled",false,SendMessageOptions.RequireReceiver);
			setChildrenVisible(gun,false);
		}
		var tmp:GameObject=inventoryArray[currentGunIndex];
		setChildrenVisible(tmp,true);
		tmp.renderer.enabled=true;
		tmp.SendMessage("setEnabled",true,SendMessageOptions.RequireReceiver);
	}else{
		hands.active=true;
	}
}
function setChildrenVisible(obj:GameObject,val:boolean){
	var allchildren=obj.transform.GetComponentsInChildren(Transform);
	for(child in allchildren){
		try{
			child.gameObject.renderer.enabled=val;
			//child.collider.active=val;
			child.collider.enabled=val;
		}
		catch(err){
		
		};
	}
}
function dropIndex(index:int){
	var tmp:GameObject=inventoryArray[index];
	var tmp2:GameObject=inventoryArray[inventoryArray.length-1];
	inventoryArray[index]=tmp2;
	inventoryArray[inventoryArray.length-1]=tmp;
	var clone:GameObject=Instantiate(tmp,tmp.transform.position,tmp.transform.rotation);
	if(!tmp.rigidbody){
		clone.AddComponent("Rigidbody");
	}
	inventoryArray.pop();
}


function dropCurrent(){	//returns clone
	if(inventoryArray.length==0){
		return;
	}
	Debug.Log(inventoryArray.length-1);
	var tmp:GameObject=inventoryArray[currentGunIndex];
	var clone:GameObject=Instantiate(tmp,tmp.transform.position,tmp.transform.rotation);
	if(!tmp.rigidbody){
		//inventoryArray[currentGunIndex].AddComponent("Rigidbody");
		clone.AddComponent("Rigidbody");
		
	}
	if(!tmp.collider){
		//inventoryArray[currentGunIndex].AddComponent("Rigidbody");
		//clone.AddComponent("BoxCollider");
		clone.AddComponent("MeshCollider");
		var temp:MeshCollider=clone.GetComponent(MeshCollider);
		try{
			temp.convex=true;
		}catch(err){
			
		}
	}
	clone.rigidbody.isKinematic=false;
	clone.gameObject.collider.enabled=true;
	
	clone.rigidbody.AddForce(clone.transform.forward*20);
	
	clone.SendMessage("setEnabled",false,SendMessageOptions.RequireReceiver);
	if(!tmp.GetComponent("PickUp")){
		clone.AddComponent("PickUp");
	}
	
	clone.tag="Pickup";
	
	
	clone.name=tmp.gameObject.name;
	
	Destroy(inventoryArray[currentGunIndex]);
	inventoryArray.RemoveAt(currentGunIndex);
	switchUp();
	
	return clone;
	//Debug.Log(inventoryArray.length-1);
}

function addObject(obj:GameObject){
	inventoryArray.push(obj);
	switchUp();
}
function FixedUpdate () {
	if(!last==currentGunIndex){
		allButCurrent();
	}
	if(Time.timeScale==0){
		for(var gun:GameObject in inventoryArray){
			gun.SendMessage("setEnabled",false,SendMessageOptions.RequireReceiver);
		}
	}	
}

function switchUp(){
	if(Time.timeScale>0){
		if(currentGunIndex>=inventoryArray.length-1){
			currentGunIndex=0;
			allButCurrent();
			Debug.Log("switchup");
		}else{
			currentGunIndex+=1;
			allButCurrent();
		}
	}
}
function ClearInventory(){
	for(var lcv=0;lcv<inventoryArray.length;lcv++){
		Destroy(inventoryArray[lcv]);
	}
	
	inventoryArray.clear();
}

function switchDown(){
	if(Time.timeScale>0){
		if(currentGunIndex<=0){
			currentGunIndex=inventoryArray.length-1;
			allButCurrent();
			Debug.Log("switchdown");
		}else{
			currentGunIndex-=1;
			allButCurrent();
		}
	}
}

function GetInventory(){
	return inventoryArray;
}
function GetStartingInventory(){
	return startingInventory;
}
function setCurrentIndex(val:int){
	currentGunIndex=val;
	allButCurrent();
}