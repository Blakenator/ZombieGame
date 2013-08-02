#pragma strict
var optimization:boolean;
var player:Transform;
var replace:GameObject;
private var replaceDupe:GameObject;
var sightDist:double;
var repObjs:Array;
private var children;
private var inRange:boolean;
private var isBottom;

function Start () {
	if(optimization){
		var newpos=Vector3(transform.position.x+2.127319,transform.position.y+-3.299795,transform.position.z+-5.413696);
		replaceDupe=Instantiate(replace,newpos,transform.rotation);
		replaceDupe.transform.Rotate(0,0,90);
		DontDestroyOnLoad(replaceDupe);
		repObjs=new Array();
		children=gameObject.GetComponentsInChildren(Renderer);
		last=true;
		isBottom=true;
		setVis(false);
	}
}
private var lastup:double;
var outOfRangeRefreshRate:double;
function Update () {
	if(optimization){
		if(replaceDupe.renderer.enabled&&!replaceDupe.renderer.isVisible){
			return;
		}
		if(inRange||Time.time>=lastup+outOfRangeRefreshRate){
			player = GameObject.Find("player").transform;
			if(Vector3.Distance(transform.position,player.position)>sightDist){
				setVis(false);
				inRange=false;
				if(repObjs.length<140){
					replaceDupe.renderer.enabled=true;
				}
			}else{
				setVis(true);
				inRange=true;
				replaceDupe.renderer.enabled=false;
			}
			lastup=Time.time;
		}
		
	}
}

private var last:boolean;
function setVis(val:boolean){
	if(last==val){
		return;
	}
	//Debug.Log(val);
	//var children=gameObject.GetComponentsInChildren(Renderer);
	for(var r:Renderer in children){
		if(r){
			r.gameObject.active=val;
		}
		//r.enabled=val;
	}
	if(repObjs.length>0){
		for(var o:GameObject in repObjs){
			o.active=val;
		}
	}
	last=val;
}
function addObj(obj:GameObject){
	repObjs.push(obj);
}
function setNotBottom(val:int){
	outOfRangeRefreshRate+=val;
	isBottom=false;
}
function setInRange(val:boolean){
	inRange=val;
	lastup=Time.time;
}