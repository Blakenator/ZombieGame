#pragma strict
private var isInTrigger:boolean=false;
private var playert:Transform;
private var playerheight:float;
var speed:float=10;
function Start () {
	playerheight=GameObject.Find("Graphics").collider.bounds.size.y;
}
function Update () {
	if(isInTrigger){
		playert.position.y+=(Input.GetAxis("Vertical")*speed)*Time.deltaTime;
		if(playert.position.y>=collider.bounds.size.y){		//+playerheight/6>=collider.bounds.size.y){
			playert.position+=playert.forward*Time.deltaTime;
		}
	}
}
function OnTriggerEnter (other : Collider){
	if(other.gameObject.CompareTag("Player")){
		isInTrigger=true;
		playert=other.gameObject.transform;
		playert.GetComponent(player).toggleGravity(false);
	}
}
function OnTriggerExit(other : Collider){
	if(other.gameObject.CompareTag("Player")){
		isInTrigger=false;
		yield WaitForSeconds(.25);
		playert.GetComponent(player).toggleGravity(true);
	}
}