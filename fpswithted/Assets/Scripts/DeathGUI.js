#pragma strict
private var scoreCnt:ScoreCounter;
private var score:float;
private var isDead:boolean;
private var days:int;
var saver:SaveWeapons;
var loader:loadWeapons;

function Start(){
	
	scoreCnt=GameObject.Find("_StatsCounter").GetComponent(ScoreCounter);
	saver=GameObject.Find("_Saver").GetComponent(SaveWeapons);
	loader=GameObject.Find("_Saver").GetComponent(loadWeapons);
	
}
function PlayerDied(){
	score=scoreCnt.getScore();
	days=scoreCnt.getDays();
	isDead=true;
	Time.timeScale=0;
}

function OnGUI(){
	if(isDead){
		Time.timeScale=0;
		player.CanLook=false;
		player.CanMove=false;
		GUILayout.BeginArea(new Rect(Screen.width/2-150,Screen.height/2+150,300,150));
			GUILayout.BeginVertical("box");
				GUILayout.Label("You Died!");
				GUILayout.Label("Your Score: "+score);
				GUILayout.Label("Days Survived: "+days);
				GUILayout.BeginHorizontal();
					if(GUILayout.Button("Main Menu")){
						Application.LoadLevel(0);
					}
					if(GUILayout.Button("Save")){
						saver.Save();
					}
					if(GUILayout.Button("Load")){
						loader.load();
					}
					if(GUILayout.Button("Exit")){
						if(Application.isEditor||Application.isWebPlayer){
							Application.Quit();
						}else{
							System.Diagnostics.Process.GetCurrentProcess().Kill();
						}
					}
				GUILayout.EndHorizontal();
			GUILayout.EndVertical();
		GUILayout.EndArea();
	}
}