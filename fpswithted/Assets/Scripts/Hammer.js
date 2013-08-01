#pragma strict
var isEnabled:boolean;
var swinging:boolean;
var targetGUI:GUIText;

function Start () {
	swinging=false;
}

function Update () {
	if(isEnabled){
		if(Input.GetButton("Fire1")&&!swinging){
			swing();
		}
		swinging=animation.IsPlaying("sledge");
		targetGUI.text="Sledgehammer";
	}
}

function setEnabled(val:boolean){
	isEnabled=val;
}

function swing(){
	animation.Play("sledge");
}