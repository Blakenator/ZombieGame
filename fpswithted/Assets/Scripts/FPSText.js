#pragma strict

function Update () {
	GetComponent(GUIText).guiText.text="FPS: "+Mathf.Round(1/Time.deltaTime*10)/10;
}