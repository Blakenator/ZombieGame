#pragma strict

//universal vars start
private var Activated:boolean=false;
var repeatable:boolean=false;
var willPause:boolean=false;
var canSkip:boolean=false;
private var skipping:boolean=false;
private var player:MouseLook;
private var mainCam:MouseLook;
private var playerInTrigger=false;
//universal vars end

//Text specific start
var textPopup:boolean=true;
var textArray:String[];
var textArraySounds:AudioClip[];
var textDelay:float;
var textColor:Color;
var textFade:boolean;
var textFadeSpeed:float;
private var textcenteredStyle:GUIStyle;
private var textlabelRect:Rect;
private var textToShow:String;
private var textArrayLcv:int=0;

//Text specific start end






//Misc




function Start () {
	this.tag=("Trigger");
	player=GameObject.Find("player").GetComponent(MouseLook);
	mainCam=GameObject.Find("Main Camera").GetComponent(MouseLook);
	Debug.Log(textColor.a);
	Debug.Log(canSkip);
}

function Update () {
	if(Activated&&playerInTrigger&&canSkip){
		if (Input.GetButton("Fire1")&&skipping==false){
			skipping=true;
			Skip();
		}
		
		if (Input.GetButtonUp("Fire1")){
			skipping=false;
		}
	}
}

function activateTrigger(){//Return true if activated
	if(Activated==false){
		Activated=true;
		
		if(willPause){
			Time.timeScale = 0.0001;
			player.isPaused=true;
			mainCam.isPaused=true;
		}
		
		if(textPopup){
			yield StartCoroutine("textOption");
		}else{
		
		}
		
		
		Reset();
		
		if(repeatable){
			Activated=false;
		}
		
	}
}



function OnGUI () {
	if(Activated==true&&textPopup==true){
    	textcenteredStyle = GUI.skin.GetStyle("Label");
		textcenteredStyle.alignment = TextAnchor.MiddleCenter;
		textcenteredStyle.normal.textColor=textColor;
		textlabelRect = GUILayoutUtility.GetRect(new GUIContent(textToShow), "label");
		textlabelRect.height=Screen.height;
		textlabelRect.width=Screen.width;
		textlabelRect.center=Vector2 (Screen.width/2, Screen.height/2-20);
		GUI.backgroundColor=Color.black;
    	GUI.Label(textlabelRect,textToShow,textcenteredStyle);
    }
}


function textOption(){
	Debug.Log("Start Text");
	
	for(textArrayLcv=textArrayLcv;textArrayLcv<textArray.length;textArrayLcv++){
		yield;
		if(textArray[textArrayLcv]==null){
			Skip();
		}
		
		Time.timeScale = 0.0001;
		textToShow=textArray[textArrayLcv];
		
		if(textFade){
			yield StartCoroutine("FadeIn");
		}
		
		//Audio play here!
		yield WaitForSeconds(textDelay * Time.timeScale);//change text delay to audio length!
		
		if(textFade){
			yield StartCoroutine("FadeOut");
		}
	}
	
	Reset();
}
function Reset(){
	player.isPaused=false;
	mainCam.isPaused=false;
	
	textArrayLcv=0;
    Time.timeScale = 1.0;
}
function OnTriggerEnter (other : Collider) {
	if(other.CompareTag("Player")){
		playerInTrigger=true;
	}
}
function OnTriggerExit (other : Collider) {
	if(other.CompareTag("Player")){
		playerInTrigger=false;
	}
}
function Skip(){

	textArrayLcv++;
	if(textArrayLcv<textArray.Length){
		textColor.a=1;
		StopCoroutine("FadeOut");
		StopCoroutine("FadeIn");
		StopCoroutine("textOption");
		StartCoroutine("textOption");
	}else{
		textColor.a=0;
		StopCoroutine("FadeOut");
		StopCoroutine("FadeIn");
		StopCoroutine("textOption");
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