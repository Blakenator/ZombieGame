#pragma strict
import Pathfinding;

private var targetPosition : Vector3;
private var wandertargetPosition : Vector3;
private var movePosition : Vector3;
private var seeker:Seeker;
private var controller:CharacterController;

private var path:Path;
var Speed : float = 2.0;
private var player:Transform;
var engagerange:int;
private var minDistance:float=1.0;

var nextWaypointDistance:float=5.0;
private var currentWaypoint:int=0;

private var distance:float;

private var dirToMove:Vector3;

private var isInRange:boolean;
private var isColliding:boolean=false;
private var isWandering:boolean=true;
private var wanderstart:boolean=true;
private var isCheckingHasMoved:boolean=false;

//private var lastPos:Vector3;

function Start () {
	seeker=this.GetComponent(Seeker);
	player=GameObject.Find("player").transform;
	
	seeker.StartPath(transform.position,player.transform.position,OnPathComplete);
	
	targetPosition=player.transform.position;
	distance = Vector3.Distance(gameObject.transform.position, player.transform.position);
	controller=this.GetComponent(CharacterController);
	
	
	movePosition=targetPosition;
	
	
	
	controller.Move(Vector3(0,0,0)*Time.fixedDeltaTime);
	
	//lastPos=player.transform.position;
}

function Update () {
	//lastPos=targetPosition;
	targetPosition=player.transform.position;
	distance = Vector3.Distance(gameObject.transform.position, targetPosition);
	transform.rotation.x = 0;
	transform.rotation.z = 0;
	//isColliding=false;
}

function OnPathComplete(newPath:Path)
{
	if(!newPath.error)
	{
		path=newPath;
		currentWaypoint=0;
	}
}


function FixedUpdate()
{
	targetPosition=player.transform.position;
	distance = Vector3.Distance(gameObject.transform.position, targetPosition);
	transform.rotation.x = 0;
	transform.rotation.z = 0;
	
	CheckValues();
	Move();
}   



function SmoothLookAt(target:Vector3,speed:float)
{
    var dir:Vector3 = target - transform.position;
    var targetRotation:Quaternion = Quaternion.LookRotation(dir);
    transform.rotation = Quaternion.RotateTowards(transform.rotation, targetRotation, Time.deltaTime * speed);
}

function OnTriggerEnter (other : Collider) {
	Debug.Log("collide1");
	if (other.gameObject.CompareTag("enemy"))
	{
		Physics.IgnoreCollision(gameObject.collider,other.gameObject.collider);
		//CreateNewPlayerPath();
  		//isColliding=true;
	}
	else
	{
		//isColliding=false;
	}
}

function OnCollisionEnter (other : Collision) {
	Debug.Log("collide");
	if (other.gameObject.CompareTag("enemy"))
	{
		Physics.IgnoreCollision(gameObject.collider,other.gameObject.collider);
		//CreateNewPlayerPath();
  		//isColliding=true;
	}
	else
	{
		//isColliding=false;
	}
}




function CheckValues(){
	if(path==null)
	{
		return; //path is null!
	}
	if(distance>=engagerange)//if out of range
	{
		CreateNewWander();
		return;
	}else{
		wanderstart=true;
		CreateNewPlayerPath();
		return;
	}
}



function CreateNewWander (){
	if(wanderstart){
		wanderstart=false;
		movePosition=targetPosition;
		seeker.StartPath(transform.position,movePosition,OnPathComplete);
		return;
	}
	if(currentWaypoint>=path.vectorPath.Count-1)
	{
		
		movePosition=Vector3(Random.Range(-15,15),-1,Random.Range(-15,15));
		
		var plusminus:int=Random.Range(1,3);
		if(plusminus==1){
			movePosition=transform.position-movePosition;
			movePosition.y=0;
		}else{
			movePosition=transform.position+movePosition;
			movePosition.y=0;
		}
		
		
		seeker.StartPath(transform.position,movePosition,OnPathComplete);

		
		return;
	}
}



function CreateNewPlayerPath (){
	movePosition=targetPosition;
	seeker.StartPath (transform.position,movePosition, OnPathComplete);
}


function Move(){
	if(path==null)
	{
		return; //path is null!
	}
	if(currentWaypoint>=path.vectorPath.Count-1)
	{
		dirToMove=(path.vectorPath[path.vectorPath.Count-1]-transform.position).normalized;
		controller.Move(dirToMove*Time.fixedDeltaTime);
		
		movePosition=targetPosition;
		if(distance<=engagerange){
			seeker.StartPath (transform.position,movePosition, OnPathComplete);
		}
		return; //do something... nothing for now.
	}
	
	
	dirToMove=(path.vectorPath[currentWaypoint]-transform.position).normalized;
	
	var dir2:Vector3;
	if(currentWaypoint+1>=path.vectorPath.Count-1)
	{
		dir2=movePosition;
	}
	else
	{
		dir2=(path.vectorPath[currentWaypoint+1]);
	}
	
	dirToMove*=Speed;
	controller.Move(dirToMove*Time.fixedDeltaTime);
	SmoothLookAt(dir2,150.0);
	
	//Check if we are close enough to the next waypoint
    //If we are, proceed to follow the next waypoint
	if(Vector3.Distance(transform.position,path.vectorPath[currentWaypoint])<nextWaypointDistance)
	{
        currentWaypoint++;
        return;
    }
}

function HasMoved(){
	
	//yield WaitForSeconds(1);
	//Debug.Log("TIME!");
	
	
}

