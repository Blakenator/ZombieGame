#pragma strict

function Start () {

}

function Update () {
		var hit : RaycastHit;
        if (Physics.Raycast (transform.position, -Vector3.up, hit, 100.0)) {
            transform.position.y=hit.transform.position.y+renderer.bounds.size.y/2;
        }
}