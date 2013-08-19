#pragma strict

var gunSwitch:GunSwitcher;

private var wscript:weaponBase;

function Start () {

}
function Update(){
	if(Input.GetKeyDown("-")){
		gunSwitch.ClearInventory();
		load();
	}
}

function load () {

	var reader=new System.IO.StreamReader(Application.dataPath+"/WeaponsSave.txt");
	var lines=reader.ReadToEnd().Split("\n"[0]);
	
	for(var line in lines){
		if(line.Contains(",")){
			var temp:String[]=line.Split(","[0]);
			
			var clone:GameObject;
			
			var type:String=temp[0].ToString();
			
			var name:String;
			
			if(type.Equals("w")){
				
				
				name=temp[1].ToString();
				
				
				clone=GameObject.Instantiate(Resources.Load("prefabs/"+name),Vector3.zero,Quaternion(0,0,0,0));
				clone.name=name;
				wscript=clone.GetComponent(weaponBase);
				
				
				var currAmmo:int=int.Parse(temp[2]);
				
				var currClips:float=float.Parse(temp[3]);
				clone.GetComponent(weaponBase).setCurrAmmo(currAmmo);
				AmmoCounter.setClips(name,currClips);
				clone.SendMessage("OnPickup",SendMessageOptions.RequireReceiver);
			}else if(type.Equals("i")){
				//var name:String=temp[1].ToString();
				name=temp[1].ToString();
				clone=GameObject.Instantiate(Resources.Load("prefabs/"+name),Vector3.zero,Quaternion(0,0,0,0));
				
				clone.name=name;
				
				clone.SendMessage("OnPickup",SendMessageOptions.RequireReceiver);
				
			}else if(type.Equals("l")){
				name=temp[1].ToString();
				clone=GameObject.Instantiate(Resources.Load("prefabs/"+name),Vector3.zero,Quaternion(0,0,0,0));
				clone.name=name;
				
				name=temp[1].ToString();
				
				var x:float=float.Parse(temp[2]);
				var y:float=float.Parse(temp[3]);
				var z:float=float.Parse(temp[4]);
				
				clone.transform.position=Vector3(x,y,z);
				gameObject.tag="LootPickup";
			}
		}
	}
	reader.Close();
}