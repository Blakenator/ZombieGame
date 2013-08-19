#pragma strict
var turnSpeed:double;
private var originalpos:Vector3;
function Start () {
	originalpos=transform.position;
}

function Update () {
	gameObject.transform.Rotate(0,turnSpeed*Time.deltaTime,0);
	gameObject.transform.position=originalpos;
}