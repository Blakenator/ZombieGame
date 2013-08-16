
var isEnabled:boolean;
var undoChirp:AudioClip;
var sound:AudioClip;
var objectToSpawn:GameObject;
var spawn:Transform;
var mainCamera:Transform;
var targetGUI:GUIText;
private var lastObj:Array;
var removeTime:double;
private var lastTime:double;

function Start () {
	lastObj=new Array();
}

function Update () {
	if(isEnabled&&Time.timeScale>0){
		if(Input.GetButton("Undo Spawn")){
			if(Time.time>=lastTime+removeTime){
				if(lastObj.length>0&&lastObj[lastObj.length-1]){
					Destroy(lastObj[lastObj.length-1]);
					lastObj.pop();
					audio.PlayOneShot(undoChirp,1);
					lastTime=Time.time;
				}
			}
		}
		targetGUI.text="Object: "+objectToSpawn.name;
		if(Input.GetButtonDown("Fire1")){
			spawnObject();
			Debug.Log("spawn");
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
		Debug.Log("yes");
		if(!hit.collider.CompareTag("Player")){
			Debug.Log("yes");
			if(hit.collider.CompareTag("world")){
				lastObj.push(Instantiate(objectToSpawn,Vector3(hit.point.x,hit.point.y+objectToSpawn.renderer.bounds.size.y/2,hit.point.z),objectToSpawn.transform.rotation));
			}else{
				lastObj.push(Instantiate(objectToSpawn,hit.point,objectToSpawn.transform.rotation));
			}
		}
	}
}

function findSpawnPos(hit:RaycastHit,obj:GameObject){
	var offset:Vector3=-hit.point+hit.collider.transform.position;
	var percOffset:Vector3;
	percOffset.x=offset.x/hit.collider.bounds.size.x*2;
	percOffset.y=offset.y/hit.collider.bounds.size.y*2;
	percOffset.z=offset.z/hit.collider.bounds.size.z*2;
	var actPos:Vector3;
	actPos.x=hit.point.x+percOffset.x*obj.collider.bounds.size.x/2;
	
	actPos.y=hit.point.y+percOffset.y*obj.collider.bounds.size.y/2;
	actPos.z=hit.point.z+percOffset.z*obj.collider.bounds.size.z/2;
	return actPos;
}
