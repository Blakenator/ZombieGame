#pragma strict
var lengthOfDaylight:double;
var lengthOfNight:double;
var lightobj:Light;
var currTime:double;
var startTime:double;
var isDaytime:boolean;
var rotationAxis:String;

private var origRot:Transform;
private var origInt:double;
private var Spawner:zSpawnerRandom;

//private var Completion:CompletionTester;

private var daysSurvived:int=0;
function Start () {
	Spawner=GameObject.Find("_A*").GetComponent(zSpawnerRandom);
	currTime=startTime;
	origRot=lightobj.transform;
	origInt=lightobj.intensity;
}

function Update () {
	if(isDaytime){
		if(currTime>lengthOfDaylight){
			currTime=0;
			isDaytime=false;
			lightobj.transform.Rotate(185,0,0);
			animation["sunset"].wrapMode=WrapMode.Once;
			//animation.Play();
			//lightobj.intensity=0;
			if(Spawner!=null){
				Spawner.SpawnAllZombies();
			}
		}else{
			if(currTime>lengthOfDaylight-animation["sunset"].length){
				animation["sunset"].speed=1.0;
				animation.Play();
			}
			
			lightobj.intensity=origInt;
			/*
			var val=170.0/lengthOfDaylight*Time.deltaTime;
			if(rotationAxis.ToLower() =="x"){
				lightobj.transform.Rotate(val,0,0);
			}else if(rotationAxis.ToLower() =="y"){
				lightobj.transform.Rotate(0,val,0);
			}else if(rotationAxis.ToLower() =="z"){
				lightobj.transform.Rotate(0,0,val);
				Debug.Log(transform.rotation.z+"|"+170.0/lengthOfDaylight+"|"+Time.deltaTime);
			}
			*/
			var val=currTime/lengthOfDaylight*170.0;
			if(rotationAxis.ToLower() =="x"){
				lightobj.transform.rotation=new Quaternion.Euler(10+val,0,0);
				//lightobj.transform.Rotate(val,0,0);
			}else if(rotationAxis.ToLower() =="y"){
				lightobj.transform.rotation=new Quaternion.Euler(0,10+val,0);
				//lightobj.transform.Rotate(0,val,0);
			}else if(rotationAxis.ToLower() =="z"){
				lightobj.transform.rotation=new Quaternion.Euler(0,0,10+val);
				//lightobj.transform.Rotate(0,0,val);
				//Debug.Log(transform.rotation.z+"|"+170.0/lengthOfDaylight+"|"+Time.deltaTime);
			}

		}
		currTime+=Time.deltaTime;
	}else{
		if(currTime>lengthOfNight){
			currTime=0;
			isDaytime=true;
			
			//Completion.addDays();
			daysSurvived++;
		}else if(currTime>lengthOfNight-animation["sunset"].length){
			animation["sunset"].speed=-1.0;
			animation.Play();
		}
		currTime+=Time.deltaTime;
	}
}
function getDaysSurvived(){
	return daysSurvived;
	
}
function setDaysSurvived(num:int){
	daysSurvived=num;
}