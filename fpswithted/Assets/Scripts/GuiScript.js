#pragma strict
var menu:String="main";
function Start(){
	volumeSlider=AudioListener.volume;
}

function OnGUI(){
	if(menu=="main"){
		GUILayout.BeginArea(new Rect(Screen.width/2-115,Screen.height/2+150,230,100));
			GUILayout.BeginVertical();
				if(GUILayout.Button("Let's Go Kill Some Zombies!")){
					Application.LoadLevel(2);
				}
			
				if(GUILayout.Button("Options")){
					menu="options";
				}
			
				if(GUILayout.Button("Quit!")){
					Application.Quit();
				}
			GUILayout.EndVertical();
		GUILayout.EndArea();
	}else if(menu=="options"){
		GUILayout.BeginArea(new Rect(Screen.width/2-115,Screen.height/2+200,230,100));
			GUILayout.BeginVertical();
				GUILayout.Box("Volume: "+volumeSlider);
				volumeSlider=Mathf.Round(GUILayout.HorizontalSlider(volumeSlider,0,11));
				AudioListener.volume=volumeSlider/10;
				if(GUILayout.Button("Back")){
					menu="main";
				}
			GUILayout.EndVertical();
		GUILayout.EndArea();
	}
}

var volumeSlider:float;