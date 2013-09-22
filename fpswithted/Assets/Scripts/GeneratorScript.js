#pragma strict
private var lights:Component[];
private var Enabled:boolean=false;
private var State:boolean=false;//true is lights on
var building:GameObject;
var fuelAmmt:float=100;
var cnt:int=0;
function Start () {
	lights=building.GetComponentsInChildren(Light);
	if(lights.Length>0){
		turnOffLights();
	}
}
function Update () {
	if(Enabled){
		if(fuelAmmt>0){
			fuelAmmt-=.001*Time.deltaTime;
			
		}else{
			State=false;
			turnOffLights();
		}
	}
}
function Use(){
	if(!Enabled){
		State=true;
		Enabled=true;
		turnOnLights();
	}else{
		State=false;
		Enabled=false;
		turnOffLights();
	}
}
function turnOnLights(){
	for(var I:Light in lights){
		I.intensity=1;
	}
}
function turnOffLights(){
	for(var I:Light in lights){
		I.intensity=0;
	}
}
function getState(){
	return State;
}
function getSaveLine(){
	return ("G"+","+gameObject.GetInstanceID()+","+fuelAmmt+","+getState().ToString());
}