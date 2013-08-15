#pragma strict
enum Weapon{EBR, G36C, FAMAS};
var wep : Weapon;
var AmmoVal:int;

function OnPickup(){
	Debug.Log(wep.ToString());
	AmmoCounter.addClips(wep.ToString(),AmmoVal);
	Destroy(gameObject);
}
function getVal(){
	return AmmoVal;
}