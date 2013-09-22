#pragma strict

public class Door extends OpenableClass{
	static var EnableDistance:float=50;
	private var distance:float;
	private var player:Transform;
	
	var isDestroyed:boolean=false;
	
	var health:float=100;
	
	
	private var open:boolean=false;
	private var openAngle:float;
	private var closeAngle:float;
	
	private var bashAngle:float;
	
	
	private var isDone:boolean=false;
	var Locked:boolean=false;
	var IsSafe:boolean=false;
	
	var speed:float=1;
	enum Axis{Y, X, Z};
	var axisToOpen:Axis=Axis.Y;
	
	private var parent:Transform;
	
	private var isClosed:boolean=true;
	
	var isDestructable:boolean=false;
	
	private var audioSources=new Array ();
	
	private var myTransform:Transform;
	
	private var objToRotate:Transform;
	var rotateParent:boolean=true;
	function Awake(){
		
		myTransform=transform;
		if(rotateParent){
			objToRotate=transform.parent;
		//parent=transform.parent;
		}else{
			objToRotate=transform;
		}
		
		if(axisToOpen==Axis.X){
			openAngle=objToRotate.localEulerAngles.x+90;
			closeAngle=objToRotate.localEulerAngles.x;
			
			//bashAngle=parent.localEulerAngles.x-90;
		}else if(axisToOpen==Axis.Y){
			openAngle=objToRotate.localEulerAngles.y+90;
			closeAngle=objToRotate.localEulerAngles.y;
			
			//bashAngle=parent.localEulerAngles.y-90;
		}else if(axisToOpen==Axis.Z){
			openAngle=objToRotate.localEulerAngles.z+90;
			closeAngle=objToRotate.localEulerAngles.z;
			
			//bashAngle=parent.localEulerAngles.z-90;
		}
		gameObject.tag="Door";
		//Debug.Log(gameObject.GetInstanceID());
		player=GameObject.Find("player").transform;
		
	}
	function Start(){
		audioSources=gameObject.GetComponents(AudioSource);
	}
	
	function Update (){
		distance=Vector3.Distance(myTransform.position,player.position);
		if(distance<EnableDistance){
			if(!isDestroyed){
				if(open&&!Locked){
					Open();
				}else{
					Close();
				}
			}else if(isClosed&&axisToOpen==Axis.Y){
				Break();
			}
		}
		
	}
	
	function Open(){
		
		
		if(isDone&&checkOpenAngFirst()){
			return;
		}
		
		
		
		isClosed=false;
		var target = getOpenTgt();//Quaternion.Euler (0, openAngle, 0);
	    if(Mathf.Abs(checkOpenAngFinal())<5){
	    	objToRotate.localRotation=target;
	    	isDone=true;
	    	isClosed=false;
	    	return;
	    }
	    
	    if(audioSources.length>0){
	   		var aud:AudioSource=audioSources[0];
	   		if(!aud.isPlaying){
				aud.Play();
			}
		}
		
		objToRotate.localRotation = Quaternion.Slerp(objToRotate.localRotation, target,Time.deltaTime*speed);
		if(checkOpenAngFirst()){
			isDone=true;
			isClosed=false;
		}
		
		
	}
	
	function Close(){
		
		
		if(isDone&&checkCloseAngFirst()){
			return;
		}
		var target = getCloseTgt();//Quaternion.Euler (0, closeAngle, 0);
		if(Mathf.Abs(checkCloseAngFinal())<5){
	    	objToRotate.localRotation=target;
			isClosed=true;
			isDone=true;
			if(IsSafe){
				Locked=true;
			}
			
			if(audioSources.length>0){
				var aud:AudioSource=audioSources[1];
				aud.Play();
			}
			
	    	return;
	    }
		objToRotate.localRotation = Quaternion.Slerp(objToRotate.localRotation, target,Time.deltaTime*speed);
		if(checkCloseAngFirst()){
			isDone=true;
			isClosed=true;
			if(IsSafe){
				Locked=true;
			}
		}
		
	}
	
	
	
	function checkOpenAngFirst(){
		if(axisToOpen==Axis.X){
			return objToRotate.localEulerAngles.x==openAngle;
		}else if(axisToOpen==Axis.Y){
			return objToRotate.localEulerAngles.y==openAngle;
		}else if(axisToOpen==Axis.Z){
			return objToRotate.localEulerAngles.z==openAngle;
		}
		return objToRotate.localEulerAngles.y==openAngle;
	}
	function checkOpenAngFinal(){
		if(axisToOpen==Axis.X){
			return objToRotate.localEulerAngles.x-openAngle;
		}else if(axisToOpen==Axis.Y){
			return objToRotate.localEulerAngles.y-openAngle;
		}else if(axisToOpen==Axis.Z){
			return objToRotate.localEulerAngles.z-openAngle;
		}
		return objToRotate.localEulerAngles.y-openAngle;
	}
	function getOpenTgt(){
		if(axisToOpen==Axis.X){
			return Quaternion.Euler (openAngle, objToRotate.localEulerAngles.y, objToRotate.localEulerAngles.z);
		}else if(axisToOpen==Axis.Y){
			return Quaternion.Euler (objToRotate.localEulerAngles.x, openAngle, objToRotate.localEulerAngles.z);
		}else if(axisToOpen==Axis.Z){
			return Quaternion.Euler (objToRotate.localEulerAngles.x, objToRotate.localEulerAngles.y, openAngle);
		}
		return Quaternion.Euler (objToRotate.localEulerAngles.x, openAngle, objToRotate.localEulerAngles.z);
	}
	function checkCloseAngFirst(){
		if(axisToOpen==Axis.X){
			return objToRotate.localEulerAngles.x==closeAngle;
		}else if(axisToOpen==Axis.Y){
			return objToRotate.localEulerAngles.y==closeAngle;
		}else if(axisToOpen==Axis.Z){
			return objToRotate.localEulerAngles.z==closeAngle;
		}
		return objToRotate.localEulerAngles.y==closeAngle;
	}
	function checkCloseAngFinal(){
		if(axisToOpen==Axis.X){
			return objToRotate.localEulerAngles.x-closeAngle;
		}else if(axisToOpen==Axis.Y){
			return objToRotate.localEulerAngles.y-closeAngle;
		}else if(axisToOpen==Axis.Z){
			return objToRotate.localEulerAngles.z-closeAngle;
		}
		return objToRotate.localEulerAngles.y-closeAngle;
	}
	function getCloseTgt(){
		if(axisToOpen==Axis.X){
			return Quaternion.Euler (closeAngle, objToRotate.localEulerAngles.y, objToRotate.localEulerAngles.z);
		}else if(axisToOpen==Axis.Y){
			return Quaternion.Euler (objToRotate.localEulerAngles.x, closeAngle, objToRotate.localEulerAngles.z);
		}else if(axisToOpen==Axis.Z){
			return Quaternion.Euler (objToRotate.localEulerAngles.x, objToRotate.localEulerAngles.y, closeAngle);
		}
		return Quaternion.Euler (objToRotate.localEulerAngles.x, closeAngle, objToRotate.localEulerAngles.z);
	}
	
	function ForceOpen(){
		open=true;
		objToRotate.localRotation=getOpenTgt();
		isDestroyed=false;
	}
	function ForceClose(){
		open=false;
		objToRotate.localRotation=getCloseTgt();
		isDestroyed=false;
	}
	
	function IsClosed(){
		return isClosed;
	}
	function Unlock(){
		Locked=false;
	}
	function Lock(){
		Locked=false;
	}
	function Use(){
		if(!isDestroyed){
			open=!open;
			isDone=false;
		}
	}
	
	function Damage(dmg:float,pos:Vector3,dir:Vector3){
		if(isDestructable){
			if(axisToOpen==Axis.Y&&!isDestroyed){
				var dirDoor:Vector3 = objToRotate.transform.position - GameObject.Find("player").transform.position; 
				var dot:float = Vector3.Dot(dirDoor, transform.right);
				
				if (dot < 0){ // if door opens to the wrong side, use dot < 0
			  		bashAngle = closeAngle+90;// closeAngle + openAngle;
			  		
				} else {
			  		bashAngle = closeAngle - 90;//openAngle;
				}
				
				
				health-=dmg;
				Debug.Log("DMG");
				if(health<=0){
					isDestroyed=true;
					if(isClosed){
						Break();
					}
				}
			}
		}
	}
	
	function Break(){
		
		//isDestroyed=true;
		
		//parent.localRotation = Quaternion.Slerp(parent.localRotation, BashAngle,Time.deltaTime*speed);
		if(isDone&&objToRotate.localEulerAngles.x==bashAngle){
			return;
		}
		
		var target = Quaternion.Euler (0, bashAngle, 0);
	    if(Mathf.Abs(objToRotate.localEulerAngles.y-bashAngle)<5){
	    	objToRotate.localRotation=target;
	    	isDone=true;
	    	return;
	    }
		objToRotate.localRotation = Quaternion.Slerp(objToRotate.localRotation, target,Time.deltaTime*10);
		if(objToRotate.localEulerAngles.x==bashAngle){
			isDone=true;
		}
	}
	
	function getState(){//true is closed false is open
		if(open){
			return false;
		}
		return true;
	}
	
	function setState(bool:boolean){
		if(bool){
			ForceClose();
			
		}else{
			ForceOpen();
		}
	}
}