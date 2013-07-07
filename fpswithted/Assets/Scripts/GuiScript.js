#pragma strict
private var optionsCam:Camera;
function Start(){
	optionsCam=gameObject.Find("Options Camera").GetComponent(Camera);
}

function OnGUI(){
	if(GUI.Button(Rect(Screen.width/2-115,Screen.height/2+100,230,40),"Let's Go Kill Some Zombies!")){
		Application.LoadLevel(1);
	}
	
	if(GUI.Button(Rect(Screen.width/2-87,Screen.height/2+150,175,40),"Options")){
		Debug.Log("will swap!");
		swapMenu(this.GetComponent(Camera),optionsCam);
	}
	
	if(GUI.Button(Rect(Screen.width/2-60,Screen.height/2+200,120,40),"Quit!")){
		Application.Quit();
	}
}

function swapMenu(From:Camera,To:Camera){
		From.enabled=false;
		To.enabled=true;
		Debug.Log("SWAP!");
}