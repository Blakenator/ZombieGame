#pragma strict
var switcher:GunSwitcher;
var showTut:int;
function Start () {
	switcher.ClearInventory();
	if(PlayerPrefs.GetInt("playedBefore",0)==1){
		//GameObject.FindObjectOfType(TutorialFinish).finish();
	}else if(PlayerPrefs.GetInt("playedBefore",0)==0){
		showTut=1;
	}
}

function OnGUI(){
GUI.Box(Rect(0,0,300,100),"hi");
	if(showTut==0){
		GUILayout.Window(0,Rect(Screen.width/2-75,Screen.height/2-100,150,200),window,"Show the tutorial?");
		showTut=2;
	}
}

function window(id:int){
	GUILayout.BeginHorizontal();
		if(GUILayout.Button("Yes")){
			showTut=2;
		}
		if(GUILayout.Button("No")){
			GameObject.FindObjectOfType(TutorialFinish).finish();
		}
	GUILayout.EndHorizontal();
}