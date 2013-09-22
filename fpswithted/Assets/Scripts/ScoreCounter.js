#pragma strict
var score:float;
private var zSpawn:zSpawnerRandom;
private var dayNight:Daynight;
function Start () {
	zSpawn=GameObject.Find("_A*").GetComponent(zSpawnerRandom);
	dayNight=GameObject.Find("_Sun").GetComponent(Daynight);
}
function Update () {
	score=(zSpawn.getZombiesKilled()+dayNight.getDaysSurvived())*.5;
}

function getScore(){
	return score;
}
function setScore(num:float){
	score=num;
}


function getKills(){
	return score;
}
function setKills(num:int){
	zSpawn.setZombiesKilled(num);
}

function getDays(){
	return dayNight.getDaysSurvived();
}
function setDays(num:int){
	dayNight.setDaysSurvived(num);
}