#pragma strict
var gameState:String="running";
var menu:String="main";
var player:Transform;
var MainCamera:MouseLook;
var volumeSlider:float;
var showFPS:boolean;
var FPSText:GUIText;

function Start () {
	volumeSlider=AudioListener.volume*10;
	showFPS=FPSText.active;
}

function Update(){
	if(Input.GetButtonDown("Pause")){
		if(gameState=="running"){
			Time.timeScale=0;
			gameState="paused";
			menu="main";
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
		if(menu=="main"){
			var middle:Vector2=Vector2(Screen.width/2,Screen.height/2);
			var box=Rect(middle.x-85,middle.y-100,170,130);
			GUILayout.BeginArea(box,"Paused...",GUI.skin.GetStyle("Box"));
				GUILayout.BeginVertical(GUILayout.ExpandHeight(true));
				GUILayout.Space(20);
				if(GUILayout.Button("Resume")){
					gameState="running";
					Time.timeScale=1;
					var temp:MouseLook=player.GetComponent("MouseLook");
					temp.isPaused=false;
					MainCamera.isPaused=false;
				}
				if(GUILayout.Button("Main Menu")){
					Application.LoadLevel(0);
				}
				if(GUILayout.Button("Options")){
					menu="options";
				}
				if(GUILayout.Button("Exit")){
					if(Application.isEditor||Application.isWebPlayer){
						Application.Quit();
					}else{
						System.Diagnostics.Process.GetCurrentProcess().Kill();
					}
				}
				GUILayout.EndVertical();
			GUILayout.EndArea();
			
		}else if(menu=="options"){
			GUILayout.BeginArea(new Rect(Screen.width/2-115,Screen.height/2-200,230,100),GUI.skin.GetStyle("Box"));
				GUILayout.BeginVertical();
					var tmp=showFPS;
					showFPS=GUILayout.Toggle(showFPS,"Show FPS");
					if(showFPS&&tmp!=showFPS){
						FPSText.active=true;
					}else if(!showFPS&&tmp!=showFPS){
						FPSText.active=false;
					}
					GUILayout.Box("Volume: "+volumeSlider);
					volumeSlider=Mathf.Round(GUILayout.HorizontalSlider(volumeSlider,0,11));
					AudioListener.volume=volumeSlider*10;
					if(GUILayout.Button("Back")){
						menu="main";
					}
				GUILayout.EndVertical();
			GUILayout.EndArea();
		}
	}
}
