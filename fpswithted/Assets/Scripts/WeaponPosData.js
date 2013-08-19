#pragma strict

var gunSwitch:GunSwitcher;
private var posArray = new Hashtable();
private var rotArray = new Hashtable();
private var modName:String;
function Awake () {
	var gunArr:GameObject[]=gunSwitch.GetStartingInventory();
	
	for(var I in gunArr){
		posArray[I.gameObject.name]=I.transform.localPosition;
		rotArray[I.gameObject.name]=I.transform.localEulerAngles;
		//Debug.LogWarning(I.gameObject.name);
	}
	
	//Debug.Log("done!");
	
	//Debug.Log(myArray["EBR"]);
	//var test:Transform=myArray["G36C"];
	//Debug.Log(test.localPosition);
	//Debug.Log(myArray["G36C"]);
	//myArray.Remove("abc");
}

function split(str:String){
	//Debug.Log("Found!");
	var start:int=str.IndexOf("(Clone)");
	modName=str.Substring(0,start);
	
	Debug.Log(modName);
}

function getWepPos(str:String){
	
	//var str2:String=str;
	modName=str;
	if(modName.Contains("(Clone)")){
		split(modName);
	}
	
	var wepPos:Vector3=posArray[modName];
	
	Debug.Log(wepPos);
	
	//Debug.Log(myArray[modName]);
	//Debug.Log(modName);
	
	return wepPos;
}

function getWepRot(str:String){
	var wepRot:Vector3=rotArray[modName];
	return wepRot;
}