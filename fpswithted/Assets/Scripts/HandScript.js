#pragma strict

private var myTransform:Transform;
private var playert:Transform;
private var isPerforming:boolean=false;
private var playerArms:GameObject;
private var GunSwitch:GunSwitcher;
function Start () {
	GunSwitch=GameObject.Find("GunSwitcher").GetComponent(GunSwitcher);
	myTransform=gameObject.transform;
	playert=GameObject.Find("player").transform;
	playerArms=GameObject.Find("arms");
}

function PerformAction(str:String,shouldLook:boolean,lookAtTransform:Transform){
	GunSwitch.ShowHands(true);
	animateAction(str,shouldLook,lookAtTransform);
	//return true;
}
function getAnimLength(str:String){
	return playerArms.animation[str].length;
}

private function animateAction(str:String,shouldLook:boolean,lookAtTransform:Transform):IEnumerator{
	//var tempy:float=playert.position.y;
	player.CanMove=false;
	player.CanLook=false;
	//playert.position = myTransform.position+myTransform.forward;
	if(shouldLook){
		playert.LookAt(lookAtTransform);
	}
	playerArms.animation[str].normalizedTime=0;
	playerArms.animation[str].speed=1;
	playerArms.animation.Play(str);
	yield WaitForSeconds(playerArms.animation[str].length);
	//Destroy(gameObject);
	player.CanMove=true;
	player.CanLook=true;
}
