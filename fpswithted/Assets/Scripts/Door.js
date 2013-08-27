#pragma strict
private var open:boolean=false;
private var openAngle:float;
private var closeAngle:float;
private var isDone:boolean=false;
var Locked:boolean=false;
var IsSafe:boolean=false;
var speed:float=1;
enum Axis{Y, X, Z};
var axisToOpen:Axis=Axis.Y;

private var parent:Transform;

private var isClosed:boolean=true;
function Start(){
	parent=transform.parent;
	
	if(axisToOpen==Axis.X){
		openAngle=parent.localEulerAngles.x+90;
		closeAngle=parent.localEulerAngles.x;
	}else if(axisToOpen==Axis.Y){
		openAngle=parent.localEulerAngles.y+90;
		closeAngle=parent.localEulerAngles.y;
	}else if(axisToOpen==Axis.Z){
		openAngle=parent.localEulerAngles.z+90;
		closeAngle=parent.localEulerAngles.z;
	}
}

function Update (){
	if(open&&!Locked){
		Open();
	}else{
		Close();
	}
}

function Open(){
	
	
	if(isDone&&checkOpenAngFirst()){
		return;
	}
	isClosed=false;
	var target = getOpenTgt();//Quaternion.Euler (0, openAngle, 0);
    if(Mathf.Abs(checkOpenAngFinal())<5){
    	parent.localRotation=target;
    	isDone=true;
    	isClosed=false;
    	return;
    }
	parent.localRotation = Quaternion.Slerp(parent.localRotation, target,Time.deltaTime*speed);
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
    	parent.localRotation=target;
		isClosed=true;
		isDone=true;
		if(IsSafe){
			Locked=true;
		}
    	return;
    }
	parent.localRotation = Quaternion.Slerp(parent.localRotation, target,Time.deltaTime*speed);
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
		return parent.localEulerAngles.x==openAngle;
	}else if(axisToOpen==Axis.Y){
		return parent.localEulerAngles.y==openAngle;
	}else if(axisToOpen==Axis.Z){
		return parent.localEulerAngles.z==openAngle;
	}
}
function checkOpenAngFinal(){
	if(axisToOpen==Axis.X){
		return parent.localEulerAngles.x-openAngle;
	}else if(axisToOpen==Axis.Y){
		return parent.localEulerAngles.y-openAngle;
	}else if(axisToOpen==Axis.Z){
		return parent.localEulerAngles.z-openAngle;
	}
}
function getOpenTgt(){
	if(axisToOpen==Axis.X){
		return Quaternion.Euler (openAngle, parent.localEulerAngles.y, parent.localEulerAngles.z);
	}else if(axisToOpen==Axis.Y){
		return Quaternion.Euler (parent.localEulerAngles.x, openAngle, parent.localEulerAngles.z);
	}else if(axisToOpen==Axis.Z){
		return Quaternion.Euler (parent.localEulerAngles.x, parent.localEulerAngles.y, openAngle);
	}
}

function checkCloseAngFirst(){
	if(axisToOpen==Axis.X){
		return parent.localEulerAngles.x==closeAngle;
	}else if(axisToOpen==Axis.Y){
		return parent.localEulerAngles.y==closeAngle;
	}else if(axisToOpen==Axis.Z){
		return parent.localEulerAngles.z==closeAngle;
	}
}
function checkCloseAngFinal(){
	if(axisToOpen==Axis.X){
		return parent.localEulerAngles.x-closeAngle;
	}else if(axisToOpen==Axis.Y){
		return parent.localEulerAngles.y-closeAngle;
	}else if(axisToOpen==Axis.Z){
		return parent.localEulerAngles.z-closeAngle;
	}
}
function getCloseTgt(){
	if(axisToOpen==Axis.X){
		return Quaternion.Euler (closeAngle, parent.localEulerAngles.y, parent.localEulerAngles.z);
	}else if(axisToOpen==Axis.Y){
		return Quaternion.Euler (parent.localEulerAngles.x, closeAngle, parent.localEulerAngles.z);
	}else if(axisToOpen==Axis.Z){
		return Quaternion.Euler (parent.localEulerAngles.x, parent.localEulerAngles.y, closeAngle);
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





