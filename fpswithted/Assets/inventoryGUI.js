#pragma strict
var gameState:String="running";
var player:Transform;
var MainCamera:MouseLook;
var margin:Vector2=Vector2(15,15);
var gunSwitcher:GunSwitcher;
private var inventoryArray:Array;

function Start () {
	gameState="running";
}

function Update(){
	if(Input.GetKeyDown("i")){
		if(gameState=="running"){
			Time.timeScale=0;
			gameState="paused";
			var tmp:MouseLook=player.GetComponent("MouseLook");
			tmp.isPaused=true;
			MainCamera.isPaused=true;
			inventoryArray=gunSwitcher.getInventory();
		}else{
			gameState="running";
			Time.timeScale=1;
			var temp:MouseLook=player.GetComponent("MouseLook");
			temp.isPaused=false;
			MainCamera.isPaused=false;
		}
		
	}
}

function OnGUI(){
	if(gameState=="paused"){
		GUILayout.BeginArea(new Rect(margin.x,margin.y,Screen.width-margin.x*2,Screen.height-margin.y*2));
			//GUILayout.Box(new Rect(margin.x,margin.y,Screen.width-margin.x*2,Screen.height-margin.y*2));
			
			GUILayout.BeginVertical();
				for(var i=0;i<inventoryArray.length/4;i++){
					GUILayout.BeginHorizontal();
						
					GUILayout.EndHorizontal();
				}
			GUILayout.EndVertical();
		GUILayout.EndArea();
	}
}