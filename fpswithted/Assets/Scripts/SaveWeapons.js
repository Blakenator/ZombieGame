#pragma strict
//private static var WeaponArray = new Hashtable();
var gunSwitch:GunSwitcher;
private var wscript:weaponBase;

var fileName:String;
function Start(){
	fileName = Application.dataPath+"/WeaponsSave.txt";
	
	if (File.Exists(fileName)){
        Debug.Log(fileName+" already exists.");
    }
    
    //var sw : StreamWriter = new StreamWriter(fileName,false);
    
	//sw.Write("");
	//sw.WriteLine ("Weapons");
    //sw.Close();
}


function Update () {
	if(Input.GetKeyDown("0")){
		
		Save();
	}
}
function Save(){
	var sw : StreamWriter = new StreamWriter(fileName,false);
	sw.Write("");
	sw.Close();
	
	yield StartCoroutine(SaveWeapons());
	yield StartCoroutine(SaveItems());
	
}

function SaveWeapons(){
	yield;
	
	gunSwitch=GameObject.Find("GunSwitcher").GetComponent(GunSwitcher);
	var gunArr:Array=gunSwitch.GetInventory();
	var sw : StreamWriter = new StreamWriter(fileName,true);//false means it will overwrite ALL data! true is append to end!
	//sw.Flush();
	sw.WriteLine ("Weapons");
	for(var I in gunArr){
		var temp:GameObject=I;
		wscript = temp.gameObject.GetComponent(weaponBase);
		var fscript:FoodItem=temp.gameObject.GetComponent(FoodItem);
		var waScript:WaterItem=temp.gameObject.GetComponent(WaterItem);
		
		if (wscript != null){
			var name:String=temp.gameObject.ToString();
			name = RemoveExtra(name);
			//name=name.ToString();
			var ammo:String=wscript.getCurrAmmo().ToString();
			sw.WriteLine ("w"+","+name+","+ammo.ToString()+","+AmmoCounter.getClips(name));
		}else if(fscript != null||waScript != null){
			name=temp.gameObject.ToString();
			name = RemoveExtra(name);
			
			//var val:String=fscript.getVal().ToString();
			sw.WriteLine ("i"+","+name+","+temp.transform.position.x+","+temp.transform.position.y+","+temp.transform.position.z);
		}
	}
	Debug.Log("FINISHED1!");
	sw.Close();
}

function SaveItems(){
	yield;
	
	var sw : StreamWriter = new StreamWriter(fileName,true);
	
	sw.WriteLine ("Loot");
	var lootarr:Array=GameObject.FindGameObjectsWithTag("LootPickup");
	Debug.Log(lootarr.length);
	for(var I in lootarr){
		var temp:GameObject=I;
		var name:String=temp.gameObject.ToString();
		name = RemoveExtra(name);
		
		sw.WriteLine ("l"+","+name+","+temp.transform.position.x+","+temp.transform.position.y+","+temp.transform.position.z);
	}
	
	Debug.Log("FINISHED 2!");
	sw.Close();
}

function RemoveExtra(name:String){


	if(name.Contains(" (UnityEngine.GameObject)")){
		//Debug.Log(name);
		name=name.Substring(0,name.IndexOf(" (UnityEngine.GameObject)"));
		//Debug.Log(name);
	}
	return name;
}