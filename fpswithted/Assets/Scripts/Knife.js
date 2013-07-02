#pragma strict

var playerCameraY:MouseLook;
var playerCameraX:MouseLook;

private var zAngle:Vector3;
private var yAngle:Vector3;
private var player:Transform;
var sword:Transform;
private var forward:Transform;

function Start () {
	playerCameraY= GameObject.Find("Main Camera").GetComponent(MouseLook);
	playerCameraX= GameObject.Find("player").GetComponent(MouseLook);
	player=GameObject.Find("player").transform;
	forward=GameObject.Find("Forward").transform;
}

function Update () {
	if(Input.GetKey(KeyCode.LeftControl)){
		
		var mousePos = Input.mousePosition;
		var wantedPos = Camera.main.ScreenToWorldPoint (Vector3 (mousePos.x, mousePos.y, 3));//3 can be replaced by a depth
		
		transform.position=wantedPos;
		
		//sword.LookAt(wantedPos,sword.transform.up);
		
		var newRotation = Quaternion.LookRotation(wantedPos-sword.position, sword.up); 
		
		//newRotation.x = 0.0; 
		//newRotation.y = 0.0; 
		sword.rotation = Quaternion.Slerp(sword.rotation, newRotation, 10000*Time.deltaTime);
		
		
		playerCameraY.enabled=false;
		playerCameraX.enabled=false;
	}
	else{
		playerCameraY.enabled=true;
		playerCameraX.enabled=true;
		
		newRotation = Quaternion.LookRotation(forward.position-sword.position, sword.up); 
		sword.rotation = Quaternion.Slerp(sword.rotation, newRotation, 10*Time.deltaTime);
		
		//sword.transform.localRotation.x=0;
		//sword.transform.localRotation.z=0;
		
		
		//sword.localRotation.y=0;
	}
}