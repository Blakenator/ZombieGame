#pragma strict
var player:GameObject;
function OnCollisionEnter(other:Collision){
	Debug.Log(other.impactForceSum.magnitude*other.rigidbody.mass*0.05);
	player.SendMessage("subhealth",other.impactForceSum.magnitude*other.rigidbody.mass*0.05);
}
function OnControllerColliderHit(other:ControllerColliderHit){
	Debug.Log("i hit something");
}