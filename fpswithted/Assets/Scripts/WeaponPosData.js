#pragma strict
var gunSwitch:GunSwitcher;
private var myArray = new Hashtable();

function Start () {
	var gunArr:GameObject[]=gunSwitch.GetInventory();
	
	for(var I in gunArr){
		myArray[I.gameObject.name]=I.transform;
	}
	
	
	//Debug.Log(myArray["EBR"]);
	
	//var test:Transform=myArray["G36C"];
	
	//Debug.Log(test.localPosition);
	
	
	//Debug.Log(myArray["G36C"]);
	
	//myArray.Remove("abc");
}

function getWepPos(str:String){
	var wepPos:Transform=myArray[str];
	return wepPos.localPosition;
}
function getWepRot(str:String){
	var wepPos:Transform=myArray[str];
	return wepPos.localRotation;
}