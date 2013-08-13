#pragma strict
import System.IO;

enum ZoneCat{Mil, Civ};
var zone:ZoneCat;

//var rarity : RarityCat;

//var spawns:GameObject[];

function Start () {
	
	
	
	/*
	var name:String="\0";
	var control:int = 0;
	for(var line in LootTable.lines){
		//var values:String[]=line.Split(","[0]);
		//var randomnumber:float=Mathf.Floor(Random.value*101);
		
		
		
		//var rarity:float=float.Parse(values[2]);
		
		//var values:String[,];
		
		for (var r=0;r<LootTable.lines.length;r++){
				//var temp:String[]=line.Split(","[0]);
  				//values[r][0]=temp[0];
  				//values[r][1]=temp[1];
  				//values[r][2]=temp[2];
		}
		
		//var randomnumber=Mathf.Floor(Random.value*(values.length+1));
		//name = values[randomnumber][1].ToString();
		//var clone:GameObject=GameObject.Instantiate(Resources.Load("prefabs/"+name),transform.position,transform.rotation);
		//clone.name=name;
		
	}
	*/
}
	
function IsMil(){
	if(zone==ZoneCat.Mil){
		Debug.Log("MILITARY");
		return true;
		
	}
	//Debug.Log("MILITARY");
	return false;
}
