#pragma strict

//universal vars start

var repeatable:boolean=false;
var willPause:boolean=false;
var canSkip:boolean=false;
var allowMove:boolean=false;

private var player:player;
private var isDone:boolean=false;
private var playerLeft:boolean=false;
private var Activated:boolean=false;
private var skipping:boolean=false;
private var playerLook:MouseLook;

private var mainCamLook:MouseLook;
private var playerInTrigger=false;
private var firstActivate:boolean=false;
private var playerCam:Camera;
private var currentCamera:Camera;
//universal vars end

//Text specific start
var textPopup:boolean=true;
var textDelay:float;
var textArray:String[];
var textArraySounds:AudioClip[];
var textCameraSequence:Camera[];

var textColor:Color;

var textFade:boolean;
var textFadeSpeed:float;

var textFont:Font;
var textFontSize:int=10;


private var textcenteredStyle:GUIStyle;
private var textlabelRect:Rect;
private var textToShow:String;
private var textArrayLcv:int=0;

//Text specific start end






//Misc




function Start () {
	this.tag=("Trigger");
	playerLook=GameObject.Find("player").GetComponent(MouseLook);
	player=GameObject.Find("player").GetComponent("player");
	mainCamLook=GameObject.Find("Main Camera").GetComponent(MouseLook);
	playerCam=GameObject.Find("Main Camera").GetComponent(Camera);
	currentCamera=playerCam;
}

function Update () {
	if((firstActivate&&repeatable==false)||isDone==true){
	return;
	}else{
		if(Activated==true&&canSkip==true){//&&playerInTrigger==true&&canSkip==true){
			if (Input.GetButton("Fire1")&&skipping==false){
				skipping=true;
				Skip();
			}
			
			if (Input.GetButtonUp("Fire1")){
				skipping=false;
			}
		}
	}
}

function activateTrigger(){
	if((firstActivate&&repeatable==false)||isDone==true){
		return;
	}else if(Activated==false||repeatable){
		Debug.Log("Activated");
		Activated=true;
		if(!allowMove){
			player.CanMove=false;
		}
		if(willPause){
			Time.timeScale = 0.0001;
			playerLook.isPaused=true;
			mainCamLook.isPaused=true;
		}
		
		if(textPopup){
			yield StartCoroutine("textOption");
		}
		
		
		Reset();
		
		if(repeatable){
			Activated=false;
		}
	}
	yield;
}



function OnGUI () {
	if((firstActivate&&repeatable==false)||isDone)
	{
	return;
	}
	else if(Activated==true&&textPopup==true)
	{
		textcenteredStyle = GUI.skin.GetStyle("Label");
		textcenteredStyle.alignment = TextAnchor.MiddleCenter;
		textcenteredStyle.normal.textColor=textColor;
		textcenteredStyle.fontSize=textFontSize;
		textlabelRect = GUILayoutUtility.GetRect(new GUIContent(textToShow), "label");
		textlabelRect.height=Screen.height;
		textlabelRect.width=Screen.width;
		textlabelRect.center=Vector2 (Screen.width/2, Screen.height/2-20);
		GUI.backgroundColor=Color.black;
		GUI.Label(textlabelRect,textToShow,textcenteredStyle);
	}
}


function textOption(){
	//currentCamera=textCameraSequence[textArrayLcv];
	//currentCamera.enabled=true;
	for(textArrayLcv=textArrayLcv;textArrayLcv<textArray.length;textArrayLcv++){
		yield;
		if(textArray[textArrayLcv]==null){
			Skip();
		}
		if(willPause){
			Time.timeScale = 0.0001;
		}
		if(textArrayLcv>1&&textCameraSequence.Length>0&&!(textArrayLcv>textCameraSequence.Length-1)&&!(textCameraSequence[textArrayLcv]==null)){
			currentCamera.enabled=false;
			currentCamera=textCameraSequence[textArrayLcv];
			currentCamera.enabled=true;
		}
		if(!(textArray[textArrayLcv]==null)){
			textToShow=textArray[textArrayLcv];
		}
		
		
		if(textFade){
			yield StartCoroutine("FadeIn");
		}
		
		//Audio play here!
		yield WaitForSeconds(textDelay * Time.timeScale);//change text delay to audio length!
		
		if(textFade){
			yield StartCoroutine("FadeOut");
		}
	}
	isDone=true;
	
	Reset();
}
function Reset(){
	playerLook.isPaused=false;
	mainCamLook.isPaused=false;
	currentCamera.enabled=false;
	playerCam.enabled=true;
	
    Time.timeScale = 1.0;
    if(textArrayLcv>=textArray.length){
    	
    	isDone=true;
    }
    if(isDone){
    	//GameObject.Find("player").GetComponent(player).CanMove=true;
    	player.CanMove=true;
    }
    
    if(repeatable){
		Activated=false;
		isDone=false;
		textArrayLcv=0;
	}
}

function OnTriggerEnter (other : Collider) {
	if(other.CompareTag("Player")){
		playerInTrigger=true;
		yield WaitForSeconds(0.01);
	}
}
function OnTriggerExit (other : Collider) {
	if(other.CompareTag("Player")){
		playerInTrigger=false;
		if(isDone==true){
			firstActivate=true;
		}else{
		
		}
		
	}
}
function Skip(){

	textArrayLcv++;
	if(textArrayLcv<textArray.Length){
		textColor.a=1;
		StopAllCoroutines();
		Activated=false;
		activateTrigger();
	}else{
		textColor.a=0;
		StopAllCoroutines();
		Reset();
	}
}


function FadeOut () {
	while (textColor.a*255>1){
		yield;
		textColor.a-=25.0/255.0;
		yield WaitForSeconds(textFadeSpeed * Time.timeScale);
	}
}
function FadeIn () {
	while (textColor.a*255<255){
		yield;
		textColor.a+=25.0/255.0;
		yield WaitForSeconds(textFadeSpeed * Time.timeScale);
	}
}