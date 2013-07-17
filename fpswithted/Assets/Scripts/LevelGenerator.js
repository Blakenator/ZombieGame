#pragma strict
var buildingPrefab:GameObject[];
var resourcePrefab:GameObject[];
var size:Vector2;
var groundObject:GameObject;
var startingPos:Transform;
var spacing:Vector3;
var resourceClusterAmount:int;
var probabilityOfBuilding:double;
var maxBuildingHeight:int;
var targetGUI:GUIText;
private var curr:double;
private var tot:double;
private var realprob:Vector2;
private var done:boolean;
private var x:int;
private var y:int;
//private var arr:Array;

function Start () {
	done=false;
	//arr=new Array();
	x=y=0;
}
function Update () {
	if(done){
		DontDestroyOnLoad(groundObject);
		//for(var f:GameObject in arr){
		//	f.active=true;
		//}
		Application.LoadLevel(1);
	}
	//create a map
	tot=size.x*size.y;
	//get prob range
	var s=probabilityOfBuilding.ToString().Split(".".ToCharArray()[0])[1];
	realprob.x=int.Parse(s);
	realprob.y=10^s.ToCharArray().length;
	//Debug.Log(x+"|"+y);
	if(x<size.x){
		if(y<size.y){
			if(Random.Range(0,realprob.y)<=realprob.y){
				//make a building
				var buildHeight=Random.Range(0,maxBuildingHeight);
				var buildType=Random.Range(0,buildingPrefab.length-1);
				for(var i=0;i<buildHeight;i++){
					var floor:GameObject =Instantiate(buildingPrefab[buildType],Vector3(spacing.x*x+startingPos.position.x,startingPos.position.y+i*spacing.z,startingPos.position.z+spacing.y*y),buildingPrefab[buildType].transform.rotation);
					DontDestroyOnLoad(floor);//floor.transform.Rotate(0,Random.Range(0,4)*90,0);
					//floor.active=false;
					//arr.push(floor);
				}
			}else{
				//make a resource cluster
				
			}
			y++;
			curr++;
			targetGUI.text=curr+"/"+tot+"--"+Mathf.Round((curr/tot)*100)+"%";
		}else{
			y=0;
			x++;
		}
	}else{
		done=true;
	}
}