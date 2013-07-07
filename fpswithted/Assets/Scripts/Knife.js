#pragma strict

var sword:Transform;
private var isEnabled:boolean;

private var playerCameraY:MouseLook;
private var playerCameraX:MouseLook;
private var player:Transform;
private var forward:Transform;
private var firstmousepos:Vector3;
private var firstmouseposgotten:boolean=false;
private var lastmousepos:Vector3;
private var lastmouseposgotten:boolean=false;
private var aimpoint:Transform;

private var swingdir:Quaternion;
private var readydir:Quaternion;
private var resetdir:Quaternion;

private var isReady:boolean=false;
private var isSwinging:boolean=false;
private var isReseting:boolean=false;

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
if(isEnabled){

	if(Input.GetKey(KeyCode.LeftControl)){
		
			playerCameraY.enabled=false;
			playerCameraX.enabled=false;
			if(Input.GetMouseButton(1)){
				if(isSwinging){
				}
				else{
					if(!firstmouseposgotten){
						firstmousepos = Input.mousePosition;
						firstmousepos = Camera.main.ScreenToWorldPoint (Vector3 (firstmousepos.x, firstmousepos.y, 3));//3 can be replaced by a depth
						aimpoint.position=firstmousepos;
						Debug.Log("FIRST!");
						aimpoint.localRotation=Quaternion(0,0,0,0);
						readydir = Quaternion.LookRotation(sword.position-aimpoint.position, sword.up);
						firstmouseposgotten=true;
						canReady=true;
					}
				}
			}
			
			if(Input.GetMouseButtonUp(1)){
				if(!isReady){
					resetweapon();
				}
				else{
					if(!lastmouseposgotten&&firstmouseposgotten){
						lastmousepos = Input.mousePosition;
						lastmousepos = Camera.main.ScreenToWorldPoint(Vector3(lastmousepos.x, lastmousepos.y, 3));//3 can be replaced by a depth
						aimpoint.position=lastmousepos;
						aimpoint.localRotation=Quaternion(0,0,0,0);
						swingdir = Quaternion.LookRotation(sword.localPosition-aimpoint.localPosition, sword.up);
						Debug.Log("LAST!");
						lastmouseposgotten=true;
					}
					else{
						resetweapon();
					}
				}
			}
		}
		
		if(Input.GetKeyUp(KeyCode.LeftControl)){
			playerCameraY.enabled=true;
			playerCameraX.enabled=true;
		}
		
		
		
		if(isReseting){
			resetweapon();
		}
		
		if(canReady&&!isSwinging){
			readyweapon();
		}
		
		if((isReady&&canSwing&&lastmouseposgotten)||isSwinging){
			swingweapon();
		}
	}
}


function readyweapon(){
	if(Quaternion.Angle(sword.rotation,readydir)<.5||sword.rotation==readydir){
		Debug.Log("READY!");
		isReady=true;
		canSwing=true;
		return;
	}
	else{
		isReseting=false;
		isSwinging=false;
		
		readydir = Quaternion.LookRotation(aimpoint.position-sword.position, sword.up);
		sword.rotation = Quaternion.Slerp(sword.rotation, readydir, 5*Time.deltaTime);
	}
	
}






function resetweapon(){

	if(Quaternion.Angle(sword.rotation,resetdir)<.5||sword.rotation==resetdir){
		Debug.Log("RESETED!");
		isReseting=false;
		sword.localRotation.z=0;
		
		return;
	}else{
		isReseting=true;
		resetdir = Quaternion.LookRotation(forward.position-sword.position, sword.up);
		sword.rotation = Quaternion.Slerp(sword.rotation, resetdir, 10*Time.deltaTime);
		
		Debug.Log("RESET!");
		isReady=false;
		isSwinging=false;
		canSwing=false;
		firstmouseposgotten=false;
		lastmouseposgotten=false;
		canReady=false;
	}
}



function swingweapon(){	//auctual swing
	if(Quaternion.Angle(sword.rotation,swingdir)<.5||sword.rotation==swingdir){
		Debug.Log("SWOOSH!");
		resetweapon();
		isReseting=true;
		return;
	}
	else{
		Debug.Log("SWING!");
		canReady=false;
		isReseting=false;
		isSwinging=true;
		swingdir = Quaternion.LookRotation(aimpoint.position-sword.position, sword.up);
		sword.rotation = Quaternion.RotateTowards(sword.rotation, swingdir, 500*Time.deltaTime);
	}
}


function setEnabled(enabled:boolean){
	isEnabled=enabled;
}