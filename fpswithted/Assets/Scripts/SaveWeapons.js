#pragma strict
var gunSwitch:GunSwitcher;
private var wscript:weaponBase;
var player:Transform;
var fileName:String;
function Start(){
	fileName = Application.dataPath+"/WeaponsSave.txt";
	
	if (File.Exists(fileName)){
        Debug.Log(fileName+" already exists.");
    }
}

function Save(){
	gameObject.tag="Untagged";
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
	
	sw.WriteLine("p"+","+player.position.x+","+player.position.y+","+player.position.z);
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
			sw.WriteLine ("i"+","+name);//+","+temp.transform.position.x+","+temp.transform.position.y+","+temp.transform.position.z);
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
		
		wscript = temp.gameObject.GetComponent(weaponBase);
		var name:String=temp.gameObject.ToString();
		name = RemoveExtra(name);
		
		if(wscript!=null){
			var ammo:String=wscript.getCurrAmmo().ToString();
			sw.WriteLine ("l"+","+name+","+ammo.ToString()+","+temp.transform.position.x+","+temp.transform.position.y+","+temp.transform.position.z);
		}else{
			sw.WriteLine ("l"+","+name+","+temp.transform.position.x+","+temp.transform.position.y+","+temp.transform.position.z);
		}
		
		//var ammo:String=wscript.getCurrAmmo().ToString();
		//sw.WriteLine ("l"+","+name+","+ammo.ToString()+","+temp.transform.position.x+","+temp.transform.position.y+","+temp.transform.position.z);
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