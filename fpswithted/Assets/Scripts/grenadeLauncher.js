var isEnabled:boolean;
var currAmmo:int;
var maxAmmo:int;
var throwSpeed:float;
var grenade:Rigidbody;
var spawn:Transform;
var mainCamera:Transform;
var reloadTime:double;
private var lastTime:double;
var targetGUIText:GUIText;

function Start () {

}
function setEnabled(val:boolean){
	isEnabled=val;
}

function Update () {
	if(isEnabled&&Time.timeScale>0){
		targetGUIText.text = "Ammo: " + currAmmo;
		if (Input.GetButton("Fire1")){
			if(Time.time>lastTime-Time.deltaTime+reloadTime && currAmmo>0){
				throwGrenade();
				currAmmo-=1;
			}
		}
	}
}

function throwGrenade(){
	if (isEnabled){
		if(currAmmo>0){
			lastTime=Time.time;
			//var clone:Rigidbody;
			var clone=Instantiate(grenade,mainCamera.position,mainCamera.localRotation);
			
			clone.velocity=mainCamera.TransformDirection(Vector3.forward*throwSpeed);
			//clone.useGravity=true;
			clone.gameObject.SendMessage("setThrown",true,SendMessageOptions.RequireReceiver);
			//clone.transform.gameObject.sendMessage;
			//clone.addComponent("");
			
			
			//Destroy(clone.GetInstanceID());
			//var obj :GameObject=
		}
		
	}
}