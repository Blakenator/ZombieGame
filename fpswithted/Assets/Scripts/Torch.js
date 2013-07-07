#pragma strict
var isEnabled:boolean;
var range:double;
var emitter:ParticleSystem;
var spawns:Transform[];
var cuttingTime:double;
var waitTime:double;
var target:GameObject;
var mainCamera:GameObject;
var targetGUI:GUIText;
private var lastFinishTime:double;
private var startTime:double;
private var isOn:boolean;
var lastHit:GameObject;
private var lastUpdate:double;

function setEnabled(val:boolean){
	isEnabled=val;
}

function Start () {

}

function Update () {
	if(isEnabled){
		if(Input.GetMouseButton(0)){
			if(isEnabled){
				cut();
			}
		}
		targetGUI.text="Cutting Torch";
	}
}

function cut(){
	if(isOn){

		if(Time.time>startTime+cuttingTime && target){
			target.SendMessage("separate",SendMessageOptions.RequireReceiver);
			
			isOn=false;
			lastFinishTime=Time.time;
		}else{
			
			var hit:RaycastHit;
			if(Physics.Raycast(mainCamera.transform.position,mainCamera.transform.TransformDirection(Vector3.forward),hit)){
				if(hit.collider.CompareTag("Resource")&&Vector3.Distance(hit.point,mainCamera.transform.position)<=range && !hit.collider.GetComponent("Rigidbody")){
					if(hit.collider.gameObject!=lastHit){
						target=hit.collider.gameObject;
						startTime=Time.time;
						lastHit=hit.collider.gameObject;
					}
					if (Time.time>lastUpdate+emitter.duration){
						for(spawn in spawns){
							var clone:ParticleSystem=Instantiate(emitter,spawn.position,spawn.rotation);
							clone.Play();
							Destroy(clone.gameObject,clone.duration);
						}
						lastUpdate=Time.time;
					}
				}
			}
		}
	}else{
		if(Time.time>lastFinishTime+waitTime){
			isOn=true;
			startTime=Time.time;
		}
	}
}