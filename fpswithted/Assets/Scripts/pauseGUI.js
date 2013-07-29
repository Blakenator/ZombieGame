#pragma strict
var gameState:String;
var player:Transform;
var MainCamera:MouseLook;

function Start () {
	gameState="running";
}

function Update(){
	if(Input.GetKeyDown("p")){
		if(gameState=="running"){
			Time.timeScale=0;
			gameState="paused";
			var tmp:MouseLook=player.GetComponent("MouseLook");
			tmp.isPaused=true;
			MainCamera.isPaused=true;
		}else{
			gameState="running";
			Time.timeScale=1;
			var temp:MouseLook=player.GetComponent("MouseLook");
			temp.isPaused=false;
			MainCamera.isPaused=false;
		}
		
	}
}

function OnGUI () {
	if(gameState=="paused"){
		var middle:Vector2=Vector2(Screen.width/2,Screen.height/2);
		GUI.Box(Rect(middle.x-90,middle.y-140,180,140),"Paused...");
		if(GUI.Button(Rect(middle.x-80,middle.y-120,160,30),"Resume")){
			Debug.Log("unpaused");
			gameState="running";
			Time.timeScale=1;
		}
		if(GUI.Button(Rect(middle.x-80,middle.y-80,160,30),"Main Menu")){
			Application.LoadLevel(0);
		}
		if(GUI.Button(Rect(middle.x-80,middle.y-40,160,30),"Exit")){
			Application.Quit();
		}
	}
}
