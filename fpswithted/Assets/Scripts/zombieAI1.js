#pragma strict
//@script SerializeAll
import Pathfinding;

var targetPosition : Vector3;
var movePosition : Vector3;


private var seeker:Seeker;
//private var controller:CharacterController;

private var path:Path;
var Speed : float = 2.0;
private var player:Transform;
var engagerange:int;

var nextWaypointDistance:float=5.0;
var currentWaypoint:int=0;

private var distance:float;

private var dirToMove:Vector3;

//private var isColliding:boolean=false;
private var wanderstart:boolean=true;

//private var playerHasMoved:boolean=false;

var canRefresh:boolean=true;
var Mover:ZMover;
var animator:Animation;
var ragdoll:GameObject;

private var lastPos:Vector3;

function Start () {
	seeker=this.GetComponent(Seeker);
	player=GameObject.Find("player").transform;
	
	//seeker.StartPath(transform.position,player.transform.position,OnPathComplete);
	
	targetPosition=player.transform.position;
	distance = Vector3.Distance(gameObject.transform.position, player.transform.position);
	//controller=this.GetComponent(CharacterController);
	
	
	movePosition=targetPosition;
	
	
	//controller.Move(Vector3(1,0,0)*Time.fixedDeltaTime);
	Mover.move(Vector3(0,0,0)*Time.deltaTime);
	
	ForceWander();
	wanderstart=false;
	
	//lastPos=player.transform.position;
}

function Update () {
	if(Time.timeScale>=1){
		lastPos=targetPosition;
		targetPosition=player.transform.position;
		distance=Vector3.Distance(gameObject.transform.position, targetPosition);
		if(renderer.isVisible&&distance<75){
			transform.rotation.x = 0;
			transform.rotation.z = 0;
		}
		
		CheckValues();
		Move();
	}
}

function OnPathComplete(newPath:Path)
{
	if(!newPath.error)
	{
		path=newPath;
		currentWaypoint=0;
	}
}

//function FixedUpdate()
//{
	//transform.rotation.x = 0;
	//transform.rotation.z = 0;
//}


function SmoothLookAt(target:Vector3,speed:float)
{
    var dir:Vector3 = target - transform.position;
    var targetRotation:Quaternion = Quaternion.LookRotation(dir,Vector3.up);
    transform.rotation = Quaternion.RotateTowards(transform.rotation, targetRotation, Time.deltaTime * speed);
}

function CheckValues(){
	if(path==null)
	{
		return; //path is null!
	}
	if(distance>=engagerange)//if out of range
	{
		
		
		if(distance>=engagerange*2){
			rigidbody.isKinematic=true;
		}else{
			rigidbody.isKinematic=false;
		}
		
		CreateNewWander();
		return;
	}else if(HasMoved()||distance<engagerange){
		wanderstart=true;
		if(canRefresh){
			StartCoroutine("CreateNewPlayerPath");
		}
		return;
	}
}

function CreateNewPlayerPath (){
	canRefresh=false;
	movePosition=targetPosition;
	yield WaitForSeconds(.2);
	seeker.StartPath(transform.position,movePosition, OnPathComplete);
	canRefresh=true;
}

function ForceWander(){
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






function Move(){
	if(path==null)
	{
		return; //path is null!
	}
	if(distance<2){
		SmoothLookAt(player.position,300.0);
		//yield StartCoroutine("Attack");
		Attack();
		return;
	}
	if(renderer.isVisible&&distance<75){
		animator.Play("run",PlayMode.StopAll);
	}else{
		animator.Stop();
	}
	
	
	var dir2:Vector3;
	if(currentWaypoint>=path.vectorPath.Count-1)
	{
		dirToMove=(movePosition-transform.position).normalized;
		dirToMove*=Speed;
		Mover.move(dirToMove*Time.deltaTime);
		dir2=movePosition;
		if((renderer.isVisible)&&(distance<50)){
			SmoothLookAt(dir2,200.0);
		}
		return; 	//do something... nothing for now.
	}
	
	
	dirToMove=(path.vectorPath[currentWaypoint]-transform.position).normalized;
	
	
	if(currentWaypoint+1>=path.vectorPath.Count)
	{
		dir2=movePosition;
	}
	else
	{
		dir2=(path.vectorPath[currentWaypoint+1]);
	}
	
	//controller.Move(dirToMove*Time.fixedDeltaTime);
	
	dirToMove*=Speed;
	Mover.move(dirToMove*Time.deltaTime);
	
	
	if((renderer.isVisible)&&(distance<50)){
		SmoothLookAt(dir2,200.0);
	}
	
    
	//Check if we are close enough to the next waypoint
    //If we are, proceed to follow the next waypoint
	if(Vector3.Distance(transform.position,path.vectorPath[currentWaypoint])<nextWaypointDistance)
	{
        currentWaypoint++;
        return;
    }
}

function HasMoved(){
	if(Vector3.Distance(lastPos,targetPosition)>.1){
		return true;
	}else{
		return false;
	}
}

function Attack(){
	animator.animation.Play("Attack",PlayMode.StopAll);
	yield WaitForSeconds(0.25);
	yield;
}

function RagdollEnemy(){
	var clone:GameObject =Instantiate(ragdoll,transform.position,transform.rotation);
	Destroy(gameObject);
	Destroy(clone,15);
}