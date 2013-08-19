#pragma strict
private var open:boolean=false;
private var openAngle:float;
private var closeAngle:float;
private var isDone:boolean=false;
var Locked:boolean=false;
var IsSafe:boolean=false;
var speed:float=1;
private var isClosed:boolean=true;
function Start(){
	openAngle=transform.parent.localEulerAngles.y+90;
	closeAngle=transform.parent.localEulerAngles.y;
}

function Update (){

	if(open&&!Locked){
		Open();
	}else{
		Close();
	}
}

function Open(){
	if(isDone&&transform.parent.localEulerAngles.y==openAngle){
		return;
	}
	
	isClosed=false;
	
	var target = Quaternion.Euler (0, openAngle, 0);
    if(Mathf.Abs(transform.parent.localEulerAngles.y-openAngle)<5){
    	transform.parent.localRotation=target;
    	isDone=true;
    	isClosed=false;
    	return;
    }
    
    
    
	transform.parent.localRotation = Quaternion.Slerp(transform.parent.localRotation, target,Time.deltaTime*speed);
	
	
	if(transform.parent.localEulerAngles.y==openAngle){
		isDone=true;
		isClosed=false;
	}
}

function Close(){
	if(isDone&&transform.parent.localEulerAngles.y==closeAngle){
		return;
	}
	
	var target = Quaternion.Euler (0, closeAngle, 0);
	
	if(Mathf.Abs(transform.parent.localEulerAngles.y)<5){
    	transform.parent.localRotation=target;
		isClosed=true;
		isDone=true;
		if(IsSafe){
			Locked=true;
		}
    	return;
    }
    
    
    
	transform.parent.localRotation = Quaternion.Slerp(transform.parent.localRotation, target,Time.deltaTime*speed);
	
	if(transform.parent.localEulerAngles.y==closeAngle){
		isDone=true;
		isClosed=true;
		if(IsSafe){
			Locked=true;
		}
	}
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
	open=!open;
	isDone=false;
}