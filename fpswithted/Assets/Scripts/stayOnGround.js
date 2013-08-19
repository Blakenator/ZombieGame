#pragma strict
private var parent:GameObject;
private var layerMaskGround:LayerMask;
function Awake () {
	layerMaskGround = 1 << LayerMask.NameToLayer ("Ground");
	parent=transform.parent.gameObject;
}
function Update () {
	var hit:RaycastHit;
    if (Physics.Raycast (transform.position, -Vector3.up, hit, 1000.0,layerMaskGround.value)) {
        parent.transform.position=Vector3(parent.transform.position.x, hit.transform.position.y+ parent.renderer.bounds.size.y/2,parent.transform.position.z);
    }else{
		transform.parent.gameObject.SendMessage("Kill",SendMessageOptions.RequireReceiver);
		Destroy(transform.parent.gameObject,2);
    }
}

