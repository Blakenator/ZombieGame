#pragma strict
private var myTransform:Transform;
private var playert:Transform;
private var isPerforming:boolean=false;
private var playerArms:GameObject;
private var handScr:HandScript;
function Start () {
	myTransform=transform;
	playert=GameObject.Find("player").transform;
	playerArms=GameObject.Find("arms");
	handScr=GameObject.Find("arms").GetComponent("HandScript");
	Debug.Log(handScr);
	Debug.Log(playert);
}

function Use(){
	isPerforming=!isPerforming;
	if(isPerforming){
		StartCoroutine("BreakWindow");
		
		player.CanMove=false;
		player.CanLook=false;
	}else{
		StopCoroutine("BreakWindow");
		
		playerArms.animation.Stop("Test");
		playerArms.animation["Test"].normalizedTime=0;
		player.CanMove=true;
		player.CanLook=true;
	}
}
function BreakWindow(){
	var heading = playert.position - myTransform.position;
	var dot:float = Vector3.Dot(heading, myTransform.forward);
	var tempy:float=playert.position.y;
	if (dot > 0){ // if wrong side, use dot < 0
		//Debug.Log("Front");
		//var tempy:float=playert.position.y;
		playert.position = myTransform.position+myTransform.forward;
		handScr.PerformAction("Test",true,myTransform);
		//playert.position.y=tempy;
		/*
  		playert.LookAt(myTransform);
  		playerArms.animation["Test"].normalizedTime=0;
		playerArms.animation["Test"].speed=1;
		playerArms.animation.Play("Test");
		yield WaitForSeconds(playerArms.animation["Test"].length);
		Destroy(gameObject);
		player.CanMove=true;
		player.CanLook=true;
		*/
	}else {
		//Debug.Log("Back");
  		playert.position = myTransform.position-myTransform.forward;
		//playert.LookAt(myTransform);
		handScr.PerformAction("Test",true,myTransform);
		yield WaitForSeconds(handScr.getAnimLength("Test"));
		Destroy(gameObject);
		/*
  		playerArms.animation["Test"].normalizedTime=0;
		playerArms.animation["Test"].speed=1;
		playerArms.animation.Play("Test");
		yield WaitForSeconds(playerArms.animation["Test"].length);
		Destroy(gameObject);
		player.CanMove=true;
		player.CanLook=true;
		*/
	}
}