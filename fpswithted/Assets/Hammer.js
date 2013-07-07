#pragma strict
var isEnabled:boolean;
var swinging:boolean;
var targetGUI:GUIText;

function Start () {

}

function Update () {
	if(isEnabled){
		if(Input.GetMouseButtonDown(0)&&!swinging){
			swing();
		}
		swinging=animation.isPlaying;
		targetGUI.text="Sledgehammer";
	}
}

function setEnabled(val:boolean){
	isEnabled=val;
}

function swing(){
	animation.Play();
}