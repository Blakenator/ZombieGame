#pragma strict
var text:GUIText;
var progress:double;
var total:double;
function Start(){
	yield WaitForSeconds(0.5);
	total=GameObject.FindGameObjectsWithTag("enemy").Length-1;
	Debug.Log(total);
}
function Update () {
	progress=total-GameObject.FindGameObjectsWithTag("enemy").Length-1;
	progress*=2;
	Debug.Log(progress/total);/*
	if(total<=0){
		progress=0;
		total=-1;
	}*/
	text.text="Tutorial Progress: "+Mathf.Round(progress/total*100)+"%";
	if(progress/total>=0.75){
		finish();
		
	}
}

function finish(){
	//Time.timeScale=0;
	text.text="Tutorial Completed!";
	PlayerPrefs.SetInt("playedBefore",1);
	PlayerPrefs.Save();
	Time.timeScale=0.1;
	yield WaitForSeconds(0.6);
	Application.LoadLevel(Application.loadedLevel+1);
}