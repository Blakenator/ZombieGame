#pragma strict
import Pathfinding;

private var targetPosition : Vector3;
private var wandertargetPosition : Vector3;
private var seeker:Seeker;
private var controller:CharacterController;

private var path:Path;
var Speed : float = 2.0;
private var player:Transform;
var engagerange:int;
private var minDistance:float=1.0;

private var nextWaypointDistance:float=3.0;
private var currentWaypoint:int=0;

private var distance:float;
private var dirToMove:Vector3;

private var isInRange:boolean;
private var isColliding:boolean=false;
private var isWandering:boolean=true;
private var wanderstart:boolean=true;

function Start () {
	seeker=this.GetComponent(Seeker);
	player=GameObject.Find("player").transform;
	targetPosition=player.transform.position;
	distance = Vector3.Distance(gameObject.transform.position, player.transform.position);
	controller=this.GetComponent(CharacterController);
	seeker.StartPath (transform.position,targetPosition, OnPathComplete);
	controller.Move(Vector3(0,0,0)*Time.fixedDeltaTime);
}

function Update () {
	targetPosition=player.transform.position;
	
	distance = Vector3.Distance(gameObject.transform.position, targetPosition);
	transform.rotation.x = 0;
	transform.rotation.z = 0;
	isColliding=false;
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
	
	if(path==null)
	{
		return; //path is null!
	}
	if(distance>engagerange)
	{
		wander();
		return;
	}
	
	
	if((distance>minDistance)&&(!isColliding)){
	
		if(currentWaypoint>=path.vectorPath.Count)
		{
			dirToMove=(path.vectorPath[path.vectorPath.Count-1]-transform.position).normalized;
			controller.Move(dirToMove*Time.fixedDeltaTime);
			
			
			if(distance<=engagerange){
				seeker.StartPath (transform.position,targetPosition, OnPathComplete);
			}
			return; //do something... nothing for now.
		}
		
		
		/**
		if(distance>engagerange)
		{
			dirToMove=(path.vectorPath[currentWaypoint]-transform.position).normalized;
			controller.Move(dirToMove*Time.fixedDeltaTime);
			return;
		}
		**/
		
		
		
			
		dirToMove=(path.vectorPath[currentWaypoint]-transform.position).normalized;
		
		var dir2:Vector3;
		if(currentWaypoint+1>=path.vectorPath.Count-1)
		{
			dir2=targetPosition;
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
	    
	    if(distance<=engagerange&&distance>minDistance){
	    	seeker.StartPath (transform.position,targetPosition, OnPathComplete);
	    }
    
    }
    else
    {
    	//if(distance>engagerange)
    	//{
    		//wander();
    	//}
    	return;
    }
}   



function SmoothLookAt(target:Vector3,speed:float)
{
    var dir:Vector3 = target - transform.position;
    var targetRotation:Quaternion = Quaternion.LookRotation(dir);
    transform.rotation = Quaternion.RotateTowards(transform.rotation, targetRotation, Time.deltaTime * speed);
}



function OnTriggerEnter (other : Collider) {
	
	if (other.gameObject.CompareTag("enemy"))
	{
  		isColliding=true;
	}
	else
	{
		isColliding=false;
	}
}




function wander()
{

	if(wanderstart){
		wandertargetPosition=targetPosition;
		wanderstart=false;
	}
	
	if(!isColliding){
	
	if(currentWaypoint>=path.vectorPath.Count)
	{
		dirToMove=(path.vectorPath[path.vectorPath.Count-1]-transform.position).normalized;
		controller.Move(dirToMove*Time.fixedDeltaTime);
		
		
		wandertargetPosition=Vector3(Random.Range(10,15),1,Random.Range(10,15));
		seeker.StartPath(transform.position,wandertargetPosition,OnPathComplete);
		return; //do something... nothing for now.
	}
	
	
	/**
	if(distance>engagerange)
	{
		dirToMove=(path.vectorPath[currentWaypoint]-transform.position).normalized;
		controller.Move(dirToMove*Time.fixedDeltaTime);
		return;
	}
	**/
	
	
	
		
	dirToMove=(path.vectorPath[currentWaypoint]-transform.position).normalized;
	
	var dir2:Vector3;
	if(currentWaypoint+1>=path.vectorPath.Count-1)
	{
		dir2=targetPosition;
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
    else{
    return;
    }
}

