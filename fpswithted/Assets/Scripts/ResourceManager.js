#pragma strict
var targetGUI:GUIText;
var metalAmount:double;
var woodAmount:double;

function addMetal(val:double){
	if(val>0){
		metalAmount+=val;
	}else{
		if(metalAmount>0){
			metalAmount+=val;
		}
	}
}
function addWood(val:double){
	if(val>0){
		woodAmount+=val;
	}else{
		if(woodAmount>0){
			woodAmount+=val;
		}
	}
}

function setMetal(val:int){
	if(val>=0){
		metalAmount=val;
	}
}
function Update(){

	targetGUI.text="Metal: "+metalAmount+" kg | Wood: "+woodAmount+" kg";
}
