#pragma strict
var spawns:GameObject[];
var visiblerange:double;
private var pTransform:Transform;
function Start () {
	pTransform=GameObject.Find("player").transform;
	spawns=GameObject.FindGameObjectsWithTag("ObjSpawn");
}
var cntr:int;
function Update () {
	cntr=(cntr>spawns.Length)?0:cntr++;
	try{
		var tmp:boolean=(!spawns[cntr].renderer.isVisible||Vector3.Distance(pTransform.position,transform.position)>visiblerange)?false:true;
		spawns[cntr].active=tmp;
	}catch(e){
	
	}
}