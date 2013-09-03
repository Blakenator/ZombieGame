import Pathfinding;

#pragma strict
var maxnumber:int;
var currentZNumber:int;
var mindist:float;
var z:GameObject;

var range:Vector2=Vector2(50,50);

var player:Transform;
private var dist:float;

private var playerScript:player;

private var zombies=new Array();
var playerOverride:boolean=false;

function Awake () {
	if(!playerOverride){
		playerScript=player.GetComponent("player");
	}else{
		player=transform;
	}
	var pos:Vector3=Vector3(player.position.x,player.position.y,player.position.z);
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
		var clone:GameObject;
		
		clone=Instantiate(z,Vector3(temp.x,temp.y,temp.z),z.transform.rotation);
		
		zombies.Add(clone);
		dist=0;
		i++;
	}
	//AstarPath.active.Scan();
}

function addToMaxNum(num:int){
	maxnumber+=num;
}

function ZombieWasKilled(){
	currentZNumber--;
}

function SpawnZombie(){
	//currentZNumber--;
	if(currentZNumber<maxnumber&&currentZNumber>=0){
		var pos:Vector3;
		if(!playerScript.getIsInCar()){
			//targetPosition=player.transform.position;
			
			pos=Vector3(player.position.x,player.position.y,player.position.z);
		}else{
			var tempVec:Vector3=playerScript.getCar().gameObject.transform.position;
			
			pos=Vector3(tempVec.x,tempVec.y,tempVec.z);
		}
		var temp:Vector3;
		
		var clone:GameObject;
		
		while(dist<mindist){
			temp=Vector3(Random.Range(pos.x-range.x,pos.x+range.x),z.transform.position.y,Random.Range(pos.z-range.y,pos.z+range.y));
			dist=Vector3.Distance(temp,pos);
		}
		currentZNumber++;
		
		clone=Instantiate(z,Vector3(temp.x,temp.y,temp.z),z.transform.rotation);
		
		zombies.Add(clone);
		
		dist=0;
	}
}

function SpawnAllZombies(){
	while(currentZNumber<maxnumber){
		SpawnZombie();
	}
	//Debug.Log(currentZNumber);
}




function getZombiesAroundPos(pos:Vector3,dist:float){
	var tempZombiesArr=new Array();
	
	for (var zTemp in zombies){
		var tempobj:GameObject = zTemp;
		if(tempobj!=null){
			var tempDist:float=Vector3.Distance(tempobj.gameObject.transform.position, pos);
			if(tempDist<=dist){
				tempZombiesArr.Add(tempobj);
				//Debug.Log(tempobj.gameObject.transform.position);
			}
		}
	}
	return tempZombiesArr;
}
