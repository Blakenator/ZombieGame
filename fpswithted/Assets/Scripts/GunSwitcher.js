#pragma strict
var currentGunIndex:int;
var startingInventory:GameObject[];
private var inventoryArray:Array;
private var last:int;

function Start () {
	inventoryArray=startingInventory.Clone();
	allButCurrent();
}
function getCurrGunIndex(){
	return currentGunIndex;
}
function allButCurrent(){
	for(var gun:GameObject in inventoryArray){
		gun.renderer.enabled=false;
		gun.SendMessage("setEnabled",false,SendMessageOptions.RequireReceiver);
		setChildrenVisible(gun,false);
	}
	var tmp:GameObject=inventoryArray[currentGunIndex];
	setChildrenVisible(tmp,true);
	tmp.renderer.enabled=true;
	tmp.SendMessage("setEnabled",true,SendMessageOptions.RequireReceiver);
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


function dropCurrent(){
	Debug.Log(inventoryArray.length-1);
	var tmp:GameObject=inventoryArray[currentGunIndex];
	var clone:GameObject=Instantiate(tmp,tmp.transform.position,tmp.transform.rotation);
	if(!tmp.rigidbody){
		//inventoryArray[currentGunIndex].AddComponent("Rigidbody");
		clone.AddComponent("Rigidbody");
		
	}
	clone.rigidbody.isKinematic=false;
	clone.rigidbody.AddForce(Vector3.forward*5);
	
	//inventoryArray.Remove(currentGunIndex);
	
	clone.gameObject.GetComponent(weaponBase).setEnabled(false);
	clone.name=tmp.gameObject.name;
	Destroy(inventoryArray[currentGunIndex]);
	
	inventoryArray.RemoveAt(currentGunIndex);
	
	
	Debug.Log(inventoryArray.length-1);
}

function addObject(obj:GameObject){
	inventoryArray.push(obj);
}
function FixedUpdate () {
	if(!last==currentGunIndex){
		allButCurrent();
	}	
}

function switchUp(){
	if(currentGunIndex>=inventoryArray.length-1){
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
		currentGunIndex=inventoryArray.length-1;
		allButCurrent();
		Debug.Log("switchdown");
	}else{
		currentGunIndex-=1;
		allButCurrent();
	}
}

function GetInventory(){
	return startingInventory;
}