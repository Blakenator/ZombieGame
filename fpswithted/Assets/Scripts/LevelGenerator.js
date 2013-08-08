#pragma strict
var buildingPrefab:GameObject[];
var resourcePrefab:GameObject[];
var size:Vector2;
var groundObject:GameObject;
var startingPos:Transform;
var resourceMargin:Vector2;
var spacing:Vector3;
var resourceClusterAmount:int;
var probabilityOfBuilding:int;
var maxBuildingHeight:int;
var targetGUI:GUIText;
private var curr:double;
private var tot:double;
//private var realprob:Vector2;
private var done:boolean;
private var x:int;
private var y:int;
//private var arr:Array;

function Start () {
	done=false;
	//arr=new Array();
	x=y=0;
}
private var waitr:int;
function FixedUpdate () {
	if(done){
		DontDestroyOnLoad(groundObject);
		//for(var f:GameObject in arr){
		//	f.active=true;
		//}
		Application.LoadLevel(Application.loadedLevel+1);
	}
	//create a map
	if(waitr>1){
		tot=size.x*size.y;
		/*//get prob range
		var s=probabilityOfBuilding.ToString().Split(".".ToCharArray()[0])[1];
		realprob.x=int.Parse(s);
		realprob.y=10^s.ToCharArray().length;*/
		//Debug.Log(x+"|"+y);
		if(x<size.x){
			if(y<size.y){
				if(Random.Range(0,10)<=probabilityOfBuilding){
				//if(Random.Range(0,realprob.y)<=realprob.y){
					//make a building
					var buildHeight=Random.Range(1,maxBuildingHeight);
					var buildType=Random.Range(0,buildingPrefab.length-1);
					for(var i=0;i<buildHeight;i++){
						var floor:GameObject =Instantiate(buildingPrefab[buildType],Vector3(spacing.x*x+startingPos.position.x,startingPos.position.y+i*spacing.z,startingPos.position.z+spacing.y*y),buildingPrefab[buildType].transform.rotation);
						DontDestroyOnLoad(floor);//floor.transform.Rotate(0,Random.Range(0,4)*90,0);
						floor.SendMessage("setNotBottom",i,SendMessageOptions.RequireReceiver);
						floor.SendMessage("setInRange",false,SendMessageOptions.RequireReceiver);
						//floor.active=false;
						//arr.push(floor);
					}
				}else{
					Debug.Log("good");
					//make a resource cluster
					var i2=0;
					while(i2<resourceClusterAmount){
						var origin:Vector2=Vector2(spacing.x*x+startingPos.position.x,startingPos.position.z+y*spacing.y);
						var pos=origin;
						pos.x+=Random.Range(-spacing.x/2+resourceMargin.x,spacing.x/2-resourceMargin.x);
						pos.y+=Random.Range(-spacing.y/2+resourceMargin.y,spacing.y/2-resourceMargin.y);
						var resourceType=Random.Range(0,resourcePrefab.Length-1);
						
						var clone:GameObject=Instantiate(resourcePrefab[resourceType],Vector3(pos.x,startingPos.position.y-1,pos.y),resourcePrefab[buildType].transform.rotation);
						clone.transform.Rotate(Vector3(0,Random.Range(0,360),0));
						Debug.Log("made it");
						
						DontDestroyOnLoad(clone);
						i2++;
					}
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
		waitr=0;
	}else{
		waitr++;
	}
}