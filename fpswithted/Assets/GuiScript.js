#pragma strict

function OnGUI(){
	if(GUI.Button(Rect(Screen.width/2-115,Screen.height/2+150,230,40),"Let's Go Kill Some Zombies!")){
		Application.LoadLevel(1);
	}
	if(GUI.Button(Rect(Screen.width/2-60,Screen.height/2+200,120,40),"Quit!")){
		Application.Quit();
	}
}

