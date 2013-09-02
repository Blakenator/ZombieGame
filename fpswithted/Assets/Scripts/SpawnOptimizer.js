#pragma strict
var spawns:GameObject[];
var visiblerange:double;
function Start () {
	spawns=GameObject.FindGameObjectsWithTag("ObjSpawn");
}
var cntr:int;
function Update () {
	cntr=(cntr>spawns.Length)?0:cntr++;
	try{
		var tmp:boolean=(!spawns[cntr].renderer.isVisible||Vector3.Distance(GameObject.Find("player").transform.position,transform.position)>visiblerange)?false:true;
		spawns[cntr].active=tmp;
	}catch(e){
	
	}
}