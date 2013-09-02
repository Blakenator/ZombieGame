#pragma strict
//This could get slow later on
//DOES NOT CURRENTLY WORK IN CARS!
private var AllObj:MeshRenderer[];
private var TempAllObj=new Array ();

private var player:Transform;
private var distance:float;
private var isTesting:boolean=false;

function Start () {
	//TempAllObj=new Array ();
	//TempAllObj=GameObject.FindObjectsOfType(MeshRenderer);
	
	//FilterExtras();
	
	//AllObj=TempAllObj.ToBuiltin(MeshRenderer) as MeshRenderer[];
	AllObj=GameObject.FindObjectsOfType(MeshRenderer);
	
	Debug.Log(AllObj.Length);
	player=GameObject.Find("player").transform;
	
	
}

function Update () {
	if(!isTesting){
		isTesting=true;
		for(var I in AllObj){
			
			var tempren:MeshRenderer=I;
			if(tempren!=null){
				var tempObj:GameObject=tempren.gameObject;
				
				if(!tempObj.CompareTag("enemy")){
				
					var temppos:Vector3=tempren.gameObject.transform.position;
					//Debug.Log(Camera.current.transform.position);
					distance=Vector3.Distance(temppos,player.position);
					
					if(distance>250){
						tempren.enabled=false;
					}else if(tempren.enabled==false){
						tempren.enabled=true;
					}
				}
			}
		}
		
		isTesting=false;
	}
}





function FilterExtras(){
	yield;
	//var finalArr:Array=Arr;
	//finalArr=Arr;
	
	for(var lcv=0;lcv<TempAllObj.length;lcv++){
		var tempren:MeshRenderer=TempAllObj[lcv];
		var obj:GameObject=tempren.gameObject;
		if(obj.CompareTag("enemy")){
			TempAllObj.RemoveAt(lcv);
			lcv--;
		}
	}
	//return finalArr;
}