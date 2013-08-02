#pragma strict
private var Activated:boolean=false;
var repeatable:boolean=false;

var willPause:boolean;


var textPopup:boolean=true;
var textArray:String[];
var textArraySounds:AudioClip[];
var textDelay:float;


private var textBox:GUIText;
//var textPopup:boolean=false;


function Start () {
	this.tag=("Trigger");
	textBox=GameObject.Find("TextBox").GetComponent("GUIText");
}

function Update () {
	
}

function activateTrigger(){//Return true if activated
	if(Activated==false){
		Activated=true;
		
		if(willPause){
			//Time.timeScale=0;
		}
		
		if(textPopup){
			textOption();
		}
		
		if(repeatable){
			Activated=false;
		}
	}
}

function textOption(){
	Debug.Log("Start Text");
	for(var lcv=0;lcv<textArray.length;lcv++){
		textBox.text=textArray[lcv];
		yield WaitForSeconds(textDelay);
	}
	//Time.timeScale=1;
}