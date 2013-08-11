#pragma strict
private var Enabled:boolean;
private var stats:StatsController;
var thirstValue:float=10;
function Start () {
	stats=GameObject.Find("_StatsCounter").GetComponent(StatsController);
}
function Update () {
	if(Enabled){
		if(Input.GetButton("Fire1")){
			Drink();
		}
	}
}
function setEnabled(val:boolean){
	Enabled=val;
}
function Drink(){//add animation/sounds
	stats.updateThirst(thirstValue);
	//yield WaitForSeconds(2);
	Destroy(gameObject,2);
}
