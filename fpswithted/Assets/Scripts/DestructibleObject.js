#pragma strict
var forceRequired:double;
var isRigidbody:boolean;
private var health=100;
var hasSupport:boolean;
private var supportObjectsArr:Array;
var supportObjects:GameObject[];
var minSupportObjects:int;
private var currSuppObjs:int;
var refreshRate:double;
var buildingFragments:GameObject[];
var minDist:double;
var player:Transform;
var sightDist:double;
private var done:boolean;

function OnCollisionEnter(other:Collision){
	if(!isRigidbody){
				
		if(other.impactForceSum.magnitude>=forceRequired){
			separate();
		}
	}
	
}
private var just:boolean;
private var lastPos:Transform;
private var last:double;
/*
function Update(){
	if(!isRigidbody){
		if(last+refreshRate>Time.time&&!isRigidbody){
			last=Time.time;
			updateSupports();
		}
	}
	//   -----------this optimization makes it slower-------------
	player = GameObject.Find("player").transform;
	if(Vector3.Distance(transform.position,player.position)>sightDist){
	
	}
	if(isRigidbody){
		player = GameObject.Find("player").transform;
		if(Vector3.Distance(transform.position,player.position)>sightDist){
			renderer.enabled=false;
			if(just){
				transform.position=lastPos.position;
				transform.rotation=lastPos.rotation;
			}else{
				lastPos=transform;
				just=true;
			}
		}else{
			renderer.enabled=true;
			just=false;
		}
	}
	
}*/

function Start(){
	
	done=false;
	last=Time.time;
	supportObjectsArr=new Array();
	for(var fragment:GameObject in buildingFragments){
		if (fragment.name!=name&&Vector3.Distance(collider.ClosestPointOnBounds(fragment.transform.position),fragment.collider.ClosestPointOnBounds(transform.position))<=minDist){
			supportObjectsArr.push(fragment);
		}
	}
	supportObjects=supportObjectsArr;
	//Debug.Log(supportObjects.Length);
	buildingFragments=null;
	
	done=true;
}

function separate(){
	//Debug.Log(supportObjects.Length);
	if(!supportObjects){
		return;
	}
	var tmp=supportObjects.Clone;
	for(var i=0;i<supportObjects.length;i++){
		if(supportObjects[i]){
			supportObjects[i].SendMessage("updateSupports",SendMessageOptions.RequireReceiver);
		}
	}
	//supp objs array is being set to null anyway, no need to loop through it
	//coldRemove(gameObject);
	supportObjects=null;
	var clone:GameObject=Instantiate(gameObject,gameObject.transform.position,gameObject.transform.rotation);
	clone.AddComponent("Rigidbody");
	clone.SendMessage("setIsClone",true,SendMessageOptions.RequireReceiver);
	clone.rigidbody.mass=clone.collider.bounds.size.x*clone.collider.bounds.size.y*clone.collider.bounds.size.z*3;
	transform.parent.SendMessage("addObj",clone,SendMessageOptions.RequireReceiver);
	DontDestroyOnLoad(clone);
	Destroy(gameObject);
}
function setIsClone(val:boolean){
	isRigidbody=val;
}
function addHealth(val:int){
	Debug.Log(health);
	health+=val;
	if(val<0 && health<=0){
		separate();
	}
}

function coldRemove(obj:GameObject){
	for(var i=0;i<supportObjects.length;i++){
		var temp:GameObject=supportObjects[i];
		if(temp.GetInstanceID()==obj.GetInstanceID()&&temp.GetInstanceID()!=GetInstanceID()){
			supportObjects[i]=null;
			return;
		}
	}
}

function updateSupports(){
	if(supportObjects&&done){
		var cntr=0;
		for(var i=0;i<supportObjects.length;i++){
			if(supportObjects[i]){
				cntr++;
			}
		}
		currSuppObjs=cntr;
		if(cntr<minSupportObjects){
			separate();
		}
	}
}