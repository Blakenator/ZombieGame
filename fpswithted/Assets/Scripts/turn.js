#pragma strict
var turnSpeed:double;

function Start () {

}

function Update () {
	gameObject.transform.Rotate(0,turnSpeed*Time.deltaTime,0);
}