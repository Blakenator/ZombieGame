#pragma strict
var parent:GameObject;
function Start () {
	parent=transform.parent.gameObject;
	Debug.Log(parent);
}
function Update () {
		var hit : RaycastHit;
        if (Physics.Raycast (transform.position, -Vector3.up, hit, 1000.0)) {
            transform.position.y=hit.transform.position.y+ parent.renderer.bounds.size.y/2;
        }
}