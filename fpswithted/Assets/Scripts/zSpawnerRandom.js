import Pathfinding;

#pragma strict
var maxnumber:int;
var currentZNumber:int;
var mindist:float;
var z:GameObject;

var range:Vector2=Vector2(50,50);

var player:Transform;
private var dist:float;




function Awake () {
	
	
	var pos:Vector3=player.position;
	//var pos:Vector3=player.position;
	dist=0;
	var i=0;
	
	while(i<=maxnumber){
		var temp:Vector3;
		while(dist<mindist){
			temp=Vector3(Random.Range(pos.x-range.x,pos.x+range.x),z.transform.position.y,Random.Range(pos.z-range.y,pos.z+range.y));
			dist=Vector3.Distance(temp,pos);
		}
		currentZNumber++;
		Instantiate(z,Vector3(temp.x,temp.y,temp.z),z.transform.rotation);
		dist=0;
		i++;
	}
	
	//AstarPath.active.Scan();
}

function addToMaxNum(num:int){
	maxnumber+=num;
}

function Spawn(){
	currentZNumber--;
	if(currentZNumber<maxnumber&&currentZNumber>0){
		var pos:Vector3=player.position;
		var temp:Vector3;
		
		while(dist<mindist){
			temp=Vector3(Random.Range(pos.x-range.x,pos.x+range.x),z.transform.position.y,Random.Range(pos.z-range.y,pos.z+range.y));
			dist=Vector3.Distance(temp,pos);
		}
		currentZNumber++;
		Instantiate(z,Vector3(temp.x,temp.y,temp.z),z.transform.rotation);
		dist=0;
	}
}
