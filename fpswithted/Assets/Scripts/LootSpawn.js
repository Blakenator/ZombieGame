#pragma strict
//import System.IO;

/*categorys in the loot table should be lower case and must be one in the enum
Categorys can be added at will so long as they are added to the enum the order MUST stay the same
add all new categorys to the end otherwise all of the spawn point will be broken!
*/
enum ZoneCat{Mil, Civ, Food, Med};	
var zone:ZoneCat;


/*
function IsMil(){
	if(zone==ZoneCat.Mil){
		return true;
	}
	return false;
}

function IsCiv(){
	if(zone==ZoneCat.Civ){
		return true;
	}
	return false;
}

function IsFood(){
	if(zone==ZoneCat.Food){
		return true;
	}
	return false;
}
*/

function IsCategory(str:String){
	var temp=zone.ToString();
	temp=temp.ToLower();
	//Debug.Log(temp+" "+str);
	
	if(temp.Equals(str)){
		return true;
	}
	return false;
}