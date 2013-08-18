#pragma strict
import System.IO;

enum ZoneCat{Mil, Civ, Food};
var zone:ZoneCat;
	
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