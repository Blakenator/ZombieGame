#pragma strict
import Pathfinding;

var LayersToCheck:LayerMask;

var Health:float=100;
var Damage:float=-15;
private var isAttacking:boolean=false;
private var targetPosition : Vector3;
private var movePosition : Vector3;

private var seeker:Seeker;
//private var controller:CharacterController;

private var path:Path;
var Speed : float = 2.0;

private var player:Transform;
private var playerScript:player;
private var playerObj:GameObject;
var engagerange:int;
private var engaging:boolean;

private var isInvestigating:boolean=false;

var canHear:boolean=true;
var hearRange:float=30;

var nextWaypointDistance:float=5.0;
var currentWaypoint:int=0;
private var LastWaypoint:int=0;

private var distance:float;

private var dirToMove:Vector3;

//private var isColliding:boolean=false;
private var wanderstart:boolean=true;
private var isDead:boolean=false;

//private var playerHasMoved:boolean=false;

var canRefresh:boolean=true;
var Mover:ZMover;
var animator:Animation;
var ragdoll:GameObject;

private var playerLastPos:Vector3;
private var myLastPos:Vector3;

private var wandering:boolean;

private var StuckCount:int=0;
private var lastDistToWaypoint:float;

var Zspawn:zSpawnerRandom;

//Cached vars
private var myTransform:Transform;


//end cached vars

function Start () {
	myTransform=transform;
	seeker=this.GetComponent(Seeker);
	playerObj=GameObject.Find("player");
	if(playerObj!=null){
		player=GameObject.Find("player").transform;
		playerScript=player.GetComponent("player");
		//seeker.StartPath(transform.position,player.transform.position,OnPathComplete);
		targetPosition=player.transform.position;
	}else{
		targetPosition=Vector3(0,0,0);
	}
	
	distance = Vector3.Distance(myTransform.position, targetPosition);
	//controller=this.GetComponent(CharacterController);
	movePosition=targetPosition;
	
	//controller.Move(Vector3(1,0,0)*Time.fixedDeltaTime);
	Mover.move(Vector3(0,0,0)*Time.deltaTime);
	
	ForceWander();
	wanderstart=false;
	
	//lastPos=player.transform.position;
	engaging=false;
}

function Update () {
	if(Time.timeScale>=1){
		myLastPos=Vector3(myTransform.position.x,myTransform.position.y,myTransform.position.z);
		playerLastPos=targetPosition;
		if(playerObj!=null){
			if(!playerScript.getIsInCar()){
				targetPosition=player.transform.position;
			}else{
				targetPosition=playerScript.getCar().gameObject.transform.position;
			}
			distance=Vector3.Distance(myTransform.position, targetPosition);
		}else{
			distance=25;
		}
		if(renderer.isVisible&&distance<75){
			myTransform.rotation.x = 0;
			myTransform.rotation.z = 0;
		}else if(distance>150){
			if(!gameObject.name.Equals("EnemyAI")){
				Kill();
			}
		}
		CheckValues();
		Move();
	}
}

function OnPathComplete(newPath:Path)
{
	if(!newPath.error){
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
    var dir:Vector3 = target - myTransform.position;
    var targetRotation:Quaternion = Quaternion.LookRotation(dir,Vector3.up);
    myTransform.rotation = Quaternion.RotateTowards(myTransform.rotation, targetRotation, Time.deltaTime * speed);
}

function CheckValues(){
	if(path==null){
		return; //path is null!
	}
	
	StartCoroutine("HasMadeProgress");
	if(StuckCount>=100){//&&!engaging){
		Debug.Log("SLOW!!");
		ForceWander();
		StuckCount=0;
		return;
	}
	
	if(distance>=engagerange)//||!CheckFov())//if out of range
	{
		if(distance>=engagerange*2){
			rigidbody.isKinematic=true;
		}else{
			rigidbody.isKinematic=false;
		}
		
		CreateNewWander();
		
		return;
	}else if(distance<engagerange&&CheckFov()){//HasMoved()||distance<engagerange){
		var hit:RaycastHit;
		Debug.Log(canRefresh);
		if(canRefresh){
			if(Physics.Raycast (myTransform.position, targetPosition-myTransform.position, hit, engagerange,LayersToCheck)){
				if(hit.transform.gameObject.CompareTag("Player")){
					
					wanderstart=true;
					StartCoroutine("CreateNewPlayerPath");
					return;
					
				}//else{
					//CreateNewWander();
				//}
			}
		}
	}else{
		CreateNewWander();
	}
	LastWaypoint=currentWaypoint;//Last always
}

function CreateNewPlayerPath (){
	engaging=true;
	wandering=false;
	wanderstart=false;
	canRefresh=false;
	movePosition=targetPosition;
	yield WaitForSeconds(.2);
	seeker.StartPath(myTransform.position,movePosition, OnPathComplete);
	canRefresh=true;
}

function ForceWander(){
	
	engaging=false;
	wandering=true;
	movePosition=Vector3(Random.Range(-15,15),-1,Random.Range(-15,15));
	var plusminus:int=Random.Range(1,3);
	if(plusminus==1){
		movePosition=myTransform.position-movePosition;
		movePosition.y=0;
	}else{
		movePosition=myTransform.position+movePosition;
		movePosition.y=0;
	}
	seeker.StartPath(myTransform.position,movePosition,OnPathComplete);
}

function CreateNewWander (){
	if(wanderstart){
		wanderstart=false;
		movePosition=targetPosition;
		seeker.StartPath(myTransform.position,movePosition,OnPathComplete);
		return;
	}
	if(currentWaypoint>=path.vectorPath.Count-1){
		engaging=false;
		wandering=true;
		movePosition=Vector3(Random.Range(-15,15),-1,Random.Range(-15,15));
		var plusminus:int=Random.Range(1,3);
		if(plusminus==1){
			movePosition=myTransform.position-movePosition;
			movePosition.y=0;
		}else{
			movePosition=myTransform.position+movePosition;
			movePosition.y=0;
		}
		seeker.StartPath(myTransform.position,movePosition,OnPathComplete);
		return;
	}
}

function Move(){
	if(path==null)
	{
		return; //path is null!
	}
	if(distance<2){
		SmoothLookAt(targetPosition,300.0);
		var hit:RaycastHit;
		if(Physics.Raycast (myTransform.position, targetPosition-myTransform.position, hit, 2,LayersToCheck)){
			if(!isAttacking){
				if(CheckFov()){//could be bad if close
					Attack();
				}
			}
			return;
		}
	}
	
	if(renderer.isVisible&&distance<75){
		//animator.Play("run",PlayMode.StopAll);
	}else{
		animator.Stop();
	}
	
	var dir2:Vector3;
	if(currentWaypoint>=path.vectorPath.Count-1){
		dirToMove=(movePosition-myTransform.position).normalized;
		dirToMove*=Speed;
		Mover.move(dirToMove*Time.deltaTime);
		dir2=movePosition;
		if((renderer.isVisible)&&(distance<50)){
			SmoothLookAt(dir2,200.0);
		}
		return;//do something... nothing for now.
	}
	
	dirToMove=(path.vectorPath[currentWaypoint]-myTransform.position).normalized;
	
	if(currentWaypoint+1>=path.vectorPath.Count)
	{
		dir2=movePosition;
	}else{
		dir2=(path.vectorPath[currentWaypoint+1]);
	}
	
	dirToMove*=Speed;
	Mover.move(dirToMove*Time.deltaTime);
	
	if((renderer.isVisible)&&(distance<50)){
		SmoothLookAt(dir2,200.0);
	}
	
    
	//Check if we are close enough to the next waypoint
    //If we are, proceed to follow the next waypoint
	if(Vector3.Distance(myTransform.position,path.vectorPath[currentWaypoint])<nextWaypointDistance){
		LastWaypoint=currentWaypoint;
        currentWaypoint++;
        return;
    }
}

function HasMoved(){
	return Vector3.Distance(playerLastPos,targetPosition)>.1;
}
function HasMadeProgress(){
	
	if(!(distance<2)){//replace with attack range
		//canRefresh=false;
		//yield WaitForSeconds(.01);//Could lag?? maybe issues with the player can refresh
		
		var newDist:float = Vector3.Distance(myTransform.position , path.vectorPath[path.vectorPath.Count-1]);
		var distLastPos:float=Vector3.Distance(myTransform.position , myLastPos);
		
		if((Mathf.Abs(currentWaypoint-LastWaypoint)<1)){//(Mathf.Abs(newDist-lastDistToWaypoint)< .01f)&&(Mathf.Abs(currentWaypoint-LastWaypoint)<1)){//&&(distLastPos<=.1)){
			StuckCount++;
		}else{
			StuckCount=0;
		}
		lastDistToWaypoint=newDist;
		//canRefresh=true;
	}
}


function Attack(){
	isAttacking=true;
	var canAttack:boolean=false;
	yield;
	var hit:RaycastHit;
	
	if(Physics.Raycast (myTransform.position, targetPosition-myTransform.position, hit, 2,LayersToCheck)){
		if(hit.transform.gameObject.CompareTag("Player")){
			canAttack=true;
			//StatsController.updateHealth(Damage);
			//Debug.Log("hit player");
		}
	}
	//animator.animation.Play("Attack",PlayMode.StopAll);
	yield WaitForSeconds(2);
	if(canAttack){
		if(Physics.Raycast (myTransform.position, targetPosition-myTransform.position, hit, 2,LayersToCheck)){
			if(hit.transform.gameObject.CompareTag("Player")){
				StatsController.updateHealth(Damage);
				Debug.Log("hit player");
			}
		}
	}
	isAttacking=false;
}


function CheckFov(){
	var angle:float = Vector3.Angle(transform.forward, (targetPosition-myTransform.position));
	//Debug.Log(angle);
	return angle<70;
}

function CanSeePlayer(range:float){
	if(CheckFov()){
		var hit:RaycastHit;
		if(Physics.Raycast (myTransform.position, targetPosition-myTransform.position, hit, range,LayersToCheck)){
			if(hit.transform.gameObject.CompareTag("Player")){
				return true;//player is within 70 deg. of zombie FOV and has a clear line of sight
			}
		}
	}
}

function OnHit(dmg:int){
	Health-=dmg;
	if(Health<=0){
		OnDeath();
	}
}

function OnDeath(){
	if(!isDead){
		Zspawn.ZombieWasKilled();
		RagdollEnemy();
		isDead=true;
		Destroy(this);
	}
}

function Kill(){
	if(!isDead){
		Destroy(gameObject);
		Zspawn.ZombieWasKilled();
		Zspawn.SpawnAllZombies();
		isDead=true;
		Destroy(this);
	}
}



function RagdollEnemy(){
	var clone:GameObject =Instantiate(ragdoll,myTransform.position,transform.rotation);
	Destroy(gameObject);
	Destroy(clone,15);
}



public function alertToPosition(alertPos:Vector3){
	if(canHear&&!isInvestigating){
		isInvestigating=true;
		//if(!engaging){
		var dist:float=Vector3.Distance(myTransform.position, alertPos);
		if(dist<=hearRange){
			if(CanSeePlayer(2.0f)){
				Debug.Log("Can see player!");
			}else{
				movePosition=alertPos;
				Debug.Log("ALERTED!");
				seeker.StartPath(myTransform.position,movePosition,OnPathComplete);
			}
		}
		yield WaitForSeconds(.2);
		isInvestigating=false;
		//}
	}
}