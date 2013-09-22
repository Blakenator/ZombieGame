#pragma strict
private var myTransform:Transform;
function Awake(){
	myTransform=transform;
}
function move(vector:Vector3){
	myTransform.position+=vector;
}