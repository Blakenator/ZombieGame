#pragma strict
private var parent:Transform;
//private var layerMaskGround:LayerMask;
private var cnt:int=0;
function Start () {
	//layerMaskGround = 1 << LayerMask.NameToLayer ("Ground");
	parent=transform.parent.gameObject.transform;
}
function Update () {
	var hit:RaycastHit;
    if (Physics.Raycast (transform.position, -Vector3.up, hit, 1000.0)){//,layerMaskGround.value)) {
        parent.position=Vector3(parent.position.x, hit.transform.position.y+ parent.renderer.bounds.size.y/2,parent.position.z);
    }else{
    	cnt++;
    	if(cnt>5){
    		Debug.Log("Not On Ground");
			parent.gameObject.SendMessage("Kill",SendMessageOptions.RequireReceiver);
			//Destroy(parent.gameObject,2);
		}
    }
}

