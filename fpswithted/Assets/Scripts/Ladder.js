#pragma strict
private var isInTrigger:boolean=false;
private var playert:Transform;
private var playercontroller:CharacterController;
private var playerheight:float;
private var OnLadder:boolean=false;
var speed:float=10;
function Start () {
	playerheight=GameObject.Find("Graphics").collider.bounds.size.y;
	playert=GameObject.Find("player").transform;
	playercontroller=playert.GetComponent(CharacterController);
}
function Update () {
	
	if(isInTrigger){
		if (Input.GetButtonDown("Pick Up")){
			OnLadder=!OnLadder;
			
			//firstTime=true;
			return;
		}
		
		if(OnLadder){
			var hit:RaycastHit;
			
			var pos:Vector3=playert.transform.position;
			pos.y-=1;
			
			if(Physics.Raycast (pos, -Vector3.up, hit, .1)){
				if(hit.transform.CompareTag("Ground")){
					//playert.position.y=playert.position.y;
					//getOffLadder();
					return;
				}
			}
			
			
			
			
			playert.GetComponent(CharacterMotor).enabled=false;
			
			//playert.position.y+=(Input.GetAxis("Vertical")*speed)*Time.deltaTime;
			//var movedir=(Input.GetAxis("Vertical")*speed)*Time.deltaTime;
			
			var movedir=Vector3.up;
			
			movedir*=(Input.GetAxis("Vertical")*speed)*Time.deltaTime;
			
			playercontroller.Move(movedir);
			if(playert.position.y>=collider.bounds.size.y){
				//movedir=playert.forward*Time.deltaTime;
				//playercontroller.Move(movedir);
				
				
				playert.position+=(Vector3.up+playert.forward)*Time.deltaTime;
				
				
				//movedir=playert.forward+Vector3.up;
				//movedir*=Time.deltaTime;
				//playercontroller.Move(movedir);
			}
			
			
			
		}else{
			getOffLadder();
		}
	}
}

function getOffLadder(){
	playert.GetComponent(CharacterMotor).enabled=true;
	OnLadder=false;
}
function OnTriggerEnter (other : Collider){
	if(other.gameObject.CompareTag("Player")){
		isInTrigger=true;
		//playert=other.gameObject.transform;
		//playert.GetComponent(player).toggleGravity(false);
	}
}
function OnTriggerExit(other : Collider){
	if(other.gameObject.CompareTag("Player")){
		isInTrigger=false;
		yield WaitForSeconds(.5);
		//playert.GetComponent(player).toggleGravity(true);
		//playert.GetComponent(CharacterMotor).enabled=true;
		if(OnLadder){
			getOffLadder();
		}
	}
}