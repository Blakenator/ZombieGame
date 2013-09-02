#pragma strict

var gunSwitch:GunSwitcher;

private var wscript:weaponBase;
var player:Transform;
function Start () {

}
/*
function Update(){
	if(Input.GetKeyDown("-")){
		gunSwitch.ClearInventory();
		load();
	}
}
*/
function load () {
	gameObject.tag="Untagged";
	gunSwitch.ClearInventory();
	var lootarr:Array=GameObject.FindGameObjectsWithTag("LootPickup");
	for(var i in lootarr){
		Destroy(i);
	}
	var cararr:Array=GameObject.FindGameObjectsWithTag("LootPickup");
	for(var c in cararr){
		Destroy(c);
	}
	
	var reader=new System.IO.StreamReader(Application.dataPath+"/WeaponsSave.txt");
	var lines=reader.ReadToEnd().Split("\n"[0]);
	
	for(var line in lines){
		if(line.Contains(",")){
			var temp:String[]=line.Split(","[0]);
			
			var clone:GameObject;
			
			var type:String=temp[0].ToString();
			
			var name:String;
			
			if(type.Equals("p")){
				var x1:float=float.Parse(temp[1]);
				var y1:float=float.Parse(temp[2]);
				var z1:float=float.Parse(temp[3]);
				player.position=Vector3(x1,y1,z1);
				
			}
			
			
			if(type.Equals("w")){
				name=temp[1].ToString();
				name=TrimAll(name);
				
				clone=GameObject.Instantiate(Resources.Load("Prefabs/"+name),Vector3.zero,Quaternion(0,0,0,0));
				clone.name=name;
				wscript=clone.GetComponent(weaponBase);
				
				
				var currAmmo:int=int.Parse(temp[2]);
				
				var currClips:int=int.Parse(temp[3]);
				clone.GetComponent(weaponBase).setCurrAmmo(currAmmo);
				AmmoCounter.setClips(name,currClips);
				clone.SendMessage("OnPickup",SendMessageOptions.RequireReceiver);
			}else if(type.Equals("i")){
				name=temp[1].ToString();
				name=TrimAll(name);
				
				
				
				clone=GameObject.Instantiate(Resources.Load("Prefabs/"+name));
				
				
				clone.name=name;
				clone.SendMessage("OnPickup",SendMessageOptions.RequireReceiver);
				
				
			}else if(type.Equals("l")){
				name=temp[1].ToString();
				name=TrimAll(name);
				
				clone=GameObject.Instantiate(Resources.Load("Prefabs/"+name),Vector3.zero,Quaternion(0,0,0,0));
				clone.name=name;
				
				wscript=clone.GetComponent(weaponBase);
				
				name=temp[1].ToString();
				
				if(wscript!=null){
					var ammo:int=int.Parse(temp[2]);
					var x:float=float.Parse(temp[3]);
					var y:float=float.Parse(temp[4]);
					var z:float=float.Parse(temp[5]);
					
					clone.GetComponent(weaponBase).setCurrAmmo(ammo);
					clone.transform.position=Vector3(x,y,z);
					gameObject.tag="LootPickup";
				}else{
					var x2:float=float.Parse(temp[2]);
					var y2:float=float.Parse(temp[3]);
					var z2:float=float.Parse(temp[4]);
					clone.transform.position=Vector3(x2,y2,z2);
					gameObject.tag="LootPickup";
				}
			}else if(type.Equals("D")){
				var DoorArr:Array=GameObject.FindGameObjectsWithTag("Door");
				var idtest:int=int.Parse(temp[1]);
				var state:boolean=boolean.Parse(temp[2]);
				
				for(var I in DoorArr){
					var tempobj:GameObject=I;
					//var door:Door = tempobj.gameObject.GetComponent(Door);
					var ID:int=tempobj.gameObject.GetInstanceID();
					if(ID==idtest){
						if(state){
							//door.ForceClose();
							tempobj.SendMessage("ForceClose",SendMessageOptions.DontRequireReceiver);
						}else{
							//door.ForceOpen();
							tempobj.SendMessage("ForceOpen",SendMessageOptions.DontRequireReceiver);
						}
					}
				}
				
				var drawerarr:Array=GameObject.FindGameObjectsWithTag("Drawer");
				
				for(var I in drawerarr){
					tempobj=I;
					//var door:Door = tempobj.gameObject.GetComponent(Door);
					ID=tempobj.gameObject.GetInstanceID();
					if(ID==idtest){
						if(state){
							//door.ForceClose();
							tempobj.SendMessage("ForceClose",SendMessageOptions.DontRequireReceiver);
						}else{
							//door.ForceOpen();
							tempobj.SendMessage("ForceOpen",SendMessageOptions.DontRequireReceiver);
						}
					}
				}
			}else if(type.Equals("C")){
				var pos:Vector3=Vector3(float.Parse(temp[3]),float.Parse(temp[4]),float.Parse(temp[5]));
				var rot=Quaternion.Euler(float.Parse(temp[6]),float.Parse(temp[7]),float.Parse(temp[8]));
				name=temp[1].ToString();
				name=TrimAll(name);
				
				clone=GameObject.Instantiate(Resources.Load("Prefabs/"+name),pos,rot);
				
				
			}
		}
	}
	reader.Close();
}
function TrimAll(name:String){
	name=name.TrimStart();
	name=name.TrimEnd();
	return name;
}