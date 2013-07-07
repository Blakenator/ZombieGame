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
private var done:boolean;

function OnCollisionEnter(other:Collision){
	if(other.impactForceSum.magnitude>=1){
		Debug.Log(other.impactForceSum.magnitude);
	}
	
	if(other.impactForceSum.magnitude>=forceRequired){
		separate();
	}
}
private var last:double;
function Update(){
	if(last+refreshRate>Time.time&&!isRigidbody){
		last=Time.time;
		updateSupports();
	}
	
}

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
	buildingFragments=null;
	done=true;
}

function separate(){
	var tmp=supportObjects.Clone;
	coldRemove(gameObject);
	supportObjects=null;
	var clone:GameObject=Instantiate(gameObject,gameObject.transform.position,gameObject.transform.rotation);
	clone.AddComponent("Rigidbody");
	clone.SendMessage("setIsClone",true,SendMessageOptions.RequireReceiver);
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
	if(!supportObjects||!done){
		return;
	}
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