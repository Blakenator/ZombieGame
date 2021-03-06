#pragma strict
var menu:String="main";

var qualitySlider:int;
function Start(){
	volumeSlider=AudioListener.volume*10;
	qualitySlider=QualitySettings.GetQualityLevel();
}

function OnGUI(){
	if(menu=="main"){
		GUILayout.BeginArea(new Rect(Screen.width/2-115,Screen.height/2+150,230,150));
			GUILayout.BeginVertical("box",GUILayout.ExpandHeight(true));
				if(GUILayout.Button("Let's Go Kill Some Zombies!",GUILayout.ExpandHeight(true))){
					Application.LoadLevel(Application.loadedLevel+1);
				}
			
				if(GUILayout.Button("Options",GUILayout.ExpandHeight(true))){
					menu="options";
				}
			
				if(GUILayout.Button("Quit!",GUILayout.ExpandHeight(true))){
					if(Application.isEditor||Application.isWebPlayer){
						Application.Quit();
					}else{
						System.Diagnostics.Process.GetCurrentProcess().Kill();
					}
				}
			GUILayout.EndVertical();
		GUILayout.EndArea();
	}else if(menu=="options"){
		GUILayout.BeginArea(new Rect(Screen.width/2-115,Screen.height/2+200,230,100));
			GUILayout.BeginVertical();
				GUILayout.Box("Quality: "+QualitySettings.names[QualitySettings.GetQualityLevel()]);
				qualitySlider=Mathf.Round(GUILayout.HorizontalSlider(qualitySlider,0,5));
				QualitySettings.SetQualityLevel(qualitySlider,true);
				
				GUILayout.Box("Volume: "+volumeSlider);
				volumeSlider=Mathf.Round(GUILayout.HorizontalSlider(volumeSlider,0,11));
				AudioListener.volume=volumeSlider/10;
				
				
				//names[QualitySettings.GetQualityLevel].ToString());
				
				
				if(GUILayout.Button("Back")){
					menu="main";
				}
			GUILayout.EndVertical();
		GUILayout.EndArea();
	}
}

var volumeSlider:float;