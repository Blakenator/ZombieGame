#pragma strict
private var Enabled:boolean;
private var stats:StatsController;
var foodValue:float=10;
function Start () {
	stats=GameObject.Find("_StatsCounter").GetComponent(StatsController);
}
function Update () {
	if(Enabled){
		if(Input.GetButton("Fire1")){
			Eat();
		}
	}
}
function setEnabled(val:boolean){
	Enabled=val;
}
function Eat(){//add animation/sounds
	stats.updateHunger(foodValue);
	//yield WaitForSeconds(2);
	Destroy(gameObject,2);
}
