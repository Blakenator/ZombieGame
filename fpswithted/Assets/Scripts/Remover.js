
var isEnabled:boolean;
var sound:AudioClip;
var spawn:Transform;
var mainCamera:Transform;
var targetGUI:GUIText;

function Start () {

}

function Update () {
	if(isEnabled){
		targetGUI.text="Remover";
		if(Input.GetMouseButtonDown(0)){
			spawnObject();
		}
	}
	Debug.DrawRay(spawn.transform.position, spawn.transform.TransformDirection(Vector3.forward), Color.green);
}

function setEnabled(val:boolean){
	isEnabled=val;
}

function spawnObject(){
	var direction = mainCamera.TransformDirection(Vector3.forward);
	var hit : RaycastHit;
	var pos=Vector3(mainCamera.transform.position.x,mainCamera.transform.position.y,mainCamera.transform.position.z+0.5);
	if(Physics.Raycast(mainCamera.position,direction,hit)){
		if(!hit.collider.CompareTag("Player")&&!hit.collider.CompareTag("world")){
			var parent:GameObject=hit.collider.gameObject;
			while(parent.transform.parent){
				parent=parent.transform.parent.gameObject;
			}
			Destroy(parent);
			audio.PlayOneShot(sound,1);
		}
	}

}