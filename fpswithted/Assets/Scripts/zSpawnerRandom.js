import Pathfinding;
#pragma strict
var number:int;
var z:GameObject;
var range:Vector2=Vector2(50,50);

function Start () {
	var i=0;
	while(i<=number){
		Instantiate(z,Vector3(transform.position.x+Random.Range(-range.x,range.x),z.transform.position.y,transform.position.z+Random.Range(-range.y,range.y)),z.transform.rotation);
		i++;
	}
	AstarPath.active.Scan();
}
