#pragma strict
var gunSwitch:GunSwitcher;
private var myArray = new Hashtable();
private var modName:String;
function Awake () {
	var gunArr:GameObject[]=gunSwitch.GetInventory();
	
	for(var I in gunArr){
		myArray[I.gameObject.name]=I.transform;
		Debug.LogWarning(I.gameObject.name);
	}
	
	Debug.Log("done!");
	
	//Debug.Log(myArray["EBR"]);
	//var test:Transform=myArray["G36C"];
	//Debug.Log(test.localPosition);
	//Debug.Log(myArray["G36C"]);
	//myArray.Remove("abc");
}

function split(str:String){
	Debug.Log("Found!");
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
	
	
	
	var wepPos:Transform=myArray[modName];
	//Debug.Log(myArray[modName]);
	//Debug.Log(modName);
	return wepPos.localPosition;
}

function getWepRot(str:String){
	var wepPos:Transform=myArray[modName];
	return wepPos.localRotation;
}