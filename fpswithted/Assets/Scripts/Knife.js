#pragma strict


private var playerCameraY:MouseLook;
private var playerCameraX:MouseLook;


private var player:Transform;
var sword:Transform;

private var forward:Transform;
private var firstmousepos:Vector3;
private var firstmouseposgotten:boolean=false;

private var lastmousepos:Vector3;
private var lastmouseposgotten:boolean=false;
private var aimpoint:Transform;
private var swingdir:Quaternion;
private var readydir:Quaternion;
private var isReady:boolean=false;
private var isSwinging:boolean=false;
var canSwing:boolean=false;
var canReady:boolean=false;
function Start () {
	playerCameraY= GameObject.Find("Main Camera").GetComponent(MouseLook);
	playerCameraX= GameObject.Find("player").GetComponent(MouseLook);
	player=GameObject.Find("player").transform;
	forward=GameObject.Find("Forward").transform;
	aimpoint=GameObject.Find("pointToAim").transform;
}

function Update () {

	if(Input.GetMouseButton(1)){
		if(isSwinging){
			return;
		}
		
		
		if(!firstmouseposgotten){
			firstmousepos = Input.mousePosition;
			firstmousepos = Camera.main.ScreenToWorldPoint (Vector3 (firstmousepos.x, firstmousepos.y, 3));//3 can be replaced by a depth
			aimpoint.position=firstmousepos;
			//Debug.Log("FIRST!");
			aimpoint.localRotation=Quaternion(0,0,0,0);
			readydir = Quaternion.LookRotation(sword.position-aimpoint.position, sword.up);
			firstmouseposgotten=true;
			playerCameraY.enabled=false;
			playerCameraX.enabled=false;
			canReady=true;
		}
	}
	
	if(Input.GetMouseButtonUp(1)){
		if(!isReady){
			resetweapon();
		}
		
		if(!lastmouseposgotten){
			lastmousepos = Input.mousePosition;
			lastmousepos = Camera.main.ScreenToWorldPoint(Vector3(lastmousepos.x, lastmousepos.y, 3));//3 can be replaced by a depth
			aimpoint.position=lastmousepos;
			aimpoint.localRotation=Quaternion(0,0,0,0);
			swingdir = Quaternion.LookRotation(sword.localPosition-aimpoint.localPosition, sword.up);
			
			//Debug.Log("LAST!");
			lastmouseposgotten=true;
			playerCameraY.enabled=true;
			playerCameraX.enabled=true;
			canSwing=true;
		}
	}
	
	
	
	
	if(sword.rotation==swingdir){
		//Debug.Log("equal directions world!"+swingdir*sword.rotation);
		//Debug.Log(Quaternion.Angle(sword.rotation,swingdir));
	}
	
	
	if(canReady&&!isSwinging){
		readyweapon();
	}
		
	if(canSwing&&isReady){
		isReady=false;
		swingweapon();
	}
	
	if(!canSwing&&!canReady)
	{
		resetweapon();
	}
}


function readyweapon(){ //first stage
	if(Quaternion.Angle(sword.rotation,readydir)<.5||sword.rotation==readydir){
		Debug.Log("READY!");
		isReady=true;
		return;
	}
	//Debug.Log(readydir);
	isSwinging=false;
	readydir = Quaternion.LookRotation(aimpoint.position-sword.position, sword.up);
	sword.rotation = Quaternion.Slerp(sword.rotation, readydir, 10*Time.deltaTime);
	
}






function resetweapon(){
	var resetRotation = Quaternion.LookRotation(forward.position-sword.position, sword.up);
	sword.rotation = Quaternion.Slerp(sword.rotation, resetRotation, 10*Time.deltaTime);
	Debug.Log("RESET!");
	//firstmouseposgotten=false;
	lastmouseposgotten=false;
	isReady=false;
	isSwinging=false;
	canSwing=false;
	firstmouseposgotten=false;
	lastmouseposgotten=false;
}







function swingweapon(){	//auctual swing
	if(Quaternion.Angle(sword.rotation,swingdir)<.5){
		Debug.Log("SWOOSH!");
		resetweapon();
		return;
	}
	Debug.Log("SWING!");
	isReady=true;
	isSwinging=true;
	swingdir = Quaternion.LookRotation(aimpoint.position-sword.position, sword.up);
	sword.rotation = Quaternion.RotateTowards(sword.rotation, swingdir, 100*Time.deltaTime);
}