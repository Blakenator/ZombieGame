#pragma strict

private static var clipArray = new Hashtable();

var gunSwitch:GunSwitcher;

function Awake () {
	gunSwitch=GameObject.Find("GunSwitcher").GetComponent(GunSwitcher);
	var gunArr:GameObject[]=gunSwitch.GetStartingInventory();
	
	for(var I in gunArr){
	var script = I.GetComponent(weaponBase);
		if (script != null){
			clipArray[I.gameObject.name]=1;
			//Debug.Log(I.gameObject.name);
		}
	}
	Debug.Log("done2!");
}

static function getClips(str:String){
	var wepclips:int=clipArray[str];
	return wepclips;
}

static function addClips(str:String,num:int){
	var temp:int=clipArray[str];
	temp+=num;
	
	clipArray[str]=temp;
	
}
